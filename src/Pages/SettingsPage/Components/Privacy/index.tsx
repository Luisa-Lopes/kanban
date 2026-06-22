import { Button, Checkbox, Dropdown } from "@/Layout";
import { useFormik } from "formik";

export interface IUserPrivacy {
  showEmailToTeamMembers: boolean;
  allowMentions: boolean;
  allowProjectInvitations: boolean;
  profileVisibility: "public" | "team" | "private";
}

interface IPrivacySection {
  privacy: IUserPrivacy;
}

const PrivacySection = ({ privacy }: IPrivacySection) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      showEmailToTeamMembers: privacy?.showEmailToTeamMembers ?? false,
      allowMentions: privacy.allowMentions ?? false,
      allowProjectInvitations: privacy.allowProjectInvitations ?? false,
      profileVisibility: privacy.profileVisibility ?? "",
    },

    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Privacidade</h3>

      <Checkbox
        label="Permitir menções"
        variant="default"
        size="sm"
        error={formik?.errors?.allowMentions}
        checked={formik?.values?.allowMentions}
        onChange={formik.handleChange}
        name="allowMentions"
      />

      <Checkbox
        label=" Permitir convites para projetos"
        variant="default"
        size="sm"
        error={formik?.errors?.allowProjectInvitations}
        checked={formik?.values?.allowProjectInvitations}
        onChange={formik.handleChange}
        name="allowProjectInvitations"
      />

      <Checkbox
        label="Exibir e-mail para membros da equipe"
        variant="default"
        size="sm"
        error={formik?.errors?.showEmailToTeamMembers}
        checked={formik?.values?.showEmailToTeamMembers}
        onChange={formik.handleChange}
        name="showEmailToTeamMembers"
      />

      <Dropdown
        label="Visibilidade do perfil"
        name="profileVisibility"
        value={formik.values.profileVisibility}
        onChange={(value) => formik.setFieldValue("profileVisibility", value)}
        options={[
          {
            value: "public",
            label: (
              <div className="flex items-center gap-3">
                <span>Público</span>
              </div>
            ),
          },
          {
            value: "privado",
            label: (
              <div className="flex items-center gap-3">
                <span>Privado</span>
              </div>
            ),
          },
          {
            value: "team",
            label: (
              <div className="flex items-center gap-3">
                <span>Time</span>
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
    </div>
  );
};

export default PrivacySection;
