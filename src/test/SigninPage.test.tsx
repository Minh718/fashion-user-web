// src/test/Login.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../pages/login/index";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../services/authenthicateService";
import Cookies from "js-cookie";
import { notifyError } from "../components/toastNotify";
import { oAuthGoogle } from "../constants/oAuthGoogle";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  Link: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock("../services/authenthicateService", () => ({
  userLogin: jest.fn(),
}));
jest.mock("js-cookie", () => ({ set: jest.fn() }));
jest.mock("../components/toastNotify", () => ({ notifyError: jest.fn() }));
jest.mock("../constants/oAuthGoogle", () => ({
  oAuthGoogle: {
    redirectUri: "http://redirect",
    authUri: "http://auth",
    clientId: "client123",
  },
}));

describe("Login Component", () => {
  let dispatchMock: jest.Mock;
  let navigateMock: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    dispatchMock = jest.fn();
    navigateMock = jest.fn();

    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock);
    (useNavigate as unknown as jest.Mock).mockReturnValue(navigateMock);

    (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ user: { isAuthenticated: false } })
    );
  });

  it("redirects to home if already authenticated", () => {
    (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ user: { isAuthenticated: true } })
    );
    render(<Login />);
    expect(navigateMock).toHaveBeenCalledWith("/");
  });

  it("shows error for invalid username format", async () => {
    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText(/Username/i), {
      target: { value: "invalid" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: /sign in to fashion shop/i })
    );
    await waitFor(() => {
      expect(notifyError).toHaveBeenCalledWith("Phone or email is incorrect!!");
    });
  });

  it("shows error for short password", async () => {
    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText(/Username/i), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "short" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: /sign in to fashion shop/i })
    );
    await waitFor(() => {
      expect(notifyError).toHaveBeenCalledWith(
        "Password must be greater than or equal to 8!!"
      );
    });
  });

  it("handles login success", async () => {
    const mockResult = {
      accessToken: "token123",
      refreshToken: "refresh123",
      id: "user1",
    };
    (userLogin as unknown as jest.Mock).mockResolvedValue(mockResult);

    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText(/Username/i), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: /sign in to fashion shop/i })
    );

    await waitFor(() => {
      expect(userLogin).toHaveBeenCalledWith({
        username: "user@example.com",
        password: "password123",
      });
      expect(dispatchMock).toHaveBeenCalled();
      expect(Cookies.set).toHaveBeenCalledWith("accessToken", "token123");
      expect(Cookies.set).toHaveBeenCalledWith("refreshToken", "refresh123");
      expect(Cookies.set).toHaveBeenCalledWith("x-user-id", "user1");
    });
  });

  it("handles login failure", async () => {
    (userLogin as unknown as jest.Mock).mockRejectedValue(new Error("fail"));

    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText(/Username/i), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: /sign in to fashion shop/i })
    );

    await waitFor(() => {
      expect(notifyError).toHaveBeenCalledWith(
        "Password or username is incorrect"
      );
    });
  });

  it("handles Google login click", () => {
    Object.defineProperty(window, "location", {
      writable: true,
      value: { href: "" },
    });

    render(<Login />);
    fireEvent.click(
      screen.getByRole("button", { name: /sign in with google/i })
    );

    const expectedUrl = `${
      oAuthGoogle.authUri
    }?redirect_uri=${encodeURIComponent(
      oAuthGoogle.redirectUri
    )}&response_type=code&client_id=${
      oAuthGoogle.clientId
    }&scope=openid%20email%20profile`;

    expect(window.location.href).toBe(expectedUrl);
  });
});
