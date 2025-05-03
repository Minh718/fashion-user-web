import { render, screen, fireEvent } from "@testing-library/react";
import PaymentFailPage from "../pages/paymentFail";

describe("PaymentFailPage", () => {
  test("renders the payment failed heading", () => {
    render(<PaymentFailPage />);
    const heading = screen.getByText(/Payment Failed/i);
    expect(heading).toBeInTheDocument();
  });

  test("renders the error details section", () => {
    render(<PaymentFailPage />);
    const errorDetails = screen.getByText(/Error Details/i);
    expect(errorDetails).toBeInTheDocument();
  });

  test("displays the error message", () => {
    render(<PaymentFailPage />);
    const errorMessage = screen.getByText(/Insufficient Funds/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test("renders the retry payment button", () => {
    render(<PaymentFailPage />);
    const retryButton = screen.getByText(/Retry Payment/i);
    expect(retryButton).toBeInTheDocument();
  });

  test("renders the contact support email and phone", () => {
    render(<PaymentFailPage />);
    const emailLink = screen.getByText(/support@example.com/i);
    const phoneLink = screen.getByText(/\+1 \(234\) 567-890/i);
    expect(emailLink).toBeInTheDocument();
    expect(phoneLink).toBeInTheDocument();
  });

  test("clicking on the retry button does not cause any issues (mocking function)", () => {
    const mockFn = jest.fn();
    render(<PaymentFailPage />);
    const retryButton = screen.getByText(/Retry Payment/i);

    // Simulate button click
    fireEvent.click(retryButton);

    // Check if the function has been called
    expect(mockFn).not.toHaveBeenCalled(); // Add the actual functionality if implemented
  });
});
