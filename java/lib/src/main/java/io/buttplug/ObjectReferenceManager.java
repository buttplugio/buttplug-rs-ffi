package io.buttplug;

import com.sun.jna.Native;
import com.sun.jna.Pointer;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

// based on jnr, which is Apache License.
class ObjectReferenceManager<T> {
    private final ConcurrentMap<Long, T> references = new ConcurrentHashMap<>();

    public Pointer add(T obj) {
        long objId = id(obj);

        // avoid collision
        while (references.containsKey(objId)) {
            objId += 1;
        }

        references.put(objId, obj);

        return Pointer.createConstant(objId);
    }

    public boolean remove(Pointer reference) {
        return references.remove(Pointer.nativeValue(reference)) != null;
    }

    public T get(Pointer reference) {
        return references.get(Pointer.nativeValue(reference));
    }

    private long id(Object obj) {
        long addressMask = (2L ^ (Native.POINTER_SIZE * 8L) - 1);
        return ((0xdeadbeefL << 32) | (System.identityHashCode(obj) & 0xffffffffL)) & addressMask;
    }
}
