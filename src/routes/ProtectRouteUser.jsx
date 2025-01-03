/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import useStore from "../store/store";
import { currentUser } from "../api/auth";
import Loading from "./Loading";

const ProtectRouteUser = ({ element }) => {
  const [ok, setOk] = useState(false);
  const user = useStore((state) => state.user);
  const token = useStore((state) => state.token);

  useEffect(() => {
    const checkUser = async () => {
      if (user && token) {
        try {
          const res = await currentUser(token); // เรียกใช้งาน API
          console.log("Response from server:", res);
          setOk(true); 
        } catch (error) {
          console.error("Error checking user:", error);
          setOk(false); 
        }
      }
    };

    checkUser();
  }, [user, token]); // เพิ่ม dependencies เพื่อให้ useEffect ทำงานเมื่อ user หรือ token เปลี่ยน

  return ok ? element : <Loading />; 
};

export default ProtectRouteUser;
