import React from "react";
import Head from "next/head";
import Hero from "../components/Hero";
import { Container } from "react-grid-system";
import Map from "../components/Map";
import Highlighted from "../layouts/Highlighted";
import HomePageSections from "../components/HomePageSections";
import HomeRadyTipy from "../components/HomeRadyTipy";
import LastMinute from "../components/LastMinute";
import NewPublished from "../components/NewPublished";
import { fetchAllPrevioHotels, fetchQuery } from "../helpers/fetch";
import enums from "../enums";

const Home = ({
  objekty,
  previo,
  radyTipy,
  mesta,
  newPublished,
  lastMinute,
}) => (
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
      <Map mesta={mesta} />

      <div className="homepage">
        <Highlighted data={objekty} previo={previo} />
        <HomePageSections topic="aktuality" heading="Index" data={objekty} />
        <HomeRadyTipy posts={radyTipy} />
        <LastMinute posts={lastMinute} />
        <HomePageSections topic="nejctenejsi" data={objekty} />
        <NewPublished newPublished={newPublished} />
      </div>
    </Container>
  </div>
);

export default Home;

export async function getStaticProps() {
  const [
    objekty,
    lastMinute,
    mesta,
    previoHotels,
    radyTipy,
    newPublished,
  ] = await Promise.all([
    fetchQuery(`${enums.URLS.objektInfoMini}&_limit=20`),
    fetchQuery(`${enums.URLS.lastMinute}&_limit=4`),
    fetchQuery(`mestos`),
    fetchAllPrevioHotels(2),
    fetchQuery(enums.URLS.radyTipy),
    fetchQuery(enums.URLS.newPublished),
  ]);
  return {
    props: {
      objekty: objekty,
      previo: previoHotels.data,
      lastMinute,
      mesta,
      radyTipy,
      newPublished,
    },
  };
}
