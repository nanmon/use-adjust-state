# useAdjustState

This is a custom hook that addresses the specific case described [here in the official React docs](https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes), but... some people might be a bit uncomfortable updating state on render and are more familiar with the mental model of useEffect.

## Install

```
npm install use-adjust-state
```

## Usage example

```jsx
import useAdjustState from "use-adjust-state";

/**
 * User selects a Something from a list and this input focus in
 * each time the user selects a Something, the input autofills with the current Something's name
 */
function EditNameInput({ currentName }) {
	const [name, setName] = useState(currentName);

	useAdjustState(() => {
		setName(currentName);
	}, [currentName]);

	return <input value={name} onChange={(e) => setName(e.target.value)} />;
}
```

## A little bit of background

Quoting from the React docs

> Sometimes, you might want to reset or adjust a part of the state on a prop change, but not all of it.

> This List component receives a list of items as a prop, and maintains the selected item in the selection state variable. You want to reset the selection to null whenever the items prop receives a different array:

```js
function List({ items }) {
	const [isReverse, setIsReverse] = useState(false);
	const [selection, setSelection] = useState(null);

	// 🔴 Avoid: Adjusting state on prop change in an Effect
	useEffect(() => {
		setSelection(null);
	}, [items]);
	// ...
}
```

> This, too, is not ideal. Every time the items change, the List and its child components will render with a stale selection value at first. Then React will update the DOM and run the Effects. Finally, the setSelection(null) call will cause another re-render of the List and its child components, restarting this whole process again.

> Start by deleting the Effect. Instead, adjust the state directly during rendering:

```js
function List({ items }) {
	const [isReverse, setIsReverse] = useState(false);
	const [selection, setSelection] = useState(null);

	// Better: Adjust the state while rendering
	const [prevItems, setPrevItems] = useState(items);
	if (items !== prevItems) {
		setPrevItems(items);
		setSelection(null);
	}
	// ...
}
```

## What useAdjustState does

The solution that the React docs gives might be good enough for you and then you don't need this custom hook, but if you are not comfortable changing your accused-to-be-used-wrongly-used useEffect for their solution, here's another solution

```js
function List({ items }) {
	const [isReverse, setIsReverse] = useState(false);
	const [selection, setSelection] = useState(null);

	// Better: Adjust the state while rendering
	useAdjustState(() => {
		setSelection(null);
	}, [items]);
	// ...
}
```

Just change your useEffect for useAdjustState and you're all set! If you compare the first code snipet with the useEffect and this one you can see that the hook name is the only difference

## Differences to useEffect

- **Runs on render**: The whole reason why you should use it for the specific case of updating state when prop changes
- **Skips first render**: useState is capable on its own to initialize with the values you want based on props
- **No cleanup function**: ...Why would you need this?
