import { Col, Row } from "react-grid-system";

export const Section = ({ className, children }) => {
  return <section className={`section ${className}`}>{children}</section>;
};

export const SectionContent = ({ children, ...rest }) => {
  return (
    <div className="section-content border-grey" {...rest}>
      {children}
    </div>
  );
};

export const SectionHeading = ({
  background = "grey",
  children,
  className,
}) => {
  return (
    <Row
      className={`justify-content-arround ${
        background !== "none" ? `bg-${background}` : ""
      } m-0`}
    >
      <Col>
        <div className={"heading-with-icons " + className}>{children}</div>
      </Col>
    </Row>
  );
};
