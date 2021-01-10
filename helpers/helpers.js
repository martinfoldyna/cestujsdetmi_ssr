import { transalteDiacChar } from "./translators";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { fetchQuery } from "./fetch";
import enums from "../enums";

/** Moves item in array up or down
 * @param arr
 * @param old_index
 * @param new_index
 * @returns {array}
 */
export const arrayMove = (arr, old_index, new_index) => {
  if (old_index < arr.length) {
    arr.splice(old_index + new_index, 0, arr.splice(old_index, 1).pop());
    arr.map((item, index) => {
      console.log("item", item);
      console.log("index", index);
      return {
        ...item,
        id: index,
      };
    });
  }
  console.log(arr);
  return arr;
};

/** Converts enum object key-value pair to array of key-values
 * @example
 * @param enumObj
 * @returns {array}
 */
export const objectToArray = (enumObj) => {
  const keys = Object.keys(enumObj);
  let finalEnum = [];
  for (let key of keys) {
    finalEnum.push(enumObj[key]);
  }
  return finalEnum;
};

/** Check if value is type number by regex
 * @param value
 * @returns {boolean}
 */
export const isNumber = (value) => {
  return /^\d+$/.test(value);
};

/** Converts url, that contains diacritic to non diacritic url
 * @param {string} string
 * @returns {string}
 * @example čeština.cz -> cestina.cz
 */
export const friendlyUrl = (string) => {
  let nonDiacString = "";
  const lowerCaseString = string.toLowerCase();
  for (let i = 0; i < lowerCaseString.length; i++) {
    nonDiacString +=
      typeof lowerCaseString.charAt(i) != "undefined" &&
      transalteDiacChar(lowerCaseString.charAt(i));
  }
  console.log(nonDiacString);
  return nonDiacString.replace(/[^a-z0-9_]+/g, "-").replace(/^-|-$/g, "");
};

/**
 * Shorten string by given number of words
 * @param {string} string
 * @param {number} words_number
 * @returns {string}
 */
export const trimString = (string, words_number = 21) => {
  // create element where html string will be stored
  // const span = document.createElement("span");
  // // set html string as innerHTML
  // span.innerHTML = string;
  // // retrieve text content of html element
  // const text = span.textContent || span.innerText;
  // const splittedText = text.split(" ");
  // const slicedString = splittedText.slice(0, words_number).join(" ");
  // // Check if string ends by letter -> if not remove last character
  // return /^[á-ža-z0-9]/i.test(slicedString[slicedString.length - 1])
  //   ? slicedString
  //   : slicedString.slice(0, -1);
  const deHtmlString = string.replace(/<[^>]*>?/gm, "");
  const splittedText = deHtmlString.split(" ");
  const slicedString = splittedText.slice(0, words_number).join(" ");
  // Check if string ends by letter -> if not remove last character
  return /^[á-ža-z0-9]/i.test(slicedString[slicedString.length - 1])
    ? slicedString
    : slicedString.slice(0, -1);
};

/**
 * Converts object params to query string for API calls
 * @param {Object} object
 * @returns {string}
 */
export const objectToQueryString = (object) => {
  if (typeof object === "object") {
    let returnString = "";
    const paramKeys = Object.keys(object);
    for (let paramKey of paramKeys) {
      if (paramKey !== "method") {
        returnString += returnString.length !== 0 ? "&" : "";
        const paramItem = object[paramKey];
        if (typeof paramItem === "string" || typeof paramItem === "number") {
          returnString += `${paramKey}=${paramItem}`;
        } else if (Array.isArray(paramItem)) {
          let arrayString = "";
          paramItem.forEach((item) =>
            arrayString.length === 0
              ? (arrayString += item)
              : (arrayString += `,${item}`)
          );
          returnString += `${paramKey}=${arrayString}`;
        } else {
          console.log("Not supported type");
        }
      }
    }
    return returnString;
  } else {
    return "";
  }
};

export const initCategories = async () => {};
