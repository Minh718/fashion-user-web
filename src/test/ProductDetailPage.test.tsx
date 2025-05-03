import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductDetailPage from "../pages/detailProduct";
import { MemoryRouter } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as api from "../services/productService";
import * as api2 from "../services/cartService";
import { setStatusCart } from "../store/user/userSlice";
import "@testing-library/jest-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock("../services/productService");
jest.mock("../services/cartService");

const mockNavigate = jest.fn();
const mockDispatch = jest.fn();

const mockProduct = {
  id: "123",
  name: "Test Product",
  price: 100,
  percent: 20,
  rating: 4.5,
  reviews: 10,
  image: "image.jpg",
  detailProduct: {
    images: ["image1.jpg", "image2.jpg"],
    description: "A great product",
    material: "Cotton",
    origin: "USA",
    warranty: "1 year",
    madeIn: "USA",
    model: "TP-123",
  },
  productSizes: [
    {
      id: "size1",
      size: { name: "M" },
      quantity: 5,
      productSizeColors: [
        {
          id: "color1",
          color: { name: "Red", code: "#FF0000" },
          quantity: 3,
        },
      ],
    },
  ],
};

describe("ProductDetails Component", () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ id: "123" });
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as unknown as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({ user: { isAuthenticated: true } })
    );
  });
  test("redirects to signin when not authenticated", async () => {
    (useSelector as unknown as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({ user: { isAuthenticated: null } })
    );

    (api.getProductDetail as jest.Mock).mockResolvedValue(mockProduct);
    (api.getRelatedProducts as jest.Mock).mockResolvedValue([]);

    render(
      <MemoryRouter>
        <ProductDetailPage />
      </MemoryRouter>
    );

    expect(await screen.findByText(/Test Product/i)).toBeInTheDocument();

    const addToCartButton = screen.getByText(/Add to Cart/i);
    fireEvent.click(addToCartButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/signin");
    });
  });

  test("adds product to cart when authenticated", async () => {
    (api.getProductDetail as jest.Mock).mockResolvedValue(mockProduct);
    (api.getRelatedProducts as jest.Mock).mockResolvedValue([]);
    (api2.addProductToCart as jest.Mock).mockResolvedValue({});

    render(
      <MemoryRouter>
        <ProductDetailPage />
      </MemoryRouter>
    );

    expect(await screen.findByText(/Test Product/i)).toBeInTheDocument();

    const addToCartButton = screen.getByText(/Add to Cart/i);
    fireEvent.click(addToCartButton);

    await waitFor(() => {
      expect(api2.addProductToCart).toHaveBeenCalledWith({
        productSizeColorId: "color1",
        quantity: 1,
      });
      expect(mockDispatch).toHaveBeenCalledWith(setStatusCart(true));
    });
  });

  test("displays product details after fetch", async () => {
    (api.getProductDetail as jest.Mock).mockResolvedValue(mockProduct);
    (api.getRelatedProducts as jest.Mock).mockResolvedValue([]);

    render(
      <MemoryRouter>
        <ProductDetailPage />
      </MemoryRouter>
    );

    // Ensure the product name and details are displayed
    expect(await screen.findByText(/Test Product/i)).toBeInTheDocument();
    expect(screen.getByText(/\$80.00/)).toBeInTheDocument(); // Discounted price
    expect(screen.getByText(/A great product/i)).toBeInTheDocument();
    expect(screen.getByText(/Cotton/i)).toBeInTheDocument();

    // Use querySelector to handle broken up text for "Origin: USA"
    await waitFor(() => {
      const originText = document.querySelector("div, span, p"); // Adjust selector as needed
      expect(originText).toHaveTextContent(/Origin: USA/i);
    });
  });
});
