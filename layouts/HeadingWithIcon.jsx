import { Col, Row } from "react-grid-system";

const HeadingWithIcon = ({
  heading,
  icon,
  background,
  text = "white",
  children,
}) => {
  const Icon = icon;
  return (
    <div>
      <div className={`objekty-heading bg-${background} text-${text}`}>
        {/*<DesktopBreakpoint>*/}
        <Row>
          <Col md={9}>
            <div className="heading-with-icons d-flex align-items-center">
              <Icon
                className="text-white icon-heading"
                style={{ marginRight: ".5em" }}
              />
              <h2>{heading}</h2>
            </div>
            {children}
          </Col>
          <div className="">
            <Col className="d-flex justify-content-center align-items-center">
              <Icon className={`heading-icon-big text-${background}-darken`} />
            </Col>
          </div>
        </Row>
        {/*</DesktopBreakpoint>*/}
      </div>
    </div>
  );
};

export default HeadingWithIcon;
