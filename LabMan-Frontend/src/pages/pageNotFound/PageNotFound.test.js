import { render, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router";
import PageNotFound from "./index";

jest.mock("react-router", () => ({
	...jest.requireActual("react-router"), // use actual for all non-hook parts
	useNavigate: jest.fn(),
}));

describe("PageNotFound", () => {
	test("should navigate to login page when 'Back Home' button is clicked", () => {
		const navigate = jest.fn();

		useNavigate.mockReturnValue(navigate);

		const { getByText } = render(<PageNotFound />);

		fireEvent.click(getByText("Back Home"));

		expect(navigate).toHaveBeenCalledWith("/login");
	});
});
