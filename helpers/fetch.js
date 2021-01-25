import enums from "../enums";

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
    return err;
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
