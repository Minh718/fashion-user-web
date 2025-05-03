// OrderHistory.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import OrderHistory from "../pages/order/OrderHistory";
import { MemoryRouter } from "react-router-dom";
import * as orderService from "../services/orderService";
import * as toast from "../components/toastNotify";
import { statusOrder } from "../enum/StatusOrder";
import { shippingStatus } from "../enum/shippingStatus";
import { PaymentStatus } from "../enum/paymentStatus";

// Mock the loading component to render visible text
jest.mock("../components/LoadingBigger", () => () => <div>Loading…</div>);
// Mock toast notifications
jest.mock("../components/toastNotify", () => ({
  notifySuccess: jest.fn(),
  notifyError: jest.fn(),
}));
// Mock the orderService methods
jest.mock("../services/orderService", () => ({
  fetchOrders: jest.fn(),
  userCancelOrder: jest.fn(),
}));

const mockOrder = {
  id: "123",
  createdAt: "2025-04-24",
  fullName: "John Doe",
  shippingAddress: "123 Fashion Street",
  phone: "1234567890",
  trackingNumber: "TRACK123",
  totalAmount: 100.5,
  urlPayment: "http://example.com/pay",
  payment: {
    paymentMethod: "Credit Card",
    paymentStatus: PaymentStatus.unpaid,
  },
  orderStatus: statusOrder.pending,
  shippingStatus: shippingStatus.NOT_SHIPPED,
};
const mockOrders = [mockOrder];
const mockMetadata = { totalPages: 1, totalItems: 1 };

describe("OrderHistory Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading initially and then order data", async () => {
    (orderService.fetchOrders as jest.Mock).mockResolvedValue({
      result: mockOrders,
      metadata: mockMetadata,
    });

    render(
      <MemoryRouter>
        <OrderHistory />
      </MemoryRouter>
    );

    expect(screen.getByText(/loading…?/i)).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText(/Order #123/i)).toBeInTheDocument()
    );
  });

  it("filters orders by status", async () => {
    (orderService.fetchOrders as jest.Mock).mockResolvedValue({
      result: mockOrders,
      metadata: mockMetadata,
    });

    render(
      <MemoryRouter>
        <OrderHistory />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/Order #123/i)).toBeInTheDocument()
    );

    const select = screen.getByLabelText(/filter by status/i);
    fireEvent.change(select, { target: { value: statusOrder.pending } });

    await waitFor(() =>
      expect(orderService.fetchOrders).toHaveBeenLastCalledWith(
        { page: 0, size: 7 },
        statusOrder.pending
      )
    );
  });

  it("toggles order expansion to show details and actions", async () => {
    (orderService.fetchOrders as jest.Mock).mockResolvedValue({
      result: mockOrders,
      metadata: mockMetadata,
    });

    render(
      <MemoryRouter>
        <OrderHistory />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/Order #123/i)).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText(/Order #123/i));

    expect(screen.getByText(/Tracking: TRACK123/i)).toBeInTheDocument();
    expect(screen.getByText(/Method: Credit Card/i)).toBeInTheDocument();
    expect(await screen.findByText(/Cancel Order/i)).toBeInTheDocument();
  });

  it("shows empty state when no orders", async () => {
    (orderService.fetchOrders as jest.Mock).mockResolvedValue({
      result: [],
      metadata: mockMetadata,
    });

    render(
      <MemoryRouter>
        <OrderHistory />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/Order history is Empty!/i)).toBeInTheDocument()
    );
  });
});
