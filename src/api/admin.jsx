import axios from "axios";

export const getOrderAdmin = async (token) =>
  await axios.get(
    "https://beakkrasop-ecom-backend.vercel.app/api/admin/orders",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const changeOrderStatus = async (token, orderId, orderStatus) =>
  await axios.put(
    "https://beakkrasop-ecom-backend.vercel.app/api/admin/order-status",
    { orderId, orderStatus },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const getUser = async (token) =>
  await axios.get("https://beakkrasop-ecom-backend.vercel.app/api/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const changeUserStatus = async (token, value) =>
  await axios.post(
    "https://beakkrasop-ecom-backend.vercel.app/api/change-status",
    value,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const changeUserRole = async (token, value) =>
  await axios.post(
    "https://beakkrasop-ecom-backend.vercel.app/api/change-role",
    value,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );


