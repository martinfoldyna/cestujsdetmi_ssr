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
import MyLink from "../../layouts/MyLink";

const Objekt = ({
  objekt,
  background,
  useNextImg = true,
  badge,
  color = "blue",
}) => {
  const parentRef = useRef(null);
  const [imageHeight, setImgHeight] = useState(0);

  useEffect(() => {
    setImgHeight(parentRef.current?.clientHeight - 5);
  }, [parentRef]);

  const isNews = objekt.kategorie === "aktuality";
  const link = `/${enums.TYP_OBJEKTU[objekt?.typ_objektu]?.url}/detail/${
    objekt?.hodnota
  }`;

  return (
    <Link href={link}>
      <div
        className={`article-card d-flex ${background && `bg-${background}`}`}
        ref={parentRef}
      >
        <div className='img-wrapper mr-0'>
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
              layout='fill'
              objectFit='cover'
              className='border-radius'
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
          {isNews && (
            <div className='article-date-range'>
              <p className='bg-purple'>
                <Moment format='DD.MM.YY'>{objekt.date_from}</Moment> -{" "}
                <Moment format='DD.MM.YY'>{objekt.date_to}</Moment>
              </p>
            </div>
          )}
          {badge && (
            <div className='article-date-range'>
              <p
                className={`bg-${translateColor(
                  objekt.typ_objektu
                )} d-flex align-items-center`}
              >
                {objekt.typ_objektu === enums.TYP_OBJEKTU.ubytovani.key && (
                  <HiHome className='icon' />
                )}
                {objekt.typ_objektu === enums.TYP_OBJEKTU.zabava.key && (
                  <AiFillCompass className='icon' />
                )}
                {enums.TYP_OBJEKTU[objekt.typ_objektu].value.toLowerCase()}
              </p>
            </div>
          )}
        </div>
        <div className='content-wrapper'>
          <h3 className='article-heading'>
            {objekt?.nazev ? objekt?.nazev : "Nadpis"}
          </h3>

          {objekt?.adresa_ulice &&
            objekt?.adresa_mesto &&
            objekt?.adresa_psc &&
            objekt?.adresa_kraj &&
            objekt?.adresa_oblast && (
              <div className='d-flex article-location align-items-center'>
                <IoMdPin className={`text-${color}`} />
                {objekt.adresa_mesto},{" "}
                {enums.KRAJ[objekt.adresa_kraj.replace("-", "_")].value} kraj
              </div>
            )}
          {(objekt.kraj || objekt.mesto) && (
            <div className='d-flex article-location align-items-center'>
              <IoMdPin className={`text-${color}`} />
              {objekt.mesto ? `${objekt.mesto.value}, ` : ""}
              {objekt.kraj ? `${objekt.kraj.value} kraj` : ""}
            </div>
          )}
          <div className='article-description'>
            {objekt.perex ? (
              parse(trimString(objekt.perex, 40))
            ) : objekt?.zakladni_popis || objekt?.text ? (
              <p>
                {parse(trimString(objekt?.zakladni_popis || objekt?.text, 40))}
                ...
              </p>
            ) : (
              ""
            )}
          </div>
          <div className='d-flex justify-content-end show-objekt'>
            <MyLink href={link} className={`text-${color}`}>
              Zobrazit &rsaquo;
            </MyLink>
          </div>
        </div>
        {/*  </Col>*/}
        {/*</Row>*/}
      </div>
    </Link>
  );
};

export default Objekt;
