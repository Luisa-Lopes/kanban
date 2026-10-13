import { useFormik } from "formik";
import { Button, Input, Modal } from "@/Layout";
import { formatStringDateForInput } from "@/utils/DatesFunctions";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { IProjects, IProjectsDetailedResponse } from "@/Interfaces/Projects";
import { createProjects, updateProject } from "@/services/projects";

interface IModalEditProject {
  setIsModalOpen: (value: boolean) => void;
  project?: IProjectsDetailedResponse["dados"];
}

const ModalAddEditProject = ({
  setIsModalOpen,
  project,
}: IModalEditProject) => {
  const formik = useFormik({
    initialValues: {
      name: project?.name || "",
      description: project?.description || "",
      startDate: formatStringDateForInput(project?.startDate),
      estimatedDate: formatStringDateForInput(project?.estimatedDate),
      endDate: formatStringDateForInput(project?.endDate),
    },

    onSubmit: async (values) => {
      const newProject: IProjects = {
        id: project?.id || 0,
        name: values.name,
        description: values.description,
        startDate: new Date(values.startDate).toISOString(),
        estimatedDate: new Date(values.estimatedDate).toISOString(),
        endDate: new Date(values.endDate).toISOString(),
      };

      try {
        if (project?.id) {
          await updateProject(newProject);
        } else {
          await createProjects(newProject);
        }

        setIsModalOpen(false);
      } catch (e) {
        console.error(e);
      }
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
          name="name"
          required
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.errors.name}
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
            name="estimatedDate"
            value={formik.values.estimatedDate}
            onChange={formik.handleChange}
            error={formik.errors.estimatedDate}
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
