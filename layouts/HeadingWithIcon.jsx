import { Col, Row } from "react-grid-system";

const HeadingWithIcon = ({
  heading,
  icon,
  background,
  text = "white",
  children,
  icon_size = "large",
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
          <Col className="d-flex justify-content-center align-items-center hide-mobile">
            <Icon
              className={`heading-icon-big text-${background}-darken size-${icon_size}`}
            />
          </Col>
        </Row>
        {/*</DesktopBreakpoint>*/}
      </div>
    </div>
  );
};

export default HeadingWithIcon;
