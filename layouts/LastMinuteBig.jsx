import { Col, Row } from "react-grid-system";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import MyLink from "./MyLink";

const LastMinuteBig = ({ background = "grey", posts }) => {
  return (
    <div
      className={`bg-${background} ${
        background === "red" ? "text-white" : ""
      } p-1`}
    >
      <Row className="m-0">
        <div className="hide-mobile">
          <Col
            md={0.5}
            className="d-flex p-0 align-items-center justify-content-center"
          >
            <HiOutlineChevronLeft className="arrow-heading" />
          </Col>
        </div>
        <Col md={11} className="p-0">
          <Row>
            {posts.map((post) => (
              <Col md={3} key={post.id}>
                <MyLink href={`/ubytovani/detail/${post.id}`}>
                  <h3>{post.nazev}</h3>
                  <p className="text-white">{post.last_minute_popis}</p>
                </MyLink>
              </Col>
            ))}
          </Row>
        </Col>
        <div className="hide-mobile">
          <Col
            md={0.5}
            className="d-flex p-0 align-items-center justify-content-center"
          >
            <HiOutlineChevronRight className="arrow-heading" />
          </Col>
        </div>
      </Row>
    </div>
  );
};

export default LastMinuteBig;
