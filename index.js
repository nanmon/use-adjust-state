import { useRef } from "react";

/**
 *
 * @param {Function} fn
 * @param {Array} deps
 */
export default function useAdjustStateWhenPropChanges(fn, deps) {
	const prevDeps = useRef(deps);
	const depsChanged = prevDeps.current.some(
		(pdep, index) => pdep !== deps[index]
	);
	if (depsChanged) fn();
	prevDeps.current = deps;
}
