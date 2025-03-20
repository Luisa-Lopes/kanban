import React from "react";
import Sidebar from "../Components/SideBar";
import { Header } from "../Components/Header";

const Home = () => {
    return (
        <div className="relative flex flex-col w-screen">
            <Sidebar />
            <Header />
        </div>
    );
};

export default Home;
