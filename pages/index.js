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
import { fetchAllPrevioHotels, fetchQuery } from "../helpers/fetch";
import enums from "../enums";
import { GlobalContext } from "../context/GlobalContext";

const Home = ({ objekty, previo, radyTipy, newPublished }) => {
  // const fetchData = () => {
  //   if (!objekty) {
  //     console.log(objekty);
  //     getObjekty();
  //   }
  // };
  //
  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <div>
      <Head>
        <title>
          Dovolená a výlety s dětmi - Cestuj s dětmi.cz | Cestuj s dětmi.cz
        </title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Poradíme kam na výlet a dovolenou s dětmi v Čechách, na Moravě i Slezku. Oblíbený a přehledný cestovatelský a ubytovací portál Cestuj s dětmi.cz."
        />
        <meta
          name="keywords"
          content="výlety,dovolená,s dětmi,v čechách,víkendy,zábava,kam na výlet,ubytování,na Moravě,kam s dětmi,"
        />
        <meta name="author" content="monium.cz" />
        <meta name="robots" content="index, follow" />
        <meta charSet="utf-8" />
      </Head>

      <Hero />
      <Container className="main-container">
        <Map />

        <div className="homepage">
          <Highlighted data={objekty} previo={previo} />
          <HomePageSections topic="aktuality" heading="Index" data={objekty} />
          <HomeRadyTipy posts={radyTipy} />
          <LastMinute />
          <HomePageSections topic="nejctenejsi" data={objekty} />
          <NewPublished newPublished={newPublished} />
        </div>
      </Container>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const [objekty, previoHotels, radyTipy, newPublished] = await Promise.all([
    fetchQuery(enums.URLS.objektInfoMini),
    fetchAllPrevioHotels(2),
    fetchQuery(enums.URLS.radyTipy),
    fetchQuery(enums.URLS.newPublished),
  ]);
  return {
    props: {
      objekty: objekty,
      previo: previoHotels.data,
      radyTipy,
      newPublished,
    },
  };
}
