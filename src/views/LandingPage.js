import React from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

import Header from "../components/Header";

const LandingPage = () => {

  return (
    <div className="base">
      <Header />
      <Outlet />
    </div>
  )
};

export default LandingPage;