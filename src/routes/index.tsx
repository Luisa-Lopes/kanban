import React, { Fragment } from "react";
import Signin from "../Pages/Signin";
import Signup from "../Pages/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import useAuth from "../hooks/userAuth";
import Projects from "../Pages/Projetos";
import Home from "../Pages/Home";
import ProjectsDetails from "../Pages/ProjectDetails";

const Private = ({ Item }) => {
    const { signed } = useAuth();

    console.log(signed);

    return signed ? <Item /> : <Signin />;
};

const RoutesApp = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Routes>
                    <Route path="/home" element={<Private Item={Home} />} />
                    <Route path="/" element={<Signin />} />
                    <Route path="*" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/projects/:id" element={<ProjectsDetails />} />
                </Routes>
            </Fragment>
        </BrowserRouter>
    );
};

export default RoutesApp;
