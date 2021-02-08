import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-grid-system";
import Link from "next/link";
import enums from "../../enums";
import HeadingWithIcon from "../../layouts/HeadingWithIcon";
import { HiNewspaper } from "react-icons/hi";
import SideBar from "../../layouts/Sidebar";
import { fetchQuery } from "../../helpers/fetch";
import Head from "next/head";
import News from "../../layouts/News";

export async function getStaticProps() {
  const newsArr = await fetchQuery(`rss`);

  return { props: { newsArr: newsArr.data }, revalidate: 3600 };
}

const Aktuality = ({ newsArr }) => {
  // How many objects per page to show
  const limit = 20;

  // How many objects are shown and at which number start api call query
  const [next, setNext] = useState(limit);

  const [objektyCount, setObjektyCount] = useState(null);

  const paginate = async () => {
    setNext((prevState) => prevState + limit);
  };

  return (
    <>
      <Head>
        <title>Index - kam na víkend s dětmi | Cestuj s dětmi.cz</title>
        <meta
          name="description"
          content="Tipy kam na víkend s dětmi. Najdeme Vám ten správný tip, kam s dětmi na víkend."
        />
        <meta
          name="keywords"
          content="kam,na,víkend,s dětmi,o víkendu,tip,tipy,akce,pro děti,"
        />
        <meta name="robots" content="index, follow" />
      </Head>
      <Container className="main-container">
        <span className="breadcrumb">
          <Link href="/">Úvodní stránka</Link>&nbsp;/&nbsp;Index
        </span>
        <HeadingWithIcon background="purple" heading="Index" icon={HiNewspaper}>
          <p>
            Přehled aktuálně konaných akcí pro rodiny s dětmi. Tipy kam s dětmi
            za zábavou, kulturou.
          </p>
        </HeadingWithIcon>
        <div className="data-wrapper">
          <Row>
            <Col md={2.5}>
              <SideBar color="purple" topic={enums.TYP_OBJEKTU.aktualita} />
            </Col>
            <Col>
              <div className="filtered-objects">
                {newsArr?.map(
                  (news, index) =>
                    index < next && <News key={news.id} news={news} />
                )}
              </div>
            </Col>
          </Row>
          <button className="btn bg-purple text-white">Načíst další</button>
        </div>
      </Container>
    </>
  );
};

export default Aktuality;
