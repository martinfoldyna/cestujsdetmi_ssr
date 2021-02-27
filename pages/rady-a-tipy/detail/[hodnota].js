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
import { useSession } from "next-auth/client";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { addToFavorite, removeFromFavorite } from "../../../helpers/user";
import Image from "next/image";
import VerticalPost from "../../../layouts/VerticalPost";
import { Row, Col } from "react-grid-system";
import AddToFavoriteButton from "../../../components/addToFavoriteButton";

export async function getStaticPaths() {
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

  return { props: { post: post[0] }, revalidate: 3600 };
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

  const [session] = useSession();
  const user = session?.user;

  const [related, setRelated] = useState(null);

  const start = Math.floor(Math.random() * 10);

  const loadAdvice = async () => {
    const relatedFetch = await fetchQuery(
      `${enums.URLS.radyTipy}&_limit=9&hodnota_ne=${hodnota}&kategorie=${post.kategorie}&_start=${start}`
    );
    setRelated(relatedFetch);
  };

  useEffect(() => {
    if (post) {
      loadAdvice();
    }
  }, [post]);
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
        <meta name='description' content={post.page_description} />
        <meta name='keywords' content={post.page_keywords} />
        <meta name='robots' content='index, follow' />
      </Head>
      <Section className='mt-0 post-detail'>
        <SectionHeading background='white'>
          <div className='d-flex justify-content-between align-items-center'>
            <div>
              <h2>{post.nazev}</h2>
              <div className='d-flex'>
                <div className='d-flex align-items-center date'>
                  <BsClock className='text-yellow btn-icon' />
                  <span>
                    {new Date(post.createdAt).toLocaleString("cs", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className='hide-desktop'>
                  <AddToFavoriteButton
                    user={user}
                    submitProps={{ radyTipyId: post.id }}
                    post={post}
                  />
                </div>
              </div>
            </div>
            {/* {user ? (
              <>
                {post.verejni_uzivatele.find(
                  (publicUser) => publicUser.email === user?.email
                ) && (
                  <button
                    className={`btn ghost text-yellow d-flex align-items-center`}
                    onClick={() =>
                      removeFromFavorite({ radyTipyId: post.id, user })
                    }
                  >
                    <AiFillHeart className="btn-icon text-red" />
                    Odebrat z oblíbených
                  </button>
                )}
              </>
            ) : (
              <button
                className={`btn ghost text-yellow d-flex align-items-center`}
                onClick={() => addToFavorite({ radyTipyId: post.id, user })}
              >
                <AiOutlineHeart className="btn-icon text-red" />
                Do oblíbených
              </button>
            )} */}
            <div className='hide-mobile'>
              <AddToFavoriteButton
                user={user}
                submitProps={{ radyTipyId: post.id }}
                post={post}
              />
            </div>
          </div>
        </SectionHeading>
        <SectionContent>
          {(post.galerie || post.image_filename) && (
            <div className='image-wrapper'>
              <Image
                className='img objekt-detail-image w-100'
                src={
                  post.galerie && post.galerie.length > 0
                    ? post.galerie[0].formats.medium.url
                    : `http://www.cestujsdetmi.cz/${post.image_filename}`
                }
                layout='fill'
                objectFit='cover'
                objectPosition='center'
                alt={
                  post.galerie.alternativeText
                    ? post.galerie.alternativeText
                    : post.nazev
                }
              />
            </div>
          )}
          <div className='content-wrapper'>{post.text && parse(post.text)}</div>
        </SectionContent>
      </Section>
      {related && (
        <Section className='related'>
          <SectionHeading background='white'>
            <h2>Další rady a tipy</h2>
          </SectionHeading>
          <SectionContent>
            <Row>
              {related.map((relatedPost) => (
                <Col md={4}>
                  <VerticalPost post={relatedPost} />
                </Col>
              ))}
            </Row>
          </SectionContent>
        </Section>
      )}
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
