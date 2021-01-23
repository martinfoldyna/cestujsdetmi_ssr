import React, { useEffect, useState, useCallback, useContext } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { CgListTree } from "react-icons/cg";
import { GiHouse } from "react-icons/gi";
import { TiSortNumerically } from "react-icons/ti";
import {
  FaEnvelope,
  FaGlobeAmericas,
  FaMapMarkedAlt,
  FaMapSigns,
  FaPhoneAlt,
  FaPlus,
  FaSave,
  FaSearchPlus,
  FaTag,
} from "react-icons/fa";
import { BsFillPlusCircleFill, BsPlus } from "react-icons/bs";
import { MdCloudUpload, MdLocationCity } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BiDetail } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { Row, Col } from "react-grid-system";
import Checkbox from "../components/form/Checkbox";
import Input from "../components/form/Input.js";
import DatePicker, { registerLocale } from "react-datepicker";
import cs from "date-fns/locale/cs";
import { useDropzone } from "react-dropzone";
import {
  handleObjekt,
  uploadObjekt,
  uploadObjektInfo,
  getCategories,
  getSecondaryCategoriesWithParam,
} from "../redux/actions/objekty";
import { connect } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import { tinyMCEConfig } from "../config/tinyMCEConfig";
// import placeholder from "../public/img/placeholder.png";
import Lightbox from "../components/lightbox/Lightbox";
import { handleSingleCompression } from "../helpers/images";
import {
  arrayMove,
  friendlyUrl,
  isNumber,
  objectToArray,
} from "../helpers/helpers";
import moment from "moment";
import enums from "../enums";
import CustomFormSelect from "../components/form/CustomFormSelect";
import { translateObjektPlan } from "../helpers/translators";
import { geocoding } from "../redux/actions/mapbox";
import LoadingSkeleton from "../layouts/LoadingSkeleton";
import ConditionalWrapper from "../layouts/ConditionalWrapper";
import HeadingWithIcon from "../layouts/HeadingWithIcon";
import { useRouter } from "next/router";
import { GlobalContext } from "../context/GlobalContext";
import { objektUpload } from "../helpers/objekty";

