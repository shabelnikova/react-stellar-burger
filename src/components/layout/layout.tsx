import React from 'react';
import AppHeader from "../app-header/app-header";
import {Outlet} from "react-router-dom";

const Layout = () => {
  return (
    <>
     <AppHeader/>
     <div>
       <Outlet/>
     </div>
    </>
  );
};

export default Layout;