import React from "react";
import LoadingSkeleton from "../../layouts/LoadingSkeleton";
import { IoMdPin } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import enums from "../../enums";

const MiniObjekt = ({ objekt }) => {
  return objekt ? (
    <div className="objekt-mini">
      {objekt?.galerie || objekt?.relative_galerie ? (
        <div className="image-wrapper" style={{ position: "relative" }}>
          <Image
            className="objekt-mini-image mt-1"
            src={
              objekt.relative_galerie
                ? objekt.relative_galerie[0].sm.includes("http") ||
                  objekt.relative_galerie[0].sm.includes("https")
                  ? objekt.relative_galerie[0].sm
                  : `https://www.cestujsdetmi.cz/${objekt.relative_galerie[0]}`
                : "/img/placeholder.png"
            }
            alt={
              objekt.relative_galerie && objekt.relative_galerie?.length > 0
                ? objekt?.relative_galerie[0].popis
                : objekt.nazev
            }
            layout="fill"
          />
        </div>
      ) : (
        ""
      )}
      <div className="data">
        <Link href={`/tipy-na-ubytovani/detail/${objekt.id}/#top`}>
          <h3 className="objekt-mini-heading mb-1">{objekt.nazev}</h3>
        </Link>
        {objekt.adresa && (
          <div className="d-flex">
            <IoMdPin
              className={`text-${
                objekt.hlavni_kategorie === enums.KATEGORIE.ZABAVA
                  ? "orange"
                  : "blue"
              }`}
            />
            <p style={{ fontSize: "12px" }} className="m-0">
              {objekt.nazev}, {objekt.adresa.ulice}, {objekt.adresa.mesto}
            </p>
          </div>
        )}
      </div>
    </div>
  ) : (
    <LoadingSkeleton />
  );
};

MiniObjekt.propTypes = {};

export default MiniObjekt;
