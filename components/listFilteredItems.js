import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Router, { useRouter } from "next/router";
import { connect } from "react-redux";
import LoadingSkeleton from "../layouts/LoadingSkeleton";
import Objekt from "./cards/Objekt";
import { countObjekty, getObjektyByParams } from "../redux/actions/objekty";
import enums from "../enums";
import { fetchQuery } from "../helpers/fetch";
import { objectToArray, searchParamsToQueryString } from "../helpers/helpers";
import PromoArticle from "../layouts/PromoArticle";
import { route } from "next/dist/next-server/server/router";
import { FaWindowClose } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { translateColor } from "../helpers/translators";

const ListFilteredItems = ({ objekty, typ_objektu }) => {
  const router = useRouter();
  const { kraj, mesto, oblast } = router.query;

  const limit = 4;
  const [next, setNext] = useState(limit);
  const [filterParams, setFilterParams] = useState(null);
  const [region, setRegion] = useState(kraj);
  const [city, setCity] = useState(mesto);
  const [area, setArea] = useState(oblast);
  const [listObjects, setListObjects] = useState(objekty);
  const [promo, setPromo] = useState(null);
  let fetchParams = {
    typ_objektu,
    _limit: limit,
    _start: 0,
  };

  const fetchObjects = async () => {
    const objekty = await fetchQuery(
      `objekt-infos?${searchParamsToQueryString(fetchParams)}`
    );

    setListObjects(objekty);
  };

  const fetchPromo = async () => {
    const fetchedPromo = await fetchQuery(`rady-a-tipies?promo=true`);

    console.log("promo", fetchedPromo);

    setPromo(fetchedPromo);
  };

  useEffect(() => {
    fetchPromo();
  }, []);

  useEffect(() => {
    console.log("query", router.query);

    if (router.query) {
      if (kraj) fetchParams = { ...fetchParams, adresa_kraj: kraj };
      if (mesto) fetchParams = { ...fetchParams, adresa_mesto: mesto };
      if (oblast) fetchParams = { ...fetchParams, adresa_oblast: oblast };
      fetchObjects();
    } else {
    }
  }, [router.query]);

  const [objektyCount, setObjektyCount] = useState(null);

  const countAllObjekty = async (queryParams) => {
    const count = await countObjekty({
      typ_objektu,
      ...queryParams,
    });
    setObjektyCount(count);
  };
  //
  // useEffect(() => {
  //   // getObjektyByParams(fetchParams);
  //   // setObjektyCount(() => countObjekty());
  //   countAllObjekty();
  // }, []);

  // const fetchObjects = () => {
  //   getObjektyByParams({
  //     ...fetchParams,
  //     kategorie_value: filter,
  //   });
  // };

  const paginate = async () => {
    /* await getObjektyByParams({
      ...fetchParams,
      method: "add",
      _start: next,
      _limit: limit,
    });
    setNext((prevState) => prevState + limit);*/
  };

  const filteredItems = () => {
    const regionQuery = new URLSearchParams(router.search).get("kategorie");
    const applyFilter = {
      kategorie_value: filter,
      adresa_kraj_value: kraj,
      adresa_mesto_value: mesto,
    };

    applyFilter.hlavni_kategorie = regionQuery
      ? regionQuery.includes(",")
        ? regionQuery.split(",")
        : regionQuery
      : kraj;

    let filtered = listObjects?.filter((objekt) => {
      for (let filterItem in applyFilter) {
        if (applyFilter[filterItem]) {
          // if (
          //   objekt[filterItem] !== undefined ||
          //   !objekt[filterItem]?.includes(applyFilter[filterItem])
          // ) {
          //   return false;
          // }
          switch (filterItem) {
            case "hlavni_kategorie":
            case "kategorie_value":
              if (typeof applyFilter[filterItem] === "string") {
                return (
                  objekt[filterItem] !== undefined &&
                  objekt[filterItem] === applyFilter[filterItem]
                );
              } else {
                return (
                  objekt[filterItem] &&
                  applyFilter[filterItem].indexOf(objekt[filterItem].key) >= 0
                );
              }
            case "kraj":
              return (
                objekt[filterItem] !== undefined &&
                objekt.adresa?.[filterItem]?.key === applyFilter[filterItem]
              );
            default:
              return true;
          }
        } else {
          return true;
        }
      }
    });

    // if (filtered) {
    //   filtered = filtered.map((objekt) => ({
    //     ...objekt,
    //     planIndex: createPlanIndex(objekt.druh_zapisu),
    //   }));
    //
    //   filtered.sort((a, b) => a.createdAt < b.createdAt);
    //
    //   filtered.sort((a, b) => a.planIndex < b.planIndex);
    //
    //   console.log(filtered);
    // }
    return filtered;
  };

  const renderFilterBadgeValue = (queryKey) => {
    let value;
    switch (queryKey) {
      case "kraj":
        value = objectToArray(enums.KRAJ).find(
          (kraj) => kraj.key === router.query[queryKey]
        ).value;
        value += " kraj";
        break;
      case "oblast":
        value = objectToArray(enums.REGION).find(
          (oblast) => oblast.key === router.query[queryKey]
        ).value;
        break;
      default:
        value = "";
    }

    return value;
  };

  const removeFilterValue = (key) => {
    const { query } = router;

    const queryKeys = Object.keys(query);

    const newKeys = queryKeys.filter((queryKey) => queryKey !== key);
    const newQuery = { ...newKeys.map((key) => ({ [key]: query[key] })) }[0];
    console.log("filtered keys", newQuery);

    router.push({
      pathname: router.pathname,
      query: newQuery,
    });
  };

  return !listObjects ? (
    <LoadingSkeleton />
  ) : (
    <div className="filtered-objects">
      {router.query && (
        <div className="filter–badges d-flex">
          {Object.keys(router.query).map((key) => (
            <span
              className={`filter-badge d-flex align-items-center bg-${translateColor(
                typ_objektu
              )}`}
              onClick={() => removeFilterValue(key)}
            >
              <IoClose className="icon" />
              {renderFilterBadgeValue(key)}
            </span>
          ))}
        </div>
      )}

      {listObjects
        ?.sort((a, b) => a.druh_zapisu - b.druh_zapisu)
        .map((objekt, index) => {
          const currentIndex = index === 0 ? 0 : index + 1;
          const selectIndex = (index - 3) / 4;

          return (
            <>
              <Objekt
                objekt={objekt}
                key={objekt.id}
                background={`${
                  (index + 1) % 2 === 0 && index > 0 ? "grey" : "white"
                }`}
              />
              {index > 0 &&
              (index + 1) % 4 === 0 &&
              promo &&
              promo.length > (index + 1) / 4 ? (
                <PromoArticle
                  article={promo[selectIndex]}
                  key={promo[selectIndex]?.id}
                  background="white"
                />
              ) : (
                ""
              )}
            </>
          );
        })}
      {objekty && objekty.length === 0 && objektyCount === 0 && (
        <p>Omlouvám se, ale tato kategorie neobsahuje žádné objekty.</p>
      )}
      {objekty?.length > 0 && objekty?.length < objektyCount && (
        <div className="d-flex justify-content-center">
          <button
            className={`btn bg-${
              typ_objektu === enums.TYP_OBJEKTU.zabava.key ? "orange" : "blue"
            } text-white`}
            onClick={paginate}
          >
            Načíst další
          </button>
        </div>
      )}
    </div>
  );
};

ListFilteredItems.propTypes = {
  objekty: PropTypes.array.isRequired,
};

export default ListFilteredItems;
