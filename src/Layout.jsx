import { Outlet } from "react-router-dom";
import Header from "./Componets/header/Header";
import Sidebar from "./Componets/sidebar/Sidebar";

const Layout = () => {
  return (
    <div className='flex flex-col  overflow-x-hidden "overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"'>
      <Header />
      <div className="row">
        <div className="col-md-3 border">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <main className=" overflow-x-hidden">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
