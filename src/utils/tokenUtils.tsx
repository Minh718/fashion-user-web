import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

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
