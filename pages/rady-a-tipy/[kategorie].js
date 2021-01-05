import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import HomePageObjekt from "../../layouts/HomePageObjekt";
import LoadingSkeleton from "../../layouts/LoadingSkeleton";
import { useRouter } from "next/router";

const RadyTipyKategorie = ({ radyTipy: { posts } }) => {
  const router = useRouter();
  const { kategorie } = router.query;
  return posts ? (
    <div>
      {posts
        .filter((post) => post.kategorie === kategorie)
        .map((post, index) => (
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

RadyTipyKategorie.propTypes = {
  radyTipy: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  radyTipy: state.radyTipy,
});

export default connect(mapStateToProps)(RadyTipyKategorie);
