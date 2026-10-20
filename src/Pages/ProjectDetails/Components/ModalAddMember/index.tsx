import { useFormik } from "formik";

import { Dispatch, SetStateAction } from "react";
import { createMember } from "@/services/member";
import { ProjectRole } from "@/Interfaces/Projects";
import { Button, Dropdown, Input, Modal } from "@/Layout";

interface IModalAddMember {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  projectId?: number;
}

type FormValues = {
  email: string;
  role: keyof typeof ProjectRole | "";
};

const ModalAddMember = ({ isOpen, onClose, projectId }: IModalAddMember) => {
  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      role: "",
    },
    validate: (values) => {
      const errors: { email: string; role: string } = { email: "", role: "" };

      if (!values.email) errors.email = "Campo obrigatório!";
      if (!values.role) errors.role = "Campo obrigatório!";

      return errors;
    },

    onSubmit: async (values) => {
      try {
        if (!projectId) {
          throw new Error("Project ID is required to add a member.");
        }

        if (!values.role) {
          throw new Error("A role is required to add a member.");
        }

        await createMember({
          projectId: projectId,
          email: values.email,
          role: ProjectRole[values.role],
        });
      } catch (error) {
        console.error("Error adding member:", error);
      }
      onClose(false);
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => onClose(false)}
      className="w-[500px] p-6"
    >
      <h2 className="text-xl font-semibold mb-5">Adicionar membro</h2>

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <Input
          label="E-mail"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />

        <Dropdown
          options={[
            { value: "Owner", label: "Dono" },
            { value: "Admin", label: "Administrador" },
            { value: "Member", label: "Membro" },
          ]}
          label="Função"
          name="role"
          value={formik.values.role}
          onChange={(value) => formik.setFieldValue("role", value)}
          placeholder="Função do membro"
        />

        <div className="flex justify-end gap-3 mt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => onClose(false)}
          >
            Cancelar
          </Button>

          <Button type="submit">Adicionar</Button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalAddMember;
