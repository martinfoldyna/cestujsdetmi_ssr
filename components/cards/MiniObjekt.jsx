import React from "react";
import LoadingSkeleton from "../../layouts/LoadingSkeleton";
import { IoMdPin } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import enums from "../../enums";
import LocationBadge from "../locationBadge";
import MyLink from "../../layouts/MyLink";

const MiniObjekt = ({ objekt }) => {
  const images =
    objekt?.galerie && objekt?.galerie?.length > 0
      ? objekt?.galerie
      : objekt?.relative_galerie && objekt?.relative_galerie?.length > 0
      ? objekt?.relative_galerie
      : null;

  return objekt ? (
    <div className='objekt-mini'>
      {images ? (
        <div className='image-wrapper' style={{ position: "relative" }}>
          <Image
            className='objekt-mini-image'
            src={
              images[0].relativeUrl
                ? `https://www.cestujsdetmi.cz/${images[0].relativeUrl}`
                : images[0].formats.small.url
            }
            alt={
              images[0].alternativeText
                ? images[0].alternativeText
                : `${objekt.nazev} ${(i < 10 ? "0" : "") + `${i}`}`
            }
            layout='fill'
            objectFit='cover'
          />
        </div>
      ) : (
        ""
      )}
      <div className='data'>
        <MyLink href={`/ubytovani/detail/${objekt.id}/#top`}>
          <h3 className='objekt-mini-heading'>{objekt.nazev}</h3>
        </MyLink>
        <LocationBadge
          objekt={objekt}
          color={
            objekt.typ_objektu === enums.TYP_OBJEKTU.zabava.key
              ? "orange"
              : "blue"
          }
        />
      </div>
    </div>
  ) : (
    <LoadingSkeleton />
  );
};

MiniObjekt.propTypes = {};

export default MiniObjekt;
