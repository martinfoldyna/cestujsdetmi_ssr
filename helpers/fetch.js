import enums from "../enums";
import axios from "axios";
import { parseString } from "xml2js";
import { parseXml } from "./helpers";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchQuery = async (path, params = null) => {
  try {
    let url;
    if (params !== null) {
      url = `${baseUrl}/${path}/${params}`;
    } else {
      url = `${baseUrl}/${path}`;
    }

    const response = await fetch(`${url}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const fetchPrevio = async (path, params = null, xml = "") => {
  try {
    const xmlifyParams = (params) => {
      let xmlString = "";
      for (let param in params) {
        if (typeof params[param] === "object") {
          xmlString += `<${param}>`;
          for (let subParam in params[param]) {
            xmlString += `<${subParam}>${params[param][subParam]}</${subParam}>`;
          }
          xmlString += `</${param}>`;
        } else {
          xmlString += `<${param}>${params[param]}</${param}>`;
        }
      }

      return xmlString;
    };

    // XML request
    const xmlSring = `<?xml version="1.0"?>
      <request>
        <login>${process.env.NEXT_PUBLIC_PREVIO_LOGIN}</login>
        <password>${process.env.NEXT_PUBLIC_PREVIO_PASSWORD}</password>
        ${params ? xmlifyParams(params) : ""}
        ${xml ? xml : ""}
      </request>`;

    // Previo api call, to allow CORS in development add cors-anywhere domain before previo url
    const response = await axios.post(
      `${
        process.env.NODE_ENV === "development"
          ? "https://cors-anywhere.herokuapp.com/"
          : ""
      }${process.env.NEXT_PUBLIC_PREVIO_API_URL}/${path}`,
      xmlSring,
      {
        headers: {
          "Content-Type": "text/xml",
          "Access-Control-Allow-Origin": "*",
          origin: "http://localhost:3000",
        },
      }
    );

    // Conver xml string to JSON
    const jsonData = await parseXml(response.data);

    return { success: true, data: jsonData };
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const fetchObjekty = async () => {
  return await fetchQuery(
    `${enums.URLS.objektInfoMini}?_sort=druh_zapisu:DESC,createdAt:DESC`
  );
};

export const fetchPromo = async (setState) => {
  const fetchedPromo = await fetchQuery(`rady-a-tipies?promo=true`);

  console.log("promo", fetchedPromo);

  setState(fetchedPromo);
};

export const getMedia = (media) => {
  const imageUrl = media.url.startsWith("/")
    ? fetchQuery(media.url)
    : media.url;
  return imageUrl;
};
