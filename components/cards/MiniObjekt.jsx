import React from "react";
import LoadingSkeleton from "../../layouts/LoadingSkeleton";
import Image from "next/image";
import enums from "../../enums";
import LocationBadge from "../LocationBadge";
import MyLink from "../../layouts/MyLink";
import Link from "next/link";

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
              typeof images[0] === "string"
                ? images[0]
                : images[0].relativeUrl
                ? `https://www.cestujsdetmi.cz/${images[0].relativeUrl}`
                : images[0].formats.small.url
            }
            alt={
              typeof images[0] === "string"
                ? images[0]
                : images[0].alternativeText
                ? images[0].alternativeText
                : `${objekt.nazev}`
            }
            layout='fill'
            objectFit='cover'
          />
        </div>
      ) : (
        ""
      )}
      <div className='data'>
        <Link href={`/ubytovani/detail/${objekt.id}/#top`}>
          <h3 className='objekt-mini-heading'>{objekt.nazev}</h3>
        </Link>
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
