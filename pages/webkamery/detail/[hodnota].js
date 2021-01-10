import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getWebcam } from "../../../redux/actions/webcams";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import {
  Section,
  SectionHeading,
  SectionContent,
} from "../../../layouts/Section";
import LoadingSkeleton from "../../../layouts/LoadingSkeleton";
import { Row, Col } from "react-grid-system";
import Post from "../../../layouts/Post";
import { fetchQuery } from "../../../helpers/fetch";
import enums from "../../../enums";
import WebcamsLayout from "../../../layouts/siteLayouts/WebcamsLayout";
// import HeadTitle from "../../../layouts/HeadTitle";

export async function getStaticPaths() {
  const webcams = await fetchQuery(`${enums.URLS.webkamery}`);
  return {
    paths: webcams.map((webcam) => ({
      params: {
        hodnota: webcam.hodnota,
      },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { hodnota } = params;

  try {
    const webcamQuery = await fetchQuery(
      `${enums.URLS.webkamery}&hodnota=${hodnota}`
    );
    const webcam = webcamQuery[0];
    return webcam ? { props: { webcam } } : { notFound: true };
  } catch (err) {
    console.log("error", err);
    return { notFound: true };
  }
}

const WebcamDetail = ({ webcam }) => {
  const router = useRouter();
  const { hodnota } = router.query;
  const { isFallback } = useRouter();

  // const loadWebcam = () => {
  //   if (hodnota) {
  //     getWebcam(hodnota);
  //   }
  // };
  //
  // useEffect(() => {
  //   loadWebcam();
  // }, [hodnota]);

  return isFallback ? (
    <LoadingSkeleton />
  ) : (
    <>
      {/*<HeadTitle*/}
      {/*  title={webcam.page_title}*/}
      {/*  description={webcam.page_description}*/}
      {/*/>*/}

      <Section className="border-section mt-0 webcam-detail">
        {/*<SectionHeading background="none">*/}
        {/*  <h2>{webcam.nazev}</h2>*/}
        {/*</SectionHeading>*/}
        <SectionContent>
          <div className="content-wrapper">
            {webcam.text && parse(webcam?.text)}
          </div>
          {webcam.galerie && webcam.galerie.length > 0 && (
            <div className="pt-1">
              <span className="mb-1 d-block info-text">
                Kliknutím na příslušnou webkameru její obsah zvětšíte.
              </span>
              <div className="webcam-detail-image-wrapper d-flex">
                {webcam.galerie.map((image, index) => (
                  <a
                    href={image}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={index}
                  >
                    <img
                      className="webcam-detail-image w-100"
                      src={image}
                      alt={webcam.nazev + "0" + index}
                    />
                  </a>
                ))}
              </div>
            </div>
          )}
        </SectionContent>
      </Section>
      {/*<Section className="realted-advices border-section">*/}
      {/*  <SectionHeading background="none">*/}
      {/*    <h2>Další webkamery</h2>*/}
      {/*  </SectionHeading>*/}
      {/*  <SectionContent>*/}
      {/*    <Row>*/}
      {/*      {webcams.map(*/}
      {/*        (webcam, index) =>*/}
      {/*          index < 9 && (*/}
      {/*            <Col md={4}>*/}
      {/*              <Post post={webcam} />*/}
      {/*            </Col>*/}
      {/*          )*/}
      {/*      )}*/}
      {/*    </Row>*/}
      {/*  </SectionContent>*/}
      {/*</Section>*/}
    </>
  );
};

WebcamDetail.Layout = WebcamsLayout;

WebcamDetail.propTypes = {
  webcam: PropTypes.object.isRequired,
};

export default WebcamDetail;
