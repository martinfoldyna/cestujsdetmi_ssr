import React, { Fragment, useContext, useState, useEffect } from "react";
import Link from "next/link";
import { Col, Container, Row } from "react-grid-system";
import { BsFilter } from "react-icons/bs";
import { HiHome } from "react-icons/hi";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import ListFilteredItems from "../../components/listFilteredItems";
import enums from "../../enums";
import SideBar from "../../layouts/Sidebar";
import SideFilter from "../../components/cards/SideFilter";
import SideCards from "../../layouts/SideCards";
import HeadingWithIcon from "../../layouts/HeadingWithIcon";
import { fetchPrevio, fetchQuery } from "../../helpers/fetch";
import { searchParamsToUrlQuery } from "next/dist/next-server/lib/router/utils/querystring";
import {
  initCategories,
  searchParamsToQueryString,
} from "../../helpers/helpers";
import { GlobalContext } from "../../context/GlobalContext";
import Head from "next/head";

export async function getStaticProps() {
  const limit = 6;

  const fetchParams = {
    typ_objektu: "ubytovani",
    _limit: limit,
    _start: 0,
  };

  const [objekty, previoObjekty, kategorie] = await Promise.all([
    fetchQuery(
      `${enums.URLS.objektInfoMini}&${searchParamsToQueryString(fetchParams)}`
    ),
    fetchPrevio("hotels/search", { limit: 10 }),
    fetchQuery(enums.URLS.kategorie),
  ]);

  return {
    props: {
      objekty,
      kategorie,
      previo: previoObjekty?.success ? previoObjekty?.data : [],
    },
    revalidate: 30,
  };
}

const TipyNaUbytovani = ({ objekty, kategorie, previo, removeObjekty }) => {
  const router = useRouter();

  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  // How many objects are shown and at which number start api call query
  const [next, setNext] = useState(2);

  const globalContext = useContext(GlobalContext).global;
  const { global, setGlobal } = globalContext;
  useEffect(() => {
    setGlobal((prevState) => ({ ...prevState, ...kategorie }));
  }, []);

  // Mobile only for filter showing
  const [openFilter, setOpenFilter] = useState(false);
  // How many objects per page to show
  const limit = 6;

  const fetchParams = {
    typ_objektu: "ubytovani",
    _limit: limit,
    _start: 0,
  };

  return (
    <>
      <Head>
        <title>Ubytování a dovolená s dětmi | Cestuj s dětmi.cz</title>
        <meta name="description" content="Ubytování a dovolená s dětmi" />
        <meta name="keywords" content="Ubytování a dovolená s dětmi" />
        <meta name="robots" content="index, follow" />
      </Head>
      <Container className="main-container">
        <span className="breadcrumb">
          <Link href="/">Úvodní stránka</Link>
          &nbsp;/&nbsp;Ubytování a dovolená
        </span>

        <HeadingWithIcon
          background="blue"
          heading="Tipy na ubytování"
          icon={HiHome}
        >
          <p>
            Ubytování, dovolená, víkendy s dětmi po Čechách i na Moravě. Najděte
            si to správné ubytování, které Vám bude nejlépe vyhovovat. Hotely,
            apartmány, penziony, chaty, chalupy, kempy, ubytování v soukromí,
            ale třeba i na lodi. Dovolenou s dětmi v Čechách si užijete.
          </p>
        </HeadingWithIcon>
        <div className="data-wrapper">
          <Row>
            <Col md={2.5} className="hide-mobile">
              <SideBar
                topic={enums.TYP_OBJEKTU.ubytovani}
                color="blue"
                kategorie={kategorie}
              />
            </Col>
            <Col>
              <div className="hide-desktop">
                <div
                  className={`d-flex ${
                    openFilter
                      ? "justify-content-between"
                      : "justify-content-end"
                  }`}
                >
                  {openFilter && (
                    <button
                      className="btn btn-small-logo bg-blue text-white m-0"
                      onClick={() => setOpenFilter(false)}
                    >
                      Zavřít filtr
                    </button>
                  )}
                  <button
                    className="btn btn-small-logo ghost m-0"
                    onClick={() => setOpenFilter(true)}
                  >
                    Upřesnit parametry{" "}
                    <BsFilter className="text-blue btn-icon right" />
                  </button>
                </div>
                {openFilter && (
                  <SideFilter topic={enums.TYP_OBJEKTU.ubytovani.key} />
                )}
              </div>
              <ListFilteredItems
                region={selectedRegion}
                city={selectedCity}
                typ_objektu={enums.TYP_OBJEKTU.ubytovani.key}
                objekty={objekty}
              />
              <ul>
                {previo.map((previoObjekt) => (
                  <li>{previoObjekt.name}</li>
                ))}
              </ul>
              Celkem: {previo?.length}
              <div className="hide-desktop">
                <div className="mt-1">
                  <SideCards />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

TipyNaUbytovani.propTypes = {
  objekty: PropTypes.array,
  getObjektyByParams: PropTypes.func,
  removeObjekty: PropTypes.func,
};

export default TipyNaUbytovani;
