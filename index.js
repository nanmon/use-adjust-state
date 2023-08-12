import { useRef } from "react";

/**
 * Replace a useEffect with this hook if you want to adjust some state when a prop changes
 * @param {() => void} fn
 * @param {Array} deps
 * @example
 * function List({ items }) {
 * 	const [isReverse, setIsReverse] = useState(false);
 * 	const [selection, setSelection] = useState(null);
 *
 * 	// Adjust the state while rendering
 * 	useAdjustStateWhenPropChanges(() => {
 * 		setSelection(null);
 * 	}, [items]);
 * 	// ...
 * }
 */
export default function useAdjustStateWhenPropChanges(fn, deps) {
	const prevDeps = useRef(deps);
	const depsChanged = prevDeps.current.some(
		(pdep, index) => pdep !== deps[index]
	);
	if (depsChanged) fn();
	prevDeps.current = deps;
}
