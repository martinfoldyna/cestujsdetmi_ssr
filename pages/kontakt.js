import Link from "next/link";
import { Col, Container, Row } from "react-grid-system";
import { MdPermContactCalendar } from "react-icons/md";
import { Section, SectionContent, SectionHeading } from "../layouts/Section";
import SideCards from "../layouts/SideCards";
import HeadingWithIcon from "../layouts/HeadingWithIcon";
import React from "react";

const Kontakt = () => {
  return (
    <Container style={{ maxWidth: "1220px" }}>
      <div className="contact">
        <span className="breadcrumb">
          <Link href="/">Úvodní stránka</Link>&nbsp;/&nbsp;Kontakt
        </span>
        <HeadingWithIcon
          background="blue"
          heading="Kontakt"
          icon={MdPermContactCalendar}
          icon_size="medium"
        />
        <div className="data-wrapper">
          <Row>
            <Col md={2.5} className="sidebar">
              <SideCards />
            </Col>
            <Col className="content">
              <Section className="border-section mt-0">
                <SectionHeading background="none">
                  <h2>Martina Procházková</h2>
                </SectionHeading>
                <SectionContent>
                  <p>MP Agency</p>
                  <p>Provozovatel portálů</p>
                  <ul className="list-style-none pl-0">
                    <li>
                      <a href="https://cestujsdetmi.cz" target="_blank">
                        Cestuj s dětmi
                      </a>
                    </li>
                    <li>
                      <a href="https://kamsdetmivpraze.cz">
                        Kamsdetmivpraze.cz
                      </a>
                    </li>
                  </ul>
                  <address>
                    <ul className="pl-0 list-style-none">
                      <li>V Luzích 45</li>
                      <li>466 02 Jablonec nad Nisou</li>
                    </ul>
                  </address>
                  <ul className="pl-0 list-style-none">
                    <li>
                      Email:{" "}
                      <a href="mailto:info@cestujsdetmi.cz">
                        info@cestujsdetmi.cz
                      </a>
                    </li>
                    <li>
                      Tel.: <a href="tel:+420603716814">+420 603 716 814</a>
                    </li>
                  </ul>
                  <p>
                    Provozní doba agentury: pondělí - pátek 9:00 - 16:00 hodin
                  </p>
                  <p>IČ: 694 29 031</p>
                  <p>
                    Bankovní spojení: ČSOB Jablonec nad Nisou, číslo účtu:
                    234678148 / 0300
                  </p>
                  <p>
                    Živnostenské oprávnění vydal úřad příslušný podle §71 odst.2
                    živnostenského zákona: Městský úřad Jablonec nad Nisou,
                    zapsáno od 27.9.1999.
                  </p>
                </SectionContent>
              </Section>
              <Section className="border-section">
                <SectionHeading background="none">
                  <h2>Libuše Farská</h2>
                </SectionHeading>
                <SectionContent>
                  <p>Editorka</p>
                  <ul className="pl-0 list-style-none">
                    <li>
                      Email:{" "}
                      <a href="mailto:libuse@cestujsdetmi.cz">
                        libuse@cestujsdetmi.cz
                      </a>
                    </li>
                    <li>
                      Tel.: <a href="tel:+420603716814">+420 603 716 814</a>
                      <span> (Po-Pá 8:00 - 16:00hod.)</span>
                    </li>
                  </ul>
                </SectionContent>
              </Section>
              <Section className="border-section">
                <SectionHeading background="none">
                  <h2>Webmaster portálu</h2>
                </SectionHeading>
                <SectionContent>
                  <p>Správce a administrátor</p>
                  <a href="mailto:webmaster@cestujsdetmi.cz">
                    webmaster@cestujsdetmi.cz
                  </a>
                </SectionContent>
              </Section>
            </Col>
          </Row>
        </div>
      </div>
    </Container>
  );
};

export default Kontakt;
