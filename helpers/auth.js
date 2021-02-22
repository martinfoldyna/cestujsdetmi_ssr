import axios from "axios";
import { parseCookies } from "nookies";
import jwt_decode from "jwt-decode";
import Cookie from "js-cookie";
import { fetchQuery } from "./fetch";
export const loginUser = async (credentials) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/local`,
      credentials
    );

    // sessionStorage.setItem("auth-token", res.data.jwt);

    return res.data;
  } catch (error) {
    return { notFound: true, error };
  }
};

export const vaidateJwt = (jwt) => {
  if (jwt && typeof jwt === "string" && jwt !== "undefined") {
    const decoded = jwt_decode(jwt);
    const currentDate = new Date();
    console.log("expiration", new Date(decoded.exp * 1000));
    console.log("currentDate", currentDate.getTime());

    return decoded.exp * 1000 > currentDate.getTime();
  } else {
    return false;
  }
};

export const handleJwt = async (ctx) => {
  const { res } = ctx;
  const jwt = parseCookies(ctx).jwt;

  console.log(jwt);
  let user = null;
  const isJwtValid = await vaidateJwt(jwt);

  if (!jwt || !isJwtValid) {
    if (jwt) {
      Cookie.remove("jwt");
    }
    res.setHeader("location", "/auth/login");
    res.statusCode = 302;
    res.end();
    return {};
  } else {
    user = await fetchQuery(`users/me`, "", {
      headers: { Authorization: `Bearer ${jwt}` },
    });
  }

  return { ...user, jwt };
};
