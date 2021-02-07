import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { HiHome, HiOutlineChevronRight, HiOutlineMail } from "react-icons/hi";
import { AiOutlineHeart } from "react-icons/ai";
import { BiPhone, BiWifi } from "react-icons/bi";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FaDog, FaGlobeAmericas, FaHeart, FaSearchPlus } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { IoMdCheckmark } from "react-icons/io";
import { RiCupLine, RiParkingBoxLine } from "react-icons/ri";
import { connect } from "react-redux";
import {
  getObjektByID,
  addReview,
  getObjektyInOblast,
  removeObjektInStorage,
} from "../redux/actions/objekty";
import PropTypes from "prop-types";
import LoadingSkeleton from "../layouts/LoadingSkeleton";
import parse from "html-react-parser";
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";
import { Row, Col } from "react-grid-system";
import Lightbox from "./lightbox/Lightbox";
import { Section, SectionContent, SectionHeading } from "../layouts/Section";
import Input from "./form/Input";
import { translateColor, translateEquipment } from "../helpers/translators";
import CityPin from "../public/cityPin";
import MiniObjekt from "./cards/MiniObjekt";
import SideBar from "../layouts/Sidebar";
import enums from "../enums";
import MyLink from "../layouts/MyLink";
import { fetchQuery } from "../helpers/fetch";
import { addToFavorite, removeFromFavorite } from "../helpers/user";
import { useSession } from "next-auth/client";

