import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/userAuth";
import { useFormik } from "formik";
import { Button, Input } from "../../Layout";

const Signup = () => {
  const { signup } = useAuth();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      userEmail: "",
      userName: "",
      userSurname: "",
      password: "",
      validPassword: "",
    },
    validate: (values) => {
      const errors: {
        userEmail?: string;
        userName?: string;
        userSurname?: string;
        password?: string;
        validPassword?: string;
      } = {};

      if (!values.userEmail) errors.userEmail = "Campo obrigatório!";
      if (!values.userName) errors.userName = "Campo obrigatório!";
      if (!values.userSurname) errors.userSurname = "Campo obrigatório!";
      if (!values.password) errors.password = "Campo obrigatório!";
      if (!values.validPassword) errors.validPassword = "Campo obrigatório!";
      else if (values.password != values.validPassword)
        errors.validPassword = "Senha diferente!";

      return errors;
    },
    onSubmit: (values) => {
      const res = signup(
        values.userEmail,
        values.userName,
        values.userSurname,
        values.password,
      );

      if (res) {
        return;
      }

      navigate("/home");
    },
  });

  return (
    <div className="flex w-screen h-screen bg-sky-400">
      <form
        className="m-auto flex flex-col md:flex-row justify-center items-center rounded-md w-4/5 shadow-lg"
        style={{
          height: "70%",
          backgroundColor: "rgba(0, 0, 0, 0.27)",
          minHeight: "500px",
          maxWidth: "800px",
          maxBlockSize: "600px",
        }}
      >
        <section className="flex flex-col h-full w-full items-center justify-center  rounded-md bg-white">
          <h2 className="text-center font-semibold text-3xl my-2 capitalize">
            Bem-vindo ao
          </h2>
          <h1 className="text-center font-bold text-4xl my-2 capitalize">
            Gerenciador de Projetos
          </h1>
        </section>

        <section className="flex flex-col w-full h-full justify-between p-5">
          <h1 className="text-center font-bold text-4xl my-2 capitalize">
            Criar uma conta
          </h1>

          <div className="flex flex-col gap-2">
            <Input
              label="Nome"
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
              label="Sobrenome"
              type="text"
              placeholder="Digite o sobrenome"
              variant="default"
              size="md"
              required
              error={formik.errors.userSurname}
              value={formik.values.userSurname}
              onChange={formik.handleChange}
              name="userSurname"
            />

            <Input
              label="E-mail"
              type="email"
              placeholder="Digite o e-mail"
              variant="default"
              size="md"
              required
              error={formik.errors.userEmail}
              value={formik.values.userEmail}
              onChange={formik.handleChange}
              name="userEmail"
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

            <Input
              label="Senha"
              type="validPassword"
              placeholder="Digite a senha"
              variant="default"
              size="md"
              required
              error={formik.errors.validPassword}
              value={formik.values.validPassword}
              onChange={formik.handleChange}
              name="validPassword"
            />
          </div>

          <Button onClick={() => formik.handleSubmit()} className="flex w-full">
            Entrar
          </Button>
        </section>
      </form>
    </div>
  );
};

export default Signup;
