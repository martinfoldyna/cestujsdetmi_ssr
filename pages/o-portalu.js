import React from "react";
import { Col, Container, Row } from "react-grid-system";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { Section, SectionContent, SectionHeading } from "../layouts/Section";
import SideCards from "../layouts/SideCards";
import HeadingWithIcon from "../layouts/HeadingWithIcon";
import Head from "next/head";

const OPortalu = () => {
  return (
    <>
      <Head>
        <title>O portálu Cestuj s dětmi.cz | Cestuj s dětmi.cz</title>
        <meta
          name="description"
          content="O portálu Cestuj s dětmi.cz. Vize, volný čas strávený s dětmi."
        />
        <meta
          name="keywords"
          content="vylet,tipy,dovolena,s detmi,ubytovani,"
        />
        <meta name="robots" content="index, follow" />
      </Head>
      <Container className="main-container">
        <span className="breadcrumb">
          <Link href="/">Úvodní stránka</Link>&nbsp;/&nbsp;O portálu
        </span>

        <HeadingWithIcon
          heading="Seznam objektů a nastavení účtu"
          background="red"
          icon={FaUser}
          icon_size="medium"
        />
        <div className="data-wrapper">
          <Row>
            <Col md={2.5} className="sidebar">
              <SideCards />
            </Col>
            <Col className="content">
              <Section className=" mt-0">
                <SectionHeading>
                  <h2>Vize portálu Cestuj s dětmi.cz</h2>
                </SectionHeading>
                <SectionContent>
                  <div>
                    <p>
                      Úkolem portálu Cestuj s dětmi.cz je vytvoření rozsáhlé
                      nabídky možností, jak plnohodnotně strávit více času s
                      našimi ratolestmi a zároveň nabídnout rodinám s dětmi i
                      vhodné ubytování poskytující komfort nejen malému
                      klientovi.
                    </p>
                    <p>
                      V dnešní uspěchané době, kdy na děti nemáme zdaleka tolik
                      času, kolik bychom si přáli, nám každá minuta, kterou jim
                      můžeme věnovat, připadá jako malý zázrak. Proto se portál
                      Cestuj s dětmi.cz snaží vyplnit prostor mezi ostatními
                      weby, které se orientují převážně na dospělou klientelu,
                      zatímco na děti a trávení jejich volného času se stále
                      zapomíná.
                    </p>
                    <p>
                      Z tohoto hlediska Vám portál Cestuj s dětmi.cz nabízí
                      ucelenou, přehlednou a především prověřenou nabídku
                      ubytovacích zařízení, která jsou připravena vyslyšet
                      dětská přání a požadavky a jsou vybavena takovým
                      inventářem, který pobyt rodičům a hlavně jejich dětem
                      zpříjemní a usnadní.
                    </p>
                    <p>
                      Dále je naší snahou nabídnout Vám nepřeberné množství
                      kvalitních středisek a zařízení vhodných pro trávení
                      volného času s dětmi, kde budou Vaše ratolesti nejen
                      šťastné, ale kde se mohou obohatit o nové zážitky,
                      zkušenosti a znalosti z oblastí jako sport, kultura,
                      příroda, ale především o pocit soudržnosti a
                      sounáležitosti rodiny, která tráví volný čas pohromadě.
                    </p>
                    <p>
                      DEJME DĚTEM NOVÉ PODNĚTY, ZÁŽITKY A DOJMY, JEDNOU NÁM
                      PODĚKUJÍ!
                    </p>
                    <p>
                      BUĎME S DĚTMI, DOKUD JSOU MALÉ, BUDOU S NÁMI, AŽ VYROSTOU!
                    </p>
                    <p>
                      VĚNUJME VOLNÝ ČAS NAŠIM DĚTEM, ZJIŠŤUJME JEJICH PŘÁNÍ, SNY
                      A TOUHY!
                    </p>
                    <p>{"\n"}Spolupráce s portálem Cestuj s dětmi</p>
                    <p>
                      Provozujete vhodné zařízení, které svým účelem splňuje
                      vizi portálu Cestuj s dětmi.cz? {"\n"}Nabízíme Vám
                      spolupráci, kde naším společným cílem bude přivést více
                      klientů do Vašeho zařízení. Zároveň získáte dobrého
                      partnera pro kvalitní prezentaci Vašeho zařízení na
                      předních postech internetových vyhledávačů.
                    </p>
                  </div>
                </SectionContent>
              </Section>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default OPortalu;
