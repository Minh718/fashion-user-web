import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignupPage from "../pages/register/index";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import * as api from "../services/authenthicateService";
import * as utils from "../components/toastNotify";
import React from "react";

// Mock the API and utility modules
jest.mock("../services/authenthicateService", () => ({
  getOtpForPhoneNumber: jest.fn(),
  userSignupByEmail: jest.fn(),
}));
jest.mock("../components/toastNotify", () => ({
  notifySuccess: jest.fn(),
  notifyError: jest.fn(),
}));

const renderWithRouter = (initialEntries = ["/signup"]) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </MemoryRouter>
  );
};

describe("SignupPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders email signup by default", () => {
    renderWithRouter();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
  });

  it("toggles to phone signup", () => {
    renderWithRouter();
    fireEvent.click(screen.getByLabelText(/switch to phone signup/i));
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
  });

  it("validates empty email form submission", async () => {
    renderWithRouter();
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/password is required/i)
    ).toBeInTheDocument();
  });

  it("handles password mismatch", async () => {
    renderWithRouter();
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: "password321" },
    });

    // Use getByRole to find the Sign Up button specifically
    const signUpButton = screen.getByRole("button", { name: /sign up/i });
    fireEvent.click(signUpButton);

    expect(
      await screen.findByText(/passwords do not match/i)
    ).toBeInTheDocument();
  });

  it("calls getOtpForPhoneNumber on valid phone", async () => {
    // Cast the function to jest.Mock before using mockResolvedValue
    (api.getOtpForPhoneNumber as jest.Mock).mockResolvedValue({});
    renderWithRouter();
    fireEvent.click(screen.getByLabelText(/switch to phone signup/i));
    fireEvent.change(screen.getByPlaceholderText(/enter your phone number/i), {
      target: { value: "0987654321" },
    });
    fireEvent.click(screen.getByText(/get code/i));
    await waitFor(() => {
      expect(api.getOtpForPhoneNumber as jest.Mock).toHaveBeenCalledWith(
        "0987654321"
      );
    });
    expect(utils.notifySuccess as jest.Mock).toHaveBeenCalledWith(
      "Otp is sending to your phone!"
    );
  });

  it("shows error if getOtp fails", async () => {
    (api.getOtpForPhoneNumber as jest.Mock).mockRejectedValue({
      response: { data: { message: "Phone error" } },
    });
    renderWithRouter();
    fireEvent.click(screen.getByLabelText(/switch to phone signup/i));
    fireEvent.change(screen.getByPlaceholderText(/enter your phone number/i), {
      target: { value: "0987654321" },
    });
    fireEvent.click(screen.getByRole("button", { name: /get code/i }));

    // now the component will render the error
    expect(await screen.findByText(/phone error/i)).toBeInTheDocument();
  });
  it("submits email signup form successfully", async () => {
    // Mock the API response
    (api.userSignupByEmail as jest.Mock).mockResolvedValue({});

    // Render the component
    renderWithRouter();

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: "password123" },
    });

    // Click the submit button (use getByRole for specificity)
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    // Wait for the mock function to be called
    await waitFor(() => {
      expect(api.userSignupByEmail).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });
  });
});
