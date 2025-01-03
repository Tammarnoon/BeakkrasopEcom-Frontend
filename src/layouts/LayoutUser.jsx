import { Outlet } from "react-router-dom";
import MainNav from "../components/MainNav";

const LayoutUser = () => {
  return (
    <div>
      <MainNav />
      <hr />
      <Outlet />
    </div>
  );
};

export default LayoutUser;
