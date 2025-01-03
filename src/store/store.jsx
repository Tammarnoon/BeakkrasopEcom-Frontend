import { create } from "zustand";
import axios from "axios";
import { persist, createJSONStorage } from "zustand/middleware";
import { listCategory } from "../api/category";
import { listProduct, searchFilter } from "../api/product";
import _ from "lodash";

const store = (set, get) => ({
  user: null,
  token: null,
  categories: [],
  products: [],
  carts: [],

  logout: () => {
    set({ user: null, token: null, categories: [], products: [], carts: [] });
  },

  actionAddToCart: (item) => {
    const carts = get().carts;
    const updateCart = [...carts, { ...item, count: 1 }];
    const unique = _.unionWith(updateCart, _.isEqual);

    set({ carts: unique });
  },

  actionUpdateQuantity: (productId, newQuantity) => {
    set((state) => ({
      carts: state.carts.map((item) =>
        item.id === productId
          ? { ...item, count: Math.max(1, newQuantity) }
          : item
      ),
    }));
  },

  actionRemoveProductonCart: (productId) => {
    set((state) => ({
      carts: state.carts.filter((item) => item.id !== productId),
    }));
  },

  getTotalPrice: () => {
    return get().carts.reduce((total, item) => {
      return total + item.price * item.count;
    }, 0);
  },

  actionLogin: async (form) => {
    //send to backend
    const res = await axios.post("https://beakkrasop-ecom-backend.vercel.app/api/login", form);

    //set data from backend
    set({
      user: res.data.payload,
      token: res.data.token,
    });
    return res;
  },

  getCategory: async () => {
    try {
      //send to backend
      const res = await listCategory();

      //set data from backend
      set({
        categories: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  },

  getProduct: async (count) => {
    try {
      //send to backend
      const res = await listProduct(count);

      //set data from backend
      set({
        products: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  },
  actionSearchFilter: async (arg) => {
    try {
      //send to backend
      const res = await searchFilter(arg);

      //set data from backend
      set({
        products: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  },

  clearCart: () => {
    set({ carts: [] });
  },
});

const useStore = create(
  persist(store, {
    name: "store",
    storage: createJSONStorage(() => localStorage),
  })
);

export default useStore;
