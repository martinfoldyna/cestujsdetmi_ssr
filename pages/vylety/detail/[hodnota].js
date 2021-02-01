import { useRouter } from "next/router";
import { useEffect } from "react";
import ObjektDetail from "../../../components/ObjektDetail";
import { fetchQuery } from "../../../helpers/fetch";
import enums from "../../../enums";
import { Container } from "react-grid-system";
import Head from "next/head";

export async function getStaticPaths() {
  const objects = await fetchQuery(`${enums.URLS.objektInfoMini}`);
  const related = await fetchQuery(`${enums.URLS.objektInfoMini}&tags_in`);

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

    return objekt
      ? { props: { objekt, kategorie } }
      : { props: { notFound: true } };
  } catch (err) {
    console.log(err);
    return { props: { notFound: true } };
  }
}

const VyletyDetail = ({ objekt, kategorie }) => {
  return (
    <>
      <Head>
        <title>{objekt?.nazev} | Cestuj s dětmi.cz</title>
        <meta name="description" content={objekt?.page_description} />
        <meta name="robots" content="index, follow" />
      </Head>
      <Container className="main-container">
        <ObjektDetail objekt={objekt} kategorie={kategorie} />
      </Container>
    </>
  );
};

export default VyletyDetail;
