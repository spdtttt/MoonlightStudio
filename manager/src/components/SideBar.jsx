import React from "react";
import "../App.css";
import { SideBarData } from "./SideBarData";
import { useNavigate, useLocation } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-70 h-screen background-container">
      <ul className="SidebarList">
        {SideBarData.map((val, key) => {
          return (
            <li key={key} 
            id={location.pathname === val.link ? 'active' : ''} 
            className="row" 
            onClick={() => navigate(val.link)}>
                {" "}
                <div id="icon">{val.icon}</div>{" "}
                <div id="title">
                    {val.title}
                </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideBar;
