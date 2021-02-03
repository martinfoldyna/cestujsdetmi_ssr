import enums from "../enums";
import axios from "axios";
import { parseString } from "xml2js";
import { parseXml } from "./helpers";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchQuery = async (path, params = null, apiUrl = baseUrl) => {
  try {
    let url;
    if (params !== null) {
      url = `${apiUrl}/${path}/${params}`;
    } else {
      url = `${apiUrl}/${path}`;
    }

    const response = await fetch(`${url}`);
    console.log(response);
    const data = await response.json();
    return data;
    // return "";
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const fetchXML = async (path, params = null) => {
  try {
    let url;
    if (params !== null) {
      url = `http://localhost:3333/api/${path}/${params}`;
    } else {
      url = `http://localhost:3333/api/${path}`;
    }

    const response = await fetch(`http://localhost:3333/api/fetchPrevio`);
    const data = await response.text();
    const dataAsJson = await parseXml(data);
    return dataAsJson;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const fetchAllPrevioHotels = async (limit = 10) => {
  try {
    const xmlSring = `<?xml version="1.0"?>
      <request>
        <login>${process.env.NEXT_PUBLIC_PREVIO_LOGIN}</login>
        <password>${process.env.NEXT_PUBLIC_PREVIO_PASSWORD}</password>
        <limit><limit>${limit}</limit></limit>
        <filter>
          <in>
              <field>collaboration</field>
              <value>active</value>
          </in>
          <in>
              <field>couId</field>
              <value>1</value>
          
          </in>
        </filter>
        <order>
            <by>name</by>
            <desc>false</desc>
        </order>
      </request>`;

    // Previo api call, to allow CORS in development add cors-anywhere domain before previo url
    const response = await axios.post(
      `${
        process.env.NODE_ENV === "development"
          ? "https://cors-anywhere.herokuapp.com/"
          : ""
      }${process.env.NEXT_PUBLIC_PREVIO_API_URL}/hotels/search`,
      xmlSring,
      {
        headers: {
          "Content-Type": "text/xml",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          "x-requested-with": "localhost:3333",
        },
      }
    );

    // Conver xml string to JSON
    const jsonData = await parseXml(response.data);
    // const results = await Promise.all(
    //   jsonData.hotels.hotel.map(async (hotel) => {
    //     const photogallery = await fetchPrevio("hotel/getPhotogalleries", {
    //       hotId: hotel.hotId,
    //     });
    //
    //     return {
    //       ...hotel,
    //       gallery: photogallery.data.photogalleries?.gallery.find(
    //         (gallery) => gallery.profile === "true"
    //       )?.photos?.photo,
    //     };
    //   })
    // );

    // console.log("previo", results);

    return { success: true, data: jsonData.hotels.hotel };
  } catch (err) {
    console.log(err);
  }
};

export const fetchPrevio = async (
  path,
  params = null,
  xml = "",
  listCollaborative
) => {
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
        ${
          listCollaborative
            ? `<filter>
                <in>
                    <field>collaboration</field>
                    <value>active</value>
                </in>
            </filter>`
            : ""
        }
        <lanId>1</lanId>
      </request>`;

    // Previo api call, to allow CORS in development add cors-anywhere domain before previo url
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_PREVIO_API_URL}/${path}`,
      xmlSring,
      {
        headers: {
          "Content-Type": "text/plain",
          "Access-Control-Allow-Origin": "*",
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

export const fetcLoaclApi = async (path) => {
  let url = `${process.env.NEXT_PUBLIC_LOCAL_API_ROUTE}/${path}`;
  console.log(url);
  const response = await fetch(`${url}`);
  const data = await response.json();

  return data;
};
