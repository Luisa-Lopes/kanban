import { useFormik } from "formik";
import { Button, Dropdown } from "../../../../Layout";

export interface IUserPreferences {
  theme: "light" | "dark" | "system";
  language: string;
}

interface IPreferencesSection {
  preferences: IUserPreferences;
}

const PreferencesSection = ({ preferences }: IPreferencesSection) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      theme: preferences.theme ?? "",
      language: preferences.language ?? "",
    },
    validate: (values) => {
      const errors: {
        theme?: string;
        language?: string;
      } = {};

      if (!values.language) errors.language = "Campo obrigatório!";
      if (!values.theme) errors.theme = "Campo obrigatório!";

      return errors;
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form className="space-y-4">
      <h3 className="text-xl font-semibold">Preferências</h3>
      <Dropdown
        label="Tema"
        name="theme"
        value={formik.values.theme}
        onChange={(value) => formik.setFieldValue("theme", value)}
        options={[
          {
            value: "light",
            label: (
              <div className="flex items-center gap-3">
                <span>Claro</span>
              </div>
            ),
          },
          {
            value: "dark",
            label: (
              <div className="flex items-center gap-3">
                <span>Escuro</span>
              </div>
            ),
          },
        ]}
      />
      <Dropdown
        label="Idioma"
        name="language"
        value={formik.values.language}
        onChange={(value) => formik.setFieldValue("language", value)}
        options={[
          {
            value: "pt-BR",
            label: (
              <div className="flex items-center gap-3">
                <span>Português</span>
              </div>
            ),
          },
          {
            value: "En",
            label: (
              <div className="flex items-center gap-3">
                <span>Inglês</span>
              </div>
            ),
          },
        ]}
      />
      <div className="flex items-end justify-end">
        <Button
          onClick={() => formik.handleSubmit()}
          className="flex rounded-md"
        >
          Salvar Alterações
        </Button>
      </div>
    </form>
  );
};

export default PreferencesSection;
