import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { IoMdPin } from "react-icons/io";
import { trimString } from "../helpers/helpers";
import parse from "html-react-parser";

const HomePageObjekt = ({
  article,
  background,
  number_of_words = 21,
  className,
  topic = "tipy-na-ubytovani",
}) => {
  const [imageHeight, setImgHeight] = useState(0);
  const parentRef = useRef(null);

  useEffect(() => {
    setImgHeight(parentRef.current?.clientHeight - 5);
  }, [parentRef]);

  const isNews = () => article?.kategorie === "aktuality";

  return article ? (
    <div className={`${topic}-home-card ${className}`}>
      <Link
        href={`/${topic}/detail/${
          article?.hodnota ? article.hodnota : article.id ? article.id : "123"
        }`}
      >
        <div
          className={`article-card article-homepage-card d-flex align-items-center ${
            background && `bg-${background}`
          }`}
          ref={parentRef}
        >
          <div
            className="img-wrapper mr-1"
            style={{
              backgroundImage: `url(${
                article?.image_filename
                  ? `https://www.cestujsdetmi.cz/${article.image_filename}`
                  : article?.galerie && article?.galerie.length > 0
                  ? article?.galerie[0].sm
                  : article?.obrazek
                  ? article.obrazek.formats.small.url
                  : "../public/img/placeholder.png"
              })`,
              height: imageHeight,
            }}
          >
            {/*<img src={placeholder} alt="placeholder-image" />*/}
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
            {isNews() && article?.adresa && (
              <span className="article-location">
                <IoMdPin className="text-pink address-icon" />{" "}
                {article.adresa.mesto}
              </span>
            )}
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
            {isNews() && <div className="article-news-date">srpen 2020</div>}
          </div>
        </div>
      </Link>
    </div>
  ) : (
    ""
  );
};

export default HomePageObjekt;
