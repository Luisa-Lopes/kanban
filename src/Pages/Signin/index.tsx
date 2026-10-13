import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/userAuth";
import { Button, Input } from "../../Layout";
import { useFormik } from "formik";

const Signin = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { userName: "", password: "" },
    validate: (values) => {
      const errors: { password?: string; userName?: string } = {};
      if (!values.password) errors.password = "Campo obrigatório!";
      if (!values.userName) errors.userName = "Campo obrigatório!";
      return errors;
    },
    onSubmit: async (values) => {
      try {
        await signin(values.userName, values.password);
        navigate("/home");
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Erro ao realizar login.";
        console.error(message);
        formik.setStatus(message);
      }
    },
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600 flex items-center justify-center p-6">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row"
      >
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

        <section className="lg:w-1/2 p-10 md:p-14 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Entrar</h2>
          <p className="text-gray-500 mb-8">Acesse sua conta para continuar.</p>

          <div className="flex flex-col gap-4">
            <Input
              label="Login"
              id="userName"
              name="userName"
              type="text"
              placeholder="Digite o nome"
              required
              value={formik.values.userName}
              onChange={formik.handleChange}
              error={formik.errors.userName}
            />
            <Input
              label="Senha"
              id="password"
              name="password"
              type="password"
              placeholder="Digite a senha"
              required
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.errors.password}
            />
          </div>

          {formik.status && (
            <p role="alert" className="mt-4 text-sm font-medium text-red-600">
              {formik.status}
            </p>
          )}

          <Button type="submit" className="w-full mt-8 h-12 text-lg">
            Entrar
          </Button>

          <p className="text-center text-gray-500 mt-6">
            Ainda não tem uma conta?{" "}
            <Link
              to="/signup"
              className="text-sky-600 font-semibold hover:underline"
            >
              Cadastre-se
            </Link>
          </p>
        </section>
      </form>
    </div>
  );
};

export default Signin;
