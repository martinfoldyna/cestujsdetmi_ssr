import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { Col, Row, Container } from "react-grid-system";
import { BsFilter } from "react-icons/bs";
import { AiFillCompass } from "react-icons/ai";
import PropTypes from "prop-types";
import ListFilteredItems from "../../components/listFilteredItems";
import enums from "../../enums";
import SideBar from "../../layouts/Sidebar";
import SideFilter from "../../components/cards/SideFilter";
import SideCards from "../../layouts/SideCards";
import HeadingWithIcon from "../../layouts/HeadingWithIcon";
import { fetchQuery } from "../../helpers/fetch";
import { searchParamsToQueryString } from "../../helpers/helpers";
import Head from "next/head";
import { useRouter } from "next/router";

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
    typ_objektu: "zabava",
    kategorie_value: filterKategorie,
    _limit: limit,
    _start: 0,
  };

  const objekty = await fetchQuery(
    `${enums.URLS.objektInfoMini}&${searchParamsToQueryString(fetchParams)}`
  );

  return { props: { objekty }, revalidate: 3600 };
}

const TipyNaVyletyKategorie = ({ objekty }) => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  // How many objects are shown and at which number start api call query
  const [next, setNext] = useState(2);
  const router = useRouter();

  const { query } = router;
  const { filterKategorie } = query;

  // Mobile only for filter showing
  const [openFilter, setOpenFilter] = useState(false);
  // How many objects per page to show
  const limit = 6;

  const fetchParams = {
    typ_objektu: "zabava",
    _limit: limit,
    _start: 0,
  };

  // useEffect(() => {
  //   console.log(objekty);
  //   if (!objekty) {
  //     getObjektyByParams(fetchParams);
  //   }
  // }, []);

  return (
    <>
      <Head>
        <meta
          name="description"
          content={`Tipy kam na výlet s dětmi v Čechách i na Moravě, ${filterKategorie}`}
        />
        <title>
          Tipy kam na výlet s dětmi v Čechách i na Moravě - {filterKategorie} |
          Cestuj s dětmi.cz
        </title>
      </Head>
      <Container className="main-container">
        <span className="breadcrumb">
          <Link href="/">Úvodní stránka</Link>
          &nbsp;/&nbsp;Výlety s dětmi
        </span>

        <HeadingWithIcon
          background="orange"
          heading="Tipy kam na výlet s dětmi v Čechách i na Moravě"
          icon={AiFillCompass}
        >
          <p>
            Kam na výlety s dětmi v Čechách i na Moravě. Jeďte za zábavou,
            poznáním, historií, adrenalinem, sportem i odpočinkem. Najděte si
            ten svůj tip na výlet. Portál Cestuj s dětmi.cz je zaměřený na
            rodinné výlety a výlety s dětmi.
          </p>
        </HeadingWithIcon>
        <div className="data-wrapper">
          <Row>
            <Col md={2.5} className="hide-mobile">
              <SideBar topic={enums.TYP_OBJEKTU.zabava} color="orange" />
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
                  <SideFilter topic={enums.TYP_OBJEKTU.zabava.key} />
                )}
              </div>
              {/*<Switch>*/}
              {/*  <Route exact path={match.path}>*/}
              {
                <ListFilteredItems
                  region={selectedRegion}
                  city={selectedCity}
                  typ_objektu={enums.TYP_OBJEKTU.zabava.key}
                  objekty={objekty}
                />
              }
              {/*</Route>*/}
              {/*  <Route*/}
              {/*    exact*/}
              {/*    path={`${match.path}/:filter/:kraj?/:oblast?/:mesto?`}*/}
              {/*  >*/}
              {/*    {*/}
              {/*      <ListFilteredItems*/}
              {/*        region={selectedRegion}*/}
              {/*        city={selectedCity}*/}
              {/*        typ_objektu={enums.TYP_OBJEKTU.ubytovani.key}*/}
              {/*      />*/}
              {/*    }*/}
              {/*  </Route>*/}
              {/*  <Route exact path={`${match.path}/detail/:id`}>*/}
              {/*    <ObjektDetail />*/}
              {/*  </Route>*/}
              {/*</Switch>*/}

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

TipyNaVyletyKategorie.propTypes = {
  objekty: PropTypes.object.isRequired,
  getObjektyByParams: PropTypes.func,
  removeObjekty: PropTypes.func,
};

const mapStateToProps = (state) => ({
  objekty: state.objekty?.objekty,
});

export default TipyNaVyletyKategorie;
