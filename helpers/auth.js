import axios from "axios";
export const loginUser = async (credentials) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/local`,
      credentials
    );

    // sessionStorage.setItem("auth-token", res.data.jwt);

    return res.data;
  } catch (error) {
    return { notFound: true, error };
  }
};
