import { Col, Row } from "react-grid-system";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import SmallArticle from "../components/cards/SmallArticle";
import MyLink from "./MyLink";

const LastMinuteBig = ({ background = "grey", posts }) => {
  return (
    <div className='last-minute-big'>
      <Row className='m-0'>
        <div className='hide-mobile'>
          <Col
            md={0.5}
            className='d-flex p-0 align-items-center justify-content-center'
          >
            <HiOutlineChevronLeft className='arrow-heading' />
          </Col>
        </div>
        <Col md={11} className='p-0'>
          <div className='d-flex'>
            {posts.map((post) => (
              <SmallArticle article={post} />
            ))}
          </div>
        </Col>
        <div className='hide-mobile'>
          <Col
            md={0.5}
            className='d-flex p-0 align-items-center justify-content-center'
          >
            <HiOutlineChevronRight className='arrow-heading' />
          </Col>
        </div>
      </Row>
    </div>
  );
};

export default LastMinuteBig;
