import { useRouter } from "next/router";
import { useEffect } from "react";
import ObjektDetail from "../../../components/ObjektDetail";
import { fetchQuery } from "../../../helpers/fetch";
import enums from "../../../enums";
import { Container } from "react-grid-system";

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
    <Container className="main-container">
      <ObjektDetail objekt={objekt} kategorie={kategorie} />
    </Container>
  );
};

export default VyletyDetail;
