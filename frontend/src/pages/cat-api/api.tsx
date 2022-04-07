import axios from "axios";
import { Category } from "../../interfaces";

const API_URL = "/api/cats/";

export const getCats = async () => {
  const res = await axios.get(API_URL);

  return res.data;
};

export const setCat = async (cat: Category) => {
  const res = await axios.post(API_URL, cat);

  return res.data;
};
