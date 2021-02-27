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
import { Col, Container, Row } from "react-grid-system";
import { parseXml, trimString } from "../../../helpers/helpers";
import SideCards from "../../../layouts/SideCards";
import MyLink from "../../../layouts/MyLink";
import Moment from "react-moment";
import { IoMdPin } from "react-icons/io";
import Link from "next/link";
import { cs } from "react-date-range/dist/locale";

export async function getStaticPaths() {
  const XMLNews =
    '<EVENTS><EVENT><id>2308160</id><TSNAMECZ>Výstavy</TSNAMECZ><DATEFROM>2021-02-26</DATEFROM><DATETO>2021-02-27</DATETO><NAMECZ><![CDATA[ Veletrh Střechy Praha, Solar Praha a Řemeslo Praha 2021 ONLINE]]></NAMECZ><POPISCZ><![CDATA[<p>Vzhledem ke&nbsp;koronavirové pandemii jsme se rozhodli připravit&nbsp;<strong>pro rok 2021 novou formu souboru veletrhů<a href="https://registrace.strechy-praha.cz/events/veletrh-online?utm_campaign=paseo&amp;utm_medium=kdykde&amp;utm_source=udalost">&nbsp;Střechy Praha, Solar Praha a Řemeslo Praha</a>, a to&nbsp;</strong><strong>ONLINE</strong>, která navazuje na předchozí velmi úspěšné ročníky konané na pražském výstavišti v&nbsp;Letňanech.&nbsp;</p><ul><li><strong>Vyhrajte střechu na dům zdarma.&nbsp;</strong></li><li><strong>Online informace přímo od odborníků.</strong></li><li><strong>Zajímave veletržní slevy přímo na stáncích vystavovatelů.</strong></li></ul><p>Každý, kdo navštíví ONLINE veletrh (26. - 27. 2. 2021), získá&nbsp;<strong>vstupenku v&nbsp;hodnotě 100 Kč zdarma&nbsp;</strong>na tradiční soubor veletrhů Střechy-Solar-Řemeslo Praha 2022 v&nbsp;Praze&nbsp;Letňanech!</p><p><a href="https://registrace.strechy-praha.cz/events/veletrh-online?utm_campaign=paseo&amp;utm_medium=kdykde&amp;utm_source=udalost"><img src="/public/user/bannerON_300x250_nove.png" alt="bannerON_300x250_nove" width="300" height="250" /></a></p><p><u><strong>Co Vás čeká?</strong></u></p><ul><li>z&nbsp;pohodlí svého domova či kanceláře se v&nbsp;klidu dozvíte potřebné informace od vystavujících firem, prohlédnete či stáhnete si jejich prezentační materiály, můžete získat slevové vouchery či se zúčastnit soutěží o zajímavé ceny&nbsp;</li><li>virtuální stánky firem budou rozdělené dle oborů</li><li>s&nbsp;vystavovateli se v&nbsp;případě Vašeho zájmu můžete naživo spojit přes videohovor, chat či klasicky telefonicky</li><li>potřebujete pouze počítač, tablet nebo telefon a připojení k internetu</li></ul><p><u><strong>Doprovodný program:</strong></u></p><ul><li>přednášky, webináře na zajímavá témata, poradenství zdarma</li></ul>]]></POPISCZ><LINKCZ>http://www.kdykde.cz/calendar/kdykde/2308160-veletrh-strechy-praha-solar-praha-a-remeslo-praha-2021-online</LINKCZ><PRODEJVSTUPENEK><![CDATA[https://registrace.strechy-praha.cz/events/veletrh-online?utm_campaign=paseo&utm_medium=kdykde&utm_source=udalost]]></PRODEJVSTUPENEK><IMG>http://www.kdykde.cz/img/calendar/events/2308160/2-strechypraha_logo_nove-slogan-2021-02-01-06-37-02.png</IMG><MISTOCZ><![CDATA[ČR]]></MISTOCZ><VHODNEPRORODICESDETMI>NE</VHODNEPRORODICESDETMI><VHODNEPRODOSPELE>ANO</VHODNEPRODOSPELE><VHODNEPROMLADEZ>ANO</VHODNEPROMLADEZ></EVENT><EVENT><id>2303827</id><TSNAMECZ>Výstavy</TSNAMECZ><DATEFROM>2020-12-01</DATEFROM><DATETO>2021-03-28</DATETO><NAMECZ><![CDATA[Retrospektiva Galiny Miklínové promění Villu Pellé v Muzeum Lichožroutů]]></NAMECZ><POPISCZ><![CDATA[<p>Muzeum Lichožroutů - vstup vítaný!!! Tak se bude jmenovat výběrová multimediální retrospektiva vynikající ilustrátorky, výtvarnice a filmařky Galiny Miklínové, kterou pro malé i velké návštěvníky připravila Villa Pellé. Výstava bude podle původních plánů zahájena 1. prosince 2020 online vernisáží.</p>]]></POPISCZ><LINKCZ>http://www.kdykde.cz/calendar/kdykde/2303827-retrospektiva-galiny-miklinove-promeni-villu-pelle-v-muzeum-lichozroutu</LINKCZ><PRODEJVSTUPENEK><![CDATA[]]></PRODEJVSTUPENEK><IMG>http://www.kdykde.cz/img/calendar/events/2303827/</IMG><MISTOCZ><![CDATA[ČR, Praha, Vila Pellé - Galerie Villa Pellé]]></MISTOCZ><VHODNEPRORODICESDETMI>NE</VHODNEPRORODICESDETMI><VHODNEPRODOSPELE>ANO</VHODNEPRODOSPELE><VHODNEPROMLADEZ>NE</VHODNEPROMLADEZ></EVENT></EVENTS>';

  const newsArr = await parseXml(XMLNews);

  return {
    paths: newsArr.EVENTS.EVENT.map((news) => ({
      params: {
        id: news.id,
      },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const XMLNews =
    '<EVENTS><EVENT><id>2308160</id><TSNAMECZ>Výstavy</TSNAMECZ><DATEFROM>2021-02-26</DATEFROM><DATETO>2021-02-27</DATETO><NAMECZ><![CDATA[ Veletrh Střechy Praha, Solar Praha a Řemeslo Praha 2021 ONLINE]]></NAMECZ><POPISCZ><![CDATA[<p>Vzhledem ke&nbsp;koronavirové pandemii jsme se rozhodli připravit&nbsp;<strong>pro rok 2021 novou formu souboru veletrhů<a href="https://registrace.strechy-praha.cz/events/veletrh-online?utm_campaign=paseo&amp;utm_medium=kdykde&amp;utm_source=udalost">&nbsp;Střechy Praha, Solar Praha a Řemeslo Praha</a>, a to&nbsp;</strong><strong>ONLINE</strong>, která navazuje na předchozí velmi úspěšné ročníky konané na pražském výstavišti v&nbsp;Letňanech.&nbsp;</p><ul><li><strong>Vyhrajte střechu na dům zdarma.&nbsp;</strong></li><li><strong>Online informace přímo od odborníků.</strong></li><li><strong>Zajímave veletržní slevy přímo na stáncích vystavovatelů.</strong></li></ul><p>Každý, kdo navštíví ONLINE veletrh (26. - 27. 2. 2021), získá&nbsp;<strong>vstupenku v&nbsp;hodnotě 100 Kč zdarma&nbsp;</strong>na tradiční soubor veletrhů Střechy-Solar-Řemeslo Praha 2022 v&nbsp;Praze&nbsp;Letňanech!</p><p><a href="https://registrace.strechy-praha.cz/events/veletrh-online?utm_campaign=paseo&amp;utm_medium=kdykde&amp;utm_source=udalost"><img src="/public/user/bannerON_300x250_nove.png" alt="bannerON_300x250_nove" width="300" height="250" /></a></p><p><u><strong>Co Vás čeká?</strong></u></p><ul><li>z&nbsp;pohodlí svého domova či kanceláře se v&nbsp;klidu dozvíte potřebné informace od vystavujících firem, prohlédnete či stáhnete si jejich prezentační materiály, můžete získat slevové vouchery či se zúčastnit soutěží o zajímavé ceny&nbsp;</li><li>virtuální stánky firem budou rozdělené dle oborů</li><li>s&nbsp;vystavovateli se v&nbsp;případě Vašeho zájmu můžete naživo spojit přes videohovor, chat či klasicky telefonicky</li><li>potřebujete pouze počítač, tablet nebo telefon a připojení k internetu</li></ul><p><u><strong>Doprovodný program:</strong></u></p><ul><li>přednášky, webináře na zajímavá témata, poradenství zdarma</li></ul>]]></POPISCZ><LINKCZ>http://www.kdykde.cz/calendar/kdykde/2308160-veletrh-strechy-praha-solar-praha-a-remeslo-praha-2021-online</LINKCZ><PRODEJVSTUPENEK><![CDATA[https://registrace.strechy-praha.cz/events/veletrh-online?utm_campaign=paseo&utm_medium=kdykde&utm_source=udalost]]></PRODEJVSTUPENEK><IMG>http://www.kdykde.cz/img/calendar/events/2308160/2-strechypraha_logo_nove-slogan-2021-02-01-06-37-02.png</IMG><MISTOCZ><![CDATA[ČR]]></MISTOCZ><VHODNEPRORODICESDETMI>NE</VHODNEPRORODICESDETMI><VHODNEPRODOSPELE>ANO</VHODNEPRODOSPELE><VHODNEPROMLADEZ>ANO</VHODNEPROMLADEZ></EVENT><EVENT><id>2303827</id><TSNAMECZ>Výstavy</TSNAMECZ><DATEFROM>2020-12-01</DATEFROM><DATETO>2021-03-28</DATETO><NAMECZ><![CDATA[Retrospektiva Galiny Miklínové promění Villu Pellé v Muzeum Lichožroutů]]></NAMECZ><POPISCZ><![CDATA[<p>Muzeum Lichožroutů - vstup vítaný!!! Tak se bude jmenovat výběrová multimediální retrospektiva vynikající ilustrátorky, výtvarnice a filmařky Galiny Miklínové, kterou pro malé i velké návštěvníky připravila Villa Pellé. Výstava bude podle původních plánů zahájena 1. prosince 2020 online vernisáží.</p>]]></POPISCZ><LINKCZ>http://www.kdykde.cz/calendar/kdykde/2303827-retrospektiva-galiny-miklinove-promeni-villu-pelle-v-muzeum-lichozroutu</LINKCZ><PRODEJVSTUPENEK><![CDATA[]]></PRODEJVSTUPENEK><IMG>http://www.kdykde.cz/img/calendar/events/2303827/</IMG><MISTOCZ><![CDATA[ČR, Praha, Vila Pellé - Galerie Villa Pellé]]></MISTOCZ><VHODNEPRORODICESDETMI>NE</VHODNEPRORODICESDETMI><VHODNEPRODOSPELE>ANO</VHODNEPRODOSPELE><VHODNEPROMLADEZ>NE</VHODNEPROMLADEZ></EVENT></EVENTS>';

  const newsArr = await parseXml(XMLNews);

  console.log(newsArr);

  const event = newsArr.EVENTS.EVENT.find((event) => event.id === id);

  console.log(event);

  return { props: { news: event } };
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
        <CityPin className={"text-purple"} />
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
      <Container className="main-container">
        <span className="breadcrumb">
          <Link href="/">Úvodní stránka</Link>&nbsp;/&nbsp;
          <MyLink href="/aktuality">Ubytování a dovolená</MyLink>
          &nbsp;/&nbsp;
          {news?.NAMECZ}
        </span>
        <Row>
          <Col md={2.5}>
            <SideCards />
          </Col>
          <Col md={9.5}>
            <Section className="mt-0 post-detail news">
              <SectionHeading>
                <h2>{news.NAMECZ}</h2>
                <div className={`d-flex align-items-center`}>
                  <span style={{ fontSize: "12px", marginTop: ".2em" }}>
                    <IoMdPin className={`icon text-purple`} />
                    {news.MISTOCZ}
                  </span>
                </div>
                <span class="news-badge-location bg-purple text-white">
                  <Moment format="DD. MMMM" date={news.DATEFROM} locale="cs" />
                  {" - "}
                  <Moment format="DD. MMMM" date={news.DATETO} locale="cs" />
                </span>
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
                <div className="content-wrapper">{parse(news.POPISCZ)}</div>
                <button className="btn bg-purple text-white mt-1">
                  <Link href={news.LINKCZ} target="_blank" rel="noopener">
                    Více informací
                  </Link>
                </button>
              </SectionContent>
            </Section>
            {news.gps && news.gps.latitude && news.gps.longitude && (
              <Section>
                <SectionHeading>Mapa</SectionHeading>
                <SectionContent>{renderMap()}</SectionContent>
              </Section>
            )}
          </Col>
        </Row>
      </Container>
    </Fragment>
  ) : (
    "Loading"
  );
};

export default AktualityDetail;
