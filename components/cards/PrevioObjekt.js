import React from "react";
import Link from "next/link";
import parse from "html-react-parser";
import enums from "../../enums";
import { IoMdPin } from "react-icons/io";
import Image from "next/image";
import { trimString } from "../../helpers/helpers";
import { AiFillDollarCircle } from "react-icons/ai";
import { HiHome } from "react-icons/hi";

const PrevioObjekt = ({
  objekt,
  background,
  badge = false,
  homepage = false,
  word_count = 35,
}) => (
  <Link href={`/${enums.TYP_OBJEKTU.ubytovani.url}/previo/${objekt?.hotId}`}>
    {/* WAS: */}
    {/*<div*/}
    {/*    className={`objekt-card d-flex align-items-center ${*/}
    {/*        background && `bg-${background}`*/}
    {/*    } ${!!background ? "border-grey" : ""}`}*/}
    {/*    ref={parentRef}*/}
    {/*>*/}
    <div
      className={`article-card ${
        homepage ? "article-homepage-card" : ""
      } d-flex ${background && `bg-${background}`}`}
    >
      {/*<Row className="w-100 m-0">*/}
      {/*  <Col sm={4} className="p-0">*/}
      <div className="img-wrapper mr-0">
        <Image
          src={
            objekt?.photogallery?.length > 0
              ? objekt.photogallery[0].url
              : "/img/placeholder.png"
          }
          alt={
            objekt?.photogallery?.length > 0 &&
            objekt?.photogallery[0].label?.length > 0
              ? objekt?.photogallery[0]?.label
              : objekt.name
          }
          layout="fill"
          objectFit="cover"
          className="border-radius"
        />
        {!badge ? (
          <div className="article-date-range">
            <p className="bg-blue d-flex align-items-center">
              <AiFillDollarCircle className="icon" /> Hotel s přímou rezervací
            </p>
          </div>
        ) : (
          <div className="article-date-range">
            <p className="bg-blue d-flex align-items-center">
              <HiHome className="icon" /> ubytování
            </p>
          </div>
        )}
      </div>
      {/*</Col>*/}
      {/*<Col sm={8}>*/}
      <div className="content-wrapper">
        <h3 className="article-heading">{objekt?.name}</h3>

        {objekt?.address &&
          objekt?.address.name &&
          objekt?.address.street &&
          objekt?.address.city && (
            <div className="d-flex article-location">
              <IoMdPin className="text-blue" />
              {objekt.address.name}, {objekt.address.street},{" "}
              {objekt.address.city}
            </div>
          )}
        <div className="article-description">
          {objekt.shortDescription ? (
            parse(trimString(objekt.shortDescription, word_count))
          ) : objekt.descriptions && objekt.descriptions?.shortDescription ? (
            parse(trimString(objekt.descriptions?.shortDescription, word_count))
          ) : objekt.descriptions?.longDescription ? (
            parse(trimString(objekt.descriptions?.longDescription, word_count))
          ) : (
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque
              fuga quod repellendus repudiandae. Esse iste nihil nostrum placeat
              quas, rem ut!
            </p>
          )}
          <br />
        </div>
      </div>
      {/*  </Col>*/}
      {/*</Row>*/}
    </div>
  </Link>
);
export default PrevioObjekt;
