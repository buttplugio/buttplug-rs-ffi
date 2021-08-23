// @ts-check
/// <reference lib="esnext" />
import https from "https";
import os from "os";
import path from "path";
import { copyFile, mkdir, mkdtemp, readdir, readFile, rm, writeFile } from "fs/promises";
import { exec, spawn } from "child_process";
import { pipeline } from "stream/promises";
import { fileURLToPath, URL } from "url";
import { createWriteStream, existsSync } from "fs";
import util from "util";

const MAX_REDIRECTS = 10;
const execAsync = util.promisify(exec);
const packageDir = fileURLToPath(new URL("..", import.meta.url));
const repoDir = fileURLToPath(new URL("../..", import.meta.url));
const ffiDir = fileURLToPath(new URL("../../ffi", import.meta.url));

/**
 * @typedef ParsedArgs
 * @property {string} [version]
 * @property {string} [platform]
 * @property {string} [arch]
 * @property {boolean} [force]
 * @property {boolean} [build]
 * @property {boolean} [copy]
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
        force: !!process.env.BUTTPLUG_FFI_INSTALL_CORE_FORCE,
        version: process.env.BUTTPLUG_FFI_INSTALL_CORE_VERSION,
        platform: process.env.BUTTPLUG_FFI_INSTALL_CORE_PLATFORM,
        arch: process.env.BUTTPLUG_FFI_INSTALL_CORE_ARCH,
        from: process.env.BUTTPLUG_FFI_INSTALL_CORE_FROM,
        copy: !!process.env.BUTTPLUG_FFI_INSTALL_CORE_COPY,
        build: !!process.env.BUTTPLUG_FFI_INSTALL_CORE_BUILD,
    };
    const args = process.argv.slice(2);
    let arg;
    while ((arg = args.shift()) !== undefined) {
        const argLower = arg.toLowerCase();
        switch (argLower) {
            case "--version":
                if (parsedArgs.build) throw new Error(`Argument '--version' cannot be specified with '--build'.`);
                break;
            case "--from":
                if (parsedArgs.build) throw new Error(`Argument '--from' cannot be specified with '--build'.`);
                break;
            case "--build":
                if (parsedArgs.version) throw new Error(`Argument '--build' cannot be specified with '--version'.`);
                if (parsedArgs.from) throw new Error(`Argument '--build' cannot be specified with '--from'.`);
                break;
        }
        switch (argLower) {
            case "--help":
            case "-h":
            case "-?":
                printHelp();
                process.exit(0);
            case "--force":
            case "--no-force":
            case "--copy":
            case "--no-copy":
            case "--build":
            case "--no-build": {
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

function printHelp() {
    console.log([
        `Downloads the FFI core library from the web.`,
        ``,
        `usage: node scripts/install_core.js [options]`,
        ``,
        `options:`,
        `    --version <version>    Specifies the ffi core library version.`,
        `                           Defaults to the value of 'ffi-version' in package.json.`,
        `                           Cannot be used with '--build'.`,
        `    --platform <platform>  Specifies the ffi core library platform.`,
        `                           One of: 'darwin', 'linux', or 'win32'.`,
        `                           Defaults to the host platform (if supported).`,
        `    --arch <arch>          Specifies the ffi core library processor architecture.`,
        `                           One of: 'x64'.`,
        `                           Defaults to the host's architecture (if supported).`,
        `    --copy                 Copies files from a local directory rather than from the web.`,
        `                           Use '--from' to override the directory.`,
        `                           Defaults to the rust ffi build output directory when run within the`,
        `                           GIT repository.`,
        `    --from <dir>           Copies ffi core library files from <dir> rather than downloading from the web.`,
        `                           Implies '--copy'.`,
        `                           Cannot be used with '--build'.`,
        `    --build                Builds the ffi core library when run within the GIT repo.`,
        `                           Implies '--copy'.`,
        `                           Cannot be used with '--from' or '--version'.`,
        `                           NOTE: If you are building a <platform> other than your host platform, you must`,
        `                           already have the platform-specific rust targets installed as well as any necessary`,
        `                           cross-platform build tools`,
        `    --force                Force overwrite of ffi core library files.`,
        ` -h --help                 Prints this message.`,
        ``,
    ].join("\n"));
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
    await execAsync(`npx --yes extract-zip@2.0.1 "${releaseFile}" "${releaseOutDir}"`);
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

/**
 * @param {Release} release
 */
function getRustTarget(release) {
    if (release.platform !== process.platform ||
        release.arch !== process.arch) {
        switch (release.platform) {
            case "darwin":
                return "x86_64-apple-darwin";
            case "linux":
                return "x86_64-unknown-linux-gnu";
            case "win32":
                return "x86_64-pc-windows-msvc";
        }
    }
}

/**
 * @param {Release} release
 * @param {"x86_64-apple-darwin" | "x86_64-unknown-linux-gnu" | "x86_64-pc-windows-msvc" | undefined} target
 */
function getOutputDir(release, target = getRustTarget(release)) {
    if (path.basename(repoDir) === "node_modules" || !existsSync(path.join(ffiDir, "Cargo.toml"))) {
        throw new Error(`Cannot find rust components.`);
    }
    return path.join(ffiDir, target ? `target/${target}/release` : "target/release");
}

/**
 * @param {Release} release
 */
async function buildRust(release) {
    const target = getRustTarget(release);
    const outDir = getOutputDir(release, target);

    const args = target ?
        ["build", "--release", "--target", target] :
        ["build", "--release"];

    console.log("building ffi...");

    /** @type {number | null} */
    const exitCode = await new Promise((resolve, reject) => {
        const proc = spawn("cargo", args, { cwd: ffiDir, stdio: "inherit" });
        proc.on("error", reject);
        proc.on("exit", resolve);
    });

    if (exitCode) throw new Error(`Process exited with code: ${exitCode}`);

    await copyPackage(outDir, release);
    console.log("ffi library updated");
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
    if (args.build) {
        await buildRust(release);
    }
    else if (args.copy || args.from) {
        args.from ??= getOutputDir(release);
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