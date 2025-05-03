import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { paymentMethod } from "../enum/paymentMethod";
import DetailOrderPage from "../pages/detailOrder";
import * as api from "../services/orderService";

jest.mock("../services/orderService", () => ({
  getDetailOrder: jest.fn(),
}));

window.alert = jest.fn();

const mockOrder = {
  id: "123",
  fullName: "John Doe",
  shippingAddress: "123 Main St",
  phone: "555-555-5555",
  orderStatus: "Shipped",
  shippingStatus: "In Transit",
  trackingNumber: "ABC123",
  totalAmount: 100.0,
  orderProducts: [
    {
      id: "1",
      name: "Product 1",
      size: "M",
      color: "Red",
      quantity: 2,
      price: 50.0,
    },
  ],
  createdAt: "2023-04-20",
  voucher: {
    code: "DISCOUNT10",
    type: "percentage",
    discount: 10,
  },
  payment: {
    paymentMethod: paymentMethod.CASH_ON_DELIVERY,
  },
};

const renderPage = () =>
  render(
    <MemoryRouter initialEntries={["/order/123"]}>
      <Routes>
        <Route path="/order/:id" element={<DetailOrderPage />} />
      </Routes>
    </MemoryRouter>
  );

describe("DetailOrderPage", () => {
  beforeEach(() => {
    (api.getDetailOrder as jest.Mock).mockResolvedValue(mockOrder);
  });

  test("displays order details after fetch", async () => {
    renderPage();
    await waitFor(() =>
      expect(screen.getAllByText(/order details/i)[0]).toBeInTheDocument()
    );
  });

  test("displays the correct total price with voucher", async () => {
    renderPage();
    await waitFor(() =>
      expect(
        screen.getByText((content) => content.includes("Total Price:"))
      ).toBeInTheDocument()
    );
    expect(screen.getByText(/\$90.00/i)).toBeInTheDocument();
  });

  test("handles tracking button click", async () => {
    renderPage();

    const trackingText = await screen.findByText(/abc123/i);
    userEvent.click(trackingText);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Tracking order: ABC123");
    });
  });

  test("renders payment method icon correctly", async () => {
    renderPage();
    await waitFor(() => {
      expect(
        screen.getByText((content) =>
          content.toLowerCase().includes("cash_on_delivery")
        )
      ).toBeInTheDocument();
    });
  });

  test("shows shipping info tooltip", async () => {
    renderPage();
    const button = await screen.findByRole("button", {
      name: /shipping info/i,
    });

    userEvent.hover(button);

    await waitFor(() => {
      expect(
        screen.getByText(/Estimated delivery: 3-5 business days/i)
      ).toBeInTheDocument();
    });

    userEvent.unhover(button);

    await waitFor(() => {
      expect(
        screen.queryByText(/Estimated delivery: 3-5 business days/i)
      ).not.toBeInTheDocument();
    });
  });
});
