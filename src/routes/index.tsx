import React, { Fragment } from "react";

import Signin from "../Pages/Signin";

import Signup from "../Pages/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Board } from "../Pages/Board";
import useAuth from "../hooks/userAuth";

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
                    <Route path="/board" element={<Private Item={Board} />} />
                    <Route path="/" element={<Signin />} />
                    <Route path="*" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </Fragment>
        </BrowserRouter>
    );
};

export default RoutesApp;
