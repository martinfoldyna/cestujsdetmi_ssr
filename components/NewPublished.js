import { useEffect } from "react";
import { Col, Row } from "react-grid-system";
import { RiPushpin2Fill } from "react-icons/ri";
import SmallArticle from "./cards/SmallArticle";
import LoadingSkeleton from "../layouts/LoadingSkeleton";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getNewPublished } from "../redux/actions/objekty";

const NewPublished = ({ newPublished }) => {
  // useEffect(() => {
  //   getNewPublished();
  // }, []);

  return (
    <div className='section new-published'>
      <Row className='section-heading justify-content-arround new-published-heading bg-white m-0'>
        <Col md={12} className='text-align-right'>
          <div className='heading-with-icons d-flex align-items-center'>
            <RiPushpin2Fill
              className='text-white icon-heading bg-green'
              style={{ marginRight: "1em" }}
            />
            <h2>Nově zařazeno na portál</h2>
          </div>
        </Col>
      </Row>

      <Row className='justify-content-arround'>
        <Col md={12}>
          <div className='new-published-content text-white bg-green'>
            <div className='d-flex'>
              {newPublished ? (
                newPublished?.map((article) => (
                  <SmallArticle article={article} />
                ))
              ) : (
                <LoadingSkeleton />
              )}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

NewPublished.propTypes = {
  newPublished: PropTypes.array,
  getNewPublished: PropTypes.func,
};

const mapStateToProps = (state) => ({
  newPublished: state.objekty.newPublished,
});

export default NewPublished;
