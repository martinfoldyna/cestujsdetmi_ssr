import React, { useEffect, useState } from "react";
import Link from "next/link";
import MyLink from "../../layouts/MyLink";
import { Col, Container, Row } from "react-grid-system";
import { objectToArray } from "../../helpers/helpers";
import enums from "../../enums";
import SideCards from "../../layouts/SideCards";
import HeadingWithIcon from "../../layouts/HeadingWithIcon";
import { FaHeart } from "react-icons/fa";
import { getSession, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { fetchPrevio, fetchQuery } from "../../helpers/fetch";
import Objekt from "../../components/cards/Objekt";
import PrevioObjekt from "../../components/cards/PrevioObjekt";
import LoadingSkeleton from "../../layouts/LoadingSkeleton";
import HomePageObjekt from "../../layouts/HomePageObjekt";

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  console.log(session);

  if (!session) {
    ctx.res.writeHead(302, { Location: "/auth/login" });
    ctx.res.end();
    return {};
  }

  const response = await fetchQuery(
    `verejni-uzivateles?email=${session?.user.email}`
  );
  const user = response[0];

  if (!session) {
    console.log("no session");
  }

  return { props: { user: { ...user, ...session?.user } } };
}

const UserDashboard = ({ user }) => {
  const router = useRouter();
  const [previoHotels, setPrevioHotels] = useState();
  const [loading, setLoading] = useState();

  const fetchPrevioImages = async () => {
    setLoading(true);

    const previoObjects = user.oblibene_externi.filter(
      (item) => item.origin === "previo"
    );

    const formattedObjects = [];

    for (let object of previoObjects) {
      const allGalleries = await fetchQuery(
        `previo/fetch/hotel%2FgetPhotogalleries?hotId=${object.hotId}`
      );

      console.log(allGalleries);

      const profileGallery =
        allGalleries.data.photogalleries.gallery?.length > 1
          ? allGalleries.data.photogalleries.gallery?.find(
              (gallery) => gallery.profile === "true"
            )?.photos?.photo
          : allGalleries.data.photogalleries.gallery?.photos.photo;

      formattedObjects.push({ ...object, photogallery: profileGallery });
    }

    console.log(formattedObjects);

    setPrevioHotels(formattedObjects);
    setLoading(false);
  };

  useEffect(() => {
    if (user.oblibene_externi) {
      fetchPrevioImages();
    }
  }, [user.oblibene_externi]);

  return user ? (
    <Container className="main-container">
      <span className="breadcrumb">
        <Link href="/">Úvodní stránka</Link>&nbsp;/&nbsp; Nástěnka uživatele
      </span>
      <HeadingWithIcon
        icon={FaHeart}
        background="red"
        heading="Moje oblíbené objekty, aktuality a články"
        icon_size="medium"
      />
      <div className="data-wrapper">
        <Row>
          <Col lg={2.5} className="hide-mobile">
            <div className="filter-card full-padding bg-white">
              <div className="categories">
                <p className="filter-name pl-0">Navigace:</p>
                <ul className="pl-0 list-style-none categories-list">
                  {objectToArray(enums.KATEGORIE.USER).map((categoryItem) => (
                    <li className="category-item" key={categoryItem.key}>
                      <Link
                        href={{
                          pathname: "/user",
                          query: { kategorie: categoryItem.key },
                        }}
                      >
                        <a href="#">oblíbené {categoryItem.value}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <SideCards />
          </Col>
          <Col lg={9.5}>
            <div className="filtered-objects bg-white border-radius">
              {loading ? (
                <div className="p-2">
                  <LoadingSkeleton />
                </div>
              ) : user.oblibene && previoHotels ? (
                [...user.oblibene, ...previoHotels].map((objekt) =>
                  objekt.origin === "previo" ? (
                    <PrevioObjekt objekt={objekt} badge />
                  ) : (
                    <Objekt objekt={objekt} badge />
                  )
                )
              ) : (
                <h2>Nemáte žádné oblíbené objekty</h2>
              )}
              {user.rady_a_tipy.map((post) => (
                <HomePageObjekt
                  article={post}
                  topic="rady-a-tipy"
                  key={post.id}
                  number_of_words={50}
                />
              ))}
            </div>
            <button onClick={signOut} className="btn">
              Odhlásit se
            </button>
          </Col>
        </Row>
      </div>
    </Container>
  ) : (
    "You shall not pass"
  );
};

export default UserDashboard;
