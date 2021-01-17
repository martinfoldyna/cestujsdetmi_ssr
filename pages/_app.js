import "../styles/globals.scss";
// import {Provider} from "react-redux";
// import store from "../redux/store";
// import withRedux, {createWrapper} from "next-redux-wrapper"
import React, { useContext, useState } from "react";
import App from "next/app";
import { wrapper } from "../redux/store";
import Header from "../components/Header";
import Hero from "../components/Hero";
import { Container } from "react-grid-system";
import EmptyLayout from "../layouts/EmptyLayout";
import Link from "next/link";
import firebase from "firebase";
import { FirebaseConfig } from "../config/firebaseConfig";
import Footer from "../layouts/Footer";
import { fetchQuery } from "../helpers/fetch";
import enums from "../enums";
import { GlobalContext } from "../context/GlobalContext";
import { ca } from "react-date-range/dist/locale";
if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const MyApp = ({ Component, pageProps }) => {
  // const { global } = pageProps;
  const [global, setGlobal] = useState(null);
  const [user, setUser] = useState(null);

  const Layout = Component.Layout || EmptyLayout;

  return (
    <GlobalContext.Provider
      value={{ user: { user, setUser }, global: { global, setGlobal } }}
    >
      <Header />
      {/*<Container style={{ maxWidth: "1220px" }}>*/}
      <Layout>
        <Component {...pageProps} />
      </Layout>
      {/*</Container>*/}
      <Footer />
    </GlobalContext.Provider>
  );
};

export default MyApp;
