import axios from "axios";

export const createProduct = async (token, form) =>
  await axios.post("https://beakkrasop-ecom-backend.vercel.app/api/product", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const listProduct = async (count = 20) =>
  await axios.get("https://beakkrasop-ecom-backend.vercel.app/api/products/" + count);

export const ReadProduct = async (token, id) =>
  await axios.get("https://beakkrasop-ecom-backend.vercel.app/api/product/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const DeleteProduct = async (token, id) =>
  await axios.delete("https://beakkrasop-ecom-backend.vercel.app/api/product/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const UpdateProduct = async (token, id, form) =>
  await axios.put("https://beakkrasop-ecom-backend.vercel.app/api/product/" + id, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const uploadImg = async (token, form) => {
  // console.log("🚀 ~ form:", form);
  return axios.post(
    "https://beakkrasop-ecom-backend.vercel.app/api/images",
    {
      image: form,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const removeImg = async (token, public_id) => {
  // console.log("🚀 ~ form:", form);
  return axios.post(
    "https://beakkrasop-ecom-backend.vercel.app/api/removeimages",
    {
      public_id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const searchFilter = async (arg) =>
  await axios.post("https://beakkrasop-ecom-backend.vercel.app/api/search/fillters", arg);

export const listProductBy = async (sort, oder, limit) =>
  await axios.post("https://beakkrasop-ecom-backend.vercel.app/api/productby", {
    sort,
    oder,
    limit,
  });
