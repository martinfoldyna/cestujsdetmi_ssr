import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useContext,
} from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { HiHome, HiOutlineChevronRight, HiOutlineMail } from "react-icons/hi";
import { AiFillCompass, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiPhone, BiWifi } from "react-icons/bi";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FaDog, FaGlobeAmericas, FaHeart, FaSearchPlus } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { IoMdCheckmark, IoMdPin } from "react-icons/io";
import { RiCupLine, RiParkingBoxLine } from "react-icons/ri";
import LoadingSkeleton from "../layouts/LoadingSkeleton";
import parse from "html-react-parser";
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";
import { Row, Col } from "react-grid-system";
import Lightbox from "./lightbox/Lightbox";
import { Section, SectionContent, SectionHeading } from "../layouts/Section";
import Input from "./form/Input";
import { translateColor, translateEquipment } from "../helpers/translators";
import CityPin from "../public/cityPin";
import SideBar from "../layouts/Sidebar";
import enums from "../enums";
import MyLink from "../layouts/MyLink";
import { addToFavorite, removeFromFavorite } from "../helpers/user";
import ClampLines from "react-clamp-lines";
import CenikModal from "./CenikModal";
import MiniObjekt from "./cards/MiniObjekt";
import LocationBadge from "./LocationBadge";
import Head from "next/head";
import { objectToArray } from "../helpers/helpers";
import Icon from "@iconify/react";

