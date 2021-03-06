import React from "react";
import { Row, Col } from "react-grid-system";
import { Section, SectionContent, SectionHeading } from "./Section";
import { translateColor, translateObjektPlan } from "../helpers/translators";
import { HiHome, HiOutlineChevronRight } from "react-icons/hi";
import MyLink from "./MyLink";
import Image from "next/image";
import enums from "../enums";
import { AiFillCompass } from "react-icons/ai";
import Link from "next/link";

const AdminObjekt = ({ objekt }) => {
  return (
    <Section className='admin-objekt'>
      <SectionHeading className='d-flex align-items-center'>
        {objekt.typ_objektu === enums.TYP_OBJEKTU.ubytovani.key ? (
          <HiHome className='text-blue link-icon' />
        ) : (
          <AiFillCompass className='text-orange link-icon' />
        )}
        <h2>{`${objekt.nazev}`}</h2>
      </SectionHeading>
      <SectionContent
        className='bg-white d-flex  mb-2'
        style={{ flexDirection: "column", flex: 1 }}
      >
        <Row
          className='content-wrapper justify-content-arround m-0 d-flex'
          style={{ flex: 1 }}
        >
          <Col lg={4} className='p-0 m-1'>
            <div className='img-wrapper'>
              <Image
                src={
                  objekt.relative_galerie && objekt.relative_galerie.length > 0
                    ? objekt.relative_galerie[0].sm
                    : objekt?.galerie && objekt?.galerie.length > 0
                    ? objekt?.galerie[0].formats.small.url
                    : "/img/placeholder.png"
                }
                alt={objekt.nazev}
                layout='fill'
                objectFit='cover'
                className='border-radius'
              />
            </div>
          </Col>
          <Col
            className='d-flex justify-content-center align-items-center'
            style={{ flexDirection: "column" }}
          >
            <div>
              {objekt.druh_zapisu ? (
                <div className='mb-1 border-grey d-flex justify-content-between'>
                  <div style={{ padding: ".5em 1em" }}>
                    Aktuální zápis:{" "}
                    <span
                      className={`text-${translateColor(objekt.druh_zapisu)}`}
                    >
                      {translateObjektPlan(objekt.druh_zapisu)}
                    </span>
                  </div>
                  <button className='btn btn-logo bg-blue text-white'>
                    Změnit <HiOutlineChevronRight className='btn-icon right' />
                  </button>
                </div>
              ) : (
                ""
              )}
              <div className='d-flex justify-content-between buttons'>
                <button className='btn btn-logo bg-blue text-white mr-2'>
                  <MyLink
                    href={`/admin/stats/${objekt?.id}`}
                    className='d-flex align-items-center'
                  >
                    Statistiky
                    <HiOutlineChevronRight className='btn-icon right' />
                  </MyLink>
                </button>
                <button className='btn btn-logo bg-blue text-white'>
                  <Link
                    href={`/auth/info/${objekt?.hodnota}`}
                    className='d-flex align-items-center'
                  >
                    <>
                      Přejít do objektu
                      <HiOutlineChevronRight className='btn-icon right' />
                    </>
                  </Link>
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
