import "../styles/globals.scss";
import "react-datepicker/dist/react-datepicker.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "react-toastify/dist/ReactToastify.css";
import "react-responsive-modal/styles.css";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import EmptyLayout from "../layouts/EmptyLayout";
import Footer from "../layouts/Footer";
import { GlobalContext } from "../context/GlobalContext";
import { Provider } from "next-auth/client";
import App from "next/app";
import { ToastContainer } from "react-toastify";

const MyApp = ({ Component, pageProps, APIuser, kraje, oblasti }) => {
  // const { global } = pageProps;
  // const [global, setGlobal] = useState({
  //   kraje,
  //   oblasti,
  // });
  const [global, setGlobal] = useState({ kraje: null, oblasti: null });
  const [user, setUser] = useState(null);
  console.log(APIuser);

  // const fetchRegions = async () => {
  //   const kraje = await fetchQuery("krajs");
  //   console.log("kraje", kraje);
  //   setGlobal({ kraje });
  // };
  //
  // useEffect(() => {
  //   fetchRegions();
  // }, []);

  const Layout = Component.Layout || EmptyLayout;

  return (
    <Provider session={pageProps.session}>
      <GlobalContext.Provider
        value={{ user: { user, setUser }, global: { global, setGlobal } }}
      >
        <ToastContainer />
        <Header user={APIuser} />
        <main style={{ position: "relative" }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </main>
        <Footer />
      </GlobalContext.Provider>
    </Provider>
  );
};

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  let appProps = await App.getInitialProps(appContext);

  // TODO: REACT MEMO, MAYBE?
  // const kraje = await fetchQuery("krajs");
  // const oblasti = await fetchQuery("oblasts");
  // console.log("kraje", kraje);
  //
  // appProps = { ...appProps, kraje, oblasti };

  return { ...appProps };
};

export default MyApp;
