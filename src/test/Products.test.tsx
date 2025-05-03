// src/test/Products.test.tsx
import React from "react";
jest.mock("../components/Loading", () => () => <div>Loading…</div>);
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useParams } from "react-router-dom";
import Products from "../pages/productsSubcategory/index";
import * as api from "../services/productService";
import * as notify from "../components/toastNotify";

// mock the services and notify
jest.mock("../services/productService");
jest.mock("../components/toastNotify");

const mockedGetPublicProducts = api.getPublicProducts as jest.Mock;
const mockedGetBySub = api.getPublicProductsBySubCategory as jest.Mock;

const renderWithRoute = (thump = "news") => {
  // wrap to provide useParams
  return render(
    <MemoryRouter initialEntries={[`/products/${thump}`]}>
      <Routes>
        <Route path="/products/:thump" element={<Products />} />
      </Routes>
    </MemoryRouter>
  );
};

describe("Products component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading then products grid on successful fetch for "news"', async () => {
    const fakeRes = {
      result: [
        { id: 1, name: "A", price: 100, size: "M", color: "Red" },
        { id: 2, name: "B", price: 200, size: "L", color: "Blue" },
      ],
      metadata: { totalPages: 1 },
    };
    mockedGetPublicProducts.mockResolvedValue(fakeRes);

    renderWithRoute("news");

    // now Loading… is in the DOM
    expect(screen.getByText(/loading…?/i)).toBeInTheDocument();

    // then when fetch resolves you see products
    await waitFor(() => {
      expect(screen.getByText("A")).toBeInTheDocument();
      expect(screen.getByText("B")).toBeInTheDocument();
    });
  });
  it('shows "No results found" when API returns empty list', async () => {
    mockedGetPublicProducts.mockResolvedValue({
      result: [],
      metadata: { totalPages: 0 },
    });
    renderWithRoute("news");

    // wait for empty state
    await waitFor(() => {
      expect(screen.getByText(/no results found/i)).toBeInTheDocument();
    });
  });

  it('fetches by sub-category when thump ≠ "news"', async () => {
    const fakeRes = {
      result: [{ id: 3, name: "C", price: 50, size: "S", color: "Green" }],
      metadata: { totalPages: 1 },
    };
    mockedGetBySub.mockResolvedValue(fakeRes);

    renderWithRoute("shoes");

    await waitFor(() => {
      expect(screen.getByText("C")).toBeInTheDocument();
    });
    expect(mockedGetBySub).toHaveBeenCalledWith({
      thump: "shoes",
      sortBy: "createdDate",
      order: "desc",
      page: 0,
      minPrice: null,
      maxPrice: null,
      size: 20,
    });
  });

  it("applies price filter and re-fetches", async () => {
    mockedGetPublicProducts.mockResolvedValue({
      result: [],
      metadata: { totalPages: 0 },
    });
    renderWithRoute("news");

    // get all three selects; the price‐range filter is selects[0]
    const selects = screen.getAllByRole("combobox");
    const priceSelect = selects[0];

    // change its value to "200-400"
    fireEvent.change(priceSelect, { target: { value: "200-400" } });

    await waitFor(() => {
      expect(mockedGetPublicProducts).toHaveBeenLastCalledWith(
        expect.objectContaining({ minPrice: 200, maxPrice: 400, page: 0 })
      );
    });
  });

  it("changes sort order and re-fetches", async () => {
    mockedGetPublicProducts.mockResolvedValue({
      result: [],
      metadata: { totalPages: 0 },
    });
    renderWithRoute("news");

    // all three selects are comboboxes; the sort-by is the last one
    const selects = screen.getAllByRole("combobox");
    const sortSelect = selects[2];

    // change its value to "price-asc"
    fireEvent.change(sortSelect, { target: { value: "price-asc" } });

    await waitFor(() => {
      expect(mockedGetPublicProducts).toHaveBeenLastCalledWith(
        expect.objectContaining({ sortBy: "price", order: "asc", page: 0 })
      );
    });
  });
});
