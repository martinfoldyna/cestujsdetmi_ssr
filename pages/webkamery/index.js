import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllWebcams, loadMoreWebcams } from "../../redux/actions/webcams";
import { Row, Col } from "react-grid-system";
import LoadingSkeleton from "../../layouts/LoadingSkeleton";
import Link from "next/link";
import { RiWebcamFill } from "react-icons/ri";
import VerticalPost from "../../layouts/VerticalPost";
import SideCards from "../../layouts/SideCards";
import SideFilter from "../../components/cards/SideFilter";
import HeadingWithIcon from "../../layouts/HeadingWithIcon";
import { fetchQuery } from "../../helpers/fetch";
import enums from "../../enums";
import WebcamsLayout from "../../layouts/siteLayouts/WebcamsLayout";
import { searchParamsToQueryString } from "../../helpers/helpers";

export async function getStaticProps() {
  const webcams = await fetchQuery(`${enums.URLS.webkamery}`);

  return { props: { webcams }, revalidate: 60 };
}

const Webcams = ({ webcams, getAllWebcams }) => {
  const limit = 9;
  const [next, setNext] = useState(limit);
  const [allWebcams, setAllWebcams] = useState(webcams);

  useEffect(() => {
    if (!webcams) {
      getAllWebcams();
    }
  }, []);

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

  return !webcams ? (
    <LoadingSkeleton />
  ) : (
    <Row>
      <Fragment>
        {allWebcams?.map((webcam) => (
          <Col md={4} key={webcam.id}>
            <VerticalPost post={webcam} useNextImg={false} />
          </Col>
        ))}
        <div className="d-flex justify-content-center w-100 mt-1">
          <button
            className="btn bg-dark-purple text-white"
            onClick={() => {
              loadMoreWebcams();
              setNext((prevState) => prevState + limit);
            }}
          >
            Načíst další
          </button>
        </div>
      </Fragment>
    </Row>
  );
};

Webcams.Layout = WebcamsLayout;

Webcams.propTypes = {
  getAllWebcams: PropTypes.func,
  loadMoreWebcams: PropTypes.func,
  webcams: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  webcams: state.webcams,
});

export default Webcams;
