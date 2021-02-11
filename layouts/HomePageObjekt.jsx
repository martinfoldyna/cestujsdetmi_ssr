import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { IoMdPin } from "react-icons/io";
import { trimString } from "../helpers/helpers";
import parse from "html-react-parser";
import Image from "next/image";
import { Row, Col } from "react-grid-system";

const HomePageObjekt = ({
  article,
  background,
  number_of_words = 15,
  className,
  topic = "ubytovani",
}) => {
  const [imageHeight, setImgHeight] = useState(0);
  const parentRef = useRef(null);

  useEffect(() => {
    setImgHeight(parentRef.current?.clientHeight - 5);
  }, [parentRef]);

  const isNews = () => article?.kategorie === "aktuality";

  console.log(article);

  return article ? (
    <div className={`${topic}-home-card ${className} border-radius`}>
      <Link href={`/${topic}/detail/${article?.hodnota}`}>
        <div
          className={`article-card article-homepage-card d-flex ${
            background && `bg-${background}`
          }`}
        >
          {/*<Row className="w-100 m-0">*/}
          {/*  <Col className="p-0">*/}
          <div className="d-flex align-items-center">
            <div className="img-wrapper">
              <Image
                src={
                  article?.image_filename
                    ? `https://www.cestujsdetmi.cz/${article.image_filename}`
                    : article?.galerie && article?.galerie.length > 0
                    ? article?.galerie[0].formats.small.url
                    : article?.relative_galerie &&
                      article.relative_galerie.length > 0
                    ? `https://www.cestujsdetmi.cz/${article.relative_galerie[0].relativeUrl}`
                    : "/img/placeholder.png"
                }
                quality={50}
                alt={
                  article?.galerie && article?.galerie[0]?.alternativeText
                    ? article.galerie[0].alternativeText
                    : article.relative_galerie &&
                      article.relative_galerie.length > 0
                    ? article.relative_galerie[0].alternativeText
                    : article.nazev
                }
                className="img border-radius"
                objectFit="cover"
                layout="fill"
                // width={6}
                // height={3}
              />
              {/*<img src={placeholder} alt="placeholder-image" />*/}
            </div>
          </div>
          {/*</Col>*/}
          {/*<Col className="p-0">*/}
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
          {/*  </Col>*/}
          {/*</Row>*/}
        </div>
      </Link>
    </div>
  ) : (
    ""
  );
};

export default HomePageObjekt;
