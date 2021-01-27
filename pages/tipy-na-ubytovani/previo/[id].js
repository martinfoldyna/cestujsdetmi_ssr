import React from "react";
import { fetchPrevio } from "../../../helpers/fetch";
import PropTypes from "prop-types";
import PrevioObjektDetail from "../../../components/PrevioObjektDetail";

export async function getStaticPaths() {
  const xml = `<limit>10</limit>
    <filter>
        <in>
            <field>collaboration</field>
            <value>active</value>
        </in>
        <in>
            <field>couId</field>
            <value>1</value>
        </in>
    </filter>
    <order>
        
        <by>name</by>
        <desc>false</desc>
    </order>`;

  const previoObjects = await fetchPrevio(`hotels/search`, {}, xml);

  return {
    paths: previoObjects.data.hotels.hotel.map((hotel) => ({
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