const ObjednatObjektInfo = ({
  uploadObjekt,
  history,
  handleObjekt,
  uploadingInProgress,
  kategorie,
  match,
  getCategories,
  geocoding,
  geoResults,
  getSecondaryCategoriesWithParam,
}) => {
  const router = useRouter();
  const userContext = useContext(GlobalContext).user;
  const { user } = userContext;

  const { plan, name } = router.query;
  registerLocale("cs", cs);

  const [objekt, setObjekt] = useState(null);
  const [openGeoOptions, setOpenGeoOptions] = useState(false);

  const [priceLIStartDate, setPriceLIStartDate] = useState(new Date());
  const [priceLIEndDate, setPriceLIEndDate] = useState(null);
  const [priceLIDescription, setPriceLIDescription] = useState("");
  const [priceLIPrice, setPriceLIPrice] = useState("");

  const [saleItemStartDate, setSaleItemStartDate] = useState(new Date());
  const [saleItemEndDate, setSaleItemEndDate] = useState(null);
  const [saleItemDescription, setSaleItemDescription] = useState("");
  const [saleItemPrice, setSaleItemPrice] = useState("");

  const [openingStart, setOpeningStart] = useState("00:00");
  const [openingEnd, setOpeningEnd] = useState("00:00");
  const [openingDescripiton, setOpeningDescripiton] = useState("");

  const [lastMinuteStartDate, setLastMinuteStartDate] = useState(
    objekt?.last_minute_termin_zacatek
      ? objekt.last_minute_termin_zacatek
      : new Date()
  );
  const [lastMinuteEndDate, setLastMinuteEndDate] = useState(
    objekt?.last_minute_termin_konec ? objekt.last_minute_termin_konec : null
  );

  const [generalInfo, setGeneralInfo] = useState(
    objekt?.zakladni_popis ? objekt.zakladni_popis : ""
  );
  const [detailedInfo, setDetailedInfo] = useState(
    objekt?.podrobny_popis ? objekt.podrobny_popis : ""
  );

  const [mainCategories, setMainCategories] = useState(null);
  const [selectedMainCategory, setSelectedCategory] = useState(null);

  const [objektType, setObjektType] = useState(objekt?.typ_objektu);

  const [secondaryCategories, setSecondaryCategories] = useState(null);
  const [selectedSecondCategory, setSelectedSecondCategory] = useState(null);

  // Array Objectů, který v sobě uchovává hodnoty z polí Slevy
  const [sale, setSale] = useState(objekt?.slevy ? objekt.slevy : []);

  const [selectedPlan, setSelectedPlan] = useState(objekt?.druh_zapisu);

  // Array Objectů, který v sobě uchovává hodnoty z polí Ceník
  const [priceList, setPriceList] = useState(objekt?.cenik ? objekt.cenik : []);
  // Array Objectů, který v sobě uchovává hodnoty z polí Provozní doba
  const [operatingHours, setOperatingHours] = useState(
    objekt?.provozni_doba ? objekt.provozni_doba : []
  );
  const [collapseGeneral, setCollapseGeneral] = useState(false);
  // Hodnota, která uchovává počet řádků, které se mají zobrazovat v PROVOZNÍ DOBA
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [previewImages, setPreviewImages] = useState([]);
  const [showLightbox, setShowLightbox] = useState(false);

  // What is current clicked image in gallery and which image will be shown, when Lightbox opens
  const [clickedImage, setClickedImage] = useState(null);

  // Geo location variables for GPS search
  const [searchQuery, setQuery] = useState("");
  const [loadingGeo, setLoadingGeo] = useState(false);
  const [selectedGeoItem, setSelectedGeoItem] = useState(null);
  const [gpsCoordinatesLat, setGpsCoordinatesLat] = useState(
    objekt?.dostupnost?.gps?.lat
  );
  const [gpsCoordinatesLng, setGpsCoordinatesLng] = useState(
    objekt?.dostupnost?.gps?.lng
  );
  const [gpsGeoString, setGpsGeoString] = useState("");

  const [kraj, setKraj] = useState(objekt?.adresa?.kraj);
  const [oblast, setOblast] = useState(objekt?.adresa?.oblast);

  const { register, handleSubmit, errors, setValue, setError, watch } = useForm(
    {
      mode: "onBlur",
    }
  );

  const isStandard = selectedPlan?.key === enums.DRUH_ZAPISU.standard.key;
  const isOptimal = selectedPlan?.key === enums.DRUH_ZAPISU.optimal.key;
  const isPremium = selectedPlan?.key === enums.DRUH_ZAPISU.premium.key;
  const isPremiumGold =
    selectedPlan?.key === enums.DRUH_ZAPISU.premium_gold.key;

  const maximumAllowedFiles = (planKey) => {
    switch (planKey) {
      case enums.DRUH_ZAPISU.standard.key:
        return 1;
      case enums.DRUH_ZAPISU.optimal.key:
        return 20;
      case enums.DRUH_ZAPISU.premium.key:
        return 30;
      case enums.DRUH_ZAPISU.premium_gold.key:
        return 40;
      default:
        return 0;
    }
  };

  const watchFindGps = watch("find_gps", "search");

  const onDrop = useCallback(
    async (acceptedFiles, onDropRejected, onDropAccepted) => {
      console.log("accepted", onDropAccepted);
      console.log("rejected", onDropRejected);
      for (let [index, file] of acceptedFiles.entries()) {
        console.log("file", file);
        let compressedImage = await handleSingleCompression(file);
        compressedImage.preview = file.preview;
        setPreviewImages((prevState) => {
          /*const newImage = {
            sm: URL.createObjectURL(compressedImage.sm),
            lg: URL.createObjectURL(compressedImage.lg),
            blobs: {
              sm: compressedImage.sm,
              lg: compressedImage.lg,
            },
            imageName: file.name,
            description: "",
            id: prevState && prevState.length > 0 ? prevState.length : index,
          };*/

          return prevState
            ? [...prevState, compressedImage]
            : [compressedImage];
        });

        console.log(previewImages);
      }
    },
    []
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    createImageThumbnails: true,
    accept: "image/*",
    multiple: !isStandard,
    maxFiles: maximumAllowedFiles(selectedPlan?.key),
  });

  const dropzonePropsChildren = previewImages && {
    ...getRootProps({
      onClick: (event) => console.log(event),
    }),
  };

  const dropzonePropsParent = !previewImages && { ...getRootProps() };

  const openLightBox = (image) => {
    // LOGIC: In objekt detail only thumbnails will be shown.
    // -> When thumbnail is opened (clicked on) Lightbox will appear and load full-size image
    setShowLightbox(true);
    setClickedImage(image);
  };

  const moveImage = (id, newId) => {
    setPreviewImages(arrayMove(previewImages, id, newId));
  };

  const thumbnails = previewImages
    ?.sort((a, b) => (a.id > b.id ? 1 : -1))
    .map((image, i) => (
      <Row
        key={image.id}
        className={`objekt-image mt-2 mb-2 ${
          i === 0 ? "objekt-image-thumbnail" : ""
        }`}
      >
        <Col md={1} className="align-self-center reorder text-black">
          <IoIosArrowUp
            onClick={() =>
              setPreviewImages((prevState) => arrayMove(prevState, i, i + 1))
            }
          />
          <IoIosArrowDown
            onClick={() =>
              setPreviewImages((prevState) => arrayMove(prevState, i, i - 1))
            }
          />
        </Col>
        <Col md={3}>
          <div
            style={{
              backgroundImage: `url(${
                image.preview ? image.preview : "../public/img/placeholder.png"
              })`,
            }}
            className="image-container"
            onClick={() => openLightBox(image)}
          >
            <div className="overlay">
              <FaSearchPlus className="enlarge-icon text-white" />
            </div>
          </div>
          {/*<img src={image.preview} style={{ width: "100%" }} />*/}
        </Col>
        <Col className="align-self-center">
          <Input
            name="image-name"
            text="Popis obrázku"
            onChange={(e) => (previewImages[i].description = e.target.value)}
          />
          {i === 0 && <p>Tento obrázek se bude zobrazovat i jako náheldový</p>}
        </Col>
        <Col md={1} className="align-self-center">
          <BsPlus
            className="cancel-filter-icon text-black"
            onClick={() =>
              setPreviewImages((prevState) =>
                prevState.filter(
                  (filterImage, index) => filterImage.id !== image.id
                )
              )
            }
          />
        </Col>
      </Row>
    ));

  const StartDateCustomInput = ({ value, onClick, ...rest }) => (
    <>
      <div className="m-0" onClick={onClick}>
        <input
          type="text"
          className={`inputText pr-0 ${
            errors && errors[value] ? "border-danger" : ""
          }`}
          id="datumZacatku"
          name="datumZacatku"
          defaultValue={value}
          required
          autoComplete="off"
          {...rest}
        />
        <label htmlFor="datumZacatku" className="floating-label">
          Začátek
        </label>
      </div>
    </>
  );

  const EndDateCustomInput = ({ value, onClick, ...rest }) => (
    <>
      <div className="form-item m-0" onClick={onClick}>
        <input
          type="text"
          className={`inputText ${
            errors && errors[value] ? "border-danger" : ""
          }`}
          id="datumKonce"
          name="datumKonce"
          defaultValue={value}
          required
          autoComplete="off"
          {...rest}
        />
        <label htmlFor="datumKonce" className="floating-label">
          Konec
        </label>
      </div>
    </>
  );

  const getObjekt = () => {
    name && setObjekt(user?.objekty?.find((objekt) => objekt.hodnota === name));
  };

  const onSubmitGeneral = async (data) => {
    const keys = Object.keys(data);

    let infoFinal = {};

    const hodnota = friendlyUrl(data.nazev);
    console.log(hodnota);

    if (objekt) {
      infoFinal = objekt;
    } else {
      infoFinal = {
        vnejsi_vybaveni: {},
        vnitrni_vybaveni: {},

        dostupnost: {},

        last_minute: {},
        adresa: {},
        hodnota,
      };
    }

    for (let key of keys) {
      if (key.includes("outside_")) {
        infoFinal.vnejsi_vybaveni = {
          ...infoFinal.vnejsi_vybaveni,
          ...{
            [key.replace("outside_", "")]: Array.isArray(data[key])
              ? data[key].indexOf("on") > 0
              : data[key],
          },
        };
      } else if (key.includes("inside_")) {
        infoFinal.vnitrni_vybaveni = {
          ...infoFinal.vnitrni_vybaveni,
          ...{
            [key.replace("inside_", "")]: Array.isArray(data[key])
              ? data[key].indexOf("on") > 0
              : data[key],
          },
        };
      } else if (key.includes("accessibility_")) {
        infoFinal.dostupnost = {
          ...infoFinal.dostupnost,
          ...{
            [key.replace("accessibility_", "")]: data[key],
          },
        };
      } else if (key.includes("address_")) {
        infoFinal.adresa = {
          ...infoFinal.adresa,
          ...{
            [key.replace("address_", "")]: data[key],
          },
        };
      } else {
        infoFinal = {
          ...infoFinal,
          ...{ [key]: data[key] },
        };
      }
    }

    infoFinal = {
      ...infoFinal,
      hlavni_kategorie: selectedMainCategory,
      podkategorie: selectedSecondCategory,
      zakladni_popis: generalInfo,
      podrobny_popis: detailedInfo,
      slevy: sale,
      cenik: priceList,
      uzivatel: user.id,
      provozni_doba: operatingHours,
      typ_objektu: objektType?.key,
      druh_zapisu: selectedPlan?.key,
      adresa_kraj_value: kraj?.key,
      adresa_oblast_value: oblast?.key,
      adresa_mesto_value: infoFinal.adresa?.mesto,
      adresa: {
        ...infoFinal.adresa,
        kraj,
        oblast,
      },
      last_termin_zacatek: lastMinuteStartDate,
      last_termin_konec: lastMinuteEndDate,
    };

    if (gpsCoordinatesLat && gpsCoordinatesLng) {
      infoFinal.dostupnost = {
        ...infoFinal.dostupnost,
        gps: {
          lat: gpsCoordinatesLat,
          lng: gpsCoordinatesLng,
        },
      };
    }

    // Retrieve information, that are filled and stored to localStorage in ObjednatObjekt component
    const objektContactInfo = JSON.parse(localStorage.getItem("objekt_info"));

    if (objekt) {
      const { success } = await objektUpload(infoFinal, previewImages);

      console.log(success);
    } else {
      const { success } = await objektUpload(infoFinal, previewImages);

      console.log(success);

      //handleObjekt(infoFinal, previewImages, "create");
    }
  };

  const checkInputNumber = (evt, state) => {
    const value = evt.target.value;
    if (isNumber(value)) {
      state(value);
    } else {
      evt.preventDefault();
    }
  };

  const beautifyCategory = (categoryArray) => {
    const beautifiedCategories = [];

    if (objektType) {
      categoryArray.filter(
        (categoryItem) => categoryItem.urceni === objektType.key
      );
    }

    for (let categoryItem of categoryArray) {
      beautifiedCategories.push({
        key: categoryItem.hodnota,
        value: categoryItem.nazev,
      });
    }

    return beautifiedCategories;
  };

  // Chek if category has any secondary categories
  const checkSecondaryCategories = (mainCategory = selectedMainCategory) => {
    const foundSecondaryCategories = kategorie.find(
      (item) => item.hodnota === mainCategory.key
    )?.podkategorie;

    console.log("foundSecondaryCategories", foundSecondaryCategories);

    setSecondaryCategories(
      foundSecondaryCategories?.length > 0
        ? beautifyCategory(foundSecondaryCategories)
        : null
    );
  };

  const showItems = (itemsArray, setItemsArray) =>
    itemsArray?.map((item, i) => (
      <Row className="pt-2 align-items-center" key={i}>
        <Col md={4}>
          <div className="d-flex form-item">
            <div style={{ width: "50%" }}>
              <StartDateCustomInput
                value={moment(item.datum_zacatku).format("DD.MM.YYYY")}
                disabled
              />
            </div>
            <div>
              <EndDateCustomInput
                value={moment(item.datum_konce).format("DD.MM.YYYY")}
                disabled
              />
            </div>
          </div>
        </Col>
        <Col md={4}>
          <Input value={item.popis} text="Popis" disabled />
        </Col>
        <Col md={3}>
          <Input value={item.cena} text="Cena" disabled />
        </Col>
        <Col>
          <button
            type="button"
            className="btn bg-white"
            onClick={() => {
              setItemsArray((prevState) => prevState.splice(i, 1));
            }}
          >
            <BsPlus className="cancel-filter-icon" />
          </button>
        </Col>
      </Row>
    ));

  const alertUser = (e) => {
    e.returnValue = "Are you sure you want to leave?";
  };

  useEffect(() => {
    if (user?.objekty) {
      getObjekt();
    }

    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);

  useEffect(() => {
    setPreviewImages((prevState) => {
      let newImages = objekt?.galerie?.map((image, index) => ({
        ...image,
        id: index,
      }));
      if (objekt?.relative_galerie) {
        newImages = [
          ...newImages,
          objekt.relative_galerie.map((image, index) => ({
            ...image,
            id: `relative_${index}`,
          })),
        ];
      }
      return newImages;
    });
    console.log(objekt?.galerie);
  }, [objekt?.galerie]);

  useEffect(() => {
    if (kategorie) {
      console.log("kategorie", kategorie);

      // Prepare category data to be shown in CustomFormSelect
      setMainCategories(beautifyCategory(kategorie));
    }
    if (objekt?.hlavni_kategorie) {
      setSelectedCategory(objekt.hlavni_kategorie);
      checkSecondaryCategories(objekt.hlavni_kategorie);
      console.log("hlavní kategorei", objekt.hlavni_kategorie);
    }
  }, [kategorie]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.length > 3) {
        geocoding(searchQuery);
        setLoadingGeo(false);
      }
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  useEffect(() => {
    if (!user) {
      router.push("/not-authorized");
    }
  }, [user]);

  return (
    <>
      <span className="breadcrumb">
        <Link href="/">Úvodní stránka</Link>&nbsp;/&nbsp;Registrace - nabídka
        možností
      </span>

      <HeadingWithIcon
        background="blue"
        heading={
          objekt
            ? `${objekt?.nazev} - detail objektu`
            : "Administrace - Přídání nového objektu"
        }
        icon={objekt ? BiDetail : FaPlus}
        icon_size="medium"
      />

      {/*{user && (*/}
      {/*  <>*/}
      {/*    <h2>*/}
      {/*      Přejete si předvyplnit Vaše kontaktní informace? (telefon, email,*/}
      {/*      celou adresu)*/}
      {/*    </h2>*/}
      {/*    <button className="btn" onClick={() => setFillUserInfo(true)}>*/}
      {/*      Ano*/}
      {/*    </button>*/}
      {/*  </>*/}
      {/*)}*/}

      <form
        noValidate
        onSubmit={handleSubmit(onSubmitGeneral)}
        className="objednat-objekt-info"
      >
        <div className="section">
          <Row
            className="justify-content-arround bg-grey m-0"
            onClick={() => setCollapseGeneral((prevState) => !prevState)}
          >
            <Col md={12}>
              <div className="heading-with-icons">
                <h2>Základní informace</h2>
              </div>
            </Col>
          </Row>
          <div
            className={`section-content border-grey ${
              collapseGeneral && "collapsed"
            }`}
          >
            <Row className="pt-2">
              <Col md={6} lg={4}>
                <CustomFormSelect
                  options={objectToArray(enums.DRUH_ZAPISU)}
                  optionsFormat="key"
                  placeholder="Druh zápisu"
                  name="druh_zapisu"
                  translate={translateObjektPlan}
                  selected={objekt?.druh_zapisu}
                  ref={register({
                    required: "Zadejte prosím druh zápisu",
                  })}
                  errors={errors}
                  onChange={(value) => {
                    setSelectedPlan(value);
                  }}
                  disabled={objekt?.druh_zapisu}
                >
                  <FaMapMarkedAlt className="form-icon" />
                </CustomFormSelect>

                <CustomFormSelect
                  options={objectToArray(enums.TYP_OBJEKTU)}
                  placeholder="Druh objektu"
                  name="typ_objektu"
                  optionsFormat="key"
                  selected={objekt?.typ_objektu}
                  disabled={objekt?.typ_objektu}
                  onChange={(value) => {
                    setObjektType(value);
                    setValue("typ_objektu", value);
                  }}
                  errors={errors}
                >
                  <FaMapMarkedAlt className="form-icon" />
                </CustomFormSelect>

                <Input
                  errors={errors}
                  ref={register({ required: "Zadejte prosím název objektu" })}
                  text="Název objektu"
                  name="nazev"
                  defaultValue={objekt?.nazev}
                >
                  <FaEnvelope className="form-icon" />
                </Input>
                {/*<Input*/}
                {/*  name="hlavni_kategorie"*/}
                {/*  text="Zařazení hlavní kategorie"*/}
                {/*  ref={register({*/}
                {/*    required: "Zadejte prosím hlavní kategorii objektu",*/}
                {/*  })}*/}
                {/*  errors={errors}*/}
                {/*  defaultValue={objekt?.hlavni_kategorie}*/}
                {/*>*/}
                {/*  <CgListTree className="form-icon" />*/}
                {/*</Input>*/}

                {mainCategories && (
                  <CustomFormSelect
                    options={mainCategories}
                    placeholder="Zařazení hlavní kategorie"
                    name="hlavni_kategorie"
                    selected={objekt?.hlavni_kategorie}
                    onChange={(value) => {
                      setSelectedCategory(value);
                      checkSecondaryCategories(value);
                    }}
                    ref={register({
                      required: "Zadejte prosím hlavní kategorii objektu",
                    })}
                    errors={errors}
                  >
                    <FaMapMarkedAlt className="form-icon" />
                  </CustomFormSelect>
                )}
                {secondaryCategories && (
                  <CustomFormSelect
                    options={secondaryCategories}
                    placeholder="Zařazení druhé kategorie"
                    name="prodkategorie"
                    selected={selectedSecondCategory}
                    onChange={(value) => setSelectedSecondCategory(value)}
                    ref={register}
                    errors={errors}
                  >
                    <CgListTree className="form-icon" />
                  </CustomFormSelect>
                )}
              </Col>
              <Col md={6} lg={4}>
                <Input
                  name="telefon"
                  text="Telefon"
                  ref={register({
                    required: "Zadejte prosím kontaktní telefon na objekt",
                    pattern: {
                      value: /^\s*(?:\+?(\d{3}))?([- ]*(\d{3})[- ]*)?((\d{3})[-. ]*(\d{3})(?:[- ]*(\d+))?)\s*$/,
                      message: "Zadejte prosím platné telefonní číslo",
                    },
                  })}
                  errors={errors}
                  defaultValue={objekt?.telefon}
                >
                  <FaPhoneAlt className="form-icon" />
                </Input>
                <Input
                  name="email"
                  text="E-mail"
                  ref={register({
                    required: "Zadejte prosím kontaktní email na objekt",
                    pattern: {
                      value: /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/,
                      message: "Zadejte prosím platnou emailou adresu",
                    },
                  })}
                  errors={errors}
                  defaultValue={objekt?.email}
                >
                  <FaEnvelope className="form-icon" />
                </Input>
                {!isStandard && (
                  <Input
                    name="web"
                    text="Webové stránky"
                    ref={register({
                      required: "Zadejte prosím webové stránky objekt",
                      pattern: {
                        value: /((https?|ftp|smtp):\/\/)?(www.)?(\.[a-z0-9]\.)?[a-z0-9\-_]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*/,
                        message:
                          "Zadejte prosím platnou webovou stránku ve fromátu www.nazev.xyz nebo nazev.xyz nebo subdomena.nazev.xyz",
                      },
                    })}
                    errors={errors}
                    defaultValue={objekt?.web}
                  >
                    <FaGlobeAmericas className="form-icon" />
                  </Input>
                )}
              </Col>
              <Col md={6} lg={4}>
                <Input
                  name="address_ulice"
                  text="Ulice"
                  ref={register({
                    required:
                      "Zadejte prosím ulici, ve které se objekt nachází",
                  })}
                  errors={errors}
                  defaultValue={objekt?.adresa?.ulice}
                >
                  <GiHouse className="form-icon" />
                </Input>
                <Input
                  name="address_mesto"
                  text="Město"
                  ref={register({
                    required:
                      "Zadejte prosím město, ve které se objekt nachází",
                  })}
                  errors={errors}
                  defaultValue={objekt?.adresa?.mesto}
                >
                  <MdLocationCity className="form-icon" />
                </Input>
                <Input
                  name="address_psc"
                  text="PSČ"
                  ref={register({
                    required: "Zadejte prosím PSČ objektu",
                    pattern: {
                      value: /^\d{3}[-\s]?\d{2}$/,
                      message: "Zadejte prosím platné PSČ",
                    },
                  })}
                  errors={errors}
                  defaultValue={objekt?.adresa?.psc}
                >
                  <TiSortNumerically className="form-icon" />
                </Input>
                {/*<Input*/}
                {/*  name="address_kraj"*/}
                {/*  text="Kraj"*/}
                {/*  ref={register({*/}
                {/*    required: "Zadejte prosím kraj, ve které se objekt nachází",*/}
                {/*  })}*/}
                {/*  errors={errors}*/}
                {/*  defaultValue={objekt?.adresa?.kraj}*/}
                {/*>*/}
                {/*  <FaMapMarkedAlt className="form-icon" />*/}
                {/*</Input>*/}
                {/*<CustomSelect options={objectToArray(enums.KRAJ)} />*/}
                <CustomFormSelect
                  options={objectToArray(enums.KRAJ)}
                  placeholder="Kraj"
                  name="address_kraj"
                  selected={objekt?.adresa.kraj}
                  ref={register({
                    required: "Zadejte prosím kraj, ve které se objekt nachází",
                  })}
                  onChange={(value) => setKraj(value)}
                  errors={errors}
                >
                  <FaMapMarkedAlt className="form-icon" />
                </CustomFormSelect>
                {/*<Input*/}
                {/*  name="address_oblast"*/}
                {/*  text="Oblast"*/}
                {/*  ref={register({*/}
                {/*    required:*/}
                {/*      "Zadejte prosím oblast, ve které se objekt nachází",*/}
                {/*  })}*/}
                {/*  errors={errors}*/}
                {/*  defaultValue={objekt?.adresa?.oblast}*/}
                {/*>*/}
                {/*  <FaMapSigns className="form-icon" />*/}
                {/*</Input>*/}
                <CustomFormSelect
                  options={objectToArray(enums.REGION)}
                  placeholder="Oblast"
                  name="address_oblast"
                  ref={register({
                    required:
                      "Zadejte prosím oblast, ve které se objekt nachází",
                  })}
                  errors={errors}
                  onChange={(value) => setOblast(value)}
                  selected={objekt?.adresa?.oblast}
                >
                  <FaMapSigns className="form-icon" />
                </CustomFormSelect>
              </Col>
              <Col sm={12}>
                <span className="ml-1 pb-1 d-block">Základní popis</span>
                <div className="form-item">
                  <Editor
                    {...tinyMCEConfig}
                    initialValue={objekt?.zakladni_popis}
                    textareaName="zakladni_popis"
                    onEditorChange={(value, editor) => {
                      setGeneralInfo(value);
                    }}
                  />
                </div>
                <div className="error-wrapper">
                  <p className="error-message">{errors.message?.message}</p>
                </div>
                <div className="form-item d-flex justify-content-between">
                  {/*<div></div>*/}
                  <span>* Povinné údaje</span>
                  <span>{`${descriptionLength} / 250`}</span>
                </div>
              </Col>
            </Row>
          </div>
        </div>

        <ConditionalWrapper
          condition={!selectedPlan}
          wrapper={(children) => <div className="overlay">{children}</div>}
        >
          {!isStandard && (
            <div className="section">
              <Row className="justify-content-arround bg-grey m-0">
                <Col md={12}>
                  <div className="heading-with-icons">
                    <h2>Podrobné informace</h2>
                  </div>
                </Col>
              </Row>
              <div className="section-content border-grey">
                <Row className="pt-2">
                  <Col>
                    <div className="form-item">
                      {/*<textarea*/}
                      {/*  className={`inputText ${*/}
                      {/*    errors.pordrobny_popis && "border-danger"*/}
                      {/*  }`}*/}
                      {/*  id="podrobny_popis"*/}
                      {/*  name="podrobny_popis"*/}
                      {/*  ref={registerUser}*/}
                      {/*  required*/}
                      {/*  defaultValue={objekt?.podrobny_popis}*/}
                      {/*/>*/}
                      <Editor
                        {...tinyMCEConfig}
                        initialValue={objekt?.podrobny_popis}
                        textareaName="podrobny_popis"
                        onEditorChange={(value, editor) => {
                          console.log(value);
                          setDetailedInfo(value);
                        }}
                      />
                      {/*<label htmlFor="message" className="floating-label">*/}
                      {/*  Podrobný popis objektu*/}
                      {/*</label>*/}
                    </div>
                    <div className="error-wrapper">
                      <p className="error-message">
                        {errors.pordrobny_popis?.message}
                      </p>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          )}
          {!isStandard && !isOptimal && (
            <div className="section">
              <Row className="justify-content-arround bg-grey m-0">
                <Col md={12}>
                  <div className="heading-with-icons d-flex align-items-center">
                    <FaTag
                      className="text-white icon-heading bg-red"
                      style={{ marginRight: "1em" }}
                    />
                    <h2>Last minute / Aktuality</h2>
                  </div>
                </Col>
              </Row>
              <div className="section-content border-grey">
                <Row className="row">
                  <Col>
                    <div className="form-item">
                      <textarea
                        className={`inputText ${
                          errors.last_minute_message && "border-danger"
                        }`}
                        id="last_minute_popis"
                        name="last_minute_popis"
                        ref={register}
                        required
                        defaultValue={objekt?.last_minute_popis}
                      />
                      <label
                        htmlFor="lastMinute_message"
                        className="floating-label"
                      >
                        Podrobný popis objektu
                      </label>
                    </div>
                    <div className="error-wrapper" />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Input
                      ref={register({
                        pattern: {
                          value: /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/,
                          message: "Zadejte prosím platnou webovou stránku",
                        },
                      })}
                      text="Odkaz na webové stránky"
                      name="last_minute_odkaz_na_web"
                      defaultValue={objekt?.last_minute_odkaz_na_web}
                      errors={errors}
                    />
                  </Col>
                </Row>
                <Row className="pt-2 align-items-center">
                  <Col md={7}>
                    <div className="d-flex form-item">
                      <div style={{ width: "50%" }}>
                        <label
                          htmlFor="LastMinutetDatumZacatku"
                          className="text-black"
                        >
                          Platnost last minute
                        </label>
                        <DatePicker
                          selected={lastMinuteStartDate}
                          onChange={(date) => setLastMinuteStartDate(date)}
                          name="LastMinutetDatumZacatku"
                          id="LastMinutetDatumZacatku"
                          startDate={lastMinuteStartDate}
                          minDate={Date.now()}
                          locale="cs"
                          endDate={lastMinuteEndDate}
                          dateFormat="dd.MM.yyyy"
                          className="inputText datePicker"
                          required
                          selectsStart
                          customInput={<StartDateCustomInput />}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="LastMinutetDatumKonce"
                          className="text-black"
                        >
                          {" "}
                        </label>
                        <DatePicker
                          selected={lastMinuteEndDate}
                          onChange={(date) => setLastMinuteEndDate(date)}
                          selectsEnd
                          name="LastMinutetDatumKonce"
                          id="LastMinutetDatumKonce"
                          startDate={lastMinuteStartDate}
                          minDate={Date.now()}
                          locale="cs"
                          endDate={lastMinuteEndDate}
                          dateFormat="dd.MM.yyyy"
                          className="inputText datePicker"
                          required
                          customInput={<EndDateCustomInput />}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          )}
          <div className="section">
            <Row className="justify-content-arround bg-grey m-0">
              <Col md={12}>
                <div className="heading-with-icons d-flex align-items-center">
                  <h2>Zajímavosti v okolí</h2>
                </div>
              </Col>
            </Row>
            <div className="section-content">
              <Row className="row">
                <Col sm={12}>
                  <div className="form-item">
                    <textarea
                      className={`inputText ${
                        errors.zajimavosti_v_okoli && "border-danger"
                      }`}
                      id="zajimavosti"
                      name="zajimavosti"
                      ref={register}
                      required
                      defaultValue={objekt?.zajimavosti}
                    />
                    <label htmlFor="zajimavosti" className="floating-label">
                      Zajímavosti v okolí Vašeho objektu
                    </label>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <div className="section">
            <Row className="justify-content-arround bg-grey m-0">
              <Col md={12}>
                <div className="heading-with-icons d-flex align-items-center">
                  <h2>Vnitřní vybavení</h2>
                </div>
              </Col>
            </Row>
            <div className="section-content border-grey">
              <Row className="pt-2">
                <Col md={6} lg={4}>
                  <Checkbox
                    ref={register}
                    text="DVD / Pohádky na DVD"
                    name="inside_dvd_pohadky"
                    checked={objekt?.vnitrni_vybaveni?.dvd_pohadky}
                  />
                  <Checkbox
                    ref={register}
                    text="autodráha"
                    name="inside_autodraha"
                    checked={objekt?.vnitrni_vybaveni?.autodraha}
                  />
                  <Checkbox
                    ref={register}
                    name="inside_bazen"
                    text="bazén"
                    checked={objekt?.vnitrni_vybaveni?.bazen}
                  />
                  <Checkbox
                    ref={register}
                    name="inside_bowling"
                    text="bowling"
                    checked={objekt?.vnitrni_vybaveni?.bowling}
                  />
                  <Checkbox
                    ref={register}
                    name="inside_chuvicky"
                    text="chůvičky - vysílačky"
                    checked={objekt?.vnitrni_vybaveni?.chuvicky}
                  />
                  <Checkbox
                    ref={register}
                    name="inside_detska_kosmetika"
                    text="dětská kosmetika"
                    checked={objekt?.vnitrni_vybaveni?.detska_kosmetika}
                  />
                  <Checkbox
                    ref={register}
                    name="inside_detska_postylka"
                    text="dětská postýlka"
                    checked={objekt?.vnitrni_vybaveni?.detska_postylka}
                  />
                  <Checkbox
                    ref={register}
                    name="inside_detska_strava"
                    text="dětská strava"
                    checked={objekt?.vnitrni_vybaveni?.detska_strava}
                  />
                  <Checkbox
                    ref={register}
                    name="inside_detska_zidlicka"
                    text="dětská židlička"
                    checked={objekt?.vnitrni_vybaveni?.detska_zidlicka}
                  />
                  <Checkbox
                    ref={register}
                    name="inside_detska_luzkoviny"
                    text="dětské lůžkoviny"
                    checked={objekt?.vnitrni_vybaveni?.detska_luzkoviny}
                  />
                  <Checkbox
                    ref={register}
                    name="inside_detske_menu"
                    text="dětské menu"
                    checked={objekt?.vnitrni_vybaveni?.detske_menu}
                  />
                  <Checkbox
                    ref={register}
                    name="inside_detska_plenky"
                    text="dětské plenky"
                    checked={objekt?.vnitrni_vybaveni?.detska_plenky}
                  />
                  <Checkbox
                    ref={register}
                    name="inside_detska_sedatko"
                    text="dětské sedátko na wc"
                    checked={objekt?.vnitrni_vybaveni?.detska_sedatko}
                  />
                  <Checkbox
                    ref={register}
                    name="inside_detsky_domecek"
                    text="dětský domeček"
                    checked={objekt?.vnitrni_vybaveni?.detsky_domecek}
                  />
                  <Checkbox
                    ref={register}
                    name="inside_detsky_koutek"
                    text="dětský koutek"
                    checked={objekt?.vnitrni_vybaveni?.detsky_koutek}
                  />
                  <Checkbox
                    ref={register}
                    name="inside_detsky_pribor"
                    text="dětský příbor"
                    checked={objekt?.vnitrni_vybaveni?.detsky_pribor}
                  />
                  <Checkbox
                    ref={register}
                    name="inside_dilnicky_pro_deti"
                    text="dílničky pro děti"
                    checked={objekt?.vnitrni_vybaveni?.dilnicky_pro_deti}
                  />
                  <Checkbox
                    ref={register}
                    name="inside_mazlicci_vitani"
                    text="domácí mazlíčci vítáni / po dohodě"
                    checked={objekt?.vnitrni_vybaveni?.mazlicci_vitani}
                  />
                  <Checkbox
                    ref={register}
                    name="inside_dvd"
                    text="DVD"
                    checked={objekt?.vnitrni_vybaveni?.dvd}
                  />
                  <Checkbox
                    ref={register}
                    name="inside_expozice_pro_deti"
                    text="expozice pro děti"
                    checked={objekt?.vnitrni_vybaveni?.expozice_pro_deti}
                  />
                  <Checkbox
                    ref={register}
                    name="inside_fen"
                    text="Fén"
                    checked={objekt?.vnitrni_vybaveni?.fen}
                  />
                </Col>
                <Col md={6} lg={4}>
                  <Checkbox
                    ref={register}
                    name="inside_herna_sal"
                    text="herna / sál"
                    checked={objekt?.vnitrni_vybaveni?.herna_sal}
                  />
                  <Checkbox
                    ref={register}
                    name="inside_hlidani_deti_zdarma"
                    text="hlídání dětí - zdarma"
                    checked={objekt?.vnitrni_vybaveni?.hlidani_deti_zdarma}
                  />
                  <Checkbox
                    ref={register}
                    name="inside_hlidani_deti_placeny"
                    text="hlídání dětí za poplatek"
                    checked={objekt?.vnitrni_vybaveni?.dvd_pohadky}
                  />
                  <Checkbox
                    ref={register}
                    name="inside_hygienicke_ubrousky"
                    text="hygienické ubrousky"
                    checked={objekt?.vnitrni_vybaveni?.hygienicke_ubrousky}
                  />
                  <Checkbox
                    ref={register}
                    name="inside_internet_zdarma"
                    text="internet / WiFi - zdarma"
                    checked={objekt?.vnitrni_vybaveni?.internet_zdarma}
                  />
                  <Checkbox
                    ref={register}
                    name="inside_internet_placeny"
                    text="internet / WiFi - placený"
                    checked={objekt?.vnitrni_vybaveni?.internet_placeny}
                  />
                  <Checkbox
                    ref={register}
                    name="inside_bryndacky"
                    text="jednorázové bryndáčky"
                    checked={objekt?.vnitrni_vybaveni?.dvd_pohadky}
                  />
                  <Checkbox
                    ref={register}
                    name="inside_kuchynka"
                    text="kuchyňka"
                    checked={objekt?.vnitrni_vybaveni?.kuchynka}
                  />
                  <Checkbox
                    ref={register}
                    name="inside_kulecnik"
                    text="kulečník"
                    checked={objekt?.vnitrni_vybaveni?.kulecnik}
                  />
                  <Checkbox
                    ref={register}
                    name="inside_kuzelky"
                    text="kuželky"
                    checked={objekt?.vnitrni_vybaveni?.kuzelky}
                  />
                  <Checkbox
                    ref={register}
                    name="inside_lednice"
                    text="lednice"
                    checked={objekt?.vnitrni_vybaveni?.lednice}
                  />
                  <Checkbox
                    ref={register}
                    name="inside_mikrovlnka"
                    text="mikrovlná trouba"
                    checked={objekt?.vnitrni_vybaveni?.mikrovlnka}
                  />
                  <Checkbox
                    ref={register}
                    name="inside_minibar"
                    text="minibar"
                    checked={objekt?.vnitrni_vybaveni?.minibar}
                  />
                  <Checkbox
                    ref={register}
                    name="inside_vstup_s_kocarkem"
                    text="možný vstup s kočárkem"
                    checked={objekt?.vnitrni_vybaveni?.vstup_s_kocarkem}
                  />
                  <Checkbox
                    ref={register}
                    name="inside_snidane_polopenze_plnapenze"
                    text="nabídka snídaní / polopenze / plné penze"
                    checked={
                      objekt?.vnitrni_vybaveni?.snidane_polopenze_plnapenze
                    }
                  />
                  <Checkbox
                    ref={register}
                    name="inside_nekuracke"
                    text="nekuřácké prostředí"
                    checked={objekt?.vnitrni_vybaveni?.nekuracke}
                  />
                  <Checkbox
                    ref={register}
                    name="inside_nocnik"
                    text="nočník"
                    checked={objekt?.vnitrni_vybaveni?.nocnik}
                  />
                  <Checkbox
                    ref={register}
                    name="inside_baby_friendly"
                    text="ocenění BABY FRIENDLY CERTIFICATE"
                    checked={objekt?.vnitrni_vybaveni?.baby_friendly}
                  />
                  <Checkbox
                    ref={register}
                    name="inside_ochrana_schodiste"
                    text="ochrana schodiště proti pádu"
                    checked={objekt?.vnitrni_vybaveni?.ochrana_schodiste}
                  />
                  <Checkbox
                    ref={register}
                    name="inside_ohrivac_lahvi"
                    text="ohřívač lahví"
                    checked={objekt?.vnitrni_vybaveni?.ohrivac_lahvi}
                  />
                </Col>

                <Col md={6} lg={4}>
                  <Checkbox
                    name="inside_pohybove_hry"
                    text="pohybové hry nebo cvičení s dětmi"
                    checked={objekt?.vnitrni_vybaveni?.pohybove_hry}
                    ref={register}
                  />
                  <Checkbox
                    name="inside_prebalovaci_pult"
                    text="přebalovací pult"
                    checked={objekt?.vnitrni_vybaveni?.prebalovaci_pult}
                    ref={register}
                  />
                  <Checkbox
                    name="inside_porgramy_pro_deti"
                    text="programy pro děti"
                    checked={objekt?.vnitrni_vybaveni?.porgramy_pro_deti}
                    errors={errors}
                    ref={register}
                  />
                  <Checkbox
                    name="inside_pujcovna_hracek"
                    text="půjčování hraček"
                    checked={objekt?.vnitrni_vybaveni?.pujcovna_hracek}
                    ref={register}
                  />
                  <Checkbox
                    name="inside_pujcovna_sportovniho_vybaveni"
                    text="půjčovna sportovního vybavení"
                    checked={
                      objekt?.vnitrni_vybaveni?.pujcovna_sportovniho_vybaveni
                    }
                    ref={register}
                  />
                  <Checkbox
                    name="inside_halove_sporty"
                    text="halové sporty"
                    checked={objekt?.vnitrni_vybaveni?.halove_sporty}
                    ref={register}
                  />
                  <Checkbox
                    name="inside_radio_CD"
                    text="rádio s CD"
                    checked={objekt?.vnitrni_vybaveni?.radio_CD}
                    ref={register}
                  />
                  <Checkbox
                    name="inside_restaurace_jidelna"
                    text="restaurace / jídelna"
                    checked={objekt?.vnitrni_vybaveni?.restaurace_jidelna}
                    ref={register}
                  />
                  <Checkbox
                    name="inside_rucniky_luzkoviny"
                    text="ručníky / lůžkoviny"
                    checked={objekt?.vnitrni_vybaveni?.rucniky_luzkoviny}
                    ref={register}
                  />
                  <Checkbox
                    name="inside_sauna"
                    text="inside_sauna / whirlpool"
                    checked={objekt?.vnitrni_vybaveni?.sauna}
                    ref={register}
                  />
                  <Checkbox
                    name="inside_sipky"
                    text="šipky"
                    checked={objekt?.vnitrni_vybaveni?.sipky}
                    ref={register}
                  />
                  <Checkbox
                    name="inside_spolecenska_mistnost"
                    text="společenská místnost"
                    checked={objekt?.vnitrni_vybaveni?.spolecenska_mistnost}
                    ref={register}
                  />
                  <Checkbox
                    name="inside_stolni_hry"
                    text="stolní hry"
                    checked={objekt?.vnitrni_vybaveni?.stolni_hry}
                    ref={register}
                  />
                  <Checkbox
                    name="inside_stolni_tenis"
                    text="stolní tenis"
                    checked={objekt?.vnitrni_vybaveni?.stolni_tenis}
                    ref={register}
                  />
                  <Checkbox
                    name="inside_stupatko_pod_umyvadlo"
                    text="stupátko pod umyvadlo"
                    checked={objekt?.vnitrni_vybaveni?.stupatko_pod_umyvadlo}
                    ref={register}
                  />
                  <Checkbox
                    name="inside_televize"
                    text="televize"
                    checked={objekt?.vnitrni_vybaveni?.televize}
                    ref={register}
                  />
                  <Checkbox
                    name="inside_tensiovy_kurt"
                    text="tenisový kurt"
                    checked={objekt?.vnitrni_vybaveni?.tensiovy_kurt}
                    ref={register}
                  />
                  <Checkbox
                    name="inside_vanicka"
                    text="vanička"
                    checked={objekt?.vnitrni_vybaveni?.vanicka}
                    ref={register}
                  />
                  <Checkbox
                    name="inside_varna_konvice"
                    text="varná konvice"
                    checked={objekt?.vnitrni_vybaveni?.varna_konvice}
                    ref={register}
                  />
                  <Checkbox
                    name="inside_vytah"
                    text="výtah"
                    checked={objekt?.vnitrni_vybaveni?.vytah}
                    ref={register}
                  />
                  <Checkbox
                    name="inside_zaslepky_do_zasuvek"
                    text="záslepky do elektr. zásuvek"
                    checked={objekt?.vnitrni_vybaveni?.zaslepky_do_zasuvek}
                    ref={register}
                  />
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <div className="form-item">
                    <textarea
                      className={`inputText ${
                        errors.dalsi_vybaveni && "border-danger"
                      }`}
                      id="inside_dalsi_vybaveni"
                      name="inside_dalsi_vybaveni"
                      ref={register}
                      required
                    />
                    <label htmlFor="message" className="floating-label">
                      Další vnitřní vybavení, oddělené čárkou:
                    </label>
                  </div>
                  <div className="error-wrapper">
                    <p className="error-message">
                      {errors.dalsi_vybaveni?.message}
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <div className="section">
            <Row className="justify-content-arround bg-grey m-0">
              <Col md={12}>
                <div className="heading-with-icons d-flex align-items-center">
                  <h2>Vnější vybavení</h2>
                </div>
              </Col>
            </Row>
            <div className="section-content border-grey">
              <Row className="pt-2">
                <Col md={6} lg={4}>
                  <Checkbox
                    name="outside_badminton"
                    text="badminton"
                    errors={errors}
                    ref={register}
                  />
                  <Checkbox
                    name="outside_bazen"
                    text="bazén"
                    errors={errors}
                    ref={register}
                  />
                  <Checkbox
                    name="outside_brouzdaliste"
                    text="brouzdaliště"
                    errors={errors}
                    ref={register}
                  />
                  <Checkbox
                    name="outside_cyklo_sedacka"
                    text="cyklo sedačka"
                    errors={errors}
                    ref={register}
                  />
                  <Checkbox
                    errors={errors}
                    ref={register}
                    name="outside_detska_lyzarska_skolicka"
                    text="dětská lyžařská školička"
                  />
                  <Checkbox
                    name="outside_detska_sjezdovka"
                    text="dětská sjezdovka"
                    errors={errors}
                    ref={register}
                  />
                  <Checkbox
                    name="outside_detsky_domecek"
                    text="dětský domeček"
                    errors={errors}
                    ref={register}
                  />
                  <Checkbox
                    name="outside_detsky_koutek"
                    text="dětský koutek"
                    errors={errors}
                    ref={register}
                  />
                  <Checkbox
                    name="outside_detsky_lyzarsky_vlek"
                    text="dětský lyžařský vlek"
                    errors={errors}
                    ref={register}
                  />
                  <Checkbox
                    name="outside_dobove_hry"
                    text="dobové hry"
                    errors={errors}
                    ref={register}
                  />
                  <Checkbox
                    name="outside_fotbalove_hriste"
                    text="fotbalové hřiště"
                    errors={errors}
                    ref={register}
                  />
                  <Checkbox
                    name="outside_houpacka"
                    text="houpačka"
                    errors={errors}
                    ref={register}
                  />
                  <Checkbox
                    name="outside_hriste"
                    text="hřiště"
                    errors={errors}
                    ref={register}
                  />
                  <Checkbox
                    name="outside_indianske_typi"
                    text="indiánské týpí"
                    errors={errors}
                    ref={register}
                  />
                  <Checkbox
                    name="outside_klouzacka"
                    text="klouzačka"
                    errors={errors}
                    ref={register}
                  />
                  <Checkbox
                    name="outside_kocarek"
                    text="kočárek"
                    errors={errors}
                    ref={register}
                  />
                  <Checkbox
                    name="outside_kolotoc"
                    text="kolotoč"
                    errors={errors}
                    ref={register}
                  />
                </Col>
                <Col md={6} lg={4}>
                  <Checkbox
                    name="outside_krosna_na_dite"
                    text="krosnička na dítě"
                    errors={errors}
                    ref={register}
                  />
                  <Checkbox
                    name="outside_lanove_atrakce"
                    text="lanové atrakce"
                    errors={errors}
                    ref={register}
                  />
                  <Checkbox
                    name="outside_lezecka_stena"
                    text="lezecká stěna"
                    errors={errors}
                    ref={register}
                  />
                  <Checkbox
                    name="outside_lyzarska_skola"
                    text="lyžařská škola"
                    errors={errors}
                    ref={register}
                  />
                  <Checkbox
                    name="outside_mikrovlnka"
                    text="mikrovlná trouba"
                    errors={errors}
                    ref={register}
                  />
                  <Checkbox
                    name="outside_minigolf"
                    text="minigolf"
                    errors={errors}
                    ref={register}
                  />
                  <Checkbox
                    name="outside_minizoo"
                    text="minizoo"
                    errors={errors}
                    ref={register}
                  />
                  <Checkbox
                    name="outside_vstup_s_kocarkem"
                    text="možný vstup s kočárkem"
                    errors={errors}
                    ref={register}
                  />
                  <Checkbox
                    name="outside_odrazedlo"
                    text="odrážedlo"
                    errors={errors}
                    ref={register}
                  />
                  <Checkbox
                    name="outside_ohniste_grill_krb"
                    text="ohniště / gril / krb"
                    errors={errors}
                    ref={register}
                  />
                  <Checkbox
                    name="outside_parkoviste"
                    text="parkoviště"
                    errors={errors}
                    ref={register}
                  />
                  <Checkbox
                    name="outside_petangue"
                    text="petangue"
                    errors={errors}
                    ref={register}
                  />
                  <Checkbox
                    name="outside_piskoviste"
                    text="pískoviště"
                    errors={errors}
                    ref={register}
                  />
                  <Checkbox
                    name="outside_prebalovaci_pult"
                    text="přebalovací pult"
                    errors={errors}
                    ref={register}
                  />
                  <Checkbox
                    name="outside_programy_pro_deti"
                    text="programy pro děti"
                    errors={errors}
                    ref={register}
                  />
                  <Checkbox
                    name="outside_projizdky_na_konich"
                    text="projížďky na koních"
                    errors={errors}
                    ref={register}
                  />
                  <Checkbox
                    name="outside_prulezka"
                    text="průlezka"
                    errors={errors}
                    ref={register}
                  />
                </Col>

                <Col md={6} lg={4}>
                  <Checkbox
                    name="outside_pujcovna_kol"
                    text="půjčovna kol"
                    errors={errors}
                    ref={register}
                  />
                  <Checkbox
                    name="outside_pujcovna_lyzi"
                    text="půjčovna lyží"
                    errors={errors}
                    ref={register}
                  />
                  <Checkbox
                    name="outside_pujcovna_sportovniho_vybaveni"
                    text="půjčovna sportovního vybavení"
                    errors={errors}
                    ref={register}
                  />
                  <Checkbox
                    name="outside_venkovni_sporty"
                    text="venkovní sporty"
                    errors={errors}
                    ref={register}
                  />
                  <Checkbox
                    name="outside_ruske_kuzelky"
                    text="ruské kuželky"
                    errors={errors}
                    ref={register}
                  />
                  <Checkbox
                    name="outside_skladaci_hrad"
                    text="skákací hrad"
                    errors={errors}
                    ref={register}
                  />
                  <Checkbox
                    name="outside_ski_servis"
                    text="SKI servis"
                    errors={errors}
                    ref={register}
                  />
                  <Checkbox
                    name="outside_stolni_tenis"
                    text="stolní tenis"
                    errors={errors}
                    ref={register}
                  />
                  <Checkbox
                    name="outside_tenisovy_kurt"
                    text="tenisový kurt"
                    errors={errors}
                    ref={register}
                  />
                  <Checkbox
                    name="outside_trampolina"
                    text="trampolína"
                    errors={errors}
                    ref={register}
                  />
                  <Checkbox
                    name="outside_travnata_plocha"
                    text="travnatá plocha"
                    errors={errors}
                    ref={register}
                  />
                  <Checkbox
                    name="outside_volejbalove_hriste"
                    text="volejbalové hřiště"
                    errors={errors}
                    ref={register}
                  />
                  <Checkbox
                    name="outside_vozik_za_kolo"
                    text="vozík za kolo"
                    errors={errors}
                    ref={register}
                  />
                  <Checkbox
                    name="outside_zahrada"
                    text="zahrada"
                    errors={errors}
                    ref={register}
                  />
                  <Checkbox
                    name="outside_zahradni_altan"
                    text="zahradní altán"
                    errors={errors}
                    ref={register}
                  />
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <div className="form-item">
                    <textarea
                      className={`inputText ${
                        errors.dalsi_vybaveni && "border-danger"
                      }`}
                      id="dalsi_vybaveni"
                      name="dalsi_vybaveni"
                      ref={register}
                      required
                    />
                    <label htmlFor="message" className="floating-label">
                      Další vnitřní vybavení, oddělené čárkou:
                    </label>
                  </div>
                  <div className="error-wrapper">
                    <p className="error-message">
                      {errors.dalsi_vybaveni?.message}
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <div className="section">
            <Row className="justify-content-arround bg-grey m-0">
              <Col md={12}>
                <div className="heading-with-icons d-flex align-items-center">
                  <h2>Dostupnost</h2>
                </div>
              </Col>
            </Row>
            <div className="section-content border-grey">
              <Row className="pt-2">
                <Col md={3}>
                  <span className="ml-1 pb-1">MHD</span>
                  <Input
                    text="m / km"
                    name="accessibility_mhd"
                    ref={register}
                    defaultValue={objekt?.dostupnost?.mhd}
                  />
                </Col>
                <Col md={3}>
                  <span className="ml-1 pb-1">ČSAD</span>
                  <Input
                    text="m / km"
                    name="accessibility_csad"
                    ref={register}
                    errors={errors}
                    defaultValue={objekt?.dostupnost?.csad}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={3}>
                  <span className="ml-1 pb-1">Metro</span>
                  <Input
                    text="m / km"
                    name="accessibility_metro"
                    ref={register}
                    errors={errors}
                    defaultValue={objekt?.dostupnost?.metro}
                  />
                </Col>
                <Col md={3}>
                  <span className="ml-1 pb-1">Vlak</span>
                  <Input
                    text="m / km"
                    name="accessibility_vlak"
                    ref={register}
                    errors={errors}
                    defaultValue={objekt?.dostupnost?.vlak}
                  />
                </Col>
              </Row>
              {!isStandard && (
                <Row>
                  <Col md={6}>
                    <p className="mr-1 ml-1">
                      Zadejte GPS souřadnice manuálně nebo vyhledejte pomocí
                      zadání adresy
                    </p>
                    <div className="ml-1 d-flex">
                      <div className="mr-1">
                        <label className="checkbox-container">
                          <span className="radio-label">Vyhledat</span>
                          <input
                            type="radio"
                            name="find_gps"
                            value="search"
                            ref={register}
                            defaultChecked
                          />
                          <span className="checkmark" />
                        </label>
                      </div>
                      <div>
                        <label className="checkbox-container">
                          <span className="radio-label">Ručně</span>
                          <input
                            type="radio"
                            name="find_gps"
                            value="manual"
                            ref={register}
                          />
                          <span className="checkmark" />
                        </label>
                      </div>
                    </div>
                    <span className="ml-1 pb-1" />
                    {watchFindGps === "manual" && (
                      <>
                        <Input
                          text="Nadmořská výška"
                          name="accessibility_gps_lat"
                          ref={register}
                          defaultValue={gpsCoordinatesLat}
                          onChange={(e) => setGpsCoordinatesLat(e.target.value)}
                        />
                        <Input
                          text="Nadmořská šířka"
                          name="accessibility_gps_lng"
                          ref={register}
                          defaultValue={gpsCoordinatesLng}
                          className="mt-1"
                          onChange={(e) => setGpsCoordinatesLng(e.target.value)}
                        />
                      </>
                    )}
                    {watchFindGps === "search" && (
                      <>
                        <Input
                          name="geocodingQuery"
                          text="Zadejte hledaný výraz"
                          defaultValue={gpsGeoString}
                          onChange={(e) => {
                            const value = e.target?.value;
                            if (value?.length > 3) {
                              setQuery(value);
                              setLoadingGeo(true);
                              setOpenGeoOptions(true);
                            }
                          }}
                        />
                        <div className="location-options border-grey">
                          {loadingGeo ? (
                            <LoadingSkeleton />
                          ) : (
                            openGeoOptions &&
                            geoResults?.features?.map((resultItem, index) => {
                              return (
                                <div
                                  key={index}
                                  className="location-options-item"
                                  onClick={() => {
                                    setGpsCoordinatesLat(
                                      resultItem.geometry.coordinates[1]
                                    );
                                    setGpsCoordinatesLng(
                                      resultItem.geometry.coordinates[0]
                                    );
                                    setGpsGeoString(resultItem.place_name);
                                    setOpenGeoOptions(false);
                                  }}
                                >
                                  <h3>{resultItem.text_cs}</h3>
                                  <p>{resultItem.place_name}</p>
                                  <p>
                                    GPS:{" "}
                                    {`${resultItem.geometry.coordinates[1]}N, ${resultItem.geometry.coordinates[0]}E`}
                                  </p>
                                </div>
                              );
                            })
                          )}
                        </div>
                        {
                          <div className="ml-1">
                            <p>Nadmořské výška: {gpsCoordinatesLat}</p>
                            <p>Nadmořské šířka: {gpsCoordinatesLng}</p>
                          </div>
                        }
                      </>
                    )}
                    {/*{objekt?.dostupnost?.gps && (*/}
                    {/*  // <p className="ml-1">GPS: {objekt?.dostupnost?.gps} </p>*/}
                    {/*)}*/}
                  </Col>
                </Row>
              )}
            </div>
          </div>
          {!isStandard && (
            <div className="section">
              <Row className="justify-content-arround bg-grey m-0">
                <Col md={12}>
                  <div className="heading-with-icons d-flex align-items-center">
                    <h2>Ceník</h2>
                  </div>
                </Col>
              </Row>
              <div className="section-content border-grey">
                {showItems(priceList, setPriceList)}

                <Row className="pt-2 align-items-center">
                  <Col md={4}>
                    <div className="d-flex form-item">
                      <div style={{ width: "50%" }}>
                        <label
                          htmlFor="priceListDatumZacatku"
                          className="text-black"
                        >
                          Termín
                        </label>
                        <DatePicker
                          selected={priceLIStartDate}
                          onChange={(date) => setPriceLIStartDate(date)}
                          name="priceListDatumZacatku"
                          id="priceListDatumZacatku"
                          startDate={priceLIStartDate}
                          minDate={Date.now()}
                          locale="cs"
                          endDate={priceLIEndDate}
                          dateFormat="dd.MM.yyyy"
                          className="inputText datePicker"
                          required
                          selectsStart
                          customInput={<StartDateCustomInput />}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="priceListDatumKonce"
                          className="text-black"
                        >
                          &nbsp;
                        </label>
                        <DatePicker
                          selected={priceLIEndDate}
                          onChange={(date) => setPriceLIEndDate(date)}
                          selectsEnd
                          name="priceListDatumKonce"
                          id="priceListDatumKonce"
                          startDate={priceLIStartDate}
                          minDate={Date.now()}
                          locale="cs"
                          endDate={priceLIEndDate}
                          dateFormat="dd.MM.yyyy"
                          className="inputText datePicker"
                          required
                          customInput={<EndDateCustomInput />}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col md={4}>
                    <label htmlFor="pricelist_popis" className="text-black">
                      &nbsp;
                    </label>
                    <Input
                      text="Popis"
                      name="pricelist_popis"
                      value={priceLIDescription}
                      onChange={(e) => {
                        setPriceLIDescription(e.target.value);
                      }}
                    />
                  </Col>
                  <Col md={4}>
                    <label htmlFor="pricelist_cena" className="text-black">
                      &nbsp;
                    </label>
                    <Input
                      text="Cena"
                      name="pricelist_cena"
                      type="number"
                      value={priceLIPrice}
                      onChange={(e) => checkInputNumber(e, setPriceLIPrice)}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <button
                      type="button"
                      className="btn add-row d-flex align-items-center"
                      onClick={() => {
                        setPriceList((prevState) => {
                          const finalItem = {
                            datum_zacatku: priceLIStartDate,
                            datum_konce: priceLIEndDate,
                            popis: priceLIDescription,
                            cena: priceLIPrice,
                          };
                          return prevState
                            ? [...prevState, finalItem]
                            : [finalItem];
                        });
                        setPriceLIStartDate(new Date());
                        setPriceLIEndDate(null);
                        setPriceLIPrice("");
                        setPriceLIDescription("");
                      }}
                    >
                      <BsFillPlusCircleFill className="text-blue icon" />
                      <span>Přidat další řádek</span>
                    </button>
                  </Col>
                </Row>
              </div>
            </div>
          )}
          {!isStandard && (
            <div className="section">
              <Row className="justify-content-arround bg-grey m-0">
                <Col md={12}>
                  <div className="heading-with-icons d-flex align-items-center">
                    <h2>Slevy</h2>
                  </div>
                </Col>
              </Row>
              <div className="section-content border-grey">
                {showItems(sale, setSale)}
                <Row className="pt-2">
                  <Col md={4}>
                    <div className="d-flex form-item">
                      <div style={{ width: "50%" }}>
                        <label
                          htmlFor="saleDatumZacatku"
                          className="text-black"
                        >
                          Termín
                        </label>
                        <DatePicker
                          selected={saleItemStartDate}
                          onChange={(date) => setSaleItemStartDate(date)}
                          name="saleDatumZacatku"
                          id="saleDatumZacatku"
                          startDate={saleItemStartDate}
                          minDate={Date.now()}
                          locale="cs"
                          endDate={saleItemEndDate}
                          dateFormat="dd.MM.yyyy"
                          className="inputText datePicker"
                          required
                          selectsStart
                          customInput={<StartDateCustomInput />}
                        />
                      </div>
                      <div>
                        <label htmlFor="saleDatumKonce" className="text-black">
                          &nbsp;
                        </label>
                        <DatePicker
                          selected={saleItemEndDate}
                          onChange={(date) => setSaleItemEndDate(date)}
                          selectsEnd
                          name="saleDatumKonce"
                          id="saleDatumKonce"
                          startDate={saleItemStartDate}
                          minDate={Date.now()}
                          locale="cs"
                          endDate={saleItemEndDate}
                          dateFormat="dd.MM.yyyy"
                          className="inputText datePicker"
                          required
                          customInput={<EndDateCustomInput />}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col md={4}>
                    <label htmlFor="sale_popis" className="text-black">
                      &nbsp;
                    </label>
                    <Input
                      text="Popis"
                      name="sale_popis"
                      onChange={(e) => setSaleItemDescription(e.target.value)}
                      value={saleItemDescription}
                    />
                  </Col>
                  <Col md={3}>
                    <label htmlFor="sale_cena" className="text-black">
                      &nbsp;
                    </label>
                    <Input
                      type="number"
                      text="Cena"
                      name="sale_cena"
                      value={saleItemPrice}
                      onChange={(e) => checkInputNumber(e, setSaleItemPrice)}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <button
                      type="button"
                      className="btn add-row d-flex align-items-center"
                      onClick={() => {
                        setSale((prevState) => {
                          const finalItem = {
                            datum_zacatku: saleItemStartDate,
                            datum_konce: saleItemEndDate,
                            popis: saleItemDescription,
                            cena: saleItemPrice,
                          };
                          return prevState
                            ? [...prevState, finalItem]
                            : [finalItem];
                        });
                        setSaleItemStartDate(new Date());
                        setSaleItemEndDate(null);
                        setSaleItemPrice("");
                        setSaleItemDescription("");
                      }}
                    >
                      <BsFillPlusCircleFill className="text-blue icon" />
                      <span>Přidat další řádek</span>
                    </button>
                  </Col>
                </Row>
              </div>
            </div>
          )}
          <div className="section">
            <Row className="justify-content-arround bg-grey m-0">
              <Col md={12}>
                <div className="heading-with-icons d-flex align-items-center">
                  <h2>Provozní doba</h2>
                </div>
              </Col>
            </Row>
            <div className="section-content">
              {operatingHours?.map((item, i) => (
                <Row className="pt-2 align-items-center" key={i}>
                  <Col md={4}>
                    <div className="d-flex form-item">
                      <div style={{ width: "50%" }}>
                        <StartDateCustomInput
                          value={item.datum_zacatku}
                          disabled
                        />
                      </div>
                      <div>
                        <EndDateCustomInput value={item.datum_konce} disabled />
                      </div>
                    </div>
                  </Col>
                  <Col md={4}>
                    <Input value={item.popis} text="Popis" disabled />
                  </Col>
                  <Col>
                    <button
                      type="button"
                      className="btn bg-white"
                      onClick={() => {
                        setOperatingHours((prevState) =>
                          prevState.splice(i, 1)
                        );
                      }}
                    >
                      <BsPlus className="cancel-filter-icon" />
                    </button>
                  </Col>
                </Row>
              ))}
              <Row className="row">
                <Col md={4}>
                  <div className="d-flex form-item">
                    <div style={{ width: "50%" }}>
                      <label htmlFor="openingHoursStart" className="text-black">
                        Termín
                      </label>
                      <Input
                        type="time"
                        text="Čas otevření"
                        name="openingHoursStart"
                        required
                        defaultValue="00:00"
                        className="m-0"
                        value={openingStart}
                        onChange={(e) => setOpeningStart(e.target.value)}
                      />
                    </div>
                    <div style={{ width: "50%" }}>
                      <label htmlFor="openingHoursEnd" className="text-black">
                        &nbsp;
                      </label>
                      <div className="form-item m-0">
                        <Input
                          type="time"
                          text="Čas zavření"
                          name="openingHoursEnd"
                          required
                          defaultValue="00:00"
                          value={openingEnd}
                          onChange={(e) => setOpeningEnd(e.target.value)}
                          className="m-0 pr-0"
                        />
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md={4}>
                  <label htmlFor="openingHoursDescription">&nbsp;</label>
                  <Input
                    text="Popis (např. Po-Ne)"
                    name="openingHoursDescription"
                    value={openingDescripiton}
                    onChange={(e) => setOpeningDescripiton(e.target.value)}
                  />
                </Col>
                <Col>
                  <button
                    type="button"
                    className="btn bg-white"
                    disabled={!operatingHours || operatingHours?.length === 0}
                  >
                    <BsPlus className="cancel-filter-icon" />
                  </button>
                </Col>
              </Row>

              <Row>
                <Col>
                  <button
                    type="button"
                    className="btn add-row d-flex align-items-center"
                    onClick={() => {
                      setOperatingHours((prevState) => [
                        ...prevState,
                        {
                          otevira_v: openingStart,
                          zavira_v: openingEnd,
                          popis: openingDescripiton,
                        },
                      ]);
                      setOpeningStart("00:00");
                      setOpeningEnd("00:00");
                      setOpeningDescripiton("");
                    }}
                  >
                    <BsFillPlusCircleFill className="text-blue icon" />
                    <span>Přidat další řádek</span>
                  </button>
                </Col>
              </Row>
            </div>
          </div>
          <div className="section">
            <Row className="justify-content-arround bg-grey m-0">
              <Col md={12}>
                <div className="heading-with-icons d-flex align-items-center">
                  <h2>Fotogalerie</h2>
                </div>
              </Col>
            </Row>
            <div className="section-content ">
              <Row className="row">
                <Col md={12}>
                  <div
                    {...dropzonePropsParent}
                    className={`dropzone outline-none ${
                      previewImages && previewImages?.length > 0
                        ? "pt-0 pb-0"
                        : "bg-grey"
                    } form-item`}
                  >
                    <>
                      <input {...getInputProps()} />
                      {(previewImages && previewImages?.length > 0) ||
                      objekt?.galerie?.length > 0 ? (
                        <>
                          {thumbnails}
                          <Lightbox
                            open={showLightbox}
                            onClose={() => {
                              setShowLightbox(false);
                              setClickedImage(null);
                            }}
                            images={previewImages}
                            clickedImage={clickedImage}
                          />
                        </>
                      ) : (
                        <p>
                          Fotografii nahrajete přetáhnutím do tohoto pole nebo
                          kliknutím na tlačítko.
                        </p>
                      )}
                      <div {...dropzonePropsChildren} className="outline-none">
                        <button
                          className="btn-small-logo btn bg-blue text-white"
                          type="button"
                        >
                          <MdCloudUpload className="btn-icon" />
                          Nahrát{" "}
                          {previewImages && previewImages.length > 0
                            ? "další"
                            : "fotografie"}
                        </button>
                      </div>
                    </>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <button
            type="submit"
            className="btn-logo d-flex align-items-center btn bg-blue text-white"
          >
            <FaSave className="btn-icon" />
            Uložit údaje
          </button>
        </ConditionalWrapper>
      </form>
      {uploadingInProgress && (
        <div className="uploading-objekt">
          <div className="content-wrapper">
            <h2>Nahrávám objekt..</h2>
            <p>Neoupštejte tuto stránka objekt se nahrává</p>
          </div>
        </div>
      )}
    </>
  );
};

ObjednatObjektInfo.propTypes = {
  uploadObjekt: PropTypes.func,
  uploadObjektInfo: PropTypes.func,
  handleObjekt: PropTypes.func,
  users: PropTypes.object,
  kategorie: PropTypes.array,
  getCategories: PropTypes.func,
  getSecondaryCategoriesWithParam: PropTypes.func,
};

const mapStateToProps = (state) => ({
  users: state.users,
  kategorie: state.objekty?.kategorie,
  uploadingInProgress: state.objekty.uploadingInProgress,
  mapbox: state.mapbox,
});

export default ObjednatObjektInfo;
