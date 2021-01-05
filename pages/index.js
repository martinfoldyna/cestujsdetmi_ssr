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
import { getObjekty } from "../redux/actions/objekty";
import { useEffect } from "react";
import HomeRadyTipy from "../components/HomeRadyTipy";
import LastMinute from "../components/LastMinute";
import NewPublished from "../components/NewPublished";

const Home = ({ getObjekty, objekty: { objekty, loading } }) => {
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
          <HomeRadyTipy />
          <LastMinute />
          <HomePageSections
            topic="nejctenejsi"
            data={objekty}
            loading={loading}
          />
          <NewPublished />
        </div>
        {/*<h1 className={styles.title}>*/}
        {/*  Welcome to <a href="https://nextjs.org">Next.js!</a>*/}
        {/*</h1>*/}

        {/*<p className={styles.description}>*/}
        {/*  Get started by editing{' '}*/}
        {/*  <code className={styles.code}>pages/index.js</code>*/}
        {/*</p>*/}

        {/*<div className={styles.grid}>*/}
        {/*  <a href="https://nextjs.org/docs" className={styles.card}>*/}
        {/*    <h3>Documentation &rarr;</h3>*/}
        {/*    <p>Find in-depth information about Next.js features and API.</p>*/}
        {/*  </a>*/}

        {/*  <a href="https://nextjs.org/learn" className={styles.card}>*/}
        {/*    <h3>Learn &rarr;</h3>*/}
        {/*    <p>Learn about Next.js in an interactive course with quizzes!</p>*/}
        {/*  </a>*/}

        {/*  <a*/}
        {/*    href="https://github.com/vercel/next.js/tree/master/examples"*/}
        {/*    className={styles.card}*/}
        {/*  >*/}
        {/*    <h3>Examples &rarr;</h3>*/}
        {/*    <p>Discover and deploy boilerplate example Next.js projects.</p>*/}
        {/*  </a>*/}

        {/*  <a*/}
        {/*    href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"*/}
        {/*    className={styles.card}*/}
        {/*  >*/}
        {/*    <h3>Deploy &rarr;</h3>*/}
        {/*    <p>*/}
        {/*      Instantly deploy your Next.js site to a public URL with Vercel.*/}
        {/*    </p>*/}
        {/*  </a>*/}
        {/*</div>*/}
      </main>
    </div>
  );
};

Home.propTypes = {
  getObjekty: PropTypes.func.isRequired,
  objekty: PropTypes.object.isRequired,
  radyTipy: PropTypes.object,
};

const mapStateToProps = (state) => ({
  objekty: state.objekty,
  radyTipy: state.radyTipy,
});

export default connect(mapStateToProps, { getObjekty })(Home);
