import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import LoadingSkeleton from "../layouts/LoadingSkeleton";
import Article from "./cards/Article";
import { countObjekty, getObjektyByParams } from "../redux/actions/objekty";
import enums from "../enums";

const ListFilteredItems = ({ objekty, typ_objektu }) => {
  const router = useRouter();
  const { filter, kraj, mesto, oblast } = router.query;

  const limit = 4;
  const [next, setNext] = useState(limit);
  const fetchParams = {
    typ_objektu,
    _limit: limit,
    _start: 0,
  };

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
    await getObjektyByParams({
      ...fetchParams,
      method: "add",
      _start: next,
      _limit: limit,
    });
    setNext((prevState) => prevState + limit);
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

    let filtered = objekty?.filter((objekt) => {
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

  useEffect(() => {
    console.log(filter);
    if (
      !objekty ||
      !objekty.some((objekt) => objekt.kategorie_value === typ_objektu)
    ) {
      getObjektyByParams({ ...fetchParams, kategorie_value: filter });
    }
    countAllObjekty({ kategorie_value: filter });
  }, [filter, mesto, kraj, oblast]);

  return !objekty ? (
    <LoadingSkeleton />
  ) : (
    <div className="filtered-objects">
      {objekty?.map((objekt, index) => (
        <div key={objekt.id}>
          <Article
            article={objekt}
            background={`${(index + 1) % 2 === 0 && index > 0 && "grey"}`}
          />
        </div>
      ))}
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
  objekty: PropTypes.object.isRequired,
  getObjektyByParams: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  objekty: state.objekty,
});

export default ListFilteredItems;
