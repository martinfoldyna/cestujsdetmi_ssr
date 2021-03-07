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
import { fetchQuery } from "../../helpers/fetch";
import { searchParamsToUrlQuery } from "next/dist/next-server/lib/router/utils/querystring";
import {
  initCategories,
  searchParamsToQueryString,
} from "../../helpers/helpers";
import { GlobalContext } from "../../context/GlobalContext";
import Head from "next/head";
import MobileFilters from "../../components/mobileFilters";
import { objectToArray } from "../../helpers/helpers";

export async function getStaticPaths() {
  const kategorie = await fetchQuery(
    `${enums.URLS.kategorie}?urceni=${enums.TYP_OBJEKTU.ubytovani.key}&_limit=20`
  );

  return {
    paths: kategorie.map((category) => ({
      params: {
        filterKategorie: category.hodnota,
      },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const limit = 6;

  const { filterKategorie } = params;

  const fetchParams = {
    typ_objektu: "ubytovani",
    kategorie_value: filterKategorie,
    _limit: limit,
    _start: 0,
  };

  const objekty = await fetchQuery(
    `${enums.URLS.objektInfoMini}&${searchParamsToQueryString(fetchParams)}`
  );

  const locations = await fetchQuery("locations");

  return { props: { objekty, locations }, revalidate: 3600 };
}

const TipyNaUbytovaniKategorie = ({ objekty, locations }) => {
  const router = useRouter();
  const { query } = router;
  const { filterKategorie } = query;

  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [translatedCategory, setTranslatedCategory] = useState("");
  // How many objects are shown and at which number start api call query
  const [next, setNext] = useState(2);

  // Mobile only for filter showing
  const [openFilter, setOpenFilter] = useState(false);
  // How many objects per page to show
  const limit = 6;

  const fetchParams = {
    typ_objektu: "ubytovani",
    _limit: limit,
    _start: 0,
  };

  const sideBarProps = {
    topic: enums.TYP_OBJEKTU.ubytovani,
    color: "blue",
    ...locations,
  };

  return (
    <>
      <Head>
        <title>
          Ubytování a dovolená s dětmi -{" "}
          {enums.KATEGORIE.UBYTOVANI[filterKategorie]?.value.toLowerCase()} |
          Cestuj s dětmi.cz
        </title>
      </Head>
      <Container className='main-container'>
        <span className='breadcrumb'>
          <Link href='/'>Úvodní stránka</Link>
          &nbsp;/&nbsp;Ubytování a dovolená
        </span>

        <HeadingWithIcon
          background='blue'
          heading={
            objectToArray(enums.KATEGORIE.UBYTOVANI).find(
              (enumItem) => enumItem.key === filterKategorie
            ).value
          }
          icon={HiHome}
          icon_size='medium'
        >
          <p>Naše tipy na ubytování a dovolenou</p>
        </HeadingWithIcon>
        <div className='data-wrapper'>
          <Row>
            <Col md={2.5} className='hide-mobile'>
              <SideBar {...sideBarProps} />
            </Col>
            <Col>
              <MobileFilters {...sideBarProps} />

              <ListFilteredItems
                region={selectedRegion}
                city={selectedCity}
                typ_objektu={enums.TYP_OBJEKTU.ubytovani.key}
                objekty={objekty}
              />

              <div className='hide-desktop'>
                <div className='mt-1'>
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

TipyNaUbytovaniKategorie.propTypes = {
  objekty: PropTypes.array,
  getObjektyByParams: PropTypes.func,
  removeObjekty: PropTypes.func,
};

export default TipyNaUbytovaniKategorie;
