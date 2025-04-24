import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { RootState } from "../../store";
import React from "react";
import { initializeUser, setUserInfo } from "../../store/user/userSlice";
import { userLoginByGoogle } from "../../services/authenthicateService";
import Loading from "../../components/Loading";
export default function Authenticate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const [queryParameters] = useSearchParams();
  useEffect(() => {
    // const authCodeRegex = /code=([^&]+)/;
    // const isMatch = window.location.href.match(authCodeRegex);

    if (queryParameters.get("code")) {
      const authCode = queryParameters.get("code");
      (async () => {
        try {
          const result = await userLoginByGoogle(authCode);
          dispatch(setUserInfo(result));
          Cookies.set("accessToken", result.accessToken);
          Cookies.set("refreshToken", result.refreshToken);
          Cookies.set("x-user-id", result.id);
        } catch (err) {
          navigate("/signin");
        }
      })();
    } else if (
      queryParameters.get("accessToken") &&
      queryParameters.get("refreshToken")
    ) {
      Cookies.set("accessToken", queryParameters.get("accessToken"));
      Cookies.set("refreshToken", queryParameters.get("refreshToken"));
      // window.location.href = "/"; // Redirect to signin page
    }
  }, []);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  return (
    <div className="flex items-center justify-center h-[100vh]">
      <Loading />
    </div>
  );
}
