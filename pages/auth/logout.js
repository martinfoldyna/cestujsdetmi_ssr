import React from "react";
import nookies from "nookies";

const Logout = () => {
  return <div>Logging user out...</div>;
};

Logout.getInitialProps = async (ctx) => {
  const cookies = nookies.get(ctx);

  console.log(cookies);

  nookies.destroy(ctx, "jwt");
  return { server: true };
};

export default Logout;
