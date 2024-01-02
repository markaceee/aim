import React, { useEffect, useState } from "react";
import DashboardWhite from "../../assets/svg/dashboard-white.svg";
import { sidebarData } from "../../data/sidebarData";
import SidebarIcon from "./SidebarIcon";

import { useNavigate } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";

const SidebarItem = ({ title, icon, route, setDoucmentTitle }) => {
  const navigate = useNavigate();
  return (
    <li
      onClick={() => {
        navigate(route);
        setDoucmentTitle(title);
      }}
      className="flex justify-center md:justify-start items-center p-2 pl-3 hover:bg-slate-400 hover:cursor-pointer"
    >
      <span>
        <SidebarIcon iconName={icon} />
      </span>
      <p className=" text-sm pl-3 hidden md:block">{title}</p>
    </li>
  );
};

const Sidebar = () => {
  const [document_title, setDoucmentTitle] = useState("Dashboard");
  useEffect(() => {
    document.title = document_title;
  }, [document_title]);

  return (
    <div className="sidebar w-60 bg-slate-200 text-slate-950 h-full">
      <ul className=" bg-[#F0F0F0] h-full">
        <Link
          to={"/dashboard"}
          onClick={() => {
            setDoucmentTitle("Dashboard");
          }}
        >
          <li className="flex gap-2 sm:justify-left items-center p-2 pl-3 bg-gradient-to-b from-[#576380] to-[#404D6C] text-slate-50">
            <span>
              <img
                src={DashboardWhite}
                alt="dashboard-icon"
                className=" max-w-none h-6 sm:h-8"
              />
            </span>
            <p className="text-xs hidden md:block">
              CONTROL PANEL
            </p>
          </li>
        </Link>
        <Link
          to={"/"}
          onClick={() => {
            setDoucmentTitle("Test");
          }}
        >
          <li className="text-center md:text-left text-sm text-blue-600 p-2 pl-3 ">
            Go to contents menu
          </li>
        </Link>
        {sidebarData.map((item) => (
          <SidebarItem
            key={item.id}
            title={item.title}
            icon={item.icon}
            route={item.route}
            setDoucmentTitle={setDoucmentTitle}
          />
        ))}
        <Link
          to={"/"}
          onClick={() => {
            setDoucmentTitle("Test");
          }}
        >
          <li className=" text-center md:text-left text-sm text-blue-600 p-2">
            Aim Coin Management
          </li>
        </Link>
        <Link
          to={"/"}
          onClick={() => {
            setDoucmentTitle("Test");
          }}
        >
          <li className=" text-center md:text-left text-sm text-blue-600 p-2">
            Portfolio
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
