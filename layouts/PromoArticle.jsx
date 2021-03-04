import React from "react";
import Image from "next/image";
import MyLink from "./MyLink";
import { Row, Col } from "react-grid-system";
import { IoMdPin } from "react-icons/io";
import enums from "../enums";
import parse from "html-react-parser";
import { trimString } from "../helpers/helpers";
import { AiFillBulb } from "react-icons/ai";
import Link from "next/link";

const PromoArticle = ({
  article,
  background = "white",
  number_of_words = 21,
  index,
}) => {
  console.log(index);

  return (
    <Link href={`/rady-a-tipy/detail/${article?.hodnota}`}>
      <div className={`article-card ${background ? `bg-${background}` : ""}`}>
        <div className='img-wrapper mr-0'>
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
            alt={article?.nazev}
            layout='fill'
            objectFit='cover'
            className='border-radius'
          />

          <div className='article-date-range'>
            <p className={`bg-yellow d-flex align-items-center`}>
              <AiFillBulb className='text-white btn-icon left' /> Rady a tipy
            </p>
          </div>
        </div>
        <div className='content-wrapper'>
          <h3 className='article-heading'>{article?.nazev}</h3>
          <div className='article-description'>
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
                fuga quod repellendus repudiandae. Esse iste nihil nostrum
                placeat quas, rem ut!
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PromoArticle;
