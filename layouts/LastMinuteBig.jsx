import { Col, Row } from "react-grid-system";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

const LastMinuteBig = ({ background = "grey" }) => {
  return (
    <div
      className={`bg-${background} ${background === "red" && "text-white"} p-1`}
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
        <Col md={11}>
          <Row>
            <Col md={3}>
              <h3>Zrcadlový labyrint</h3>
              <p>
                Velké unikátní bludiště • Síň smíchu s vtipnými prohnutými
                zrcadly • Antigravitační místnost • Levitující stolek.
              </p>
            </Col>
            <Col md={3}>
              <h3>Zrcadlový labyrint</h3>
              <p>
                Velké unikátní bludiště • Síň smíchu s vtipnými prohnutými
                zrcadly • Antigravitační místnost • Levitující stolek.
              </p>
            </Col>
            <Col md={3}>
              <h3>Zrcadlový labyrint</h3>
              <p>
                Velké unikátní bludiště • Síň smíchu s vtipnými prohnutými
                zrcadly • Antigravitační místnost • Levitující stolek.
              </p>
            </Col>
            <Col md={3}>
              <h3>Zrcadlový labyrint</h3>
              <p>
                Velké unikátní bludiště • Síň smíchu s vtipnými prohnutými
                zrcadly • Antigravitační místnost • Levitující stolek.
              </p>
            </Col>
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
