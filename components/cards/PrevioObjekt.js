import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import parse from "html-react-parser";
import Moment from "react-moment";
import enums from "../../enums";
import { IoMdPin } from "react-icons/io";
import Image from "next/image";
import { Row, Col } from "react-grid-system";
import { fetchQuery } from "../../helpers/fetch";
import { trimString } from "../../helpers/helpers";

const PrevioObjekt = ({ objekt, background }) => {
  return (
    <Link href={`/${enums.TYP_OBJEKTU.ubytovani.url}/previo/${objekt?.hotId}`}>
      {/* WAS: */}
      {/*<div*/}
      {/*    className={`objekt-card d-flex align-items-center ${*/}
      {/*        background && `bg-${background}`*/}
      {/*    } ${!!background ? "border-grey" : ""}`}*/}
      {/*    ref={parentRef}*/}
      {/*>*/}
      <div
        className={`article-card d-flex ${background && `bg-${background}`}`}
      >
        <Row className="w-100 m-0">
          <Col sm={4} className="p-0">
            <div className="img-wrapper">
              <Image
                src={
                  objekt?.gallery && objekt?.gallery.length > 0
                    ? objekt.gallery.url
                    : "/img/placeholder.png"
                }
                alt={
                  objekt?.galerie
                    ? objekt?.galerie[0]?.alternativeText
                    : objekt.nazev
                }
                layout="fill"
                objectFit="cover"
                className="border-radius"
              />
            </div>
          </Col>
          <Col sm={8}>
            <div className="content-wrapper">
              <h3
                className="article-heading"
                // className={
                //   color
                //     ? `text-${color}`
                //     : `text-${translateColor(objekt.kategorie)}`
                // }
              >
                {objekt?.name}
              </h3>

              {objekt?.address &&
                objekt?.address.name &&
                objekt?.address.street &&
                objekt?.address.city && (
                  <div className="d-flex article-location">
                    <IoMdPin className="text-blue" />
                    {objekt.address.name}, {objekt.address.street},{" "}
                    {objekt.address.city}
                  </div>
                )}
              <div className="article-description">
                {objekt.descriptions && objekt.descriptions.shortDescription ? (
                  parse(trimString(objekt.descriptions.shortDescription, 40))
                ) : (
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Atque fuga quod repellendus repudiandae. Esse iste nihil
                    nostrum placeat quas, rem ut!
                  </p>
                )}
                <br />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Link>
  );
};

export default PrevioObjekt;
