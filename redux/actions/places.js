import {
  GET_ALL_CITIES,
  GET_ALL_CITIES_IN_REGION,
  GET_ALL_REGIONS,
  ALL_CITIES_ERROR,
  ALL_REGIONS_ERROR,
} from "./types";

import axios from "axios";
import { translateRegion } from "../helpers/translators";

export const getAllRegions = () => async (dispatch) => {
  try {
    const res = await axios.get(
      "https://api.teleport.org/api/countries/iso_alpha2%3ACZ/admin1_divisions/"
    );

    const fetchedRegions = res.data._links["a1:items"];
    const regions = [];

    for (let region of fetchedRegions) {
      const regionValueSplitted = region.href.split("/");
      const regionValue = regionValueSplitted[regionValueSplitted.length - 2];

      regions.push({
        value: regionValue,
        text: translateRegion(region.name),
      });
    }

    dispatch({ type: GET_ALL_REGIONS, payload: regions });
  } catch (err) {
    console.log(err);
    dispatch({ type: ALL_REGIONS_ERROR, payload: err });
  }
};

export const getCitiesInRegion = (regionCode) => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://api.teleport.org/api/countries/iso_alpha2%3ACZ/admin1_divisions/${regionCode}/cities`
    );

    const fetchedCities = res.data._links["city:items"];
    console.log(fetchedCities);
    let cities = [];

    for (let city of fetchedCities) {
      const regionValueSplitted = city.href.split("/");
      const cityValue = regionValueSplitted[regionValueSplitted.length - 2];

      cities.push({
        value: cityValue,
        text: city.name,
      });
    }

    cities.sort((a, b) => {
      return a.name > b.name ? 1 : -1;
    });

    dispatch({ type: GET_ALL_CITIES_IN_REGION, payload: cities });
  } catch (err) {
    dispatch({ type: ALL_CITIES_ERROR, payload: err });
  }
};
