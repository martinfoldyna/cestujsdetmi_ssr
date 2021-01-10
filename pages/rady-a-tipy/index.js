import React, { useEffect, Fragment, useState } from "react";
import Link from "next/link";
import { Col, Row } from "react-grid-system";
import { AiFillBulb } from "react-icons/ai";
import { RiArrowRightSLine } from "react-icons/ri";
import SideCards from "../../layouts/SideCards";
import { Section, SectionHeading, SectionContent } from "../../layouts/Section";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { getAdvices } from "../../redux/actions/radyTipy";
import { connect } from "react-redux";
import enums from "../../enums";
import { objectToArray, objectToQueryString } from "../../helpers/helpers";
import Post from "../../layouts/Post";
import LoadingSkeleton from "../../layouts/LoadingSkeleton";
import HeadingWithIcon from "../../layouts/HeadingWithIcon";
import { MyLink } from "../../layouts/MyLink";
import RadyTipyLayout from "../../layouts/siteLayouts/RadyTipyLayout";
import { fetchQuery } from "../../helpers/fetch";

export async function getStaticProps() {
  const posts = await fetchQuery(`${enums.URLS.radyTipy}`);

  return { props: { posts } };
}

const RadyTipy = ({ posts }) => {
  const router = useRouter();

  return objectToArray(enums.RADY_TIPY.KATEGORIE).map((categoryItem) => (
    <Section className="border-section mt-0" key={categoryItem.key}>
      <SectionHeading background="none">
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
                    <Fragment key={post.id}>
                      <Col md={4} key={post.id}>
                        <Post post={post} />
                      </Col>
                    </Fragment>
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
  ));
};

RadyTipy.propTypes = {
  radyTipy: PropTypes.object.isRequired,
  getAdvices: PropTypes.func.isRequired,
};

RadyTipy.Layout = RadyTipyLayout;

const mapStateToProps = (state) => ({
  radyTipy: state.radyTipy,
});

export default RadyTipy;
