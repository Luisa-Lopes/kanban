import { useFormik } from "formik";
import { Button, Input } from "../../../../Layout";

export interface IUserSecurity {
  hasTwoFactorEnabled: boolean;
  lastPasswordChange: string;
  activeSessions: IActiveSession[];
}

export interface IActiveSession {
  id: string;
  device: string;
  browser: string;
  location: string;
  lastAccess: string;
}

interface ISecuritySection {
  security: IUserSecurity;
}

const SecuritySection = ({ security }: ISecuritySection) => {
  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      validPassword: "",
    },
    validate: (values) => {
      const errors: {
        password?: string;
        newPassword?: string;
        validPassword?: string;
      } = {};

      if (!values.password) errors.password = "Campo obrigatório!";
      if (!values.newPassword) errors.newPassword = "Campo obrigatório!";

      if (!values.validPassword) {
        errors.validPassword = "Campo obrigatório!";
      } else if (values.newPassword !== values.validPassword) {
        errors.validPassword = "As senhas não coincidem";
      }

      return errors;
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="space-y-8">
      {/* Alteração de senha */}
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <h3 className="text-xl font-semibold">Segurança</h3>

        <Input
          label="Senha atual"
          type="password"
          placeholder="Digite sua senha atual"
          variant="default"
          size="md"
          required
          error={formik.errors.password}
          value={formik.values.password}
          onChange={formik.handleChange}
          name="password"
        />

        <Input
          label="Nova senha"
          type="password"
          placeholder="Digite sua nova senha"
          variant="default"
          size="md"
          required
          error={formik.errors.newPassword}
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          name="newPassword"
        />

        <Input
          label="Confirmar nova senha"
          type="password"
          placeholder="Confirme sua nova senha"
          variant="default"
          size="md"
          required
          error={formik.errors.validPassword}
          value={formik.values.validPassword}
          onChange={formik.handleChange}
          name="validPassword"
        />

        <div className="flex items-end justify-end">
          <Button onClick={() => {}} className="flex rounded-md">
            Atualizar Senha
          </Button>
        </div>
      </form>

      {/* Informações de segurança */}
      <div className="rounded-lg border p-4">
        <h4 className="mb-4 text-lg font-medium">Informações da Conta</h4>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Autenticação em dois fatores</span>
            <span>
              {security.hasTwoFactorEnabled ? "Ativada" : "Desativada"}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Última alteração de senha</span>
            <span>{security.lastPasswordChange}</span>
          </div>
        </div>
      </div>

      {/* Sessões ativas */}
      <div className="rounded-lg border p-4 bg-sky-600">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="text-lg font-medium">Sessões Ativas</h4>

          <Button variant="secondary">Encerrar Todas</Button>
        </div>

        <div className="space-y-4">
          {security.activeSessions.map((session) => (
            <div
              key={session.id}
              className="rounded-lg border p-4 bg-white shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{session.device}</p>

                  <p className="text-sm text-gray-500">{session.browser}</p>

                  <p className="text-sm text-gray-500">{session.location}</p>

                  <p className="text-sm text-gray-500">
                    Último acesso: {session.lastAccess}
                  </p>
                </div>

                <div className="flex items-end justify-end">
                  <Button
                    variant="danger"
                    onClick={() => {}}
                    className="flex rounded-md"
                  >
                    Encerrar
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default SecuritySection;
