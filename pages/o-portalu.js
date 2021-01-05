import React from "react";
import { Col, Row } from "react-grid-system";
import { FaUser } from "react-icons/all";
import Link from "next/link";
import { Section, SectionContent, SectionHeading } from "../layouts/Section";
import SideCards from "../layouts/SideCards";
import HeadingWithIcon from "../layouts/HeadingWithIcon";

const OPortalu = () => {
  return (
    <div>
      <span className="breadcrumb">
        <Link href="/">Úvodní stránka</Link>&nbsp;/&nbsp;O portálu
      </span>

      <HeadingWithIcon
        heading="Seznam objektů a nastavení účtu"
        background="red"
        icon={FaUser}
      />
      <div className="data-wrapper">
        <Row>
          <Col md={2.5}>
            <SideCards />
          </Col>
          <Col>
            <Section className="border-section mt-0">
              <SectionHeading background="none">
                <h1>Vize portálu Cestuj s dětmi.cz</h1>
              </SectionHeading>
              <SectionContent>
                <div>
                  <p>
                    Úkolem portálu Cestuj s dětmi.cz je vytvoření rozsáhlé
                    nabídky možností, jak plnohodnotně strávit více času s
                    našimi ratolestmi a zároveň nabídnout rodinám s dětmi i
                    vhodné ubytování poskytující komfort nejen malému klientovi.
                  </p>
                  <p>
                    V dnešní uspěchané době, kdy na děti nemáme zdaleka tolik
                    času, kolik bychom si přáli, nám každá minuta, kterou jim
                    můžeme věnovat, připadá jako malý zázrak. Proto se portál
                    Cestuj s dětmi.cz snaží vyplnit prostor mezi ostatními weby,
                    které se orientují převážně na dospělou klientelu, zatímco
                    na děti a trávení jejich volného času se stále zapomíná.
                  </p>
                  <p>
                    Z tohoto hlediska Vám portál Cestuj s dětmi.cz nabízí
                    ucelenou, přehlednou a především prověřenou nabídku
                    ubytovacích zařízení, která jsou připravena vyslyšet dětská
                    přání a požadavky a jsou vybavena takovým inventářem, který
                    pobyt rodičům a hlavně jejich dětem zpříjemní a usnadní.
                  </p>
                  <p>
                    Dále je naší snahou nabídnout Vám nepřeberné množství
                    kvalitních středisek a zařízení vhodných pro trávení volného
                    času s dětmi, kde budou Vaše ratolesti nejen šťastné, ale
                    kde se mohou obohatit o nové zážitky, zkušenosti a znalosti
                    z oblastí jako sport, kultura, příroda, ale především o
                    pocit soudržnosti a sounáležitosti rodiny, která tráví volný
                    čas pohromadě.
                  </p>
                  <p>
                    DEJME DĚTEM NOVÉ PODNĚTY, ZÁŽITKY A DOJMY, JEDNOU NÁM
                    PODĚKUJÍ!
                  </p>
                  <p>
                    BUĎME S DĚTMI, DOKUD JSOU MALÉ, BUDOU S NÁMI, AŽ VYROSTOU!
                  </p>
                  <p>
                    VĚNUJME VOLNÝ ČAS NAŠIM DĚTEM, ZJIŠŤUJME JEJICH PŘÁNÍ, SNY A
                    TOUHY!
                  </p>
                  <p>{"\n"}Spolupráce s portálem Cestuj s dětmi</p>
                  <p>
                    Provozujete vhodné zařízení, které svým účelem splňuje vizi
                    portálu Cestuj s dětmi.cz? {"\n"}Nabízíme Vám spolupráci,
                    kde naším společným cílem bude přivést více klientů do
                    Vašeho zařízení. Zároveň získáte dobrého partnera pro
                    kvalitní prezentaci Vašeho zařízení na předních postech
                    internetových vyhledávačů.
                  </p>
                </div>
              </SectionContent>
            </Section>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default OPortalu;