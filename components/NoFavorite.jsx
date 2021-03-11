import React from "react";
import Image from "next/image";
import { Section, SectionContent } from "../layouts/Section";
import { Container } from "react-grid-system";

const NoUserFavorite = () => (
  <Container className='main-container favorite'>
    <Section className='m-0 full-page-section'>
      <SectionContent className='border-radius pt-3 pb-3 text-center'>
        <Image src='/favorite.svg' height='200' width='200' />
        <h1>
          Zatím nemáte žádné oblíbené po
          <span className='crossed'>
            <span className='on-top'>l</span>n
          </span>
          ožky.
        </h1>
        <p>
          Do oblíbených můžete přidávat ubytování, aktuality, rady a tipy,
          články a výlety.
        </p>
      </SectionContent>
    </Section>
  </Container>
);
export default NoUserFavorite;
