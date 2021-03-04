import React, { useState } from "react";
import { Col, Container, Row } from "react-grid-system";
import Link from "next/link";
import enums from "../../enums";
import HeadingWithIcon from "../../layouts/HeadingWithIcon";
import { HiNewspaper } from "react-icons/hi";
import SideBar from "../../layouts/Sidebar";
import { fetchQuery } from "../../helpers/fetch";
import Head from "next/head";
import News from "../../layouts/News";
import { GlobalContext } from "../../context/GlobalContext";
import { parseXml } from "../../helpers/helpers";
import SideCards from "../../layouts/SideCards";

export async function getStaticProps() {
  // const newsArr = await fetchQuery(`rss`);
  //
  // return { props: { newsArr: newsArr.data }, revalidate: 3600 };

  const XMLNews =
    '<EVENTS><EVENT><id>2308160</id><TSNAMECZ>Výstavy</TSNAMECZ><DATEFROM>2021-02-26</DATEFROM><DATETO>2021-02-27</DATETO><NAMECZ><![CDATA[ Veletrh Střechy Praha, Solar Praha a Řemeslo Praha 2021 ONLINE]]></NAMECZ><POPISCZ><![CDATA[<p>Vzhledem ke&nbsp;koronavirové pandemii jsme se rozhodli připravit&nbsp;<strong>pro rok 2021 novou formu souboru veletrhů<a href="https://registrace.strechy-praha.cz/events/veletrh-online?utm_campaign=paseo&amp;utm_medium=kdykde&amp;utm_source=udalost">&nbsp;Střechy Praha, Solar Praha a Řemeslo Praha</a>, a to&nbsp;</strong><strong>ONLINE</strong>, která navazuje na předchozí velmi úspěšné ročníky konané na pražském výstavišti v&nbsp;Letňanech.&nbsp;</p><ul><li><strong>Vyhrajte střechu na dům zdarma.&nbsp;</strong></li><li><strong>Online informace přímo od odborníků.</strong></li><li><strong>Zajímave veletržní slevy přímo na stáncích vystavovatelů.</strong></li></ul><p>Každý, kdo navštíví ONLINE veletrh (26. - 27. 2. 2021), získá&nbsp;<strong>vstupenku v&nbsp;hodnotě 100 Kč zdarma&nbsp;</strong>na tradiční soubor veletrhů Střechy-Solar-Řemeslo Praha 2022 v&nbsp;Praze&nbsp;Letňanech!</p><p><a href="https://registrace.strechy-praha.cz/events/veletrh-online?utm_campaign=paseo&amp;utm_medium=kdykde&amp;utm_source=udalost"><img src="/public/user/bannerON_300x250_nove.png" alt="bannerON_300x250_nove" width="300" height="250" /></a></p><p><u><strong>Co Vás čeká?</strong></u></p><ul><li>z&nbsp;pohodlí svého domova či kanceláře se v&nbsp;klidu dozvíte potřebné informace od vystavujících firem, prohlédnete či stáhnete si jejich prezentační materiály, můžete získat slevové vouchery či se zúčastnit soutěží o zajímavé ceny&nbsp;</li><li>virtuální stánky firem budou rozdělené dle oborů</li><li>s&nbsp;vystavovateli se v&nbsp;případě Vašeho zájmu můžete naživo spojit přes videohovor, chat či klasicky telefonicky</li><li>potřebujete pouze počítač, tablet nebo telefon a připojení k internetu</li></ul><p><u><strong>Doprovodný program:</strong></u></p><ul><li>přednášky, webináře na zajímavá témata, poradenství zdarma</li></ul>]]></POPISCZ><LINKCZ>http://www.kdykde.cz/calendar/kdykde/2308160-veletrh-strechy-praha-solar-praha-a-remeslo-praha-2021-online</LINKCZ><PRODEJVSTUPENEK><![CDATA[https://registrace.strechy-praha.cz/events/veletrh-online?utm_campaign=paseo&utm_medium=kdykde&utm_source=udalost]]></PRODEJVSTUPENEK><IMG>http://www.kdykde.cz/img/calendar/events/2308160/2-strechypraha_logo_nove-slogan-2021-02-01-06-37-02.png</IMG><MISTOCZ><![CDATA[ČR]]></MISTOCZ><VHODNEPRORODICESDETMI>NE</VHODNEPRORODICESDETMI><VHODNEPRODOSPELE>ANO</VHODNEPRODOSPELE><VHODNEPROMLADEZ>ANO</VHODNEPROMLADEZ></EVENT><EVENT><id>2303827</id><TSNAMECZ>Výstavy</TSNAMECZ><DATEFROM>2020-12-01</DATEFROM><DATETO>2021-03-28</DATETO><NAMECZ><![CDATA[Retrospektiva Galiny Miklínové promění Villu Pellé v Muzeum Lichožroutů]]></NAMECZ><POPISCZ><![CDATA[<p>Muzeum Lichožroutů - vstup vítaný!!! Tak se bude jmenovat výběrová multimediální retrospektiva vynikající ilustrátorky, výtvarnice a filmařky Galiny Miklínové, kterou pro malé i velké návštěvníky připravila Villa Pellé. Výstava bude podle původních plánů zahájena 1. prosince 2020 online vernisáží.</p>]]></POPISCZ><LINKCZ>http://www.kdykde.cz/calendar/kdykde/2303827-retrospektiva-galiny-miklinove-promeni-villu-pelle-v-muzeum-lichozroutu</LINKCZ><PRODEJVSTUPENEK><![CDATA[]]></PRODEJVSTUPENEK><IMG>http://www.kdykde.cz/img/calendar/events/2303827/</IMG><MISTOCZ><![CDATA[ČR, Praha, Vila Pellé - Galerie Villa Pellé]]></MISTOCZ><VHODNEPRORODICESDETMI>NE</VHODNEPRORODICESDETMI><VHODNEPRODOSPELE>ANO</VHODNEPRODOSPELE><VHODNEPROMLADEZ>NE</VHODNEPROMLADEZ></EVENT></EVENTS>';

  const newsArr = await parseXml(XMLNews);

  return { props: { newsArr: newsArr }, revalidate: 3600 };
}

const Aktuality = ({ newsArr }) => {
  // How many objects per page to show
  const limit = 20;

  console.log(newsArr);

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
          name='description'
          content='Tipy kam na víkend s dětmi. Najdeme Vám ten správný tip, kam s dětmi na víkend.'
        />
        <meta
          name='keywords'
          content='kam,na,víkend,s dětmi,o víkendu,tip,tipy,akce,pro děti,'
        />
        <meta name='robots' content='index, follow' />
      </Head>
      <Container className='main-container'>
        <span className='breadcrumb'>
          <Link href='/'>Úvodní stránka</Link>&nbsp;/&nbsp;Index
        </span>
        <HeadingWithIcon background='purple' heading='Index' icon={HiNewspaper}>
          <p>
            Přehled aktuálně konaných akcí pro rodiny s dětmi. Tipy kam s dětmi
            za zábavou, kulturou.
          </p>
        </HeadingWithIcon>
        <div className='data-wrapper'>
          <Row>
            <Col md={2.5}>
              <SideCards color='purple' topic={enums.TYP_OBJEKTU.aktualita} />
            </Col>
            <Col>
              <div className='filtered-objects bg-white border-radius'>
                {newsArr?.EVENTS.EVENT.map(
                  (news, index) =>
                    index < next && <News key={news.id} news={news} />
                )}
              </div>
            </Col>
          </Row>
          <button className='btn bg-purple text-white'>Načíst další</button>
        </div>
      </Container>
    </>
  );
};

export default Aktuality;
