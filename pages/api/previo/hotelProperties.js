import Cors from "cors";
import initMiddleware from "../../../helpers/api/init-middleware";
import { fetchPrevio } from "../../../helpers/fetch";

const cors = initMiddleware(Cors({ methods: ["GET", "POST", "OPTIONS"] }));

export default async (req, res) => {
  await cors(req, res);

  const response = await fetchPrevio("system/getHotelProperties");
  res.json(response);
};
