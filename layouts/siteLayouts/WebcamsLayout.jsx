import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import HeadingWithIcon from "../HeadingWithIcon";
import { RiWebcamFill } from "react-icons/ri";
import { Col, Row } from "react-grid-system";
import SideFilter from "../../components/cards/SideFilter";
import SideCards from "../SideCards";

const WebcamsLayout = ({ children }) => {
  const router = useRouter();
  console.log(router);
  const { hodnota } = router.query;

  return (
    <div>
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
          Ubytování, dovolená, víkendy s dětmi po Čechách i na Moravě. Najděte
          si to správné ubytování, které Vám bude nejlépe vyhovovat. Hotely,
          apartmány, penziony, chaty, chalupy, kempy, ubytování v soukromí, ale
          třeba i na lodi. Dovolenou s dětmi v Čechách si užijete.
        </p>
      </HeadingWithIcon>
      <div className="data-wrapper">
        <Row>
          <Col lg={2.5}>
            <SideFilter fullPadding={true} color="purple" />
            <SideCards />
          </Col>
          <Col lg={9.5}>{children}</Col>
        </Row>
      </div>
    </div>
  );
};

export default WebcamsLayout;
