// HomePage.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "../pages/homePage/index";
import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";

// Mock components
jest.mock("../pages/homePage/components/FashionSlideshow.tsx", () => () => (
  <div data-testid="fashion-slideshow" />
));
jest.mock(
  "../pages/homePage/components/ProductsSlide.tsx",
  () =>
    ({ products }) =>
      <div data-testid="products-slide">{products.length} products</div>
);
jest.mock("../pages/homePage/components/VouchersSlide.tsx", () => () => (
  <div data-testid="vouchers-slide" />
));
jest.mock("../components/LoadingBigger.tsx", () => () => (
  <div data-testid="loading-bigger" />
));

// Mock hooks
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));
jest.mock("react-router-dom", () => ({
  useLoaderData: jest.fn(),
}));

describe("HomePage", () => {
  const mockUseSelector = useSelector as unknown as jest.Mock;
  const mockUseLoaderData = useLoaderData as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("always renders FashionSlideshow", () => {
    mockUseSelector.mockReturnValue({ isAuthenticated: false });
    mockUseLoaderData.mockReturnValue([]);
    render(<HomePage />);
    expect(screen.getByTestId("fashion-slideshow")).toBeInTheDocument();
  });

  it("renders VouchersSlide when authenticated", () => {
    mockUseSelector.mockReturnValue({ isAuthenticated: true });
    mockUseLoaderData.mockReturnValue([]);
    render(<HomePage />);
    expect(screen.getByTestId("vouchers-slide")).toBeInTheDocument();
  });

  it("does not render VouchersSlide when not authenticated", () => {
    mockUseSelector.mockReturnValue({ isAuthenticated: false });
    mockUseLoaderData.mockReturnValue([]);
    render(<HomePage />);
    expect(screen.queryByTestId("vouchers-slide")).not.toBeInTheDocument();
  });

  it("renders ProductsSlide for each item in listProductsForHomePage", () => {
    mockUseSelector.mockReturnValue({ isAuthenticated: false });
    mockUseLoaderData.mockReturnValue([
      { name: "Tops", products: ["p1", "p2"] },
      { name: "Bottoms", products: ["p3"] },
    ]);
    render(<HomePage />);
    const slides = screen.getAllByTestId("products-slide");
    expect(slides).toHaveLength(2);
    expect(slides[0]).toHaveTextContent("2 products");
    expect(slides[1]).toHaveTextContent("1 products");
  });

  it("renders LoadingBigger if listProductsForHomePage is null", () => {
    mockUseSelector.mockReturnValue({ isAuthenticated: false });
    mockUseLoaderData.mockReturnValue(null);
    render(<HomePage />);
    expect(screen.getByTestId("loading-bigger")).toBeInTheDocument();
  });
});
