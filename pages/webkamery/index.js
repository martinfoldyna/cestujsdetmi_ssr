import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-grid-system";
import LoadingSkeleton from "../../layouts/LoadingSkeleton";
import VerticalPost from "../../layouts/VerticalPost";
import { fetchQuery } from "../../helpers/fetch";
import enums from "../../enums";
import WebcamsLayout from "../../layouts/siteLayouts/WebcamsLayout";
import Head from "next/head";
import { useRouter } from "next/router";
import { searchParamsToQueryString } from "../../helpers/helpers";
import { Section, SectionContent } from "../../layouts/Section";

export async function getStaticProps() {
  const webcams = await fetchQuery(`${enums.URLS.webkamery}`);

  return { props: { webcams }, revalidate: 60 };
}

const Webcams = ({ webcams }) => {
  const router = useRouter();
  const { query } = router;
  const { kraj, mesto, oblast } = query;

  const limit = 9;
  const [next, setNext] = useState(limit);
  const [allWebcams, setAllWebcams] = useState(webcams);

  useEffect(() => {
    if (Object.keys(query) > 0) {
      loadFilteredWebcams();
    }
  }, [query]);

  const loadMoreWebcams = async () => {
    try {
      const nextWebcams = await fetchQuery(
        `webkameries?_limit=${limit}&_start=${next}`
      );

      if (nextWebcams && nextWebcams.length > 0) {
        setAllWebcams((prevState) => [...prevState, ...nextWebcams]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loadFilteredWebcams = async () => {
    let fetchParams = { _limit: limit, _start: next };
    if (Object.keys(router.query)?.length > 0) {
      console.log("Fetching objects");
      if (kraj) fetchParams = { ...fetchParams, adresa_kraj: kraj };
      if (mesto) fetchParams = { ...fetchParams, adresa_mesto: mesto };
      if (oblast) fetchParams = { ...fetchParams, adresa_oblast: oblast };
      const webcams = await fetchQuery(
        `webkameries?${searchParamsToQueryString(fetchParams)}`
      );
      setAllWebcams(webcams);
    } else {
    }
  };

  return !webcams ? (
    <LoadingSkeleton />
  ) : (
    <>
      <Head>
        <title>Webkamery v Čechách a na Moravě | Cestuj s dětmi.cz</title>
        <meta
          name="description"
          content="Webkamery a webové kamery na vybraných místech v čechách. Online záběry z atraktivních míst po celé ČR. "
        />
        <meta
          name="keywords"
          content="webkamery,webové kamery,online kamery,Čechy,ski areály,města"
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <Row className="mr-0 bg-white pt-1 position-relative border-radius">
        <>
          {allWebcams?.map((webcam) => (
            <Col md={4} key={webcam.id}>
              <VerticalPost post={webcam} useNextImg={false} />
            </Col>
          ))}
          <div className="d-flex justify-content-center w-100 mt-1">
            <button
              className="btn btn-small-logo btn-homepage-detail center bg-dark-purple text-white"
              onClick={() => {
                loadMoreWebcams();
                setNext((prevState) => prevState + limit);
              }}
            >
              Načíst další
            </button>
          </div>
        </>
      </Row>
    </>
  );
};

Webcams.Layout = WebcamsLayout;

Webcams.propTypes = {
  webcams: PropTypes.array.isRequired,
};

export default Webcams;
