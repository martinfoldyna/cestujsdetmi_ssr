import React, { Fragment, useEffect, useState } from "react";
import { VectorMap } from "@south-paw/react-vector-maps";
import czechRepubilc from "../public/maps/czech-republic.js";
import czechRepubilcRegions from "../public/maps/czech-republic-regions.js";
import { Row, Col, Container } from "react-grid-system";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { FiMap } from "react-icons/fi";
import CustomSelect from "../components/form/CustomSelect";
import enums from "../enums";
import { objectToArray } from "../helpers/helpers";
import { useRouter } from "next/router";
import Inquiry from "./Inquiry";

const Map = () => {
  const [selectedTrip, setSelectedTrip] = useState(false);
  const [clicked, setClicked] = useState({ key: null, value: null });
  const [hovered, setHovered] = useState({ key: null, value: null });
  const [color, setColor] = useState(selectedTrip ? "orange" : "blue");
  const [regionMap, setRegionMap] = useState(false);
  const [oblast, setOblast] = useState(null);
  const [mesto, setMesto] = useState(null);
  const [kraj, setKraj] = useState(null);
  const beautifiedKraj = objectToArray(enums.KRAJ);
  const beautifiedRegion = objectToArray(enums.REGION);
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  const onOpenModal = () => setOpenModal(true);

  const translateRegion = (value) => {
    let translatedString = "";
    switch (value.toLowerCase()) {
      case "prague":
        translatedString = "Hlavní město Praha";
        break;
      default:
        translatedString = value + " kraj";
        break;
    }
    return translatedString;
  };

  const generateValue = (target) =>
    target && {
      key: target.attributes.id,
      value: target.attributes.id?.value.includes("czr")
        ? target.attributes.name?.value
        : translateRegion(target.attributes.name?.value),
    };

  // Changes value in badge-location paragraph on Mouse Click
  const setMapValue = (target) => {
    if (target.attributes?.name) {
      setClicked(() => generateValue(target));
    } else {
      console.log("target", target);
      setHovered(target.key && target.name && target);
    }
  };

  // Hadnles value change in badge-location paragraph on Mouse Enter
  const setMapValueHover = (target) => {
    if (target.attributes?.name) {
      setHovered(() => generateValue(target));
    } else {
      console.log("target", target);
      setHovered(target);
    }
  };

  const onKrajChange = (e) => {
    setMapValue(e);
    setKraj(e.key);
  };

  const onOblastChange = () => {};

  const submitLocation = () => {
    router.push({
      pathname: selectedTrip ? "/vylety" : "/ubytovani/",
      search: `?kraj=${kraj}&mesto=${mesto}&oblast=${oblast}`,
    });
  };

  const mapProps = {
    onClick: ({ target }) => {
      setMapValue(target);
      for (let child of target.parentNode.children) {
        if (
          child.classList.length > 0 &&
          child.classList.contains("clicked") > 0
        ) {
          child.classList.remove("clicked");
        }
      }
      target.classList.add("clicked");
    },

    onMouseOver: ({ target }) => {
      setMapValueHover(target);
    },
  };

  useEffect(() => {}, [selectedTrip]);

  return (
    <section className="map-component bg-white">
      <Row className="row">
        <Col md={5} className="d-flex">
          <div>
            <div className="heading-with-icons d-flex align-items-center">
              <FaMapMarkerAlt
                className={`text-white icon-heading bg-${color}`}
                style={{ marginRight: "1em" }}
              />
              <h2 className="d-flex align-items-center">
                Zvolte si lokaci na mapě
              </h2>
            </div>
            <div className="margin-wrapper">
              <p className="map-description">
                Chtěli byste na dovolenou nebo na výlet? <br />
                Zvolte si druh mapky kliknutím na tlačítko.
              </p>
              <div className="map-buttons d-flex">
                <button
                  className={`btn ${
                    selectedTrip
                      ? `outline-blue text-blue`
                      : "bg-blue text-white"
                  }`}
                  onClick={() => {
                    setSelectedTrip(false);
                    setColor("blue");
                  }}
                >
                  <div className="hide-mobile">Ubytování a dovolená</div>
                  <div className="hide-desktop">Dovolená</div>
                </button>
                <button
                  className={`btn ${
                    selectedTrip
                      ? "bg-orange text-white"
                      : "outline-orange text-orange"
                  }`}
                  onClick={() => {
                    setSelectedTrip(true);
                    setColor("orange");
                  }}
                >
                  <span className="hide-mobile"> Výlety a zábava</span>
                  <span className="hide-desktop"> Výlety</span>
                </button>
              </div>
              <button
                className={`text-${color} btn p-0 ghost mt-2 d-flex align-items-center font-weight-600 hide-mobile`}
                onClick={() => setOpenModal(true)}
              >
                <>
                  <FiSend />
                  &nbsp; Zaslat nezvávaznou nabídku
                </>
              </button>
            </div>
          </div>
        </Col>
        <Col md={7} className="d-flex p-0">
          {regionMap ? (
            <VectorMap
              {...czechRepubilcRegions}
              {...mapProps}
              className={`map map-${color}`}
            />
          ) : (
            <VectorMap
              {...czechRepubilc}
              {...mapProps}
              className={`map map-${color}`}
            />
          )}
          {(hovered && hovered.key && hovered.value) ||
          (clicked && clicked.value && clicked.key) ? (
            <div className={`badge-location bg-${color}`}>
              {/* When user clicks disable hover value */}
              <p className="m-0 text-white">
                {clicked && clicked.value && clicked.key
                  ? clicked.value
                  : hovered.value}
              </p>
            </div>
          ) : (
            ""
          )}
        </Col>
      </Row>
      <Row className="align-items-center m-0 ml-3 map-filters row">
        <Col md={2} className="col p-0">
          <CustomSelect
            placeholder="Kraj"
            options={beautifiedKraj}
            onChange={onKrajChange}
            value={clicked}
            color={color}
          />
        </Col>
        <Col md={2} className="col p-0">
          <CustomSelect placeholder="Město" color={color} />
        </Col>
        <Col md={2} className="col p-0">
          <CustomSelect
            placeholder="Oblast"
            options={beautifiedRegion}
            onChange={(e) => setOblast(e.key)}
            color={color}
          />
        </Col>
        <Col md={1} className="col">
          <div className="hide-mobile">
            <button
              className={`btn bg-${color} text-white m-0`}
              onClick={submitLocation}
            >
              <FaSearch />
            </button>
          </div>
          <div className="hide-desktop">
            <div className="d-flex justify-content-end">
              <button
                className={`btn bg-${color} text-white`}
                onClick={submitLocation}
              >
                Vyhledat
              </button>
            </div>
          </div>
        </Col>
        {/*<Col>*/}
        <Col className="p-0">
          <div className="hide-mobile w-100">
            <div className="d-flex justify-content-end ">
              <button
                className={`text-${color} btn bg-white p-0 d-flex align-items-center`}
                onClick={() => setRegionMap((prevState) => !prevState)}
              >
                <FiMap className="btn-icon" />
                přepnout mapu
              </button>
            </div>
          </div>
        </Col>
      </Row>
      <Inquiry
        typ_objektu={enums.TYP_OBJEKTU.ubytovani.key}
        modalOpen={openModal}
        onModalOpen={() => setOpenModal(true)}
        onModalClose={() => setOpenModal(false)}
      />
    </section>
  );
};

export default Map;
