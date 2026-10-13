import { useFormik } from "formik";
import { Button, Dropdown, Input, Modal } from "@/Layout";
import {
  IProjectMember,
  IProjectTask,
  TaskStatus,
} from "@/Interfaces/Projects";
import { createTask, updateTask } from "@/services/task";

interface IModalTaskColumn {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  task?: IProjectTask;
  memberList: IProjectMember[];
  sprintId: number;
  initialStatus: TaskStatus;
  onTaskSaved: (task: IProjectTask) => void;
}

const ModalTaskColumn = ({
  isModalOpen,
  setIsModalOpen,
  task,
  memberList,
  sprintId,
  initialStatus,
  onTaskSaved,
}: IModalTaskColumn) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      description: task?.description ?? "",
      assigneeId: task?.assigneeId ?? "",
      title: task?.title ?? "",
      status: (task?.status ?? initialStatus).toString(),
    },
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setStatus(undefined);
      const payload = {
        projectSprintId: sprintId,
        assigneeId: values.assigneeId || undefined,
        description: values.description,
        status: Number(values.status) as TaskStatus,
        title: values.title.trim(),
      };

      try {
        const savedTask = task
          ? await updateTask({ ...payload, id: task.id }, sprintId, task.id)
          : await createTask(payload, sprintId);
        onTaskSaved(savedTask);
        setIsModalOpen(false);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Não foi possível salvar a tarefa.";
        setStatus(message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      className="flex w-[500px] max-w-[90vw] flex-col p-6"
    >
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            {task ? "Editar tarefa" : "Adicionar tarefa"}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {task
              ? "Atualize os detalhes desta tarefa."
              : "Preencha os detalhes para adicionar ao board."}
          </p>
        </div>

        <Input
          label="Título"
          id="task-title"
          name="title"
          type="text"
          placeholder="Ex.: Preparar apresentação"
          required
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.errors.title}
        />

        <Input
          label="Descrição"
          id="task-description"
          name="description"
          type="text"
          placeholder="Descreva o que precisa ser feito"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.errors.description}
        />

        <Dropdown
          options={memberList.map((member) => ({
            value: member.user.id,
            label: `${member.user.firstName} ${member.user.lastName}`,
          }))}
          label="Responsável"
          name="assigneeId"
          value={formik.values.assigneeId}
          onChange={(value) => formik.setFieldValue("assigneeId", value)}
          placeholder="Sem responsável"
        />

        <Dropdown
          options={[
            { value: TaskStatus.Todo.toString(), label: "A fazer" },
            { value: TaskStatus.InProgress.toString(), label: "Em andamento" },
            { value: TaskStatus.Review.toString(), label: "Em revisão" },
            { value: TaskStatus.Done.toString(), label: "Concluído" },
          ]}
          label="Status"
          name="status"
          value={formik.values.status}
          onChange={(value) => formik.setFieldValue("status", value)}
        />

        {formik.status && (
          <p role="alert" className="text-sm font-medium text-red-600">
            {formik.status}
          </p>
        )}

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsModalOpen(false)}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Salvando..." : "Salvar tarefa"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalTaskColumn;
