import React, { Fragment, useRef, useState } from "react";
import { fetchQuery } from "../../../helpers/fetch";
import {
  Section,
  SectionContent,
  SectionHeading,
} from "../../../layouts/Section";
import { BsClock } from "react-icons/bs";
import parse from "html-react-parser";
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";
import CityPin from "../../../public/cityPin";
import Head from "next/head";
import { trimString } from "../../../helpers/helpers";

export async function getStaticPaths() {
  const response = await fetchQuery("rss");

  return {
    paths: response.success
      ? response.data.map((news) => ({
          params: {
            id: news.id,
          },
        }))
      : [{ params: { id: "" } }],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const response = await fetchQuery(`rss/${id}`);

  const data = response?.data;

  console.log(data);

  return { props: { news: response.sucess ? data : data } };
}

const AktualityDetail = ({ news }) => {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: 500,
    zoom: 6,
    latitude: 49.8037633,
    longitude: 15.4749126,
    scrollZoom: false,
  });

  const mapRef = useRef();

  const renderMarkers = () => {
    return (
      <Marker
        latitude={parseFloat(news.gps.latitude)}
        longitude={parseFloat(news.gps.longitude)}
      >
        <CityPin className={"text-" + color} />
      </Marker>
    );
  };

  const renderMap = () => {
    return (
      <ReactMapGL
        ref={mapRef}
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_ACCESS_TOKEN}
        scrollZoom={false}
        className="mapbox"
        style={{ maxWidth: "100%", width: "auto" }}
      >
        <div style={{ position: "absolute", left: 10, top: 10 }}>
          <NavigationControl />
        </div>
        {renderMarkers()}
      </ReactMapGL>
    );
  };

  return news ? (
    <Fragment>
      <Head>
        <title>{news.name} | Cestuj s dětmi.cz</title>
        <meta name="description" content={news.annotation} />
        <meta name="robots" content="index, follow" />
      </Head>
      <Section className="mt-0 post-detail">
        <SectionHeading background="grey">
          <h2>{news.name}</h2>
          <div className="d-flex align-items-center date">
            <BsClock className="text-yellow btn-icon" />
            <span>
              {new Date(news.dateFrom).toLocaleString("cs", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              {" - "}
              {new Date(news.dateTo).toLocaleString("cs", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </SectionHeading>
        <SectionContent>
          {news.teaser && (
            <div className="post-detail-image-wrapper">
              <img
                className="post-detail-image w-100"
                src={news.teaser}
                alt={news.name}
              />
            </div>
          )}
          <div className="content-wrapper">
            <p>{news.annotation}</p>
          </div>
        </SectionContent>
      </Section>
      {news.gps && news.gps.latitude && news.gps.longitude && (
        <Section>
          <SectionHeading>Mapa</SectionHeading>
          <SectionContent>{renderMap()}</SectionContent>
        </Section>
      )}
    </Fragment>
  ) : (
    "Loading"
  );
};

export default AktualityDetail;
