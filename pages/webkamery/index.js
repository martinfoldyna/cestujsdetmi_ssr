import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllWebcams, loadMoreWebcams } from "../../redux/actions/webcams";
import { Row, Col } from "react-grid-system";
import LoadingSkeleton from "../../layouts/LoadingSkeleton";
import Link from "next/link";
import { RiWebcamFill } from "react-icons/ri";
import Post from "../../layouts/Post";
import SideCards from "../../layouts/SideCards";
import SideFilter from "../../components/cards/SideFilter";
import HeadingWithIcon from "../../layouts/HeadingWithIcon";
import { fetchQuery } from "../../helpers/fetch";
import enums from "../../enums";

export async function getStaticProps() {
  const webcams = await fetchQuery(`${enums.URLS.webkamery}`);

  return { props: { webcams } };
}

const Webcams = ({ webcams, getAllWebcams, loadMoreWebcams, match }) => {
  const limit = 9;
  const [next, setNext] = useState(limit);

  useEffect(() => {
    if (!webcams) {
      getAllWebcams();
    }
  }, []);
  console.log(match);

  return (
    <div>
      {/*<HeadTitle title="Přehled webkamer" />*/}
      <span className="breadcrumb">
        <Link href="/">Úvodní stránka</Link>&nbsp;/&nbsp;Webkamery
      </span>

      <HeadingWithIcon
        background="dark-purple"
        heading="Webkamery"
        icon={RiWebcamFill}
      >
        <p>
          Ubytování, dovolená, víkendy s dětmi po Čechách i na Moravě. Najděte
          si to správné ubytování, které Vám bude nejlépe vyhovovat. Hotely,
          apartmány, penziony, chaty, chalupy, kempy, ubytování v soukromí, ale
          třeba i na lodi. Dovolenou s dětmi v Čechách si užijete.
        </p>
      </HeadingWithIcon>
      <div className="data-wrapper">
        <Row>
          <Col lg={2.5}>
            <SideFilter fullPadding={true} color="purple" />
            <SideCards />
          </Col>
          <Col lg={9.5}>
            {!webcams ? (
              <LoadingSkeleton />
            ) : (
              <Row>
                <Fragment>
                  {webcams?.map((webcam) => (
                    <Col md={4} key={webcam.id}>
                      <Post post={webcam} />
                    </Col>
                  ))}
                  <div className="d-flex justify-content-center w-100 mt-1">
                    <button
                      className="btn bg-dark-purple text-white"
                      onClick={() => {
                        loadMoreWebcams({ _start: next, _limit: limit });
                        setNext((prevState) => prevState + limit);
                      }}
                    >
                      Načíst další
                    </button>
                  </div>
                </Fragment>
              </Row>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

Webcams.propTypes = {
  getAllWebcams: PropTypes.func.isRequired,
  loadMoreWebcams: PropTypes.func.isRequired,
  webcams: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  webcams: state.webcams,
});

export default Webcams;
