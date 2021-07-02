// @ts-check
/// <reference lib="esnext" />
import https from "https";
import os from "os";
import path from "path";
import { copyFile, mkdir, mkdtemp, readdir, readFile, rm, writeFile } from "fs/promises";
import { exec } from "child_process";
import { pipeline } from "stream/promises";
import { fileURLToPath, URL } from "url";
import { createWriteStream } from "fs";
import util from "util";

const MAX_REDIRECTS = 10;
const execAsync = util.promisify(exec);
const packageDir = fileURLToPath(new URL("..", import.meta.url));

/**
 * @typedef ParsedArgs
 * @property {string} [version]
 * @property {string} [platform]
 * @property {string} [arch]
 * @property {boolean} [force]
 * @property {string} [from]
 */

/**
 * @typedef Release
 * @property {string} version
 * @property {"darwin" | "win32" | "linux"} platform
 * @property {"x64"} arch
 */

/**
 * @typedef CacheInfo
 * @property {string} [version]
 * @property {string} [etag]
 * @property {string} [date]
 */

function parseArgs() {
    /** @type {ParsedArgs} */
    const parsedArgs = {
        force: false,
        version: undefined,
        platform: undefined,
        arch: undefined,
        from: undefined,
    };
    const args = process.argv.slice(2);
    let arg;
    while ((arg = args.shift()) !== undefined) {
        const argLower = arg.toLowerCase();
        switch (argLower) {
            case "--force":
            case "--no-force": {
                const value = !argLower.startsWith("--no-");
                parsedArgs[argLower.slice(value ? 2 : 5)] = value;
                break;
            }
            case "--version":
            case "--platform":
            case "--arch":
            case "--from": {
                const value = args.shift();
                if (value === undefined) throw new Error(`Argument '${argLower}' requires a value`);
                parsedArgs[argLower.slice(2)] = value;
                break;
            }
            default:
                throw new Error(`Unexpected argument: '${arg}'`);
        }
    }
    return parsedArgs;
}

/**
 * @param {*} version
 * @returns {ffiVersion is `${number}.${number}.${number}`}
 */
function isSupportedFfiVersion(version) {
    return typeof version === "string" && /^\d+\.\d+\.\d+$/.test(version);
}

/**
 * @param {string} platform
 * @returns {platform is "darwin" | "linux" | "win32"}
 */
function isSupportedPlatform(platform) {
    switch (platform) {
        case "darwin":
        case "linux":
        case "win32":
            return true;
        default:
            return false;
    }
}

/**
 * @param {string} arch
 * @returns {arch is "x64"}
 */
function isSupportedArch(arch) {
    return arch === "x64";
}

async function readFfiVersionFromPackageJson() {
    const packageJsonFile = path.resolve(packageDir, "package.json");
    const packageJson = JSON.parse((await readFile(packageJsonFile, "utf8")).toString());
    return packageJson["ffi-version"];
}

/**
 * @param {Release} release
 */
function getReleaseUrl({version, platform, arch}) {
    const platformName =
        platform === "darwin" ? "macos" :
        platform === "win32" ? "win" :
        "linux";
    if (!platformName) {
        throw new Error(`Unsupported platform: ${platform}`);
    }
    return `https://github.com/buttplugio/buttplug-rs-ffi/releases/download/core-${version}/buttplug_rs_ffi-lib-${platformName}-${arch}-${version}.zip`;
}

/**
 * @param {string} url
 * @param {object} [options]
 * @param {import("http").OutgoingHttpHeaders} [options.headers]
 * @returns {Promise<import("http").IncomingMessage>}
 */
function fetch(url, { headers } = {}) {
    return new Promise((resolve, reject) => {
        let redirectCount = 0;
        /**
         * @param {string} url
         */
        const start = url => {
            https.get(url, { headers }, message => {
                try {
                    if (message.statusCode === 301 || message.statusCode === 302) {
                        if (redirectCount >= MAX_REDIRECTS) {
                            throw new Error("Too many redirects.");
                        }
                        if (!message.headers.location) {
                            throw new Error("Invalid redirect location.");
                        }
                        redirectCount++;
                        const location = message.url ? new URL(message.headers.location, message.url).href : message.headers.location;
                        return start(location);
                    }
                    if (message.statusCode !== 200) {
                        throw new Error(`Download failed: ${message.statusCode} - ${message.statusMessage}`);
                    }
                    return resolve(message);
                }
                catch (e) {
                    reject(e);
                }
            })
            .on("error", reject);
        };
        start(url);
    });
}

/**
 * @param {import("http").IncomingMessage} response
 * @param {string} releaseFile
 * @returns {Promise<CacheInfo>}
 */
async function downloadPackage(response, releaseFile) {
    console.log(`Downloading '${path.basename(releaseFile)}...`);
    await pipeline(response, createWriteStream(releaseFile, { autoClose: true }));
    return {
        etag: response.headers.etag,
        date: response.headers.date
    };
}

