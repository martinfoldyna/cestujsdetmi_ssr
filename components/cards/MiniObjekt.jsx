import React from "react";
import LoadingSkeleton from "../../layouts/LoadingSkeleton";
import { IoMdPin } from "react-icons/io";
import Link from "next/link";

const MyComponent = ({ objekt }) => {
  return objekt ? (
    <div className="objekt-mini">
      <Link href={`/tipy-na-ubytovani/detail/${objekt.id}/#top`}>
        <h3 className="objekt-mini-heading mb-1">{objekt.nazev}</h3>
      </Link>
      {objekt.adresa && (
        <div className="d-flex">
          <IoMdPin className="text-blue" />
          <p style={{ fontSize: "12px" }} className="m-0">
            {objekt.nazev}, {objekt.adresa.ulice}, {objekt.adresa.mesto}
          </p>
        </div>
      )}
      <img
        className="objekt-mini-image mt-1"
        src={objekt.galerie[0].sm}
        alt={objekt.galerie[0].popis ? objekt.galerie[0].popis : objekt.nazev}
      />
    </div>
  ) : (
    <LoadingSkeleton />
  );
};

MyComponent.propTypes = {};

export default MyComponent;
