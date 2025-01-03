/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import useStore from "../store/store";
import { currentAdmin } from "../api/auth";
import Loading from "./Loading";

const ProtectRouteAdmin = ({ element }) => {
  const [ok, setOk] = useState(false);
  const user = useStore((state) => state.user);
  const token = useStore((state) => state.token);

  useEffect(() => {
    const checkAdmin = async () => {
      if (user && token) {
        try {
          const response = await currentAdmin(token); // เรียกใช้งาน API
          console.log("Response from server:", response);
          setOk(true);
        } catch (error) {
          console.error("Error checking user:", error);
          setOk(false);
        }
      }
    };

    checkAdmin();
  }, [user, token]); // เพิ่ม dependencies เพื่อให้ useEffect ทำงานเมื่อ user หรือ token เปลี่ยน

  return ok ? element : <Loading />;
};

export default ProtectRouteAdmin;
