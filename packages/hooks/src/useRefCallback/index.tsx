import { useMemo, useRef } from "react"
import { Noop } from "../types";

const useRefCallback = <T extends Noop>(fn: T, deps?: any[]): T => {
    const ref = useRef<T>();

    ref.current = useMemo(fn, deps);

    return useMemo((...args: Parameters<T>): T => {
        return ref.current?.(...args);
    }, []);
}

export default useRefCallback;