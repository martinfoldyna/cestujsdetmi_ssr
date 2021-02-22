import React from "react";
import { Section, SectionContent } from "../layouts/Section";
import Image from "next/image";
import { Container } from "react-grid-system";

const SearchNotFound = () => {
  return (
    <Container className="main-container ">
      <Section className=" m-0 text-center full-page-section">
        <SectionContent className="pt-3 pb-3 border-radius">
          <Image
            src="/search-not-found.svg"
            height="300"
            width="260"
            layout="intrinsic"
            alt="Not found vector"
          />
          <h1 className="">Ups!</h1>
          <p>
            Vašemu hledání bohužel neodpovídají žádné výsledy. Zkuste hledaný
            výraz upravit.
          </p>
        </SectionContent>
      </Section>
    </Container>
  );
};

export default SearchNotFound;
