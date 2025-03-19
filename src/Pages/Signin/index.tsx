import React, { useEffect, useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/userAuth";

const Signin = () => {
    const { signin } = useAuth();

    const navigate = useNavigate();

    const [username, setUsername] = useState<string>("");
    const [userError, setUserError] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [passwordError, setPasswordError] = useState<boolean>(false);

    const handleLogin = () => {
        if (!username) {
            setUserError(true);
        }

        if (!password) {
            setPasswordError(true);
            return;
        }

        setUserError(false);
        setPasswordError(false);

        const res = signin(username, password);

        if (res) {
            return;
        }
        navigate("/board");
    };

    useEffect(() => {
        if (username) {
            setUserError(false);
        }

        if (password) {
            setPasswordError(false);
            return;
        }
    }, [username, password]);

    return (
        <div className="w-screen h-screen bg-cover bg-no-repeat flex ">
            <form
                className="m-auto flex flex-col justify-center items-center  rounded-md"
                style={{
                    width: "50%",
                    height: "70%",
                    backgroundColor: "rgba(0, 0, 0, 0.27)",
                    minWidth: "400px",
                    minHeight: "500px",
                    maxWidth: "500px",
                    maxBlockSize: "600px",
                }}
            >
                <h1 className="text-center font-bold text-4xl my-2 capitalize">
                    Login
                </h1>

                <SigninInput
                    name={"Username"}
                    setInput={setUsername}
                    error={userError}
                />
                <SigninInput
                    name={"Password"}
                    setInput={setPassword}
                    error={passwordError}
                />

                <button
                    type="button"
                    className="p-2 rounded-md flex gap-2 my-3 bg-sky-600 justify-center"
                    style={{
                        width: "300px",
                    }}
                    onClick={handleLogin}
                >
                    <h3 className="text-center">Entrar</h3>
                </button>

                <h6>
                    <Link to="/signup"> Não tem login? Cadastre-se</Link>
                </h6>
            </form>
        </div>
    );
};

export default Signin;

interface ISigninInput {
    name: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    error: boolean;
}

const SigninInput = ({ name, setInput, error }: ISigninInput) => {
    const [buttonClick, setButtonClick] = useState<boolean>(false);

    const [outlineColor, setOutlineColor] = useState<string>("");
    const [outlineStyle, setOutlineStyle] = useState<string>("");

    const getOutlineColor = (): string => {
        if (buttonClick) return "#00000";
        if (error) return "#FF0000";

        return "";
    };

    const getOutlineStyle = (): string => {
        if (buttonClick || error) return "solid";

        return "";
    };

    useEffect(() => {
        setOutlineColor(getOutlineColor());
        setOutlineStyle(getOutlineStyle());
    }, [buttonClick, error]);

    return (
        <div
            className="p-2 rounded-md flex justify-between gap-2 my-3"
            style={{
                width: "300px",
                backgroundColor: "rgba(255, 255, 255, 0.47)",
                outlineColor: outlineColor,
                outlineStyle: outlineStyle,
            }}
        >
            <UserCircleIcon className="size-6 text-black" />
            <input
                name={name}
                className="w-full placeholder:text-gray-700"
                onFocus={() => setButtonClick(true)}
                onBlur={() => setButtonClick(false)}
                onChange={(event) => {
                    setInput(event.target.value);
                }}
                placeholder={name}
                style={{
                    width: "300px",
                    backgroundColor: "rgba(255, 255, 255, 0)",
                    outline: "none",
                }}
            />
        </div>
    );
};
