import React from "react";
import { fetchAllPrevioHotels, fetchPrevio } from "../../../helpers/fetch";
import PropTypes from "prop-types";
import PrevioObjektDetail from "../../../components/PrevioObjektDetail";

export async function getStaticPaths() {
  const previoObjects = await fetchAllPrevioHotels(100);

  return {
    paths: previoObjects.data?.hotels.hotel.map((hotel) => ({
      params: {
        id: hotel.hotId,
      },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;

  try {
    const [objektQuery, photogallery] = await Promise.all([
      fetchPrevio("hotel/get", { hotId: id }),
      fetchPrevio("hotel/getPhotogalleries", { hotId: id }),
    ]);

    console.log(photogallery);

    const objekt = {
      ...objektQuery?.data.hotel,
      photogallery: { ...photogallery?.data.photogalleries },
    };

    return { props: { objekt } };
  } catch (err) {
    console.log(err);
    return { props: { notFound: true } };
  }
}

const PrevioDetail = ({ objekt }) => {
  return objekt ? (
    <PrevioObjektDetail objekt={objekt} />
  ) : (
    <h3 className="m-0 p-2">
      Omlouváme se, ale tento objekt se nám nepodařilo najít
    </h3>
  );
};

PrevioDetail.propTypes = {
  objekt: PropTypes.object.isRequired,
};

export default PrevioDetail;
