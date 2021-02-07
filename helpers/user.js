import axios from "axios";
import { fetchQuery } from "./fetch";
import { useSession } from "next-auth/client";

export const addToFavorite = async ({ localId, externalObject, user }) => {
  try {
    console.log(user.oblibene);
    console.log(localId);

    const requestBody = {};

    if (localId) {
      requestBody.oblibene = user.oblibene
        ? user.oblibene.length !== 0
          ? [...user.oblibene, localId]
          : [localId]
        : [localId];
    }

    if (externalObject) {
      const { hotId, name, origin, descriptions } = externalObject;

      const finalExternalObject = {
        hotId,
        name,
        origin,
        shortDescription: descriptions.shortDescription,
      };
      requestBody.oblibene_externi = user.oblibene_externi
        ? user.oblibene_externi.length !== 0
          ? [...user.oblibene_externi, finalExternalObject]
          : [finalExternalObject]
        : [finalExternalObject];
    }

    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/verejni-uzivateles/addToFavorite/${user.email}`,
      requestBody
    );

    console.log(response);
    return { error: null, data: response.data };
  } catch (error) {
    console.log(error);
    return { error, data: null };
  }
};

/**
 * Removes hotel from user's favorite objects
 * @param {string} localId ID of cestujsdetmi's object
 * @param {object} user
 * @param {string} hotId
 * @returns {Promise<{data: any, error: null}|{data: null, error}>} Error object if any and response data of removed object
 */
export const removeFromFavorite = async ({ localId, user, hotId }) => {
  try {
    console.log("user", user);
    console.log(localId);

    const requestBody = {};

    if (localId) {
      requestBody.localId = localId;
    }
    if (hotId) {
      requestBody.hotId = hotId;
    }

    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/verejni-uzivateles/removeFavorite/${user.email}`,
      requestBody
    );

    console.log(response);
    return { error: null, data: response.data };
  } catch (error) {
    console.log(error);
    return { error, data: null };
  }
};

export const createUser = async (user) => {
  try {
    const newUser = {
      email: user.email,
    };

    const findUser = await fetchQuery(
      `verejni-uzivateles?email=${newUser.email}`
    );

    console.log(findUser);

    if (!findUser || findUser.length === 0) {
      console.log("user not found");

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/verejni-uzivateles`,
        newUser,
        { headers: { "Content-Type": "application/json" } }
      );

      return { userExists: true, error: null, user: response.data };
    } else {
      console.log("USER found");
      return { userExists: true, error: null };
    }
  } catch (error) {
    return { userExists: false, error };
  }
};
