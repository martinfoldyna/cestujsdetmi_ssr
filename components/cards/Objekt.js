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
import { translateColor } from "../../helpers/translators";
import { HiHome } from "react-icons/hi";
import { AiFillCompass } from "react-icons/ai";

const Objekt = ({ objekt, background, useNextImg = true, badge }) => {
  const parentRef = useRef(null);
  const [imageHeight, setImgHeight] = useState(0);

  useEffect(() => {
    setImgHeight(parentRef.current?.clientHeight - 5);
  }, [parentRef]);

  const isNews = objekt.kategorie === "aktuality";

  console.log(objekt?.typ_objektu);

  return (
    <Link
      href={`/${enums.TYP_OBJEKTU[objekt?.typ_objektu]?.url}/detail/${
        objekt?.hodnota
      }`}
    >
      {/* WAS: */}
      {/*<div*/}
      {/*    className={`objekt-card d-flex align-items-center ${*/}
      {/*        background && `bg-${background}`*/}
      {/*    } ${!!background ? "border-grey" : ""}`}*/}
      {/*    ref={parentRef}*/}
      {/*>*/}
      <div
        className={`article-card d-flex ${background && `bg-${background}`}`}
        ref={parentRef}
      >
        {/*<Row className="w-100 m-0">*/}
        {/*  <Col sm={4} className="p-0">*/}
        <div className="img-wrapper mr-0">
          {useNextImg ? (
            <Image
              src={
                objekt?.image_filename
                  ? `https://www.cestujsdetmi.cz/${objekt.image_filename}`
                  : objekt?.galerie && objekt?.galerie.length > 0
                  ? objekt?.galerie[0].formats.small.url
                  : objekt?.relative_galerie &&
                    objekt.relative_galerie.length > 0
                  ? `https://www.cestujsdetmi.cz/${objekt.relative_galerie[0].relativeUrl}`
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
          ) : (
            <img
              src={
                objekt?.galerie && objekt?.galerie?.length > 0
                  ? objekt?.galerie[0].sm
                  : "/img/placeholder.png"
              }
              alt={objekt?.galerie && objekt?.galerie[0]?.alternativeText}
            />
          )}
          {/*<img src={placeholder} alt="placeholder-image" />*/}
          {isNews && (
            <div className="article-date-range">
              <p className="bg-purple">
                <Moment format="DD.MM.YY">{objekt.date_from}</Moment> -{" "}
                <Moment format="DD.MM.YY">{objekt.date_to}</Moment>
              </p>
            </div>
          )}
          {badge && (
            <div className="article-date-range">
              <p
                className={`bg-${translateColor(
                  objekt.typ_objektu
                )} d-flex align-items-center`}
              >
                {objekt.typ_objektu === enums.TYP_OBJEKTU.ubytovani.key && (
                  <HiHome className="icon" />
                )}
                {objekt.typ_objektu === enums.TYP_OBJEKTU.zabava.key && (
                  <AiFillCompass className="icon" />
                )}
                {enums.TYP_OBJEKTU[objekt.typ_objektu].value.toLowerCase()}
              </p>
            </div>
          )}
        </div>
        {/*</Col>*/}
        {/*<Col sm={8}>*/}
        <div className="content-wrapper">
          <h3
            className="article-heading"
            // className={
            //   color
            //     ? `text-${color}`
            //     : `text-${translateColor(objekt.kategorie)}`
            // }
          >
            {objekt?.nazev ? objekt?.nazev : "Nadpis"}
          </h3>

          {objekt?.adresa_ulice &&
            objekt?.adresa_mesto &&
            objekt?.adresa_psc &&
            objekt?.adresa_kraj &&
            objekt?.adresa_oblast && (
              <div className="d-flex article-location align-items-center">
                <IoMdPin className="text-blue" />
                {objekt.adresa_mesto},{" "}
                {enums.KRAJ[objekt.adresa_kraj.replace("-", "_")].value} kraj
              </div>
            )}
          <div className="article-description">
            {objekt.perex ? (
              parse(trimString(objekt.perex, 40))
            ) : objekt?.zakladni_popis || objekt?.text ? (
              <p>
                {parse(trimString(objekt?.zakladni_popis || objekt?.text, 40))}
                ...
              </p>
            ) : (
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque
                fuga quod repellendus repudiandae. Esse iste nihil nostrum
                placeat quas, rem ut!
              </p>
            )}
          </div>
        </div>
        {/*  </Col>*/}
        {/*</Row>*/}
      </div>
    </Link>
  );
};

export default Objekt;
