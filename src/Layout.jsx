import { Outlet } from "react-router-dom";
import Header from "./Componets/header/Header";
import Sidebar from "./Componets/sidebar/Sidebar";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Layout = () => {
  return (
    <div className='flex flex-col  overflow-x-hidden "overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"'>
      <Header />
      <div className="container-fluid w-100 d-flex">
        <div className="left-side">
          <Sidebar />
        </div>
        <div className="right-side">
          <main className=" overflow-x-hidden">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default Layout;
