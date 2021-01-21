import { Row, Col } from "react-grid-system";
import { RiArrowRightSLine } from "react-icons/ri";
import { AiFillCompass } from "react-icons/ai";
import { HiHome } from "react-icons/hi";
import Link from "next/link";
import LoadingSkeleton from "./LoadingSkeleton";
import HomePageObjekt from "./HomePageObjekt";

const Highlighted = ({ data }) => {
  return (
    <div className="section highlighted bg-grey">
      <Row className="justify-content-arround m-0">
        <Col lg={6} className="bg-grey">
          <div className="heading-with-icons d-flex align-items-center">
            <HiHome
              className="text-white icon-heading bg-blue"
              style={{ marginRight: "1em" }}
            />
            <h2>Naše tipy na ubytování</h2>
          </div>
          {data ? (
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
              <div className="text-align-right">
                <button className="btn btn-small-logo btn-homepage-detail bg-blue text-white">
                  <Link
                    href="/tipy-na-ubytovani"
                    className="d-flex align-items-center"
                  >
                    <>
                      Další ubytování{" "}
                      <RiArrowRightSLine style={{ marginLeft: ".5em" }} />
                    </>
                  </Link>
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
                <Link
                  href="/tipy-na-vylety"
                  className="d-flex align-items-center"
                >
                  <>
                    Další tipy na výlety{" "}
                    <RiArrowRightSLine style={{ marginLeft: ".5em" }} />
                  </>
                </Link>
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
