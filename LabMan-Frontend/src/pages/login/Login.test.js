import { render, fireEvent, waitFor, act } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import Login from ".";

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: jest.fn(),
}));

describe("Login behavior", () => {
	describe("when credentials are valid", () => {
		// New test: redirect when both are not empty
		test("redirects to admin/request on successful login", async () => {
			const navigate = jest.fn();
			useNavigate.mockReturnValue(navigate);
			const { getByPlaceholderText, getByText } = render(<Login />);

			const usernameInput = getByPlaceholderText("Username");
			const passwordInput = getByPlaceholderText("Password");
			const loginButton = getByText("Log in");

			await act(async () => {
				fireEvent.change(usernameInput, { target: { value: "testuser" } });
				fireEvent.change(passwordInput, { target: { value: "testpass" } });
				fireEvent.click(loginButton);
			});

			await waitFor(() => {
				expect(navigate).toHaveBeenCalledWith("/admin/request");
			});
		});
	});

	describe("when credentials are missing", () => {
		// New test: does not redirect when username is empty
		test("does not redirect when username is empty", async () => {
			const navigate = jest.fn();
			useNavigate.mockReturnValue(navigate);
			const { getByPlaceholderText, getByText } = render(<Login />);

			const passwordInput = getByPlaceholderText("Password");
			const loginButton = getByText("Log in");

			await act(async () => {
				// Leave username empty
				fireEvent.change(passwordInput, { target: { value: "testpass" } });
				fireEvent.click(loginButton);
			});

			expect(navigate).not.toHaveBeenCalled();
		});

		// New test: does not redirect when password is empty
		test("does not redirect when password is empty", async () => {
			const navigate = jest.fn();
			useNavigate.mockReturnValue(navigate);
			const { getByPlaceholderText, getByText } = render(<Login />);

			const usernameInput = getByPlaceholderText("Username");
			const loginButton = getByText("Log in");

			await act(async () => {
				fireEvent.change(usernameInput, { target: { value: "testuser" } });
				// Leave password empty
				fireEvent.click(loginButton);
			});

			expect(navigate).not.toHaveBeenCalled();
		});

		// New test: does not redirect when both are empty
		test("does not redirect when both are empty", async () => {
			const navigate = jest.fn();
			useNavigate.mockReturnValue(navigate);
			const { getByText } = render(<Login />);

			const loginButton = getByText("Log in");

			await act(async () => {
				// Leave username empty
				// Leave password empty
				fireEvent.click(loginButton);
			});

			expect(navigate).not.toHaveBeenCalled();
		});
	});
});
