import "../styles/globals.scss";
import "react-datepicker/dist/react-datepicker.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import React, { useContext, useState } from "react";
import Header from "../components/Header";
import EmptyLayout from "../layouts/EmptyLayout";
import firebase from "firebase";
import { FirebaseConfig } from "../config/firebaseConfig";
import Footer from "../layouts/Footer";
import { GlobalContext } from "../context/GlobalContext";

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
      {/*<Container className="main-container">*/}
      <main style={{ position: "relative" }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </main>
      {/*</Container>*/}
      <Footer />
    </GlobalContext.Provider>
  );
};

export default MyApp;
