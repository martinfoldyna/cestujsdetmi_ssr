import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import HomePageObjekt from "../../layouts/HomePageObjekt";
import LoadingSkeleton from "../../layouts/LoadingSkeleton";
import { useRouter } from "next/router";
import { fetchQuery } from "../../helpers/fetch";
import enums from "../../enums";
import { objectToArray } from "../../helpers/helpers";
import RadyTipy from "./index";
import RadyTipyLayout from "../../layouts/siteLayouts/RadyTipyLayout";
import MobileNewsArticle from "../../layouts/MobileNewsArticle";
import Head from "next/head";
import VerticalPost from "../../layouts/VerticalPost";
export async function getStaticPaths() {
  const categories = objectToArray(enums.RADY_TIPY.KATEGORIE);

  return {
    paths: categories.map((category) => ({
      params: {
        kategorie: category.key,
      },
    })),
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const radyTipy = await fetchQuery(
    `${enums.URLS.radyTipy}&kategorie=${context.params.kategorie}`
  );

  return { props: { radyTipy: radyTipy } };
}

const RadyTipyKategorie = ({ radyTipy }) => {
  const router = useRouter();
  const { kategorie } = router.query;

  return radyTipy ? (
    <>
      <Head>
        {/*   TODO: Přidat description    */}
        <title>{enums.RADY_TIPY.KATEGORIE[kategorie].value}</title>
        <meta name='robots' content='index, follow' />
      </Head>
      <div className='border-radius mb-1 bg-white p-1'>
        {radyTipy.map((post, index) => (
          <div key={post.id}>
            <div className='hide-mobile'>
              <HomePageObjekt
                article={post}
                topic='rady-a-tipy'
                key={post.id}
                number_of_words={50}
                className={`hide-mobile`}
              />
            </div>
            <div className='hide-desktop'>
              {index === 0 ? (
                <VerticalPost post={post} useNextImg={true} />
              ) : (
                <MobileNewsArticle
                  article={post}
                  key={post.id}
                  background={index - (1 % 2) === 0 ? "grey" : "white"}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  ) : (
    <LoadingSkeleton />
  );
};

RadyTipyKategorie.Layout = RadyTipyLayout;

RadyTipyKategorie.propTypes = {
  radyTipy: PropTypes.array.isRequired,
};

export default RadyTipyKategorie;
