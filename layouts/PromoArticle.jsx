import React from "react";
import Image from "next/image";
import MyLink from "./MyLink";
import { Row, Col } from "react-grid-system";
import { IoMdPin } from "react-icons/io";
import enums from "../enums";
import parse from "html-react-parser";
import { trimString } from "../helpers/helpers";

const PromoArticle = ({
  article,
  background = "white",
  number_of_words = 21,
}) => {
  return (
    <MyLink href={`/rady-a-tipy/detail/${article?.hodnota}`}>
      <div
        className={`article-card ${
          background ? `bg-${background}` : ""
        } border-yellow`}
      >
        <Row className="w-100 m-0">
          <Col md={4} className="p-0">
            <div className="img-wrapper">
              <Image
                src={
                  article?.image_filename
                    ? `https://www.cestujsdetmi.cz/${article.image_filename}`
                    : article?.galerie && article?.galerie.length > 0
                    ? article?.galerie[0].sm
                    : article?.obrazek
                    ? article.obrazek.formats.small.url
                    : article?.relative_galerie &&
                      article.relative_galerie.length > 0
                    ? article.relative_galerie[0].sm
                    : "/img/placeholder.png"
                }
                layout="fill"
                objectFit="cover"
                className="border-radius"
              />
            </div>
          </Col>
          <Col sm={8}>
            <div className="content-wrapper">
              <h3 className="article-heading">{article?.nazev}</h3>
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
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Atque fuga quod repellendus repudiandae. Esse iste nihil
                    nostrum placeat quas, rem ut!
                  </p>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </MyLink>
  );
};

export default PromoArticle;