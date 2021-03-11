import React from "react";
import LocationBadge from "../LocationBadge";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { trimString } from "../../helpers/helpers";
import MiniObjekt from "./MiniObjekt";
import { removeFromFavorite } from "../../helpers/user";
import { IoMdClose } from "react-icons/io";

const FavoriteVerticalCard = ({ objekt, onRemove }) => {
  return (
    <>
      <MiniObjekt {...{ objekt }} />
      <button className='btn btn-tiny btn-small-logo m-0' onClick={onRemove}>
        <IoMdClose className='btn-icon left' />
        Odebrat
      </button>
    </>
  );
};
export default FavoriteVerticalCard;
