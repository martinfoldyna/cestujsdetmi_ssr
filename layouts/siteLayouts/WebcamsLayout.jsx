import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import HeadingWithIcon from "../HeadingWithIcon";
import { RiWebcamFill } from "react-icons/ri";
import { Col, Container, Row } from "react-grid-system";
import SideFilter from "../../components/cards/SideFilter";
import SideCards from "../SideCards";

const WebcamsLayout = ({ children }) => {
  const router = useRouter();
  console.log(router);
  const { hodnota } = router.query;

  return (
    <Container style={{ maxWidth: "1220px" }}>
      <span className="breadcrumb">
        <Link href="/">Úvodní stránka</Link>&nbsp;/&nbsp;
        {hodnota ? (
          <>
            <Link href="/webkamery">Webkamery</Link>&nbsp;/&nbsp;{hodnota}
          </>
        ) : (
          "Webkamery"
        )}
      </span>

      <HeadingWithIcon
        background="dark-purple"
        heading="Webkamery"
        icon={RiWebcamFill}
      >
        <p>
          Nabízíme Vám pohled webkamerou na vybraná místa po celých v Čechách.
          Můžete zde procházet jednotlivé stránky s online záběry nebo v lze
          snadno zadat lokalitu webkamer, kterou požadujete zobrazit.
        </p>
      </HeadingWithIcon>
      <div className="data-wrapper">
        <Row>
          <Col lg={2.5} className="hide-mobile">
            <SideFilter fullPadding={true} color="purple" />
            <SideCards />
          </Col>
          <Col lg={9.5}>
            <>
              {children}
              <div className="hide-desktop">
                <div className="mt-1">
                  <SideCards />
                </div>
              </div>
            </>{" "}
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default WebcamsLayout;
