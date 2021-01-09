import { useEffect, useState } from "react";
import parse from "html-react-parser";
import Link from "next/link";
import { translateColor } from "../../helpers/translators";

const Objekt = ({ data }) => {
  const [color, setColor] = useState("");
  const objektValue = data.hodnota;

  useEffect(() => {
    setColor(translateColor(objektValue));
  }, []);

  return (
    <div className="plan-card" key={data.id}>
      <h3 className={`text-${color} card-heading`}>{data.nazev}</h3>
      <div className="card-body">{parse(data.popis)}</div>
      <p style={{ fontWeight: "bold" }} className="card-price">
        {data.cena}
        {data.rocni_poplatek ? (
          <span className="currency">&nbsp;Kč/rok</span>
        ) : (
          <span className="currency">&nbsp;Kč</span>
        )}
      </p>
      <Link
        href={
          objektValue === "previo"
            ? `/objekty/previo`
            : `/objekty/objednat/${objektValue}`
        }
      >
        <button className={`btn bg-${color} text-white m-auto`}>
          Vybrat plán
        </button>
      </Link>
    </div>
  );
};

export default Objekt;
