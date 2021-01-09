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
import RadyTipyLayout from "../../layouts/RadyTipyLayout";

export async function getStaticPaths() {
  const categories = objectToArray(enums.RADY_TIPY.KATEGORIE);

  return {
    paths: categories.map((category) => ({
      params: {
        kategorie: category.key,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const radyTipy = await fetchQuery(
    `${enums.URLS.radyTipy}&kategorie=${context.params.kategorie}`
  );

  return { props: { radyTipy: radyTipy } };
}

const RadyTipyKategorie = ({ radyTipy }) => {
  return radyTipy ? (
    <div>
      {radyTipy.map((post, index) => (
        <HomePageObjekt
          article={post}
          topic="rady-a-tipy"
          key={post.id}
          number_of_words={50}
          className={(index + 1) % 2 === 0 ? "bg-grey" : ""}
        />
      ))}
    </div>
  ) : (
    <LoadingSkeleton />
  );
};

RadyTipyKategorie.Layout = RadyTipyLayout;

RadyTipyKategorie.propTypes = {
  radyTipy: PropTypes.object.isRequired,
};

export default RadyTipyKategorie;
