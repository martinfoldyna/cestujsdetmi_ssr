import React, { useEffect } from "react";
import { Col, Row } from "react-grid-system";
import { RiPushpin2Fill } from "react-icons/ri";
import LastMinuteBig from "../layouts/LastMinuteBig";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getLastMinute } from "../redux/actions/objekty";

const LastMinute = ({}) => {
  return (
    <section className="section">
      <Row className="section-heading justify-content-arround bg-grey m-0 row">
        <Col md={12} className="m-0 col">
          <div className="heading-with-icons d-flex align-items-center">
            <RiPushpin2Fill
              className="text-white icon-heading bg-red"
              style={{ marginRight: "1em" }}
            />
            <h2>Last minute</h2>
          </div>
        </Col>
      </Row>

      <Row className="p-0 m-0">
        <Col md={12} className="p-0">
          <LastMinuteBig background="red" />
        </Col>
      </Row>
    </section>
  );
};

LastMinute.propType = {
  getLastMinute: PropTypes.func.isRequired,
  lastMinute: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  lastMinute: state.objekty.lastMinute,
});

export default LastMinute;
