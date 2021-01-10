import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Col, Row } from "react-grid-system";
import Link from "next/link";
import enums from "../enums";
import { getObjektyByParams, countObjekty } from "../redux/actions/objekty";
import HeadingWithIcon from "../layouts/HeadingWithIcon";
import { HiNewspaper } from "react-icons/hi";
import Article from "../components/cards/Article";
import SideBar from "../layouts/Sidebar";

const Aktuality = ({ objekty, getObjektyByParams }) => {
  // How many objects are shown and at which number start api call query
  const [next, setNext] = useState(2);

  const [objektyCount, setObjektyCount] = useState(null);
  // How many objects per page to show
  const limit = 6;

  useEffect(() => {
    if (!objekty) {
      getObjektyByParams({
        _start: 0,
        _limit: limit,
        typ_objektu: "ubytovani",
      });
    }
    setObjektyCount(() => countObjekty());
  }, []);

  const paginate = async () => {
    await getObjektyByParams({
      _start: next,
      _limit: limit,
      typ_objektu: "aktuality",
    });
    setNext((prevState) => prevState + limit);
  };

  return (
    <div>
      <span className="breadcrumb">
        <Link href="/">Úvodní stránka</Link>&nbsp;/&nbsp;Aktuality
      </span>
      <HeadingWithIcon
        background="purple"
        heading="Aktuality"
        icon={HiNewspaper}
      >
        <p>
          Přehled aktuálně konaných akcí pro rodiny s dětmi. Tipy kam s dětmi za
          zábavou, kulturou.
        </p>
      </HeadingWithIcon>
      <div className="data-wrapper">
        <Row>
          <Col md={2.5}>
            <SideBar color="purple" topic={enums.TYP_OBJEKTU.aktualita} />
          </Col>
          <Col>
            <div className="filtered-objects">
              {objekty?.map((objekt, index) => (
                <Article
                  key={objekt.id}
                  article={{
                    ...objekt,
                    ...{
                      kategorie: "aktuality",
                      date_from: new Date(2020, 11, 24),
                      date_to: new Date(2020, 11, 31),
                    },
                  }}
                  background={`${(index + 1) % 2 === 0 && index > 0 && "grey"}`}
                />
              ))}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

Aktuality.propTypes = {
  objekty: PropTypes.object.isRequired,
  getObjektyByParams: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  objekty: state.objekty.objekty,
});

export default Aktuality;
