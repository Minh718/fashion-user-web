import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export const isTokenExpired = (token) => {
  if (!token) {
    return true;
  }

  try {
    const { exp } = jwtDecode(token);
    if (!exp) {
      return true;
    }

    const currentTime = Date.now() / 1000; // Convert to seconds
    return exp < currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};

export const getClaimFromToken = (token: string | null, claim: string): any => {
  if (!token) {
    return null;
  }

  try {
    const decodedToken = jwtDecode<{ [key: string]: any }>(token);
    return decodedToken[claim]; // Now TypeScript understands it's an indexed object
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const checkIsAdmin = () => {
  const accessToken = Cookies.get("accessToken");
  const scope = getClaimFromToken(accessToken, "scope");
  console.log(scope);
  return scope?.includes("ADMIN");
};
