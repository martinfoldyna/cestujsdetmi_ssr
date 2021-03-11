import React from "react";
import { IoMdPin } from "react-icons/io";

export default function LocationBadge({ objekt, color }) {
  return objekt.adresa_ulice && (objekt.kraj || objekt.oblast) ? (
    <div className={`d-flex align-items-center`}>
      <span style={{ fontSize: "12px", marginTop: ".2em" }}>
        <IoMdPin className={`icon text-${color}`} />
        {objekt.nazev}, {objekt.adresa_ulice}
        {objekt.mesto
          ? ", " + objekt.mesto.value
          : ", " + objekt.adresa?.mesto
          ? objekt.adresa?.mesto
          : ""}
        {objekt.kraj
          ? `, ${objekt.kraj.value} kraj`
          : `, ${objekt.adresa?.kraj} kraj`}
        {objekt.adresa_stat ? `, ${objekt.adresa_stat}` : ""}
      </span>
    </div>
  ) : (
    ""
  );
}
