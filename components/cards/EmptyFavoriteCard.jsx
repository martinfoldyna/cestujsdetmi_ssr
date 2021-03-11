import Link from "next/link";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { translateColor } from "../../helpers/translators";

const EmptyFavoriteCard = ({ topic, color = translateColor(topic.key) }) => {
  return (
    <Link href={`/${topic.url}`}>
      <div className='objekt-mini empty-card'>
        <div className='image-wrapper'>
          <div className='objekt-mini-image bg-grey h-100 d-flex align-items-center justify-content-center'>
            <FaPlus className={`text-${color} icon m-0`} />
          </div>
        </div>
        <div className='data'>
          <h3 className='objekt-mini-heading'>
            Přidejte další oblíbený objekt
          </h3>
          {/* <LocationBadge
          objekt={objekt}
          color={
            objekt.typ_objektu === enums.TYP_OBJEKTU.zabava.key
              ? "orange"
              : "blue"
          }
        /> */}
        </div>
      </div>
    </Link>
  );
};
export default EmptyFavoriteCard;
