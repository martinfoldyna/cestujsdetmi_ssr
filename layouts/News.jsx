import React, { useState, useEffect } from "react";
import MyLink from "./MyLink";
import { useRouter } from "next/router";
import Image from "next/image";
import Moment from "react-moment";
import { IoMdPin } from "react-icons/io";
import enums from "../enums";
import parse from "html-react-parser";
import { trimString } from "../helpers/helpers";
import { Container, Row, Col } from "react-grid-system";
import SideCards from "./SideCards";

const RSSNews = ({ news }) => {
  const router = useRouter();

  console.log(news);

  return (
    <MyLink href={`${router.pathname}/detail/${news.id}`}>
      <div className="article-card d-flex">
        <div className="image-wrapper mr-0">
          <Image
            src={news.IMG}
            alt={news.NAMECZ}
            layout="fill"
            objectFit="cover"
            className="border-radius"
          />
          <div className="article-date-range">
            <p className="bg-purple">
              <Moment format="DD.MM.YY">{news.DATEFROM}</Moment> -{" "}
              <Moment format="DD.MM.YY">{news.DATETO}</Moment>
            </p>
          </div>
        </div>
        <div className="content-wrapper">
          <h3 className="article-heading">{news.NAMECZ}</h3>
          <div className="d-flex article-location align-items-center">
            <IoMdPin className="text-purple" />
            {news.MISTOCZ}
          </div>
          <div className="article-description">
            {parse(trimString(news.POPISCZ, 40))}
          </div>
        </div>
      </div>
    </MyLink>
  );
};

export default RSSNews;
