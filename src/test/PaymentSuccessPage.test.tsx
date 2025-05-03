// Import the necessary modules
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import PaymentSuccessPage from "../pages/paymentSuccess"; // adjust path if needed
import * as api from "../services/orderService"; // adjust based on where the API is located
import "@testing-library/jest-dom";
jest.mock("../components/Loading", () => () => <div>Loading…</div>);
// Manually mock the API function in the test
jest.mock("../services/orderService", () => ({
  getPaymentDetail: jest.fn(),
}));

describe("PaymentSuccessPage", () => {
  it("shows loading initially and then payment details on successful fetch", async () => {
    const paymentData = {
      amount: 100,
      paymentMethod: "Credit Card",
      transactionID: "123",
      orderId: "order123",
    };
    (api.getPaymentDetail as jest.Mock).mockResolvedValue(paymentData);

    render(
      <Router>
        <PaymentSuccessPage />
      </Router>
    );

    expect(screen.getByText(/loading…?/i)).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText("$100")).toBeInTheDocument());
  });

  it('navigates to the correct order page when "View Order" button is clicked', async () => {
    const paymentData = {
      amount: 100,
      paymentMethod: "Credit Card",
      transactionID: "1234567890",
      orderId: "order123",
    };

    // Type `getPaymentDetail` as a jest mock function
    (api.getPaymentDetail as jest.Mock).mockResolvedValue(paymentData);

    render(
      <Router>
        <PaymentSuccessPage />
      </Router>
    );

    // Wait for payment details to be displayed
    await waitFor(() => expect(screen.getByText("$100")).toBeInTheDocument());

    // Simulate click on "View Order" button
    fireEvent.click(screen.getByText("View Order"));

    // Ensure the navigate function is called with the correct order path
    expect(window.location.pathname).toBe("/order/order123");
  });

  it('navigates to the products page when "Continue Shopping" button is clicked', async () => {
    const paymentData = {
      amount: 100,
      paymentMethod: "Credit Card",
      transactionID: "1234567890",
      orderId: "order123",
    };

    // Type `getPaymentDetail` as a jest mock function
    (api.getPaymentDetail as jest.Mock).mockResolvedValue(paymentData);

    render(
      <Router>
        <PaymentSuccessPage />
      </Router>
    );

    // Wait for payment details to be displayed
    await waitFor(() => expect(screen.getByText("$100")).toBeInTheDocument());

    // Simulate click on "Continue Shopping" button
    fireEvent.click(screen.getByText("Continue Shopping"));

    // Ensure the correct URL is navigated to
    expect(window.location.pathname).toBe("/products/news");
  });

  it('shows the "Back to top" button when scrolled down', async () => {
    const paymentData = {
      amount: 100,
      paymentMethod: "Credit Card",
      transactionID: "123",
      orderId: "order123",
    };
    (api.getPaymentDetail as jest.Mock).mockResolvedValue(paymentData);

    // Spy on scrollTo
    const scrollToMock = jest.fn();
    window.scrollTo = scrollToMock;

    render(
      <Router>
        <PaymentSuccessPage />
      </Router>
    );

    await waitFor(() => expect(screen.getByText("$100")).toBeInTheDocument());

    // Simulate scroll by manually setting scrollY and dispatching event
    window.scrollY = 350;
    fireEvent.scroll(window);

    const backToTop = screen.getByRole("button", { name: /back to top/i });
    expect(backToTop).toBeInTheDocument();

    fireEvent.click(backToTop);

    // Verify scrollTo was called
    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });
});
