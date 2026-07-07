import { useFormik } from "formik";
import { Button, Input, Modal } from "../../../../../../Layout";
import { IResponsible } from "@/Pages/ProjectDetails/types";

interface IModalTaskColumn {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  task?: {
    id: string;
    title: string;
    responsible?: IResponsible[];
    description?: string;
  };
}

const ModalTaskColumn = ({
  isModalOpen,
  setIsModalOpen,
  task,
}: IModalTaskColumn) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: task?.id || 0,
      description: task?.description || "",
      responsible: task?.responsible || [],
      title: task?.title || "",
    },
    onSubmit: (values) => {
      console.log({
        ...values,
      });

      setIsModalOpen(false);
    },
  });

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      className="flex flex-col w-[500px] max-w-[90vw] p-6"
    >
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
        <div>
          <h2 className="text-xl font-semibold">Editar Etapa</h2>

          <p className="text-sm text-gray-500 mt-1">
            Atualize as informações da etapa.
          </p>
        </div>

        <Input
          label="Título"
          type="text"
          placeholder="Digite o título da etapa"
          variant="default"
          required
          name="text"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.errors.title}
        />

        <Input
          label="Descrição da etapa"
          type="text"
          placeholder="Digite a descrição da etapa"
          variant="default"
          required
          name="text"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.errors.description}
        />

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsModalOpen(false)}
          >
            Cancelar
          </Button>

          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalTaskColumn;
