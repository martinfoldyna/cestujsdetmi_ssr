import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { Col, Container, Row } from "react-grid-system";
import { BsFilter } from "react-icons/bs";
import { HiHome } from "react-icons/hi";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import ListFilteredItems from "../../components/listFilteredItems";
import enums from "../../enums";
import SideBar from "../../layouts/Sidebar";
import SideFilter from "../../components/cards/SideFilter";
import SideCards from "../../layouts/SideCards";
import HeadingWithIcon from "../../layouts/HeadingWithIcon";
import { fetchAllPrevioHotels, fetchQuery } from "../../helpers/fetch";
import { searchParamsToQueryString } from "../../helpers/helpers";
import Head from "next/head";
import { GlobalContext } from "../../context/GlobalContext";
import MobileFilters from "../../components/mobileFilters";

export async function getStaticProps() {
  const limit = 6;

  const fetchParams = {
    typ_objektu: "ubytovani",
    _limit: limit,
    _start: 0,
  };

  const [objekty, previoObjekty, locations] = await Promise.all([
    fetchQuery(
      `${enums.URLS.objektInfoMini}&${searchParamsToQueryString(fetchParams)}`
    ),
    fetchAllPrevioHotels(10),
    fetchQuery("locations"),
  ]);

  return {
    props: {
      objekty,
      previo: previoObjekty?.success ? previoObjekty.data : [],
      locations,
    },
    revalidate: 3600,
  };
}

const TipyNaUbytovani = ({ objekty, previo, removeObjekty, locations }) => {
  const router = useRouter();

  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  // How many objects are shown and at which number start api call query
  const [next, setNext] = useState(2);
  const [previoHotels, setPrevioHotels] = useState(previo);

  /**
   * Fetch profile photo gallery for each previo hotel
   */
  const fetchGalleries = async () => {
    const finalHotels = [];

    for (let hotel of previo) {
      // API call
      const galleryResponse = await fetchQuery(
        `previo/fetch/hotel%2FgetPhotogalleries?hotId=${hotel.hotId}`
      );

      // Find the only profile gallery (Previo provide multiple galleries)
      const gallery =
        galleryResponse.data?.photogalleries.gallery.length > 1
          ? galleryResponse.data?.photogalleries.gallery?.find(
              (gallery) => gallery.profile === "true"
            )?.photos?.photo
          : galleryResponse.data?.photogalleries.gallery?.photos.photo;

      finalHotels.push({
        ...hotel,
        photogallery: gallery.sort(
          (a, b) => parseInt(a.order) - parseInt(b.order)
        ),
      });
    }

    // Assign all hotels with photo galleries to previoHotels state
    setPrevioHotels(finalHotels);
  };

  useEffect(() => {
    if (previo) {
      fetchGalleries();
    }
  }, []);

  // Mobile only for displaying filter
  const [openFilter, setOpenFilter] = useState(false);
  // How many objects per page to show
  const limit = 6;

  const fetchParams = {
    typ_objektu: "ubytovani",
    _limit: limit,
    _start: 0,
  };

  const sideBarProps = {
    topic: enums.TYP_OBJEKTU.ubytovani,
    color: "blue",
    ...locations,
  };

  return (
    <>
      <Head>
        <title>Ubytování a dovolená s dětmi | Cestuj s dětmi.cz</title>
        <meta name='description' content='Ubytování a dovolená s dětmi' />
        <meta name='keywords' content='Ubytování a dovolená s dětmi' />
        <meta name='robots' content='index, follow' />
      </Head>
      <Container className='main-container'>
        <span className='breadcrumb'>
          <Link href='/'>Úvodní stránka</Link>
          &nbsp;/&nbsp;Ubytování a dovolená
        </span>

        <HeadingWithIcon
          background='blue'
          heading='Tipy na ubytování'
          icon={HiHome}
        >
          <p>
            Ubytování, dovolená, víkendy s dětmi po Čechách i na Moravě. Najděte
            si to správné ubytování, které Vám bude nejlépe vyhovovat. Hotely,
            apartmány, penziony, chaty, chalupy, kempy, ubytování v soukromí,
            ale třeba i na lodi. Dovolenou s dětmi v Čechách si užijete.
          </p>
        </HeadingWithIcon>
        <div className='data-wrapper ubytovani'>
          <Row>
            <Col md={2.5} className='hide-mobile'>
              <SideBar {...sideBarProps} />
            </Col>
            <Col className='.col-pl-0'>
              <MobileFilters {...sideBarProps} />

              <ListFilteredItems
                region={selectedRegion}
                city={selectedCity}
                typ_objektu={enums.TYP_OBJEKTU.ubytovani.key}
                objekty={objekty}
                previoObjekty={previoHotels}
              />
              <div className='hide-desktop'>
                <div className='mt-1'>
                  <SideCards />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

TipyNaUbytovani.propTypes = {
  objekty: PropTypes.array,
  getObjektyByParams: PropTypes.func,
  removeObjekty: PropTypes.func,
};

export default TipyNaUbytovani;
