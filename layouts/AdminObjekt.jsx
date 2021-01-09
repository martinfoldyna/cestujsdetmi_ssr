import React from "react";
import { Row, Col } from "react-grid-system";
import { Section, SectionContent, SectionHeading } from "./Section";
import { translateColor } from "../helpers/translators";
import { HiOutlineChevronRight } from "react-icons/hi";
import { MyLink } from "./MyLink";
import Image from "next/image";

const AdminObjekt = ({ objekt }) => {
  return (
    <Section className="admin-objekt">
      <SectionHeading>
        <h2>{`${objekt.nazev}`}</h2>
      </SectionHeading>
      <SectionContent className="mb-2">
        <Row className="content-wrapper justify-content-arround pt-1 m-0">
          <Col lg={4}>
            <div className="img-wrapper">
              <Image
                src={
                  objekt.galerie && objekt.galerie.length > 0
                    ? objekt.galerie[0].sm
                    : "/img/placeholder.png"
                }
                layout="fill"
                objectFit="cover"
              />
            </div>
          </Col>
          <Col
            className="d-flex justify-content-center align-items-center"
            style={{ flexDirection: "column" }}
          >
            <div>
              {objekt.druh_zapisu ? (
                <div className="mb-1 border-grey d-flex justify-content-between">
                  <div style={{ padding: ".5em 1em" }}>
                    Aktuální zápis:{" "}
                    <span
                      className={`text-${translateColor(
                        objekt.druh_zapisu.key
                      )}`}
                    >
                      {objekt.druh_zapisu.value}
                    </span>
                  </div>
                  <button className="btn btn-logo bg-blue text-white">
                    Změnit <HiOutlineChevronRight className="btn-icon right" />
                  </button>
                </div>
              ) : (
                ""
              )}
              <div className="d-flex justify-content-end buttons">
                <button className="btn btn-logo bg-blue text-white mr-2">
                  <MyLink
                    href={`/auth/info/${
                      objekt?.hodnota ? objekt?.hodnota : "123"
                    }`}
                    className="d-flex align-items-center"
                  >
                    Statistiky
                    <HiOutlineChevronRight className="btn-icon right" />
                  </MyLink>
                </button>
                <button className="btn btn-logo bg-blue text-white">
                  <MyLink
                    href={`/auth/info/${
                      objekt?.hodnota ? objekt?.hodnota : "123"
                    }`}
                    className="d-flex align-items-center"
                  >
                    Přejít do objektu
                    <HiOutlineChevronRight className="btn-icon right" />
                  </MyLink>
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </SectionContent>
    </Section>
  );
};

export default AdminObjekt;
