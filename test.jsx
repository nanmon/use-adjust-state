import { useState } from "react";
import { render, screen } from "@testing-library/react";
import useAdjustState from "./main.js";

describe("useAdjustState", () => {
	function Test({ someProp = "init" }) {
		const [someState, setSomeState] = useState(someProp);
		const [adjustedTimes, setAdjustedTimes] = useState(0);
		useAdjustState(() => {
			setSomeState(someProp);
			setAdjustedTimes((times) => times + 1);
		}, [someProp]);

		return `${someState} ${adjustedTimes}`;
	}

	it("should adjust state when prop changes", () => {
		const { rerender } = render(<Test />);

		let firstText = screen.getByText("init 0");
		expect(firstText).not.toBeNull();

		rerender(<Test someProp="rerender" />);

		firstText = screen.queryByText("init 0");
		const secondText = screen.getByText("rerender 1");
		expect(firstText).toBeNull();
		expect(secondText).not.toBeNull();
	});

	it("should not adjust state when prop does not change", () => {
		const { rerender } = render(<Test />);

		let firstText = screen.getByText("init 0");
		expect(firstText).not.toBeNull();

		rerender(<Test />);

		firstText = screen.queryByText("init 0");
		expect(firstText).not.toBeNull();
	});
});
