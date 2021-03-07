import React, { useContext } from "react";
import { useRouter } from "next/router";
import ObjektDetail from "../../../components/ObjektDetail";
import { fetchQuery } from "../../../helpers/fetch";
import enums from "../../../enums";
import { searchParamsToQueryString } from "../../../helpers/helpers";
import { Container } from "react-grid-system";
import { useSession } from "next-auth/client";
import { GlobalContext } from "../../../context/GlobalContext";

export async function getStaticPaths() {
  const objects = await fetchQuery(
    `${enums.URLS.objektInfoMini}&typ_objektu=${enums.TYP_OBJEKTU.ubytovani.key}&_limit=20`
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

  try {
    const objektQuery = await fetchQuery(
      `${enums.URLS.objektInfo}?hodnota=${hodnota}`
    );

    const objekt = objektQuery[0];
    let related = [];
    if (objekt?.adresa_oblast) {
      related = await fetchQuery(
        `${enums.URLS.objektInfo}?adresa_oblast=${objekt.adresa_oblast}`
      );
    }

    if (objekt.oblast) {
      related = await fetchQuery(
        `objekt-infos?kraj=${objekt.kraj.id}&_limit=9&typ_objektu=${enums.TYP_OBJEKTU.ubytovani.key}`
      );
    }

    const locations = await fetchQuery("locations");

    return objekt
      ? { props: { objekt, related, locations } }
      : { props: { notFound: true } };
  } catch (err) {
    console.log(err);
    return { props: { notFound: true } };
  }
}

const UbytovaniDetail = ({ objekt, related, locations }) => {
  const [session] = useSession();

  return (
    <Container className='main-container'>
      {objekt ? (
        <ObjektDetail
          objekt={objekt}
          related={related}
          user={session?.user}
          locations={locations}
        />
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};

export default UbytovaniDetail;