const ObjektDetail = ({ addReview, objekt, user, locations, related }) => {
  const [viewport, setViewport] = useState({
    width: "auto",
    height: "50vh",
    latitude: 50.7301,
    longitude: 15.1761383,
    zoom: 12,
    scrollZoom: false,
  });

  const router = useRouter();

  const [showLightBox, setShowLightBox] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);

  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedStar, setSelectedStar] = useState(null);
  const [shownEquipment, setShownEquipment] = useState("vnitrni_vybaveni");
  const [color, setColor] = useState("blue");
  const [openPriceList, setOpenPriceList] = useState(false);
  const [outerEquipmentLength, setOuterEquipmentLength] = useState(0);
  const [innerEquipmentLength, setInnerEquipmentLength] = useState(0);
  const equipmentIcons = objectToArray(enums.OBJEKTY.VYBAVENI.IKONY);
  const [finalIcons, setFinalIcons] = useState([]);

  // If objekt has zero equipment selected as true -> false is set, when equipment element is found as true in map function
  const [noEquipemnt, setNoEquipemnt] = useState(true);

  const [recenze, setReview] = useState("");

  const mapRef = useRef();

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

  // dynamically renders equipment section

  useEffect(() => {
    if (objekt) {
      setColor(translateColor(objekt.typ_objektu));
      if (objekt.vnitrni_vybaveni) {
        setInnerEquipmentLength(objekt.vnitrni_vybaveni.length);
      }

      if (objekt.vnejsi_vybaveni) {
        setOuterEquipmentLength(objekt.vnejsi_vybaveni?.length);
      }

      let selectedIcons = [];
      equipmentIcons.forEach((equipmentIcon) => {
        let foundEquipment = undefined;
        foundEquipment = Object.keys(objekt.vnejsi_vybaveni).find(
          (item) => `outside_${item}` === equipmentIcon.key
        );
        if (!foundEquipment) {
          foundEquipment = Object.keys(objekt.vnitrni_vybaveni).find(
            (item) => `inside_${item}` === equipmentIcon.key
          );
        }
        if (foundEquipment) {
          selectedIcons.push(equipmentIcon);
        }
      });

      setFinalIcons(selectedIcons);

      // Init mapbox
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
      if (objekt.gps) {
        const regex = objekt.gps.match(
          /(?<lat>\d{0,5}[,.]{1}\d{0,10})N,? ?(?<lng>\d{0,5}[,.]{1}\d{0,10})E?/
        );

        // if (regex) {
        //   setMarker({
        //     latitude: parseFloat(regex.lat),
        //     longitude: parseFloat(regex.lng),
        //   });
        // }
      }
      // if (objekt.adresa) {
      //   getObjektyInOblast(objekt.adresa.oblast);
      // }
    }
  }, [objekt]);

  const descriptionButtons = (
    <div className='d-flex buttons'>
      <button
        className={`btn-logo d-flex align-items-center ml-0 btn bg-${color} text-white`}
        onClick={() => setOpenPriceList(true)}
      >
        Ceník
      </button>
      <button
        className={`btn-logo d-flex align-items-center btn bg-${color} text-white`}
      >
        <a href={`mailto:${objekt.email}`}>Poslat dotaz</a>
      </button>
      {objekt.web && (
        <button
          className={`btn-logo d-flex align-items-center btn outline-${color} text-${color}`}
        >
          <a href={objekt.web} target='_blank' rel='noopener'>
            Webové stránky
          </a>
        </button>
      )}
    </div>
  );

  const generateEquipmentTable = (equipment) => {
    const ignoreKeys = ["_id", "id", "__v"];
    const equipmentKeys = Object.keys(equipment)
      .filter((key) => {
        if (key) {
          return ignoreKeys.indexOf(key) === -1;
        }
      })
      .filter((key) => {
        return key && equipment[key];
      });

    if (equipmentKeys && equipmentKeys.length > 0) {
      const dividedLength = Math.round(equipmentKeys?.length / 3);
      let finalEquipment = [];

      if (dividedLength > 0) {
        for (let i = 0; i <= equipmentKeys.length; i += dividedLength) {
          finalEquipment.push(equipmentKeys.slice(i, i + dividedLength));
        }
      } else {
        finalEquipment.push(equipmentKeys);
      }

      return (
        <Row>
          {finalEquipment.map((item, index) => {
            return (
              item.length > 0 && (
                <Col md={12 / finalEquipment.length} key={index}>
                  <ul className='list-style-none pl-0'>
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
                              className='d-flex align-items-center mb-1'
                              key={key}
                            >
                              <IoMdCheckmark className={"text-" + color} />
                              <p className='pl-1 m-0'>{translatedValue}</p>
                            </li>
                          );
                        }
                      })}
                  </ul>
                </Col>
              )
            );
          })}
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

  const sideBarProps = {
    topic: enums.TYP_OBJEKTU[objekt.typ_objektu],
    color,
    ...locations,
  };

  const images =
    objekt?.galerie && objekt?.galerie?.length > 0
      ? objekt?.galerie
      : objekt?.relative_galerie && objekt?.relative_galerie?.length > 0
      ? objekt?.relative_galerie
      : null;

  return !objekt ? (
    <LoadingSkeleton />
  ) : (
    <>
      <Head>
        <title>
          {objekt.page_title
            ? objekt.page_title
            : `${objekt.nazev} | Cestuj s dětmi.cz`}
        </title>
        <meta name='description' content={objekt.page_description} />
        {objekt.page_keywords && (
          <mata name='keywords' content={objekt.page_keywords} />
        )}
        <meta name='robots' content='index, follow' />
      </Head>
      <div className='objekt-detail'>
        <span className='breadcrumb'>
          <Link href='/'>Úvodní stránka</Link>&nbsp;/&nbsp;
          {objekt.typ_objektu === "ubytovani" ? (
            <MyLink href='/ubytovani' className={"text-" + color}>
              Ubytování a dovolená
            </MyLink>
          ) : objekt.typ_objektu === "zabava" ? (
            <MyLink href='/vylety' className={"text-" + color}>
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
        <CenikModal
          open={openPriceList}
          onClose={() => setOpenPriceList(false)}
          cenik={objekt.ceny}
          slevy={objekt.slevy}
        />
        <Row>
          <Col md={2.5} className='hide-mobile'>
            <SideBar {...sideBarProps} />
          </Col>

          <Col md={9.5}>
            <section className='highlight-card bg-white' id='top'>
              <div className='objekt-detail-heading d-flex align-items-center justify-content-between mb-2'>
                <div>
                  <div className='d-flex icon'>
                    {color === "blue" ? (
                      <HiHome
                        className={"text-" + color}
                        style={{ marginRight: ".5em", fontSize: "2.5em" }}
                      />
                    ) : (
                      <AiFillCompass
                        className={"text-" + color}
                        style={{ marginRight: ".5em", fontSize: "2.5em" }}
                      />
                    )}

                    <div>
                      <h1 className='m-0'>{objekt?.nazev}</h1>
                      <div className='rating d-flex'>
                        {/*<div*/}
                        {/*  className={`text-${color} stars d-flex align-self-end`}*/}
                        {/*>*/}
                        {/*  <BsStarFill />*/}
                        {/*  <BsStarFill />*/}
                        {/*  <BsStarFill />*/}
                        {/*  <BsStarFill />*/}
                        {/*  <BsStarHalf />*/}
                        {/*</div>*/}

                        {/*<span className="text-grey rating-counter ml-1">*/}
                        {/*  (48 hodnocení)*/}
                        {/*</span>*/}
                        <LocationBadge objekt={objekt} color={color} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='hide-mobile'>
                  {user && (
                    <div>
                      {objekt.verejni_uzivatele.find(
                        (publicUser) => publicUser.email === user?.email
                      ) && (
                        <button
                          className={`btn ghost text-${color} d-flex align-items-center`}
                          onClick={() =>
                            removeFromFavorite({ localId: objekt._id, user })
                          }
                        >
                          <AiFillHeart className='btn-icon text-red' />
                          Odebrat z oblíbených
                        </button>
                      )}
                    </div>
                  )}

                  <button
                    className={`btn ghost text-${color} d-flex align-items-center p-0`}
                    onClick={() => addToFavorite({ localId: objekt.id, user })}
                  >
                    <AiOutlineHeart className='btn-icon text-red' />
                    Do oblíbených
                  </button>
                </div>
              </div>
              <div className='hide-mobile'>
                <section className='objekt-detail-images mb-1'>
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
                                src={
                                  image.relativeUrl
                                    ? `https://www.cestujsdetmi.cz/${image.relativeUrl}`
                                    : image.formats.small.url
                                }
                                alt={
                                  image.alternativeText
                                    ? image.alternativeText
                                    : `${objekt.nazev} ${
                                        (i < 10 ? "0" : "") + `${i}`
                                      }`
                                }
                                layout='fill'
                                objectFit='cover'
                              />

                              {i === 2 ? (
                                <div className='overlay'>
                                  <p className='show-more'>
                                    +{images.length - 2} <span>dalších</span>
                                  </p>
                                </div>
                              ) : (
                                <div className='overlay  on-hover'>
                                  <FaSearchPlus className='enlarge-icon text-white' />
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
              <section className='objekt-detail-images mb-1 hide-desktop'>
                {images && images?.length > 0 && (
                  <>
                    <div
                      className={`objekt-detail-image img-00`}
                      onClick={() => openLightbox(images[0])}
                    >
                      <Image
                        src={
                          images[0].relativeUrl
                            ? `https://www.cestujsdetmi.cz/${images[0].relativeUrl}`
                            : images[0].formats.small.url
                        }
                        alt={
                          images[0].alternativeText
                            ? images[0].alternativeText
                            : `${objekt.nazev}`
                        }
                        layout='fill'
                        objectFit='cover'
                      />
                      <div className='overlay'>
                        <div className='d-flex justify-content-between image-actions content-wrapper'>
                          <div className='d-flex align-items-center text-white'>
                            <AiOutlineHeart className='text-white btn-icon' />
                            <span>Do oblíbených</span>
                          </div>
                          <div className='text-white'>
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

              <Row className='m-0'>
                {objekt?.zakladni_popis && (
                  <Col md={8.7} className='p-0'>
                    <div className='objekt-detail-description'>
                      <div className='text-wrapper pb-1'>
                        <h2>Základní popis</h2>
                        <div>{parse(objekt?.zakladni_popis)}</div>
                      </div>
                      <div className='hide-mobile'>{descriptionButtons}</div>
                    </div>
                  </Col>
                )}
                <Col className='pl-0 pr-0'>
                  <div className='objekt-detail-services'>
                    <h2>Služby</h2>
                    <ul className='services'>
                      {/* <li className='service-item d-flex align-items-center'>
                        <BiWifi className={`text-${color} service-item-icon`} />{" "}
                        <span>WiFi Zdarma</span>
                      </li>
                      <li className='service-item d-flex align-items-center'>
                        <RiCupLine
                          className={`text-${color} service-item-icon`}
                        />{" "}
                        <span>Snídaně v ceně</span>
                      </li>
                      <li className='service-item d-flex align-items-center'>
                        <RiParkingBoxLine
                          className={`text-${color} service-item-icon`}
                        />{" "}
                        <span>Parkování</span>
                      </li>
                      <li className='service-item d-flex align-items-center'>
                        <FaDog className={`text-${color} service-item-icon`} />{" "}
                        <span>Domácí mazlíčci</span>
                      </li> */}
                      {finalIcons.map((iconItem) => {
                        const MyIcon = iconItem.icon;
                        return (
                          <li
                            key={iconItem.key}
                            className='service-item d-flex align-items-center'
                          >
                            {iconItem.iconify ? (
                              <Icon
                                icon={iconItem.icon}
                                className={`text-${color} service-item-icon`}
                              />
                            ) : (
                              <MyIcon
                                className={`text-${color} service-item-icon`}
                              />
                            )}
                            <span>{iconItem.value}</span>
                          </li>
                        );
                      })}
                    </ul>
                    <div className='hide-desktop'>{descriptionButtons}</div>
                  </div>
                </Col>
              </Row>
            </section>

            {objekt?.popis && (
              <Section>
                <SectionHeading background='white'>
                  <h2>Podrobný popis</h2>
                </SectionHeading>
                <SectionContent>
                  <div>
                    {parse(objekt?.popis)[0] !== "<" ? (
                      <ClampLines
                        text={objekt?.popis}
                        id='really-unique-id'
                        lines={4}
                        ellipsis='...'
                        moreText='Zobrazit více..'
                        lessText='Zobrazit méně..'
                        className='custom-class'
                        innerElement='p'
                      />
                    ) : (
                      // <p>{parse(objekt?.popis)}</p>
                      parse(objekt?.popis)
                    )}
                  </div>
                </SectionContent>
              </Section>
            )}
            {!objekt.vnitrni_vybaveni &&
            !objekt.vnejsi_vybaveni &&
            !objekt.vnejsi_vybaveni_popis &&
            !objekt.vnitrni_vybaveni_popis ? (
              ""
            ) : (
              <Section>
                <SectionHeading background='white'>
                  <div className='d-flex justify-content-between align-items-center'>
                    <h2>Vybavení</h2>
                    {noEquipemnt &&
                    !objekt.vnitrni_vybaveni_popis &&
                    !objekt.vnejsi_vybaveni_popis ? (
                      ""
                    ) : (
                      <div className='d-flex align-items-center'>
                        {(objekt.vnitrni_vybaveni ||
                          objekt.vnitrni_vybaveni_popis) && (
                          <button
                            className={`btn-small-logo btn ${
                              shownEquipment === "vnitrni_vybaveni"
                                ? `bg-${color} text-white`
                                : `outline-${color} text-${color}`
                            }`}
                            onClick={() =>
                              setShownEquipment("vnitrni_vybaveni")
                            }
                          >
                            Vnitřní
                            <span className='hide-mobile'>&nbsp;vybavení</span>
                          </button>
                        )}
                        {(objekt.vnejsi_vybaveni ||
                          objekt.vnejsi_vybaveni_popis) && (
                          <button
                            className={`btn-small-logo btn ${
                              shownEquipment === "vnejsi_vybaveni"
                                ? `bg-${color} text-white`
                                : `outline-${color} text-${color}`
                            }`}
                            onClick={() => setShownEquipment("vnejsi_vybaveni")}
                          >
                            Vnější
                            <span className='hide-mobile'>&nbsp;vybavení</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </SectionHeading>
                <SectionContent>
                  {objekt[shownEquipment] &&
                    generateEquipmentTable(objekt[shownEquipment])}
                  {noEquipemnt &&
                    !objekt.vnejsi_vybaveni_popis &&
                    !objekt.vnitrni_vybaveni_popis && (
                      <p>Tento objekt neposkytl informace o jejich vybavení</p>
                    )}
                  {objekt.vnitrni_vybaveni_popis && (
                    <p>{objekt.vnitrni_vybaveni_popis}</p>
                  )}
                </SectionContent>
              </Section>
            )}
            {objekt.zajimavosti && (
              <Section>
                <SectionHeading background='white'>
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
                <SectionHeading background='white'>
                  <h2>Dostupnost</h2>
                </SectionHeading>
                <SectionContent>
                  <ul className='list-style-none pl-0 m-0'>
                    <Row>
                      {(objekt.dostupnost.mhd || objekt.dostupnost.metro) && (
                        <Col md={3}>
                          {objekt.dostupnost.mhd && (
                            <li>MHD: {objekt.dostupnost.mhd}</li>
                          )}
                          {objekt.dostupnost.metro && (
                            <li>Metro: {objekt.dostupnost.metro}</li>
                          )}
                        </Col>
                      )}
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
            <Row className='row'>
              <Col className='col'>
                <Section className='objekt-detail-contacts'>
                  <SectionHeading background='white'>
                    <h2>Kontakt</h2>
                  </SectionHeading>
                  <SectionContent>
                    <ul className='list-style-none pl-0 m-0 contact-list'>
                      <li className={"text-" + color}>
                        <FaGlobeAmericas className={`icon text-${color}`} />
                        <a
                          href={
                            objekt.web?.includes("https://") ||
                            objekt.web?.includes("http://")
                              ? objekt.web
                              : `https://${objekt.web}`
                          }
                          target='_blank'
                        >
                          {objekt.web}
                        </a>
                      </li>
                      <li className={"text-" + color}>
                        <HiOutlineMail className='icon' />
                        <a href={`mailto:${objekt.email}`}>{objekt.email}</a>
                      </li>
                      <li className={"text-" + color}>
                        <BiPhone className='icon' />
                        <a
                          href={`tel:${objekt.telefon}`}
                          className='text-black'
                        >
                          {objekt.telefon}
                        </a>
                      </li>
                      {objekt.adresa && (
                        <li className={"text-" + color}>
                          <p className='m-0'>
                            <FiMapPin className='icon' />
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
                  <Section className='mt-0'>
                    <SectionHeading background='white'>
                      <h2>Provozní doba</h2>
                    </SectionHeading>
                    <SectionContent>
                      <ul className='operating-hours-timetable'>
                        {objekt.provozni_doba.map(
                          (doba, i) =>
                            (doba.doba || doba.popis) && (
                              <li key={i}>
                                {doba.popis}
                                {doba.popis && doba.doba ? ": " : ""}
                                {doba.doba}
                              </li>
                            )
                        )}
                      </ul>
                    </SectionContent>
                  </Section>
                </Col>
              )}
            </Row>
            <Section className='detail-map'>
              <SectionHeading background='white'>
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
                className='mapbox'
                style={{ maxWidth: "100%", width: "100%" }}
              >
                <div style={{ position: "absolute", left: 10, top: 10 }}>
                  <NavigationControl />
                </div>
                {marker && (
                  <Marker {...marker}>
                    <CityPin className={"text-" + color} />
                  </Marker>
                )}
              </ReactMapGL>
            </Section>
            <Section>
              <SectionHeading background='white'>
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
                <div className='d-flex align-items-center add-review'>
                  <span className='text-grey'>Ohodnotit:</span>
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
                          className='star mr-1'
                          onMouseEnter={(e) => setHoveredStar(number)}
                          onClick={() => setSelectedStar(number)}
                        />
                      ) : (
                        <BsStar
                          key={number}
                          className='star mr-1'
                          onMouseEnter={(e) => setHoveredStar(number)}
                          onClick={() => setSelectedStar(number)}
                        />
                      )
                    )}
                  </div>
                </div>
                <Input
                  name='recenze'
                  text='Přidejte recenzi'
                  className='ml-0 mt-1'
                  onChange={(e) => setReview(e.target.value)}
                  value={recenze}
                />
                {(recenze || selectedStar) && (
                  <button
                    className='btn bg-blue text-white mt-1'
                    onClick={handleReview}
                  >
                    Odeslat
                  </button>
                )}
              </SectionContent>
            </Section>
            {related && related.length > 0 && (
              <Section>
                <SectionHeading background='white'>
                  <h2>Další tipy na ubytování v této oblasti</h2>
                </SectionHeading>
                <SectionContent>
                  <Row>
                    {related.map(
                      (objektItem) =>
                        objektItem.id !== objekt.id && (
                          <Col md={6} lg={4} key={objekt.id}>
                            <MiniObjekt objekt={objektItem} />
                          </Col>
                        )
                    )}
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
