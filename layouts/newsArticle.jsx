import React from "react";
import { Row, Col } from "react-grid-system";
import Image from "next/image";
import { BsClock } from "react-icons/bs";
import parse from "html-react-parser";
import { trimString } from "../helpers/helpers";

const NewsArticle = ({ article, number_of_words = 12 }) => {
  return (
    <div className="article-card d-flex align-items-center">
      <div>
        <Image
          src={
            article?.image_filename
              ? `https://www.cestujsdetmi.cz/${article.image_filename}`
              : article?.galerie && article?.galerie.length > 0
              ? article?.galerie[0].sm
              : article?.obrazek
              ? article.obrazek.formats.small.url
              : article?.relative_galerie && article.relative_galerie.length > 0
              ? article.relative_galerie[0].sm
              : "/img/placeholder.png"
          }
          layout="responsive"
          width={20}
          height={20}
          objectFit="cover"
          className="border-radius"
        />
        <div className="d-flex align-items-center date text-grey">
          <BsClock className=" btn-icon" />
          <span
            className="d-block"
            style={{ fontSize: "12px", marginTop: ".5em" }}
          >
            {new Date(article.createdAt).toLocaleString("cs", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
      <div style={{ flexBasis: "60%", marginLeft: "0.6em" }}>
        <h3 style={{ margin: "0", textAlign: "left" }}>{article.nazev}</h3>
        <div className="article-description">
          {article.perex ? (
            parse(trimString(article.perex, number_of_words))
          ) : article?.zakladni_popis || article?.text ? (
            <p>
              {parse(
                trimString(
                  article?.zakladni_popis || article?.text,
                  number_of_words
                )
              )}
              ...
            </p>
          ) : (
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque
              fuga quod repellendus repudiandae. Esse iste nihil nostrum placeat
              quas, rem ut!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsArticle;
