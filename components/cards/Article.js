import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import parse from "html-react-parser";
import Moment from "react-moment";
import enums from "../../enums";
import { IoMdPin } from "react-icons/io";

const Article = ({ article, background, homepage, condition, color }) => {
  const parentRef = useRef(null);
  const [imageHeight, setImgHeight] = useState(0);

  useEffect(() => {
    setImgHeight(parentRef.current?.clientHeight - 5);
  }, [parentRef]);

  const isNews = article.kategorie === "aktuality";

  return (
    <Link
      href={`/${enums.TYP_OBJEKTU[article?.typ_objektu].url}/detail/${
        article?.id
      }`}
    >
      <div
        className={`article-card d-flex align-items-center ${
          background && `bg-${background}`
        }`}
        ref={parentRef}
      >
        <div
          className="img-wrapper"
          style={{
            backgroundImage: `url(${
              article.galerie && article.galerie.length > 0
                ? article?.galerie[0].sm
                : "../public/img/placeholder.png"
            })`,
            height: imageHeight,
          }}
        >
          {/*<img src={placeholder} alt="placeholder-image" />*/}
          {isNews && (
            <div className="article-date-range">
              <p>
                <Moment format="DD.MM.YY">{article.date_from}</Moment> -{" "}
                <Moment format="DD.MM.YY">{article.date_to}</Moment>
              </p>
            </div>
          )}
        </div>
        <div className="content-wrapper">
          <h3
            className="article-heading"
            // className={
            //   color
            //     ? `text-${color}`
            //     : `text-${translateColor(article.kategorie)}`
            // }
          >
            {article?.nazev ? article?.nazev : "Nadpis"}
          </h3>

          {article?.adresa_ulice &&
            article?.adresa_mesto &&
            article?.adresa_psc &&
            article?.adresa_kraj &&
            article?.adresa_oblast && (
              <div className="d-flex article-location">
                <IoMdPin className="text-blue" />
                {article.adresa_mesto},{" "}
                {enums.KRAJ[article.adresa_kraj.replace("-", "_")].value} kraj
              </div>
            )}
          <div className="article-description">
            {article?.objekt_info?.popis
              ? parse(article?.objekt_info?.popis)
              : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi consectetur cum distinctio doloremque doloribus ducimus eos ipsam labore laborum, maiores perspiciatis placeat, quidem repudiandae sed sint sit soluta unde!"}
            <br />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Article;
