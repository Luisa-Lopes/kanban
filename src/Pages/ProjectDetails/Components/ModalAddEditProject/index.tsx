import { useFormik } from "formik";
import { Button, Input, Modal } from "../../../../Layout";
import { formatDateForInput } from "../../../../utils/DatesFunctions";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";

interface IModalEditProject {
  setIsModalOpen: (value: boolean) => void;
  project?: {
    title: string;
    description: string;
    timeline: {
      startDate: number;
      expectedEndDate: number;
      endDate: number;
    };
  };
}

const ModalAddEditProject = ({
  setIsModalOpen,
  project,
}: IModalEditProject) => {
  const formik = useFormik({
    initialValues: {
      title: project?.title || "",
      description: project?.description || "",
      startDate: formatDateForInput(project?.timeline?.startDate),
      expectedEndDate: formatDateForInput(project?.timeline?.expectedEndDate),
      endDate: formatDateForInput(project?.timeline?.endDate),
    },

    onSubmit: (values) => {
      console.log(values);

      setIsModalOpen(false);
    },
  });

  return (
    <section className="flex flex-col justify-center items-center p-6">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-5 max-w-800 w-full bg-white p-6 rounded-lg shadow-md"
      >
        <div className="flex items-center gap-3 mb-6">
          <Button onClick={() => setIsModalOpen(false)}>
            <ArrowLeftIcon width={24} height={24} className="text-white" />
            Voltar
          </Button>
        </div>
        <div className="mb-6 flex flex-col text-left">
          <h2 className="text-xl font-semibold">
            {project ? "Editar Projeto" : "Adicionar Projeto"}
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            {project
              ? "Atualize as informações do projeto."
              : "Preencha as informações do projeto."}
          </p>
        </div>
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
          <Button
            type="button"
            variant="ghost"
            onClick={() => setIsModalOpen(false)}
          >
            Cancelar
          </Button>

          <Button type="submit">Salvar Alterações</Button>
        </div>
      </form>
    </section>
  );
};

export default ModalAddEditProject;
