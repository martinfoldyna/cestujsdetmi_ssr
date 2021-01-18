import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Col, Container, Row } from "react-grid-system";
import Link from "next/link";
import enums from "../enums";
import { getObjektyByParams, countObjekty } from "../redux/actions/objekty";
import HeadingWithIcon from "../layouts/HeadingWithIcon";
import { HiNewspaper } from "react-icons/hi";
import Article from "../components/cards/Article";
import SideBar from "../layouts/Sidebar";
import { fetchQuery } from "../helpers/fetch";

const Aktuality = ({ objekty }) => {
  // How many objects are shown and at which number start api call query
  const [next, setNext] = useState(2);

  const [objektyCount, setObjektyCount] = useState(null);
  // How many objects per page to show
  const limit = 6;

  useEffect(() => {
    setObjektyCount(() => countObjekty());
  }, []);

  const paginate = async () => {
    setNext((prevState) => prevState + limit);
  };

  return (
    <Container style={{ maxWidth: "1220px" }}>
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
    </Container>
  );
};

Aktuality.propTypes = {
  objekty: PropTypes.object.isRequired,
  getObjektyByParams: PropTypes.func.isRequired,
};

export default Aktuality;

export async function getStaticProps() {
  try {
    const objekty = await fetchQuery(`${enums.URLS.objektInfoMini}`);

    return { props: { objekty } };
  } catch (err) {
    return { props: { notFound: true } };
  }
}
