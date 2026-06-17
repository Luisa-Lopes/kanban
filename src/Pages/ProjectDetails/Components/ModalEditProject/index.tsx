import { useFormik } from "formik";
import { Button, Input, Modal } from "../../../../Layout";

interface IModalEditProject {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;

  project: {
    title: string;
    description: string;
    timeline: {
      startDate: number;
      expectedEndDate: number;
      endDate: number;
    };
  };
}

const formatDateForInput = (timestamp?: number) => {
  if (!timestamp) return "";

  return new Date(timestamp).toISOString().split("T")[0];
};

const ModalEditProject = ({
  isModalOpen,
  setIsModalOpen,
  project,
}: IModalEditProject) => {
  const formik = useFormik({
    initialValues: {
      title: project.title || "",
      description: project.description || "",
      startDate: formatDateForInput(project.timeline.startDate),
      expectedEndDate: formatDateForInput(project.timeline.expectedEndDate),
      endDate: formatDateForInput(project.timeline.endDate),
    },

    onSubmit: (values) => {
      console.log(values);

      setIsModalOpen(false);
    },
  });

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      className="flex flex-col w-[800px] max-w-[95vw] p-6"
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Editar Projeto</h2>

        <p className="text-sm text-slate-500 mt-1">
          Atualize as informações do projeto.
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
        <Input
          label="Título"
          type="text"
          name="title"
          required
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.errors.title}
          placeholder="Digite o título do projeto"
        />

        <div>
          <label className="block text-sm font-medium mb-1">Descrição</label>

          <textarea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            rows={5}
            className="w-full border rounded-md p-3 resize-none"
            placeholder="Descreva o projeto"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Data de Início"
            type="date"
            name="startDate"
            value={formik.values.startDate}
            onChange={formik.handleChange}
            error={formik.errors.startDate}
          />

          <Input
            label="Previsão de Entrega"
            type="date"
            name="expectedEndDate"
            value={formik.values.expectedEndDate}
            onChange={formik.handleChange}
            error={formik.errors.expectedEndDate}
          />

          <Input
            label="Data de Encerramento"
            type="date"
            name="endDate"
            value={formik.values.endDate}
            onChange={formik.handleChange}
            error={formik.errors.endDate}
          />
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            className="px-4 py-2 border rounded-md"
            onClick={() => setIsModalOpen(false)}
          >
            Cancelar
          </button>

          <Button type="submit" className="px-4 py-2">
            Salvar Alterações
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalEditProject;
