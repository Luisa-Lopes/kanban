import { useFormik } from "formik";
import { Button, Input, Modal } from "../../../../Layout";
import { Dispatch, SetStateAction } from "react";

interface IModalAddMember {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  onAdd: (member: { id: string; name: string; role: string }) => void;
}

const ModalAddMember = ({ isOpen, onClose, onAdd }: IModalAddMember) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      role: "",
    },

    onSubmit: (values) => {
      onAdd({
        id: crypto.randomUUID(),
        name: values.name,
        role: values.role,
      });
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
          label="Nome"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />

        <Input
          label="Função"
          name="role"
          value={formik.values.role}
          onChange={formik.handleChange}
          placeholder="Ex: Desenvolvedor Front-End"
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
