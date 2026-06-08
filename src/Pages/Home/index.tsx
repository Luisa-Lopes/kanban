import React from "react";
import Sidebar from "../Components/SideBar";
import { Header } from "../Components/Header";
import work from "../../assets/work.jpg";
import group from "../../assets/group.jpg";
import Button from "../Components/Button";

const Home = () => {
  return (
    <div className="relative flex flex-col w-screen">
      <Sidebar />
      <Header />

      <section className="flex p-5 ">
        <div className="grid grid-cols-1 md:grid-cols-3  lg:grid-cols-5 gap-4 p-5 bg-blue-50 rounded-lg"></div>
      </section>
    </div>
  );
};

export default Home;
