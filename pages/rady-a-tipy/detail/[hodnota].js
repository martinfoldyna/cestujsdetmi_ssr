import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import {
  Section,
  SectionHeading,
  SectionContent,
} from "../../../layouts/Section";
import { useRouter } from "next/router";
import LoadingSkeleton from "../../../layouts/LoadingSkeleton";
import parse from "html-react-parser";
import { BsClock } from "react-icons/bs";
import enums from "../../../enums";
import { fetchQuery } from "../../../helpers/fetch";
import RadyTipyLayout from "../../../layouts/siteLayouts/RadyTipyLayout";
import Head from "next/head";

export async function getStaticPaths() {
  const fetchParams = {
    typ_objektu: "zabava",
  };

  const advices = await fetchQuery(`${enums.URLS.radyTipy}`);

  return {
    paths: advices.map((advice) => ({
      params: {
        hodnota: advice.hodnota,
      },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { hodnota } = params;
  const post = await fetchQuery(`${enums.URLS.radyTipy}&hodnota=${hodnota}`);

  return { props: { post: post[0] } };
}

const RadyTipyDetail = ({
  post,
  getAdvice,
  history,
  removeAdvice,
  getRelatedAdvices,
}) => {
  const router = useRouter();

  const { hodnota } = router.query;

  const loadAdvice = () => {
    getAdvice(hodnota);
  };

  const [relatedLimit, setRelatedLimit] = useState(9);

  // useEffect(() => {
  //   loadAdvice();
  // }, []);
  //
  // useEffect(() => {
  //   return function cleanUp() {
  //     removeAdvice();
  //   };
  // }, []);

  return post ? (
    <>
      <Head>
        <title>{post.nazev} | Cestuj s dětmi.cz</title>
        <meta name="description" content={post.page_description} />
        <meta name="keywords" content={post.page_keywords} />
        <meta name="robots" content="index, follow" />
      </Head>
      <Section className="mt-0 post-detail">
        <SectionHeading background="grey">
          <h2>{post.nazev}</h2>
          <div className="d-flex align-items-center date">
            <BsClock className="text-yellow btn-icon" />
            <span>
              {new Date(post.createdAt).toLocaleString("cs", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </SectionHeading>
        <SectionContent>
          {(post.obrazek || post.image_filename) && (
            <div className="post-detail-image-wrapper">
              <img
                className="post-detail-image w-100"
                src={
                  post.obrazek?.url
                    ? post.obrazek.url
                    : `http://www.cestujsdetmi.cz/${post.image_filename}`
                }
                alt={
                  post.obrazek?.alternativeText
                    ? post.obrazek?.alternativeText
                    : post.nazev
                }
              />
            </div>
          )}
          <div className="content-wrapper">{post.text && parse(post.text)}</div>
        </SectionContent>
      </Section>
    </>
  ) : (
    <LoadingSkeleton />
  );
};

RadyTipyDetail.propTypes = {
  post: PropTypes.object.isRequired,
};

RadyTipyDetail.Layout = RadyTipyLayout;

export default RadyTipyDetail;
