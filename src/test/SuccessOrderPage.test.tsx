import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import SuccessOrderPage from "../pages/orderSuccess";
import { formatDateWithOffset } from "../utils/formatDateWithOffset";

jest.mock("../utils/formatDateWithOffset", () => ({
  formatDateWithOffset: (d: string) => "2025-04-24",
}));

const mockOrder = {
  id: "12345",
  createdAt: "2025-04-17T00:00:00Z",
  orderProducts: [
    { name: "T-shirt", size: "M", color: "Red", quantity: 2, price: 20 },
  ],
  discount: 10,
  totalAmount: 30,
  payment: { paymentMethod: "Credit Card" },
  fullName: "John Doe",
  shippingAddress: "123 Main St",
  phone: "123-456-7890",
};

describe("SuccessOrderPage", () => {
  it("redirects (renders nothing) when no order in state", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/order-success"]}>
        <Routes>
          <Route path="/order-success" element={<SuccessOrderPage />} />
        </Routes>
      </MemoryRouter>
    );
    // component returns null, so container is empty
    expect(container).toBeEmptyDOMElement();
  });

  it("navigates to products when clicking Continue Shopping", async () => {
    render(
      <MemoryRouter
        initialEntries={[{ pathname: "/success", state: { order: mockOrder } }]}
      >
        <Routes>
          <Route path="/success" element={<SuccessOrderPage />} />
          <Route path="/products/news" element={<div>Products News</div>} />
        </Routes>
      </MemoryRouter>
    );

    // wait for page to render
    await waitFor(() =>
      expect(
        screen.getByRole("heading", { name: /Order Placed Successfully!/i })
      ).toBeInTheDocument()
    );

    fireEvent.click(screen.getByRole("button", { name: /continue shopping/i }));
    // now the mock Products News route should be rendered
    expect(screen.getByText("Products News")).toBeInTheDocument();
  });
});
