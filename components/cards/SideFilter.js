import { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Col, Row } from "react-grid-system";
import CustomSelect from "../form/CustomSelect";
import { useRouter } from "next/router";
import Link from "next/link";
import enums from "../../enums";
import CustomDateRangePicker from "../form/CustomDateRangePicker";
import Checkbox from "../form/Checkbox";
import { fetchQuery } from "../../helpers/fetch";
import e from "cors";

const SideFilter = ({
  color,
  // getCategories,
  topic,
  kraje,
  mesta,
  kategorie,
  oblasti,
  dateRange = false,
  fullPadding = false,
  beSticky = true,
}) => {
  const [filteredCities, setFilteredCities] = useState(mesta);
  const [filteredOblasts, setFilteredOblasts] = useState(oblasti);
  const [filteredKrajs, setFilteredKrajs] = useState(kraje);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedOblast, setSelectedOblast] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const router = useRouter();
  const { query } = router;
  let cityParams = {};

  const cancelFilter = (e) => {
    if (e.target.classList.contains("selected")) {
      e.target.classList.remove("selected");
      router.push(router.pathname);
    }
  };

  useEffect(() => {
    console.log(kraje);

    const queryKeys = Object.keys(query);
    if (queryKeys.length > 0) {
      if (query.oblast && !selectedOblast) {
        const foundOblast = oblasti.find(
          (oblast) => oblast.key === query.oblast
        );
        setSelectedOblast(foundOblast);
      }
    }
  }, [router.query]);

  const queryParams = () => {
    return new URLSearchParams(router.search);
  };

  const onKrajChange = async (e) => {
    const foundKraj = kraje.find((kraj) => kraj.key === e.key);
    const dbOblast = await fetchQuery(
      `oblasts-woobjectswkrajs?kraj=${foundKraj._id}`
    );
    const cities = await fetchQuery(`mestos?kraj_id=${foundKraj.old_id}`);
    console.log(cities);
    setFilteredOblasts(dbOblast);
    setSelectedRegion(foundKraj);
    setFilteredCities(cities);
    cityParams.kraj = foundKraj._id;
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
    console.log(city);
  };

  const onOblastSelect = async (e) => {
    const foundOblast = oblasti.find((oblast) => oblast.key === e.key);
    const dbKraje = await fetchQuery(
      `krajs-woobjectswoblasts?oblast=${foundOblast._id}`
    );
    setFilteredKrajs(dbKraje);
    setSelectedOblast(foundOblast);
    cityParams.oblast = foundOblast._id;

    router.push({
      pathname: router.pathname,
      query: { ...router.query, ...{ oblast: foundOblast.key } },
    });
  };

  // Add search query parameter to URL
  const onCategorySelect = (category) => {
    router.push({
      pathname: `/${topic.url}/[filterKategorie]`,
      query: {
        filterKategorie: category.hodnota,
      },
    });
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

  return (
    <div
      className={`filter-card ${
        fullPadding ||
        !kategorie ||
        !kategorie?.some((categoryItem) => categoryItem.urceni === topic.key)
          ? "full-padding"
          : ""
      } bg-white`}
    >
      {/* <Waypoint onEnter={() => setSticky(true)} /> */}

      <Row className='m-0'>
        <Col md={6} lg={12} className='col p-0'>
          <div className='selects'>
            <p className='filter-name'>Vyberte lokalitu</p>
            <Row>
              <Col md={12}>
                <CustomSelect
                  options={filteredKrajs}
                  onChange={(kraj) => onKrajChange(kraj)}
                  placeholder='Kraj'
                  color={color}
                  value={
                    router.query.kraj
                      ? filteredKrajs.find(
                          (kraj) => kraj.key === router.query.kraj
                        )
                      : null
                  }
                />
              </Col>
            </Row>
            <Row className='m-0'>
              <Col md={12} className='p-0'>
                <CustomSelect
                  options={filteredCities}
                  onChange={(city) => onCitySelect(city)}
                  placeholder='Mesto'
                  color={color}
                  value={
                    router.query.mesto
                      ? filteredCities.find(
                          (mesto) => mesto.key === router.query.mesto
                        )
                      : null
                  }
                />
              </Col>
            </Row>
            <Row className='m-0'>
              <Col md={12} className='p-0'>
                <CustomSelect
                  options={filteredOblasts}
                  onChange={onOblastSelect}
                  placeholder='Oblast'
                  color={color}
                  value={
                    router.query.oblast
                      ? filteredOblasts.find(
                          (oblast) => oblast.key === router.query.oblast
                        )
                      : null
                  }
                />
              </Col>
            </Row>
            {/* {(selectedCity !== null || selectedRegion !== null) && (
              <Link
                href='#'
                onClick={() => {
                  setSelectedRegion(null);
                  setSelectedCity(null);
                }}
                className='text-blue'
              >
                Zrušit filtry
              </Link>
            )} */}
          </div>
        </Col>
        <Col lg={12} className='col p-0'>
          <div className='selects pt-0'>
            {dateRange && (
              <div className='date-range-picker'>
                <p className='filter-name'>Vyberte termín</p>
                <CustomDateRangePicker />
              </div>
            )}
          </div>
        </Col>
        <Col className='col p-0'>
          {kategorie &&
            kategorie.find(
              (categoryItem) => categoryItem.urceni === topic?.key
            ) && (
              <div className='categories'>
                <p className='filter-name'>Kategorie</p>
                <ul className='categories-list list-style-none p-0 mb-0'>
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
                          {/* <Link
                            href={{
                              pathname: `/${topic.url}/[filterKategorie]`,
                              query: {
                                filterKategorie: categoryItem.hodnota,
                              },
                            }}
                          >
                            {categoryItem.nazev}
                          </Link> */}
                          <Checkbox
                            text={categoryItem.nazev}
                            name='kategorie'
                            value={categoryItem.hodnota}
                            type={enums.CHECKBOX.radio}
                            onChange={() => onCategorySelect(categoryItem)}
                          />
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
