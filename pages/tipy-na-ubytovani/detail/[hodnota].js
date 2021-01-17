import { useRouter } from "next/router";
import ObjektDetail from "../../../components/ObjektDetail";
import { fetchQuery } from "../../../helpers/fetch";
import enums from "../../../enums";
import { objectToQueryString } from "../../../helpers/helpers";
import { Container } from "react-grid-system";
import React from "react";

export async function getStaticPaths() {
  const objects = await fetchQuery(`${enums.URLS.objektInfoMini}`);

  return {
    paths: objects.map((object) => ({
      params: {
        hodnota: object.hodnota,
      },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { hodnota } = params;

  try {
    const [objektQuery, kategorie] = await Promise.all([
      fetchQuery(`${enums.URLS.objektInfo}?hodnota=${hodnota}`),
      fetchQuery(`${enums.URLS.kategorie}`),
    ]);

    const objekt = objektQuery[0];
    let related = [];
    if (objekt?.adresa_oblast) {
      related = await fetchQuery(
        `${enums.URLS.objektInfo}?adresa_oblast=${objekt.adresa_oblast}`
      );
      console.log(related);
    }

    return objekt
      ? { props: { objekt, kategorie, related } }
      : { props: { notFound: true } };
  } catch (err) {
    console.log(err);
    return { props: { notFound: true } };
  }
}

const UbytovaniDetail = ({ objekt, kategorie, related }) => (
  <Container style={{ maxWidth: "1220px" }}>
    <ObjektDetail objekt={objekt} kategorie={kategorie} related={related} />
  </Container>
);

export default UbytovaniDetail;
