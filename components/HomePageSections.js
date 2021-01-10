import { useState } from "react";
import { Row, Col } from "react-grid-system";
import { AiFillBulb } from "react-icons/ai";
import { BiBookContent } from "react-icons/bi";
import { FaNewspaper } from "react-icons/fa";
import { RiArrowRightSLine } from "react-icons/ri";
import Link from "next/link";
import { translateColor } from "../helpers/translators";
import LoadingSkeleton from "../layouts/LoadingSkeleton";
import HomePageObjekt from "../layouts/HomePageObjekt";
import { MyLink } from "../layouts/MyLink";

const HomePageSections = ({ data, loading, topic, heading }) => {
  const [link, setLink] = useState({ value: "", text: "" });
  const color = translateColor(topic);

  const generateHeading = (topic) => {
    let headingHTML = "";
    let link = null;
    switch (topic) {
      case "aktuality":
        headingHTML = (
          <MyLink href="/aktuality" className="d-flex align-items-center">
            <>
              <FaNewspaper
                className="text-white icon-heading bg-pink"
                style={{ marginRight: "1em" }}
              />
              <h2>Aktuality</h2>
              <RiArrowRightSLine className="text-pink arrow-heading" />
            </>
          </MyLink>
        );

        break;
      case "nejctenejsi":
        headingHTML = (
          <div className="d-flex align-items-center">
            <BiBookContent
              className="text-white icon-heading bg-purple"
              style={{ marginRight: "1em" }}
            />
            <h2>Nejčtenější články</h2>
          </div>
        );
        break;
      case "rady_tipy":
        headingHTML = (
          <MyLink href="/rady-a-tipy" className="d-flex align-items-center">
            <>
              <AiFillBulb
                className="text-white icon-heading bg-yellow"
                style={{ marginRight: "1em" }}
              />
              <h2>Rady a tipy</h2>
              <RiArrowRightSLine className="text-green arrow-heading" />
            </>
          </MyLink>
        );

        break;
      default:
        headingHTML = "";
    }
    return headingHTML;
  };

  return (
    <section className={`section`} style={{ marginTop: "2em" }}>
      <Row className="justify-content-arround bg-grey m-0">
        <Col md={12}>
          <div className="heading-with-icons">{generateHeading(topic)}</div>
        </Col>
      </Row>
      {data ? (
        <div className="section-content border-grey">
          <Row className="justify-content-arround pt-1 m-0">
            <Col lg={6}>
              {data &&
                data.length > 0 &&
                data.map((article, index) => {
                  if (index < 3) {
                    return (
                      <HomePageObjekt
                        article={article}
                        key={article.id}
                        color="purple"
                      />
                    );
                  }
                })}
            </Col>
            <Col lg={6}>
              {data &&
                data.length > 0 &&
                data.map((article, index) => {
                  if (index > 2 && index <= 5) {
                    return (
                      <HomePageObjekt
                        article={article}
                        key={article.id}
                        color="purple"
                      />
                    );
                  }
                })}
            </Col>
          </Row>
          <button
            className={`btn btn-small-logo bg-${color} text-white btn-homepage-detail`}
          >
            <Link href="/tipy-na-vylety" className="d-flex align-items-center">
              <>
                Další {link.text} <RiArrowRightSLine />
              </>
            </Link>
          </button>
        </div>
      ) : (
        <Row className="justify-content-arround">
          <Col lg={5}>
            <LoadingSkeleton />
          </Col>
          <Col lg={5}>
            <LoadingSkeleton />
          </Col>
        </Row>
      )}
    </section>
  );
};

export default HomePageSections;
