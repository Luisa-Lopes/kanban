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
      const errors: { email?: string; role?: string } = {};

      if (!values.email.trim()) errors.email = "Campo obrigatório!";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = "Informe um e-mail válido.";
      }
      if (!values.role) errors.role = "Campo obrigatório!";

      return errors;
    },

    onSubmit: async (values, { setStatus, resetForm }) => {
      try {
        if (!projectId) {
          throw new Error("Não foi possível identificar o projeto.");
        }

        if (!values.role) {
          throw new Error("Selecione uma função para o membro.");
        }

        await createMember({
          projectId,
          email: values.email.trim(),
          role: ProjectRole[values.role],
        });
        resetForm();
        onClose(false);
      } catch (error) {
        setStatus(
          error instanceof Error
            ? error.message
            : "Não foi possível enviar o convite. Tente novamente.",
        );
      }
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
          type="email"
          required
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email ? formik.errors.email : undefined}
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
          onBlur={() => formik.setFieldTouched("role", true)}
          placeholder="Função do membro"
        />
        {formik.touched.role && formik.errors.role && (
          <p className="text-sm text-red-600">{formik.errors.role}</p>
        )}

        {formik.status && (
          <p role="alert" className="text-sm text-red-600">
            {formik.status}
          </p>
        )}

        <div className="flex justify-end gap-3 mt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => onClose(false)}
          >
            Cancelar
          </Button>

          <Button type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Enviando convite..." : "Adicionar"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalAddMember;
