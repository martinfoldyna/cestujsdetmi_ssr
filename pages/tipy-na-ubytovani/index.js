import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { Col, Row } from "react-grid-system";
import { BsFilter } from "react-icons/bs";
import { HiHome } from "react-icons/hi";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getObjekty,
  getObjektyByParams,
  removeObjekty,
} from "../../redux/actions/objekty";
import ListFilteredItems from "../../components/listFilteredItems";
import enums from "../../enums";
import SideBar from "../../layouts/Sidebar";
import SideFilter from "../../components/cards/SideFilter";
import SideCards from "../../layouts/SideCards";
import HeadingWithIcon from "../../layouts/HeadingWithIcon";

const TipyNaUbytovani = ({
  objekty,
  getObjektyByParams,
  // location,
  removeObjekty,
}) => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
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

  // useEffect(() => {
  //   console.log(objekty);
  //   if (!objekty) {
  //     getObjektyByParams(fetchParams);
  //   }
  // }, []);

  return (
    <Fragment>
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
          apartmány, penziony, chaty, chalupy, kempy, ubytování v soukromí, ale
          třeba i na lodi. Dovolenou s dětmi v Čechách si užijete.
        </p>
      </HeadingWithIcon>
      <div className="data-wrapper">
        <Row>
          <Col md={2.5} className="hide-mobile">
            <SideBar topic={enums.TYP_OBJEKTU.ubytovani.key} color="blue" />
          </Col>
          <Col>
            <div className="hide-desktop">
              <div
                className={`d-flex ${
                  openFilter ? "justify-content-between" : "justify-content-end"
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
            {/*<Switch>*/}
            {/*  <Route exact path={match.path}>*/}
            {
              <ListFilteredItems
                region={selectedRegion}
                city={selectedCity}
                typ_objektu={enums.TYP_OBJEKTU.ubytovani.key}
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
    </Fragment>
  );
};

TipyNaUbytovani.propTypes = {
  objekty: PropTypes.object.isRequired,
  getObjektyByParams: PropTypes.func.isRequired,
  removeObjekty: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  objekty: state.objekty?.objekty,
});

export default connect(mapStateToProps, {
  getObjektyByParams,
  getAllObjekty: getObjekty,
  removeObjekty,
})(TipyNaUbytovani);
