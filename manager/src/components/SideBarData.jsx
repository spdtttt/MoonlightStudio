import React from 'react';
import { IoPersonSharp } from "react-icons/io5";
import { HiBookOpen } from "react-icons/hi2";

export const SideBarData = [
    {
        title: "Stylists",
        icon: <IoPersonSharp />,
        link: '/stylists'
    },
    {
        title: "Booked",
        icon: <HiBookOpen />,
        link: '/booked'
    }
];