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
    onSubmit: async (values) => {
      try {
        await signup(
          values.userEmail,
          values.password,
          values.userName,
          values.userSurname,
        );

        navigate("/home");
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Erro ao criar usuário.";

        console.error(message);
      }
    },
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600 flex items-center justify-center p-6">
      <form className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        {/* Lado esquerdo */}
        <section className="lg:w-1/2 bg-gradient-to-br from-sky-600 to-blue-800 text-white flex flex-col justify-center items-center p-12">
          <h2 className="text-2xl font-medium mb-3">Bem-vindo ao</h2>

          <h1 className="text-5xl font-bold text-center leading-tight">
            Gerenciador
            <br />
            de Projetos
          </h1>

          <p className="mt-8 text-center text-lg opacity-90 max-w-md">
            Organize equipes, acompanhe tarefas e gerencie seus projetos em um
            único lugar.
          </p>
        </section>

        {/* Lado direito */}
        <section className="lg:w-1/2 p-10 md:p-14 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Criar Conta</h2>

          <p className="text-gray-500 mb-8">
            Preencha os campos abaixo para começar.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nome"
              name="userName"
              type="text"
              placeholder="Digite o nome"
              value={formik.values.userName}
              onChange={formik.handleChange}
              error={formik.errors.userName}
            />

            <Input
              label="Sobrenome"
              name="userSurname"
              type="text"
              placeholder="Digite o sobrenome"
              value={formik.values.userSurname}
              onChange={formik.handleChange}
              error={formik.errors.userSurname}
            />

            <div className="md:col-span-2">
              <Input
                label="E-mail"
                name="userEmail"
                type="email"
                placeholder="Digite o e-mail"
                value={formik.values.userEmail}
                onChange={formik.handleChange}
                error={formik.errors.userEmail}
              />
            </div>

            <Input
              label="Senha"
              name="password"
              type="password"
              placeholder="Digite a senha"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.errors.password}
            />

            <Input
              label="Confirmar senha"
              name="validPassword"
              type="password"
              placeholder="Confirme a senha"
              value={formik.values.validPassword}
              onChange={formik.handleChange}
              error={formik.errors.validPassword}
            />
          </div>

          <Button
            onClick={() => formik.handleSubmit()}
            className="w-full mt-8 h-12 text-lg"
          >
            Criar Conta
          </Button>

          <p className="text-center text-gray-500 mt-6">
            Já possui uma conta?{" "}
            <span className="text-sky-600 font-semibold cursor-pointer hover:underline">
              Entrar
            </span>
          </p>
        </section>
      </form>
    </div>
  );
};

export default Signup;
