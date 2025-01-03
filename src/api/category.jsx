import axios from "axios";

export const createCategory = async (token, form) =>
  await axios.post("https://beakkrasop-ecom-backend.vercel.app/api/category", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const listCategory = async () =>
  await axios.get("https://beakkrasop-ecom-backend.vercel.app/api/category");

export const removeCategory = async (token, id) =>
  await axios.delete("https://beakkrasop-ecom-backend.vercel.app/api/category/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
