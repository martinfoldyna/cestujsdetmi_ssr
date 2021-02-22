import React from "react";
import { parseCookies } from "nookies";
import { fetchQuery } from "../../helpers/fetch";
import jwt_decode from "jwt-decode";
import Cookie from "js-cookie";

export async function getServerSideProps(ctx) {
  const { res } = ctx;
  const jwt = parseCookies(ctx).jwt;

  console.log(jwt);
  const decoded = jwt_decode(jwt);
  const currentDate = new Date();

  if (!jwt || decoded.exp * 1000 < currentDate.getTime()) {
    if (decoded) {
      Cookie.remove("jwt");
    }
    res.setHeader("location", "/auth/login");
    res.statusCode = 302;
    res.end();
    return {};
  } else {
    const user = await fetchQuery(`users/me`, "", {
      headers: { Authorization: `Bearer ${jwt}` },
    });
  }
}

const AuthUserPersist = ({ user, children }) => {
  return React.cloneElement(children, { user });
};

export default AuthUserPersist;
