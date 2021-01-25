import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import { connect } from "react-redux";
import Hero from "../components/Hero";
import { Container } from "react-grid-system";
import Map from "../components/Map";
import Highlighted from "../layouts/Highlighted";
import HomePageSections from "../components/HomePageSections";
import PropTypes from "prop-types";
import { getNewPublished, getObjekty } from "../redux/actions/objekty";
import React, { useEffect } from "react";
import HomeRadyTipy from "../components/HomeRadyTipy";
import LastMinute from "../components/LastMinute";
import NewPublished from "../components/NewPublished";
import { wrapper } from "../redux/store";
import { bindActionCreators } from "redux";
import { fetchQuery } from "../helpers/fetch";
import enums from "../enums";
import { GlobalContext } from "../context/GlobalContext";

const Home = ({ objekty, radyTipy, newPublished }) => {
  const fetchData = () => {
    if (!objekty) {
      getObjekty();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero />
      <Container className="main-container">
        <Map />

        <div className="homepage">
          <Highlighted data={objekty} />
          <HomePageSections
            topic="aktuality"
            heading="Aktuality"
            data={objekty}
          />
          <HomeRadyTipy posts={radyTipy} />
          <LastMinute />
          <HomePageSections topic="nejctenejsi" data={objekty} />
          <NewPublished newPublished={newPublished} />
        </div>
      </Container>
    </div>
  );
};

Home.propTypes = {
  objekty: PropTypes.object.isRequired,
  radyTipy: PropTypes.object,
};

export default Home;

export async function getStaticProps() {
  const [objekty, radyTipy, newPublished] = await Promise.all([
    fetchQuery(enums.URLS.objektInfoMini),
    fetchQuery(enums.URLS.radyTipy),
    fetchQuery(enums.URLS.newPublished),
  ]);
  return {
    props: {
      objekty,
      radyTipy,
      newPublished,
    },
  };
}
