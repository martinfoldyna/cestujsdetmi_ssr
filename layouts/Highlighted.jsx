import { Row, Col } from "react-grid-system";
import { RiArrowRightSLine } from "react-icons/ri";
import { AiFillCompass } from "react-icons/ai";
import { HiHome } from "react-icons/hi";
import Link from "next/link";
import LoadingSkeleton from "./LoadingSkeleton";
import HomePageObjekt from "./HomePageObjekt";
import MyLink from "./MyLink";
import PrevioObjekt from "../components/cards/PrevioObjekt";

const Highlighted = ({ data, previo }) => {
  return (
    <div className="section highlighted">
      <Row className="justify-content-arround m-0">
        <Col lg={6}>
          <div className="heading-with-icons d-flex align-items-center">
            <HiHome
              className="text-white icon-heading bg-blue"
              style={{ marginRight: "1em" }}
            />
            <h2>Naše tipy na ubytování</h2>
          </div>
          {data && previo ? (
            <div className="section-content">
              {data &&
                data.length > 0 &&
                data.map((article, index) => {
                  if (article.typ_objektu === "ubytovani" && index < 4) {
                    return (
                      <HomePageObjekt article={article} key={article.id} />
                    );
                  }
                })}
              {previo.map((objekt) => (
                <PrevioObjekt objekt={objekt} word_count={15} />
              ))}
              <div className="text-align-right">
                <button className="btn btn-small-logo btn-homepage-detail bg-blue text-white">
                  <MyLink
                    href="/ubytovani"
                    className="d-flex align-items-center"
                  >
                    <>
                      Další ubytování{" "}
                      <RiArrowRightSLine style={{ marginLeft: ".5em" }} />
                    </>
                  </MyLink>
                </button>
              </div>
            </div>
          ) : (
            <LoadingSkeleton />
          )}
        </Col>
        <Col lg={6}>
          <div className="heading-with-icons d-flex align-items-center">
            <AiFillCompass
              className="text-white icon-heading bg-orange"
              style={{ marginRight: "1em" }}
            />
            <h2>Naše tipy na výlety a zábavu</h2>
          </div>
          {data ? (
            <>
              <div className="section-content">
                {data &&
                  data.length > 0 &&
                  data.map((article, index) => {
                    if (article.typ_objektu === "zabava" && index < 4) {
                      return (
                        <HomePageObjekt
                          article={article}
                          key={article.id}
                          homepage={true}
                        />
                      );
                    }
                  })}
              </div>
              <button className="btn btn-small-logo bg-orange text-white btn-homepage-detail">
                <MyLink href="/vylety" className="d-flex align-items-center">
                  <>
                    Další tipy na výlety{" "}
                    <RiArrowRightSLine style={{ marginLeft: ".5em" }} />
                  </>
                </MyLink>
              </button>
            </>
          ) : (
            <LoadingSkeleton />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Highlighted;
