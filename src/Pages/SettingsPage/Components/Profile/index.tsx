import { Button, Input, TextArea } from "@/Layout";
import { phoneMask } from "@/utils/Mask";
import { useFormik } from "formik";

export interface IUserProfile {
  avatar: string;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  phone: string;
  jobTitle: string;
  bio: string;
}

interface IProfileSection {
  profile: IUserProfile;
}

const ProfileSection = ({ profile }: IProfileSection) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      avatar: profile.avatar ?? "",
      firstName: profile.firstName ?? "",
      lastName: profile.lastName ?? "",
      displayName: profile.displayName ?? "",
      email: profile.email ?? "",
      phone: profile.phone ? phoneMask(profile.phone) : "",
      jobTitle: profile.jobTitle ?? "",
      bio: profile.bio ?? "",
    },
    validate: (values) => {
      const errors: {
        lastName?: string;
        firstName?: string;
        email?: string;
      } = {};

      if (!values.firstName) errors.firstName = "Campo obrigatório!";
      if (!values.lastName) errors.lastName = "Campo obrigatório!";
      if (!values.email) errors.email = "Campo obrigatório!";

      return errors;
    },
    onSubmit: (values) => {},
  });

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Perfil</h3>

      <div className="flex flex-col items-center gap-4">
        <img
          src={formik.values.avatar}
          alt="Avatar"
          className="h-36 w-36 rounded-full"
        />

        <div className="flex items-end justify-end">
          <Button onClick={() => {}} className="flex rounded-md">
            Alterar Foto
          </Button>
        </div>
      </div>

      <Input
        label="Nome"
        type="text"
        placeholder="Digite o nome"
        variant="default"
        size="md"
        required
        error={formik.errors.firstName}
        value={formik.values.firstName}
        onChange={formik.handleChange}
        name="firstName"
      />

      <Input
        label="Sobrenome"
        type="text"
        placeholder="Digite o sobrenome"
        variant="default"
        size="md"
        required
        error={formik.errors.lastName}
        value={formik.values.lastName}
        onChange={formik.handleChange}
        name="lastName"
      />

      <Input
        label="E-mail"
        type="text"
        placeholder="Digite o e-mail"
        variant="default"
        size="md"
        required
        error={formik.errors.email}
        value={formik.values.email}
        onChange={formik.handleChange}
        name="email"
      />
      <Input
        label="Telefone"
        type="phone"
        placeholder="Digite o número"
        variant="default"
        size="md"
        error={formik.errors.phone}
        value={formik.values.phone}
        onChange={(e) => {
          const formatPhone = phoneMask(e.target.value);
          formik.setFieldValue("phone", formatPhone);
        }}
        name="phone"
      />

      <Input
        label="Cargo"
        type="text"
        placeholder="Digite o cargo"
        variant="default"
        size="md"
        error={formik.errors.jobTitle}
        value={formik.values.jobTitle}
        onChange={formik.handleChange}
        name="jobTitle"
      />

      <TextArea
        label="Bio"
        placeholder="Digite o bio"
        variant="default"
        size="md"
        error={formik.errors.bio}
        value={formik.values.bio}
        onChange={formik.handleChange}
        name="bio"
      />

      <div className="flex items-end justify-end">
        <Button
          onClick={() => {
            formik.handleSubmit();
          }}
          className="flex rounded-md"
        >
          Salvar Alterações
        </Button>
      </div>
    </div>
  );
};

export default ProfileSection;
