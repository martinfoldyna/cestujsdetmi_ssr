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

export const fetchPrevio = async (path, params = null) => {
  try {
    const xmlifyParams = (params) => {
      let xmlString = "";
      console.log(params);
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
    const xmlSring = `<?xml version="1.0"?>
      <request>
        <login>${process.env.NEXT_PUBLIC_PREVIO_LOGIN}</login>
        <password>${process.env.NEXT_PUBLIC_PREVIO_PASSWORD}</password>
        ${params ? xmlifyParams(params) : ""}
      </request>`;
    console.log(xmlSring);
    const response = await axios.post(
      `http://api.previo.cz/x1/${path}`,
      xmlSring,
      { headers: { "Content-Type": "text/xml" } }
    );

    const jsonData = await parseXml(response.data);

    return { success: true, data: jsonData.hotels };
  } catch (err) {
    console.log(err);
    throw err;
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
