import { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Col, Row } from "react-grid-system";
import CustomSelect from "../form/CustomSelect";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import { objectToArray } from "../../helpers/helpers";
import enums from "../../enums";
import CustomDateRangePicker from "../form/CustomDateRangePicker";

const SideFilter = ({
  color,
  kategorie = [],
  // getCategories,
  topic,
  dateRange = false,
  fullPadding = false,
}) => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const beautifiedKraj = objectToArray(enums.KRAJ);
  const beautifiedRegion = objectToArray(enums.REGION);
  const router = useRouter();

  useEffect(() => {
    console.log(kategorie);
  }, [kategorie]);

  const cancelFilter = (e) => {
    if (e.target.classList.contains("selected")) {
      e.target.classList.remove("selected");
      router.push(router.pathname);
    }
  };

  const queryParams = () => {
    return new URLSearchParams(router.search);
  };

  const onRegionsSelect = (param) => {
    // const query = queryParams();

    const paramKey = Object.keys(param);
    setSelectedRegion(param[paramKey]);

    let query =
      Object.keys(router.query).length > 0
        ? { ...router.query, [paramKey]: param[paramKey] }
        : { [paramKey]: param[paramKey] };

    router.push({
      pathname: router.pathname,
      query,
    });
  };

  const onCitySelect = (city) => {
    const query = queryParams();

    const queryString = `${
      query && (query.includes("?") || query.includes("=")) ? "&" : "?"
    }mesto=`;
  };

  // Add search query parameter to URL
  const onCategorySelect = (category) => {
    const query = queryParams();

    // List value of "kategorie" query string
    const categoryQuery = query.get("kategorie");

    if (
      categoryQuery?.length === 0 ||
      !categoryQuery?.includes(category.hodnota)
    ) {
      // Check if if a) query parameter is empty or b) if the value is already added.
      router.push({
        pathname: router.url,
        search: `?kategorie=${categoryQuery ? `${categoryQuery},` : ""}${
          category.hodnota
        }`,
      });
    } else {
      // If value is already contained in query string, remove it -> Checkbox like functionality

      // Check if there are more values in query
      const splittedQuery =
        categoryQuery.includes(",") && categoryQuery.split(",");

      // If there are more values filter out the to be removed one and then stringify
      // If just one value remove whole query string
      const queryString = splittedQuery
        ? splittedQuery
            .filter((param) => {
              if (param !== category.hodnota) {
                return param;
              }
            })
            .join(",")
        : categoryQuery.replace(category.hodnota, "");
      router.push({
        pathname: router.url,
        search: queryString?.length > 0 && `?kategorie=${queryString}`,
      });
    }
  };

  const findInParam = (paramValue) => {
    const paramsString = new URLSearchParams(router.search).get(paramValue);
    let returnValue;
    if (paramsString && paramsString.length > 0 && paramsString.contains(",")) {
      returnValue = paramsString.split(",");
    } else {
      returnValue = [paramsString];
    }

    return returnValue;
  };

  useEffect(() => {
    if (router.query) {
      console.log(router.query);
      console.log(
        beautifiedKraj.find((kraj) => kraj.key === router.query.kraj)
      );
    }
  }, [router.query]);

  return (
    <div
      className={`filter-card ${
        fullPadding ||
        !kategorie ||
        !kategorie?.some((categoryItem) => categoryItem.urceni === topic.key)
          ? "full-padding"
          : ""
      } ${color ? `bg-light-${color}` : "bg-grey"}`}
    >
      <Row className="m-0">
        <Col md={6} lg={12} className="col p-0">
          <div className="selects">
            <p className="filter-name">Vyberte lokalitu</p>
            <Row>
              <Col md={12}>
                <CustomSelect
                  options={beautifiedKraj}
                  onChange={(kraj) => onRegionsSelect({ kraj: kraj.key })}
                  placeholder="Kraj"
                  color={color}
                  value={
                    router.query.kraj
                      ? beautifiedKraj.find(
                          (kraj) => kraj.key === router.query.kraj
                        )
                      : null
                  }
                />
              </Col>
            </Row>
            <Row className="m-0">
              <Col md={12} className="p-0">
                <CustomSelect
                  options={beautifiedRegion}
                  onChange={(oblast) => onRegionsSelect({ oblast: oblast.key })}
                  placeholder="Oblast"
                  color={color}
                  value={router.query.oblast}
                />
              </Col>
            </Row>
            {(selectedCity !== null || selectedRegion !== null) && (
              <Link
                href="#"
                onClick={() => {
                  setSelectedRegion(null);
                  setSelectedCity(null);
                }}
                className="text-blue"
              >
                Zrušit filtry
              </Link>
            )}
          </div>
        </Col>
        <Col lg={12} className="col p-0">
          <div className="selects pt-0">
            {dateRange && (
              <div className="date-range-picker">
                <p className="filter-name">Vyberte termín</p>
                <CustomDateRangePicker />
              </div>
            )}
          </div>
        </Col>
        <Col className="col p-0">
          {kategorie &&
            kategorie.find(
              (categoryItem) => categoryItem.urceni === topic.key
            ) && (
              <div className="categories">
                <p className="filter-name">Kategorie</p>
                <ul className="categories-list list-style-none p-0 mb-0">
                  {kategorie.map(
                    (categoryItem) =>
                      categoryItem.urceni === topic.key && (
                        <li
                          className={`d-flex justify-content-between align-items-center ${color} ${
                            router.pathname.split("/").pop() ===
                            categoryItem.hodnota
                              ? "selected"
                              : ""
                          }`}
                          key={categoryItem.id}
                        >
                          <Link
                            href={{
                              pathname: `/${topic.url}/[filterKategorie]`,
                              query: { filterKategorie: categoryItem.hodnota },
                            }}
                          >
                            {categoryItem.nazev}
                          </Link>
                          {/*<Checkbox*/}
                          {/*  text={categoryItem.nazev}*/}
                          {/*  name={categoryItem.hodnota}*/}
                          {/*  value={categoryItem.hodnota}*/}
                          {/*  type={enums.CHECKBOX.checkbox}*/}
                          {/*  checked={new URLSearchParams(router.search)*/}
                          {/*    .get("kategorie")*/}
                          {/*    ?.includes(categoryItem.hodnota)}*/}
                          {/*  onChange={() => onCategorySelect(categoryItem)}*/}
                          {/*/>*/}
                        </li>
                      )
                  )}
                </ul>
              </div>
            )}
        </Col>
      </Row>
    </div>
  );
};

SideFilter.propTypes = {
  kategorie: PropTypes.array,
  getCategories: PropTypes.func,
};

const mapStateToProps = (state) => ({
  kategorie: state.objekty?.kategorie,
});

export default SideFilter;