const ObjektDetail = ({ addReview, objekt, kategorie, user }) => {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: 500,
    latitude: 50.7301,
    longitude: 15.1761383,
    zoom: 12,
    scrollZoom: false,
  });

  const router = useRouter();
  const { id } = router.query;

  const ignoreInComponent = ["_id", "id", "createdAt", "__v"];

  const [showLightBox, setShowLightBox] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);

  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedStar, setSelectedStar] = useState(null);
  const [shownEquipment, setShownEquipment] = useState("vnitrni_vybaveni");
  const [color, setColor] = useState("blue");
  const [related, setRelated] = useState(null);
  const [outerEquipmentLength, setOuterEquipmentLength] = useState(0);
  const [innerEquipmentLength, setInnerEquipmentLength] = useState(0);

  // If objekt has zero equipment selected as true -> false is set, when equipment element is found as true in map function
  const [noEquipemnt, setNoEquipemnt] = useState(true);

  const [recenze, setReview] = useState("");

  const mapRef = useRef();

  const { REACT_APP_MAPBOX_API_ACCESS_TOKEN } = process.env;

  const handleViewportChange = useCallback((newViewport) => {
    return setViewport(newViewport);
  }, []);

  const handleReview = () => {
    addReview(
      { recenze: [...objekt.recenze, { recenze, hvezdicky: selectedStar }] },
      objekt.id
    );
  };

  // const readArticle = async (data) => {
  //   if (data) {
  //     try {
  //       const res = await axios.put(`http://localhost:1337/objekties/${id}`, {
  //         precteno: data.precteno + 1,
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // };

  useEffect(() => {}, [objekt]);

  // dynamically renders equipment section
  const equipment = () => {
    console.log("in equiment funciton");
    const selectedEquipment =
      shownEquipment === "outer"
        ? objekt.vnejsi_vybaveni
        : objekt.vnitrni_vybaveni;
    console.log(selectedEquipment);
    return Object.keys(selectedEquipment).map((key) => {
      if (
        selectedEquipment[key] &&
        typeof selectedEquipment[key] === "boolean"
      ) {
        let translatedValue = translateEquipment(key);
        return (
          <li className="d-flex align-items-center mb-1" key={key}>
            <IoMdCheckmark className={`text-${color}`} />
            <p className="pl-1 m-0">{translatedValue}</p>
          </li>
        );
      }
    });
  };

  const fetchRelated = async () => {
    const related = await fetchQuery(
      `objekt-infos?adresa_oblast_value=${objekt.adresa_oblast_value}`
    );

    setRelated(related);
  };

  useEffect(() => {
    if (objekt) {
      fetchRelated();
      setColor(translateColor(objekt.typ_objektu));

      setInnerEquipmentLength(objekt.vnitrni_vybaveni?.length);
      setOuterEquipmentLength(objekt.vnejsi_vybaveni?.length);

      // Init mapbox
      console.log("GPS", objekt["dostupnost.mhd"]);
      if (
        objekt.dostupnost?.gps &&
        objekt.dostupnost.gps.lat &&
        objekt.dostupnost.gps.lng
      ) {
        setMarker({
          latitude: parseFloat(objekt.dostupnost.gps?.lat),
          longitude: parseFloat(objekt.dostupnost.gps?.lng),
        });
      }
      // if (objekt.adresa) {
      //   getObjektyInOblast(objekt.adresa.oblast);
      // }
    }
  }, [objekt]);

  const descriptionButtons = (
    <div className="d-flex buttons">
      <button
        className={`btn-small-logo d-flex align-items-center ml-0 btn bg-${color} text-white`}
      >
        Ceník
        <HiOutlineChevronRight className="btn-icon right" />
      </button>
      <button
        className={`btn-small-logo d-flex align-items-center btn bg-${color} text-white`}
      >
        Poslat dotaz
        <HiOutlineChevronRight className="btn-icon right" />
      </button>
      <button
        className={`btn-small-logo d-flex align-items-center btn bg-${color} text-white`}
      >
        Webové stránky
        <HiOutlineChevronRight className="btn-icon right" />
      </button>
    </div>
  );

  const generateEquipmentTable = (equipment) => {
    const ignoreKeys = ["_id", "id", "__v"];
    const equipmentKeys = Object.keys(equipment)
      .filter((key) => ignoreKeys.indexOf(key) < 0)
      .filter((key) => equipment[key]);
    if (equipmentKeys && equipmentKeys.length > 0) {
      const dividedLength = Math.round(equipmentKeys?.length / 3);
      let finalEquipment = [];

      for (let i = 0; i <= equipmentKeys.length; i += dividedLength) {
        finalEquipment.push(equipmentKeys.slice(i, i + dividedLength));
      }

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

  const [marker, setMarker] = useState({
    latitude: 50.7301,
    longitude: 15.1761383,
  });

  const openLightbox = (image) => {
    setLightboxImg(image);
    setShowLightBox(true);
  };

  const closeLightbox = () => {
    setLightboxImg(null);
    setShowLightBox(false);
  };

  const images =
    objekt?.galerie && objekt?.galerie?.length > 0
      ? objekt?.galerie
      : objekt?.relative_galerie && objekt?.relative_galerie?.length > 0
      ? objekt?.relative_galerie
      : [];

  return !objekt ? (
    <LoadingSkeleton />
  ) : (
    <>
      <div className="objekt-detail">
        <span className="breadcrumb">
          <Link href="/">Úvodní stránka</Link>&nbsp;/&nbsp;
          {objekt.typ_objektu === "ubytovani" ? (
            <MyLink href="/ubytovani" className={"text-" + color}>
              Ubytování a dovolená
            </MyLink>
          ) : objekt.typ_objektu === "zabava" ? (
            <MyLink href="/vylety" className={"text-" + color}>
              Výlety s dětmi
            </MyLink>
          ) : (
            ""
          )}
          &nbsp;/&nbsp;
          {objekt?.nazev}
        </span>

        {/*<Link href="/">*/}
        {/*  <FiHome />*/}
        {/*</Link>*/}
        <Row>
          <Col md={2.5} className="hide-mobile">
            <SideBar
              topic={enums.TYP_OBJEKTU[objekt.typ_objektu]}
              color={color}
              kategorie={kategorie}
            />
          </Col>

          <Col md={9.5}>
            <section className="highlight-card bg-grey" id="top">
              <div className="objekt-detail-heading d-flex align-items-center justify-content-between mb-2">
                <div>
                  <div className="d-flex align-items-center">
                    <HiHome
                      className={"text-" + color}
                      style={{ marginRight: ".5em", fontSize: "2.5em" }}
                    />

                    <div>
                      <h1 className="m-0">{objekt?.nazev}</h1>
                      <div className="rating d-flex">
                        <div
                          className={`text-${color} stars d-flex align-self-end`}
                        >
                          <BsStarFill />
                          <BsStarFill />
                          <BsStarFill />
                          <BsStarFill />
                          <BsStarHalf />
                        </div>
                        <span className="text-grey rating-counter ml-1">
                          (48 hodnocení)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {user && (
                  <div>
                    {objekt.verejni_uzivatele.find(
                      (publicUser) => publicUser.email === user?.email
                    ) ? (
                      <button
                        className={`btn ghost text-${color} d-flex align-items-center`}
                        onClick={() =>
                          removeFromFavorite({ localId: objekt._id, user })
                        }
                      >
                        <AiOutlineHeart className="btn-icon text-black" />
                        Odebrat z oblíbených
                      </button>
                    ) : (
                      <button
                        className={`btn ghost text-${color} d-flex align-items-center`}
                        onClick={() =>
                          addToFavorite({ localId: objekt.id, user })
                        }
                      >
                        <AiOutlineHeart className="btn-icon text-black" />
                        Přidat do oblíbených
                      </button>
                    )}
                  </div>
                )}
              </div>
              <div className="hide-mobile">
                <section className="objekt-detail-images mb-1">
                  {images?.length > 0 &&
                    images?.map((image, i) => {
                      if (typeof image === "object") {
                        image.id = i;
                        if (i < 3) {
                          return (
                            <div
                              className={`objekt-detail-image img-0${i}`}
                              onClick={() => openLightbox(image)}
                              key={i}
                            >
                              <Image
                                src={image.sm}
                                alt={
                                  image.alternativeText
                                    ? image.alternativeText
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
                                    +{images.length - 2} <span>dalších</span>
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
                  <Lightbox
                    open={showLightBox}
                    clickedImage={lightboxImg}
                    onClose={closeLightbox}
                    images={images}
                  />
                </section>
              </div>
              <section className="objekt-detail-images mb-1 hide-desktop">
                {images && images?.length > 0 && (
                  <>
                    <div
                      className={`objekt-detail-image img-00`}
                      onClick={() => openLightbox(images[0])}
                    >
                      <Image
                        src={images[0].sm}
                        alt={
                          images[0].alternativeText
                            ? images[0].alternativeText
                            : `${objekt.nazev}`
                        }
                        layout="fill"
                        objectFit="cover"
                      />
                      <div className="overlay">
                        <div className="d-flex justify-content-between image-actions content-wrapper">
                          <div className="d-flex align-items-center text-white">
                            <AiOutlineHeart className="text-white btn-icon" />
                            <span>Do oblíbených</span>
                          </div>
                          <div className="text-white">
                            <span>+{images.length - 2} dalších</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Lightbox
                      open={showLightBox}
                      clickedImage={lightboxImg}
                      onClose={closeLightbox}
                      images={objekt?.galerie}
                    />
                  </>
                )}
              </section>

              <Row className="m-0">
                {objekt?.zakladni_popis && (
                  <Col md={8.7} className="p-0">
                    <div className="objekt-detail-description">
                      <div className="text-wrapper">
                        <h2>Základní popis</h2>
                        <div>{parse(objekt?.zakladni_popis)}</div>
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

            {objekt?.podrobny_popis && (
              <Section>
                <SectionHeading>
                  <h2>Podrobný popis</h2>
                </SectionHeading>
                <SectionContent>
                  <div>{parse(objekt?.podrobny_popis)}</div>
                </SectionContent>
              </Section>
            )}
            {!objekt.vnitrni_vybaveni && !objekt.vnejsi_vybaveni ? (
              ""
            ) : (
              <Section>
                <SectionHeading>
                  <div className="d-flex justify-content-between align-items-center">
                    <h2>Vybavení</h2>
                    {!noEquipemnt && (
                      <div className="d-flex align-items-center">
                        <button
                          className={`btn-small-logo btn ${
                            shownEquipment === "vnitrni_vybaveni"
                              ? `bg-${color} text-white`
                              : `outline-${color} text-${color}`
                          }`}
                          onClick={() => setShownEquipment("vnitrni_vybaveni")}
                        >
                          Vnitřní
                          <span className="hide-mobile">&nbsp;vybavení</span>
                        </button>
                        <button
                          className={`btn-small-logo btn ${
                            shownEquipment === "vnejsi_vybaveni"
                              ? `bg-${color} text-white`
                              : `outline-${color} text-${color}`
                          }`}
                          onClick={() => setShownEquipment("vnejsi_vybaveni")}
                        >
                          Vnější
                          <span className="hide-mobile">&nbsp;vybavení</span>
                        </button>
                      </div>
                    )}
                  </div>
                </SectionHeading>
                <SectionContent>
                  {objekt[shownEquipment] &&
                    generateEquipmentTable(objekt[shownEquipment])}
                  {noEquipemnt && (
                    <p>Tento objekt neposkytl informace o jejich vybavení</p>
                  )}
                </SectionContent>
              </Section>
            )}
            {objekt.zajimavosti && (
              <Section>
                <SectionHeading>
                  <h2>Zajímavosti v okolí</h2>
                </SectionHeading>
                <SectionContent>
                  {objekt.zajimavosti && (
                    <div>
                      <p>{parse(objekt?.zajimavosti)}</p>
                    </div>
                  )}
                </SectionContent>
              </Section>
            )}
            {objekt.dostupnost && (
              <Section>
                <SectionHeading>
                  <h2>Dostupnost</h2>
                </SectionHeading>
                <SectionContent>
                  <ul className="list-style-none pl-0 m-0">
                    <Row>
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
                      {objekt.dostupnost.gps && (
                        <Col>
                          <li>
                            GPS: {objekt.dostupnost?.gps.lat}N,{" "}
                            {objekt.dostupnost?.gps.lng}E
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
                      <li className={"text-" + color}>
                        <FaGlobeAmericas className={`icon text-${color}`} />
                        <a
                          href={
                            objekt.web?.includes("https://") ||
                            objekt.web?.includes("http://")
                              ? objekt.web
                              : `https://${objekt.web}`
                          }
                          target="_blank"
                        >
                          {objekt.web}
                        </a>
                      </li>
                      <li className={"text-" + color}>
                        <HiOutlineMail className="icon" />
                        <a href={`mailto:${objekt.email}`}>{objekt.email}</a>
                      </li>
                      <li className={"text-" + color}>
                        <BiPhone className="icon" />
                        <a
                          href={`tel:${objekt.telefon}`}
                          className="text-black"
                        >
                          {objekt.telefon}
                        </a>
                      </li>
                      {objekt.adresa && (
                        <li className={"text-" + color}>
                          <p className="m-0">
                            <FiMapPin className="icon" />
                            {objekt.adresa.ulice}, {objekt.adresa.mesto}, Česká
                            republika
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
              <ReactMapGL
                ref={mapRef}
                {...viewport}
                onViewportChange={(nextViewport) => setViewport(nextViewport)}
                mapboxApiAccessToken={
                  process.env.NEXT_PUBLIC_MAPBOX_API_ACCESS_TOKEN
                }
                scrollZoom={false}
                className="mapbox"
                style={{ maxWidth: "100%", width: "auto" }}
              >
                <div style={{ position: "absolute", left: 10, top: 10 }}>
                  <NavigationControl />
                </div>
                <Marker {...marker}>
                  <CityPin className={"text-" + color} />
                </Marker>
              </ReactMapGL>
            </Section>
            <Section>
              <SectionHeading>
                <h2>Recenze</h2>
              </SectionHeading>
              <SectionContent>
                {objekt.recenze && (
                  <ul>
                    {objekt.recenze.map((recenze, index) => (
                      <li key={index}>
                        <b>recenze</b> hvezdicky: {recenze.hvezdicky}; popis:{" "}
                        {recenze.recenze}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="d-flex align-items-center add-review">
                  <span className="text-grey">Ohodnotit:</span>
                  <div
                    className={"stars text-" + color}
                    onMouseLeave={() =>
                      setHoveredStar(selectedStar ? selectedStar : 0)
                    }
                  >
                    {[1, 2, 3, 4, 5].map((number) =>
                      hoveredStar >= number ? (
                        <BsStarFill
                          key={number}
                          className="star mr-1"
                          onMouseEnter={(e) => setHoveredStar(number)}
                          onClick={() => setSelectedStar(number)}
                        />
                      ) : (
                        <BsStar
                          key={number}
                          className="star mr-1"
                          onMouseEnter={(e) => setHoveredStar(number)}
                          onClick={() => setSelectedStar(number)}
                        />
                      )
                    )}
                  </div>
                </div>
                <Input
                  name="recenze"
                  text="Přidejte recenzi"
                  className="ml-0 mt-1"
                  onChange={(e) => setReview(e.target.value)}
                  value={recenze}
                />
                {(recenze || selectedStar) && (
                  <button
                    className="btn bg-blue text-white mt-1"
                    onClick={handleReview}
                  >
                    Odeslat
                  </button>
                )}
              </SectionContent>
            </Section>
            {related && related.length > 0 && (
              <Section>
                <SectionHeading>
                  <h2>Další tipy na ubytování v této oblasti</h2>
                </SectionHeading>
                <SectionContent>
                  <Row>
                    {/*{related.map(*/}
                    {/*  (objektItem) =>*/}
                    {/*    objektItem.id !== objekt.id && (*/}
                    {/*      <Col md={6} lg={4} key={objekt.id}>*/}
                    {/*        <MiniObjekt objekt={objektItem} />*/}
                    {/*      </Col>*/}
                    {/*    )*/}
                    {/*)}*/}
                  </Row>
                </SectionContent>
              </Section>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ObjektDetail;
