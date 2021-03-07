import { useRouter } from "next/router";
import { useEffect } from "react";
import ObjektDetail from "../../../components/ObjektDetail";
import { fetchQuery } from "../../../helpers/fetch";
import enums from "../../../enums";
import { Container } from "react-grid-system";
import Head from "next/head";
import { useSession } from "next-auth/client";

export async function getStaticPaths() {
  const objects = await fetchQuery(
    `${enums.URLS.objektInfoMini}&typ_objektu=${enums.TYP_OBJEKTU.zabava.key}&_limit=20`
  );

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

  const objektQuery = await fetchQuery(
    `${enums.URLS.objektInfo}?hodnota=${hodnota}`
  );

  const objekt = objektQuery[0];
  let related = [];
  if (objekt.oblast) {
    related = await fetchQuery(
      `objekt-infos?kraj=${objekt.kraj.id}&_limit=9&typ_objektu=${enums.TYP_OBJEKTU.zabava.key}`
    );
  }

  const locations = await fetchQuery("locations");

  return { props: { objekt, related, locations } };
}

const VyletyDetail = ({ objekt, locations, related }) => {
  const [session] = useSession();

  return (
    <>
      <Head>
        <title>{objekt?.nazev} | Cestuj s dětmi.cz</title>
        <meta name='description' content={objekt?.page_description} />
        <meta name='robots' content='index, follow' />
      </Head>
      <Container className='main-container'>
        {objekt ? (
          <ObjektDetail
            objekt={objekt}
            user={session?.user}
            locations={locations}
            related={related}
          />
        ) : (
          "Loading.."
        )}
      </Container>
    </>
  );
};

export default VyletyDetail;
