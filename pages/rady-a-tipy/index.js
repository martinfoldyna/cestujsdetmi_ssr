import React from "react";
import { Col, Row } from "react-grid-system";
import { RiArrowRightSLine } from "react-icons/ri";
import { Section, SectionHeading, SectionContent } from "../../layouts/Section";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import enums from "../../enums";
import {
  objectToArray,
  searchParamsToQueryString,
} from "../../helpers/helpers";
import VerticalPost from "../../layouts/VerticalPost";
import LoadingSkeleton from "../../layouts/LoadingSkeleton";
import MyLink from "../../layouts/MyLink";
import RadyTipyLayout from "../../layouts/siteLayouts/RadyTipyLayout";
import { fetchQuery } from "../../helpers/fetch";
import Head from "next/head";

export async function getStaticProps() {
  const posts = await fetchQuery(`${enums.URLS.radyTipy}`);

  return { props: { posts }, revalidate: 60 };
}

const RadyTipy = ({ posts }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Rady a tipy | Cestuj s dětmi.cz</title>
        <meta
          name="description"
          content="Rady a tipy na cesty s dětmi. Cestování autem, letadlem, na kole a mnoho dalších užitečných rad."
        />
        <meta
          name="keywords"
          content="Rady,tipy,cestování,s dětmi,na cesty,s miminkem,v autě,"
        />
        <meta name="robots" content="index, follow" />
      </Head>
      {objectToArray(enums.RADY_TIPY.KATEGORIE).map((categoryItem) => (
        <Section className=" mt-0" key={categoryItem.key}>
          <SectionHeading background="grey">
            <h2>{categoryItem.value}</h2>
          </SectionHeading>
          <SectionContent>
            {posts ? (
              <Row>
                {posts
                  ?.filter((post) => post?.kategorie === categoryItem.key)
                  ?.map(
                    (post, index) =>
                      index < 9 && (
                        <Col md={4} key={post.id}>
                          <VerticalPost post={post} useNextImg={true} />
                        </Col>
                      )
                  )}
              </Row>
            ) : (
              <LoadingSkeleton />
            )}
          </SectionContent>
          <button className="btn btn-small-logo btn-homepage-detail bg-yellow text-white">
            <MyLink
              href={`${router.pathname}/${categoryItem.key}`}
              className="d-flex align-items-center"
            >
              <>
                Načíst další
                <RiArrowRightSLine style={{ marginLeft: ".5em" }} />
              </>
            </MyLink>
          </button>
        </Section>
      ))}
    </>
  );
};

RadyTipy.propTypes = {
  posts: PropTypes.array.isRequired,
};

RadyTipy.Layout = RadyTipyLayout;

export default RadyTipy;
