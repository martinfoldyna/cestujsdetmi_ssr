import React, { Fragment, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import { createUser } from "../../../helpers/user";
import Router from "next/router";

const GoogleCallback = () => {
  const [session, loading] = useSession();

  const createNewUser = async () => {
    const response = await createUser(session.user);
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
    <div>
      {!session ? (
        <Fragment>
          <h1>Not signed in</h1>
          <button onClick={() => signIn("google")}>Sign in with google</button>
        </Fragment>
      ) : (
        <>
          <h1>Welcome</h1>
          Hello {session.user.email}, it's nice to see you again!
          <button onClick={signOut}>Sign out</button>
        </>
      )}
    </div>
  );
};

export default GoogleCallback;
