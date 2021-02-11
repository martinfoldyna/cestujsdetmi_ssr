import React, { Fragment, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import { createUser } from "../../../helpers/user";
import Router from "next/router";
import LoadingSkeleton from "../../../layouts/LoadingSkeleton";
import { Container } from "react-grid-system";

const GoogleCallback = () => {
  const [session, loading] = useSession();

  const createNewUser = async () => {
    const response = await createUser(session?.user);
    if (response) {
      Router.push("/user");
    }
  };

  useEffect(() => {
    if (session) {
      createNewUser();
    }
  }, [session]);

  return (
    <Container className="main-container" style={{ height: "80vh" }}>
      {!session ? (
        <Fragment>
          <h1>Not signed in</h1>
          <button onClick={() => signIn("google")}>Sign in with google</button>
        </Fragment>
      ) : (
        <Fragment>
          <h1>Přihlašuji uživatele...</h1>
          <LoadingSkeleton />
        </Fragment>
      )}
    </Container>
  );
};

export default GoogleCallback;
