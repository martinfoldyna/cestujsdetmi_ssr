import React from "react";
import {
  fetchAllPrevioHotels,
  fetchPrevio,
  fetchQuery,
} from "../../../helpers/fetch";
import PropTypes from "prop-types";
import PrevioObjektDetail from "../../../components/PrevioObjektDetail";
import { objectToArray } from "../../../helpers/helpers";

export async function getStaticPaths() {
  const previoObjects = await fetchQuery("previo/hotels/100");

  return {
    paths: previoObjects?.data?.map((hotel) => ({
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
      fetchQuery(`previo/fetch/hotel%2Fget?hotId=${id}`),
      fetchQuery(`previo/fetch/hotel%2FgetPhotogalleries?hotId=${id}`),
    ]);

    const objekt = {
      ...objektQuery?.data.hotel,
      photogallery: { ...photogallery?.data.photogalleries },
    };

    return { props: { objekt }, revalidate: 3600 };
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
