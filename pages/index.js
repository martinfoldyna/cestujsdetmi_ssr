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
import { useEffect } from "react";
import HomeRadyTipy from "../components/HomeRadyTipy";
import LastMinute from "../components/LastMinute";
import NewPublished from "../components/NewPublished";
import { wrapper } from "../redux/store";
import { bindActionCreators } from "redux";
import { fetchQuery } from "../helpers/fetch";
import enums from "../enums";

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

      <main style={{ position: "relative" }}>
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
      </main>
    </div>
  );
};

Home.propTypes = {
  objekty: PropTypes.object.isRequired,
  radyTipy: PropTypes.object,
};

const mapStateToProps = (state) => ({
  objekty: state.objekty,
  radyTipy: state.radyTipy,
});

const mapDispatchToProps = (dispatch) => ({
  getObjekty: bindActionCreators(getObjekty, dispatch),
});

export default Home;

export async function getServerSideProps() {
  const objekty = await fetchQuery(enums.URLS.objektInfoMini);
  const radyTipy = await fetchQuery(enums.URLS.radyTipy);
  const newPublished = await fetchQuery(enums.URLS.newPublished);
  return {
    props: {
      objekty,
      radyTipy,
      newPublished,
    },
  };
}
