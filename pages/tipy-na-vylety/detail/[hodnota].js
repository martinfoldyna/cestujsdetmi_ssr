import { useRouter } from "next/router";
import ObjektDetail from "../../../components/ObjektDetail";
import { fetchQuery } from "../../../helpers/fetch";
import enums from "../../../enums";

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
    const objektQuery = await fetchQuery(
      `${enums.URLS.objektInfo}?hodnota=${hodnota}`
    );

    const objekt = objektQuery[0];

    return objekt ? { props: { objekt } } : { props: { notFound: true } };
  } catch (err) {
    console.log(err);
    return { props: { notFound: true } };
  }
}

const VyletyDetail = ({ objekt }) => <ObjektDetail objekt={objekt} />;

export default VyletyDetail;
