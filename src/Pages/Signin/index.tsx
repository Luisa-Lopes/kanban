import React, { useEffect, useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/userAuth";
import { Button, Input } from "../../Layout";
import { useFormik } from "formik";

const Signin = () => {
  const { signin } = useAuth();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validate: (values) => {
      const errors: { password?: string; userName?: string } = {};

      if (!values.password) errors.password = "Campo obrigatório!";
      if (!values.userName) errors.userName = "Campo obrigatório!";

      return errors;
    },
    onSubmit: (values) => {
      const res = signin(values.userName, values.password);

      if (res) {
        return;
      }

      navigate("/home");
    },
  });

  return (
    <div className="flex w-screen h-screen bg-sky-400">
      <form
        className="m-auto flex flex-col justify-center items-center  rounded-md w-1/2 p-10 gap-3"
        style={{
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

        <Input
          label="Login"
          type="text"
          placeholder="Digite o nome"
          variant="default"
          size="md"
          required
          error={formik.errors.userName}
          value={formik.values.userName}
          onChange={formik.handleChange}
          name="userName"
        />

        <Input
          label="Senha"
          type="password"
          placeholder="Digite a senha"
          variant="default"
          size="md"
          required
          error={formik.errors.password}
          value={formik.values.password}
          onChange={formik.handleChange}
          name="password"
        />

        <Button onClick={() => formik.handleSubmit()} className="flex w-full">
          Entrar
        </Button>

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
