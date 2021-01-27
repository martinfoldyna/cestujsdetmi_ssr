import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { fetchPrevio } from "../helpers/fetch";
import Link from "next/link";
import MyLink from "../layouts/MyLink";
import { Col, Row } from "react-grid-system";
import SideBar from "../layouts/Sidebar";
import enums from "../enums";
import { HiHome, HiOutlineChevronRight, HiOutlineMail } from "react-icons/hi";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import Image from "next/image";
import { FaDog, FaGlobeAmericas, FaSearchPlus } from "react-icons/fa";
import Lightbox from "./lightbox/Lightbox";
import { AiOutlineHeart } from "react-icons/ai";
import parse from "html-react-parser";
import { BiPhone, BiWifi } from "react-icons/bi";
import { RiCupLine, RiParkingBoxLine } from "react-icons/ri";
import { Section, SectionContent, SectionHeading } from "../layouts/Section";
import { translateEquipment } from "../helpers/translators";
import { IoMdCheckmark } from "react-icons/io";
import { Container } from "react-grid-system";
import { FiMapPin } from "react-icons/fi";
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";
import CityPin from "../public/cityPin";

const PrevioObjektDetail = ({ objekt, color = "blue" }) => {
  const router = useRouter();
  const { id } = router.query;
  const [hotelProperties, setProperties] = useState(null);
  const [images, setImages] = useState(null);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: 500,
    zoom: 6,
    latitude: 49.8037633,
    longitude: 15.4749126,
    scrollZoom: false,
  });

  const fetchProperties = async () => {
    const properties = await fetchPrevio("system/getHotelProperties", {
      lanId: 1,
    });

    setProperties(properties.data);
  };

  const mapRef = useRef();

  const renderMarkers = () => {
    return (
      <Marker
        latitude={parseFloat(objekt.gps.lat)}
        longitude={parseFloat(objekt.gps.lng)}
      >
        <CityPin className={"text-" + color} />
      </Marker>
    );
  };

  const renderMap = () => {
    // setViewport((prevState) => ({
    //   ...prevState,
    //   longitude: objekt.gps.lng,
    //   latitude: objekt.gps.lat,
    //   zoom: 12,
    // }));

    return (
      <ReactMapGL
        ref={mapRef}
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_ACCESS_TOKEN}
        scrollZoom={false}
        className="mapbox"
        style={{ maxWidth: "100%", width: "auto" }}
      >
        <div style={{ position: "absolute", left: 10, top: 10 }}>
          <NavigationControl />
        </div>
        {renderMarkers()}
      </ReactMapGL>
    );
  };

  const [marker, setMarker] = useState({
    latitude: 50.7301,
    longitude: 15.1761383,
  });

  const generateEquipmentTable = (properties) => {
    if (properties && properties.length > 0) {
      const translatedProperties = properties.map((property) => {
        hotelProperties.find();
      });

      return (
        <Row>
          {finalEquipment.map(
            (item) =>
              item.length > 0 && (
                <Col md={12 / finalEquipment.length}>
                  <ul className="list-style-none pl-0">
                    {objekt &&
                      shownEquipment &&
                      item.map((key, index) => {
                        if (
                          equipment[key] &&
                          typeof equipment[key] === "boolean"
                        ) {
                          let translatedValue = translateEquipment(key);
                          if (noEquipemnt) {
                            setNoEquipemnt(false);
                          }

                          return (
                            <li
                              className="d-flex align-items-center mb-1"
                              key={key}
                            >
                              <IoMdCheckmark className={"text-" + color} />
                              <p className="pl-1 m-0">{translatedValue}</p>
                            </li>
                          );
                        }
                      })}
                  </ul>
                </Col>
              )
          )}
        </Row>
      );
    } else {
      return " ";
    }
  };

  const descriptionButtons = (
    <div className="d-flex buttons">
      <button
        className={`btn-small-logo d-flex align-items-center ml-0 btn bg-${color} text-white`}
      >
        Ceník
        <HiOutlineChevronRight className="btn-icon right" />
      </button>
      {/*<button*/}
      {/*  className={`btn-small-logo d-flex align-items-center btn bg-${color} text-white`}*/}
      {/*>*/}
      {/*  Poslat dotaz*/}
      {/*  <HiOutlineChevronRight className="btn-icon right" />*/}
      {/*</button>*/}
    </div>
  );

  useEffect(() => {
    fetchProperties();
    console.log("objekt in detail", objekt);
    setImages(() => objekt.photogallery.gallery.photos);

    // if (objekt.gps) {
    //   setViewport((prevState) => {
    //     return {
    //       ...prevState,
    //       latitude: objekt.gps.lat,
    //       longitude: objekt.gps.lng,
    //     };
    //   });
    //   setMarker({ latitude: objekt.gps.lat, longitude: objekt.gps.lng });
    // }
  }, [id]);

  return (
    <Container className="main-container">
      <div className="objekt-detail">
        <span className="breadcrumb">
          <Link href="/">Úvodní stránka</Link>&nbsp;/&nbsp;
          <MyLink href="/tipy-na-ubytovani" className={"text-" + color}>
            Ubytování a dovolená
          </MyLink>
          &nbsp;/&nbsp;
          {objekt?.name}
        </span>

        {/*<Link href="/">*/}
        {/*  <FiHome />*/}
        {/*</Link>*/}
        <Row>
          <Col md={2.5} className="hide-mobile">
            <SideBar topic={enums.TYP_OBJEKTU.ubytovani} color={color} />
          </Col>

          <Col md={9.5}>
            <section className="highlight-card bg-grey" id="top">
              <div className="objekt-detail-heading d-flex align-items-center justify-content-between mb-2">
                <div className="d-flex align-items-center">
                  <HiHome
                    className={"text-" + color}
                    style={{ marginRight: ".5em", fontSize: "2.5em" }}
                  />

                  <div>
                    <h1 className="m-0">{objekt?.name}</h1>
                    <div className="rating d-flex">
                      <div
                        className={`text-${color} stars d-flex align-self-end`}
                      >
                        {/*<BsStarFill />*/}
                        {/*<BsStarFill />*/}
                        {/*<BsStarFill />*/}
                        {/*<BsStarFill />*/}
                        {/*<BsStarHalf />*/}
                        {objekt.classification.stars}
                      </div>
                      <span className="text-grey rating-counter ml-1">
                        (48 hodnocení)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hide-mobile">
                <section className="objekt-detail-images mb-1">
                  {images?.length > 0 &&
                    images.map((image, i) => {
                      if (typeof image === "object") {
                        image.id = i;
                        if (i < 3) {
                          return (
                            <div
                              className={`objekt-detail-image img-0${i}`}
                              style={{ backgroundImage: `url(${image.url})` }}
                              onClick={() => openLightbox(image)}
                              key={i}
                            >
                              <Image
                                src={image.url}
                                alt={
                                  image.label
                                    ? image.label
                                    : `${objekt.nazev} ${
                                        (i < 10 ? "0" : "") + `${i}`
                                      }`
                                }
                                layout="fill"
                                objectFit="cover"
                              />

                              {i === 2 ? (
                                <div className="overlay">
                                  <p className="show-more">
                                    +{images?.length - 2} <span>dalších</span>
                                  </p>
                                </div>
                              ) : (
                                <div className="overlay  on-hover">
                                  <FaSearchPlus className="enlarge-icon text-white" />
                                </div>
                              )}
                            </div>
                          );
                        }
                      }
                    })}
                  {/*<Lightbox*/}
                  {/*  open={showLightBox}*/}
                  {/*  clickedImage={lightboxImg}*/}
                  {/*  onClose={closeLightbox}*/}
                  {/*  images={images}*/}
                  {/*/>*/}
                </section>
              </div>
              <section className="objekt-detail-images mb-1 hide-desktop">
                {images && images?.length > 0 && (
                  <>
                    <div
                      className={`objekt-detail-image img-00`}
                      style={{
                        backgroundImage: `url(${images[0]?.url})`,
                      }}
                      // onClick={() => openLightbox(images[0])}
                    >
                      <div className="overlay">
                        <div className="d-flex justify-content-between image-actions content-wrapper">
                          <div className="d-flex align-items-center text-white">
                            <AiOutlineHeart className="text-white btn-icon" />
                            <span>Do oblíbených</span>
                          </div>
                          <div className="text-white">
                            <span>+{images?.length - 2} dalších</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*<Lightbox*/}
                    {/*  open={showLightBox}*/}
                    {/*  clickedImage={lightboxImg}*/}
                    {/*  onClose={closeLightbox}*/}
                    {/*  images={objekt?.gallery}*/}
                    {/*/>*/}
                  </>
                )}
              </section>
              <Row className="m-0">
                {objekt?.descriptions?.shortDescription && (
                  <Col md={8.7} className="p-0">
                    <div className="objekt-detail-description">
                      <div className="text-wrapper">
                        <h2>Základní popis</h2>
                        <div>
                          {parse(objekt?.descriptions?.shortDescription)}
                        </div>
                      </div>
                      <div className="hide-mobile">{descriptionButtons}</div>
                    </div>
                  </Col>
                )}
                <Col className="pl-0">
                  <div className="objekt-detail-services">
                    <h2>Služby</h2>
                    <ul className="services">
                      <li className="service-item d-flex align-items-center">
                        <BiWifi className={`text-${color} service-item-icon`} />{" "}
                        <span>WiFi Zdarma</span>
                      </li>
                      <li className="service-item d-flex align-items-center">
                        <RiCupLine
                          className={`text-${color} service-item-icon`}
                        />{" "}
                        <span>Snídaně v ceně</span>
                      </li>
                      <li className="service-item d-flex align-items-center">
                        <RiParkingBoxLine
                          className={`text-${color} service-item-icon`}
                        />{" "}
                        <span>Parkování</span>
                      </li>
                      <li className="service-item d-flex align-items-center">
                        <FaDog className={`text-${color} service-item-icon`} />{" "}
                        <span>Domácí mazlíčci</span>
                      </li>
                    </ul>
                    <div className="hide-desktop">{descriptionButtons}</div>
                  </div>
                </Col>
              </Row>
            </section>
            {objekt?.descriptions?.longDescription && (
              <Section>
                <SectionHeading>
                  <h2>Podrobný popis</h2>
                </SectionHeading>
                <SectionContent>
                  <div>{parse(objekt.descriptions.longDescription)}</div>
                </SectionContent>
              </Section>
            )}

            <Section>
              <SectionHeading>
                <div className="d-flex justify-content-between align-items-center">
                  <h2>Vybavení</h2>
                  {/*{objekt.properties && (*/}
                  {/*  <div className="d-flex align-items-center">*/}
                  {/*    <button*/}
                  {/*      className={`btn-small-logo btn ${*/}
                  {/*        shownEquipment === "vnitrni_vybaveni"*/}
                  {/*          ? `bg-${color} text-white`*/}
                  {/*          : `outline-${color} text-${color}`*/}
                  {/*      }`}*/}
                  {/*      onClick={() => setShownEquipment("vnitrni_vybaveni")}*/}
                  {/*    >*/}
                  {/*      Vnitřní*/}
                  {/*      <span className="hide-mobile">&nbsp;vybavení</span>*/}
                  {/*    </button>*/}
                  {/*    <button*/}
                  {/*      className={`btn-small-logo btn ${*/}
                  {/*        shownEquipment === "vnejsi_vybaveni"*/}
                  {/*          ? `bg-${color} text-white`*/}
                  {/*          : `outline-${color} text-${color}`*/}
                  {/*      }`}*/}
                  {/*      onClick={() => setShownEquipment("vnejsi_vybaveni")}*/}
                  {/*    >*/}
                  {/*      Vnější*/}
                  {/*      <span className="hide-mobile">&nbsp;vybavení</span>*/}
                  {/*    </button>*/}
                  {/*  </div>*/}
                  {/*)}*/}
                </div>
              </SectionHeading>
              <SectionContent>
                {/*{objekt.properties && generateEquipmentTable(objekt.properties)}*/}
                {!objekt.properties && (
                  <p>Tento objekt neposkytl informace o jejich vybavení</p>
                )}
              </SectionContent>
            </Section>
            {(objekt.dostupnost || objekt.gps) && (
              <Section>
                <SectionHeading>
                  <h2>Dostupnost</h2>
                </SectionHeading>
                <SectionContent>
                  <ul className="list-style-none pl-0 m-0">
                    <Row>
                      {objekt.dostupnost && (
                        <>
                          <Col md={3}>
                            {objekt.dostupnost.mhd && (
                              <li>MHD: {objekt.dostupnost?.mhd}</li>
                            )}
                            {objekt.dostupnost.metro && (
                              <li>Metro: {objekt.dostupnost?.metro}</li>
                            )}
                          </Col>
                          <Col md={3}>
                            {objekt.dostupnost.csad && (
                              <li>ČSAD: {objekt.dostupnost?.csad}</li>
                            )}
                            {objekt.dostupnost.vlak && (
                              <li>Vlak: {objekt.dostupnost?.vlak}</li>
                            )}
                          </Col>
                        </>
                      )}
                      {objekt.gps && (
                        <Col>
                          <li>
                            GPS: {objekt.gps.lat}N, {objekt.gps.lng}E
                          </li>
                        </Col>
                      )}
                    </Row>
                  </ul>
                </SectionContent>
              </Section>
            )}
            <Row className="row">
              <Col className="col">
                <Section className="objekt-detail-contacts">
                  <SectionHeading>
                    <h2>Kontakt</h2>
                  </SectionHeading>
                  <SectionContent>
                    <ul className="list-style-none pl-0 m-0 contact-list">
                      <li className={"d-flex align-items-center text-" + color}>
                        <FaGlobeAmericas className={`icon text-${color}`} />
                        <a href={objekt.url} target="_blank">
                          {objekt.url}
                        </a>
                      </li>
                      <li className={"d-flex align-items-center text-" + color}>
                        <HiOutlineMail className="icon" />
                        <a href={`mailto:${objekt.address.mail.address[0]}`}>
                          {objekt.address.mail.address[0]}
                        </a>
                      </li>
                      <li
                        className={
                          "text-" + color + " d-flex align-items-center"
                        }
                      >
                        <BiPhone className="icon" />
                        <a
                          href={`tel:${objekt.address.phone.number[0]?.trim()}`}
                          className="text-black"
                        >
                          {objekt.address.phone.number[0]?.trim()}
                        </a>
                      </li>
                      {objekt.address && (
                        <li className={"text-" + color}>
                          <p className="m-0 d-flex align-items-center">
                            <FiMapPin className="icon" />
                            {objekt.address.name.trim()},{" "}
                            {objekt.address.street.trim()},{" "}
                            {objekt.address.city.trim()},{" "}
                            {objekt.address.country.trim()}
                          </p>
                        </li>
                      )}
                    </ul>
                  </SectionContent>
                </Section>
              </Col>
              {objekt.provozni_doba && objekt.provozni_doba.length > 0 && (
                <Col md={4}>
                  <Section>
                    <SectionHeading>
                      <h2>Provozní doba</h2>
                    </SectionHeading>
                    <SectionContent>
                      <ul className="operating-hours-timetable">
                        {objekt.provozni_doba.map((doba, i) => (
                          <li key={i}>
                            {doba.popis}: {doba.otevira_v} - {doba.zavira_v}
                          </li>
                        ))}
                      </ul>
                    </SectionContent>
                  </Section>
                </Col>
              )}
            </Row>
            <Section>
              <SectionHeading>
                <h2>Mapa</h2>
              </SectionHeading>
              {renderMap()}
            </Section>
            {/*<h2>{objekt.name}</h2>*/}
            {/*<p>{JSON.stringify(objekt)}</p>*/}
            {/*<br />*/}
            {/*<h3>Vybavení</h3>*/}
            {/*<p>{JSON.stringify(hotelProperties)}</p>*/}
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default PrevioObjektDetail;
