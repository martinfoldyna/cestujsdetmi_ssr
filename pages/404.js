import React from "react";
import { Container } from "react-grid-system";
import { Section, SectionContent } from "../layouts/Section";
import Image from "next/image";

const NotFound = () => {
  return (
    <Container className="main-container">
      <Section className=" m-0 text-center full-page-section">
        <SectionContent className="pt-3 pb-3 border-radius">
          <Image
            src="/404.svg"
            height="300"
            width="260"
            layout="intrinsic"
            alt="Not found vector"
          />
          <h1>Jejda! Něco se pokazilo.</h1>
          <p>
            Nic se neděje, můžete pokračovat na úvodní stránku kliknutím na
            tlačítko.
          </p>
          <button className="btn bg-blue text-white m-0-auto">
            <a href="/">Úvodní stránka</a>
          </button>
        </SectionContent>
      </Section>
    </Container>
  );
};

export default NotFound;