/**
 * @param {string} releaseFile
 * @param {string} releaseOutDir
 */
async function unzipPackage(releaseFile, releaseOutDir) {
    console.log(`Extracting '${path.basename(releaseFile)}...`);
    await execAsync(`npx extract-zip "${releaseFile}" "${releaseOutDir}"`);
}

/**
 * @param {string} file
 */
async function rimraf(file) {
    try {
        await rm(file, { recursive: true, force: true });
    }
    catch {
    }
}

/**
 * @param {string} sourceDir
 * @param {string} targetDir
 * @param {RegExp} [include]
 * @param {RegExp} [exclude]
 */
async function copyFiles(sourceDir, targetDir, include, exclude) {
    let hasCreatedDir = false;
    for (const entry of await readdir(sourceDir, { withFileTypes: true })) {
        const sourceFile = path.join(sourceDir, entry.name);
        const targetFile = path.join(targetDir, entry.name);
        if (entry.isDirectory()) {
            await copyFiles(sourceFile, targetFile, include, exclude);
        }
        else if (entry.isFile()) {
            if (!include || include.test(sourceFile)) {
                if (!exclude || !exclude.test(sourceFile)) {
                    if (!hasCreatedDir) {
                        hasCreatedDir = true;
                        try { await mkdir(targetDir, { recursive: true }); } catch { }
                    }
                    await copyFile(sourceFile, targetFile);
                }
            }
        }
    }
}

/**
 * @param {Release} release
 */
function getPackageBinDir(release) {
    return path.join(packageDir, "bin", `${release.platform}-${release.arch}`);
}

/**
 * @param {Release} release
 * @returns {Promise<CacheInfo | undefined>}
 */
async function getCacheInfo(release) {
    const packageBinDir = getPackageBinDir(release);
    const cacheInfoFile = path.join(packageBinDir, ".cache");
    try {
        return JSON.parse((await readFile(cacheInfoFile, "utf8")).toString());
    }
    catch {
    }
}

/**
 * @param {string} sourceDir
 * @param {Release} release
 * @param {CacheInfo} [cacheInfo]
 */
async function copyPackage(sourceDir, release, cacheInfo) {
    const packageBinDir = getPackageBinDir(release);
    await rimraf(packageBinDir);
    await copyFiles(sourceDir, packageBinDir, /*include*/ /\.(dll|so|dylib|pdb|dbg)$/, /*exclude*/ /[\\/](\.fingerprint|build|deps|examples|incremental)[\\/]/);
    if (cacheInfo) {
        cacheInfo.version = release.version;
        await writeFile(path.join(packageBinDir, ".cache"), JSON.stringify(cacheInfo));
    }
}

async function main() {
    const args = parseArgs();
    const version = args.version || await readFfiVersionFromPackageJson();
    const platform = args.platform || process.platform;
    const arch = args.arch || process.arch;
    if (!isSupportedFfiVersion(version)) throw new Error(`Unsupported ffi-version in package.json: ${version}`);
    if (!isSupportedPlatform(platform)) throw new Error(`Unsupported platform: ${platform}`);
    if (!isSupportedArch(arch)) throw new Error(`Unsupported architecture: ${arch}`);

    /** @type {Release} */
    const release = { version, platform, arch };
    if (args.from) {
        await copyPackage(args.from, release);
        console.log("ffi library updated");
    }
    else {
        const cacheInfo = await getCacheInfo(release);

        /** @type {"yes" | "no" | "maybe"} */
        let needsUpdate = args.force ? "yes" : "maybe";
        if (needsUpdate === "maybe" && cacheInfo?.version === release.version) {
            needsUpdate = "no";
        }

        const releaseUrl = getReleaseUrl(release);
        if (needsUpdate !== "no") {
            const response = await fetch(releaseUrl, {
                headers: needsUpdate === "maybe" ? {
                    ...(cacheInfo?.etag ? { etag: cacheInfo.etag } : undefined),
                    ...(cacheInfo?.date ? { "if-modified-since": cacheInfo.date } : undefined)
                } : undefined
            });
            if (needsUpdate === "maybe" && response.statusCode === 304) {
                needsUpdate = "no";
            }
            if (needsUpdate !== "no") {
                const releaseName = path.basename(releaseUrl);
                const releaseDir = await mkdtemp(`${os.tmpdir()}/${path.basename(releaseName, ".zip")}-`);
                try {
                    console.log(releaseDir);
                    const releaseFile = path.join(releaseDir, releaseName);
                    const releaseOutDir = path.join(releaseDir, "archive");
                    const cacheInfo = await downloadPackage(response, releaseFile);
                    await unzipPackage(releaseFile, releaseOutDir);
                    await copyPackage(releaseOutDir, release, cacheInfo);
                }
                finally {
                    await rimraf(releaseDir);
                }
                console.log("ffi library updated");
                return;
            }
        }
        console.log("ffi library update not required");
    }
}

await main();