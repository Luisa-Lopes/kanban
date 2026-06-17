import { useFormik } from "formik";
import { Button, Input, Modal } from "../../../../../../Layout";

interface IModalTaskColumn {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  taskId?: number;
  text: string;
}

const ModalTaskColumn = ({
  isModalOpen,
  setIsModalOpen,
  taskId,
  text,
}: IModalTaskColumn) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      text: text || "",
    },
    onSubmit: (values) => {
      console.log({
        id: taskId,
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
          label="Nome da etapa"
          type="text"
          placeholder="Digite o nome da etapa"
          variant="default"
          required
          name="text"
          value={formik.values.text}
          onChange={formik.handleChange}
          error={formik.errors.text}
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
