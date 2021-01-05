import "../styles/globals.scss";
// import {Provider} from "react-redux";
// import store from "../redux/store";
// import withRedux, {createWrapper} from "next-redux-wrapper"
import React from "react";
import { wrapper } from "../redux/store";
import Header from "../components/Header";
import Hero from "../components/Hero";
import { Container } from "react-grid-system";
import EmptyLayout from "../layouts/EmptyLayout";
import Link from "next/link";
import firebase from "firebase";
import { FirebaseConfig } from "../config/firebaseConfig";
import Footer from "../layouts/Footer";
// firebase.initializeApp(FirebaseConfig);
if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const MyApp = ({ Component, pageProps }) => {
  const Layout = Component.Layout || EmptyLayout;

  return (
    <div>
      <Header />
      <Hero />
      <Container style={{ maxWidth: "1220px" }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Container>
      <Footer />
    </div>
  );
};

export default wrapper.withRedux(MyApp);
