import { Button, Input, Modal } from "../../../../Layout";
import { Dispatch, SetStateAction, useState } from "react";
import { useFormik } from "formik";
import { IProjectSprint } from "@/Interfaces/Projects";
import { formatStringDateForInput } from "@/utils/DatesFunctions";
import { createSprint, updateSprint } from "@/services/sprints";

interface IModalAddSprint {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  sprint?: IProjectSprint | undefined;
  projectId: number;
}

const ModalAddSprint = ({
  isModalOpen,
  setIsModalOpen,
  sprint,
  projectId,
}: IModalAddSprint) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: sprint?.id || 0,
      title: sprint?.title || "",
      description: sprint?.description || "",
      startDate: formatStringDateForInput(sprint?.startDate),
      endDate: formatStringDateForInput(sprint?.endDate),
    },
    onSubmit: async (values, { resetForm }) => {
      const newSprint = {
        id: values?.id || 0,
        title: values?.title || "",
        description: values.description || "",
        startDate: new Date(values.startDate).toISOString(),
        endDate: new Date(values.endDate).toISOString(),
      };

      try {
        if (values?.id == 0) {
          await createSprint(newSprint, projectId);
        } else {
          await updateSprint(newSprint, projectId);
        }

        setIsModalOpen(false);
        resetForm();
      } catch (error) {
        console.error("Failed to fetch:", error);
      }
    },
  });

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      className="flex flex-col w-[700px] max-w-[70vw] p-6"
    >
      <form onSubmit={formik.handleSubmit}>
        <div className="flex items-center mb-6">
          <h2 className="text-xl font-semibold">
            {sprint?.id
              ? "Editar Tarefa Principal"
              : "Adicionar Tarefa Principal"}
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          <Input
            label="Título"
            type="text"
            placeholder="Digite o título"
            variant="default"
            required
            error={formik.errors.title}
            value={formik.values.title}
            onChange={formik.handleChange}
            name="title"
          />

          <div>
            <label className="block text-sm font-medium mb-1">Descrição</label>

            <textarea
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              rows={5}
              className="w-full border rounded-md p-2 resize-none"
              placeholder="Descreva a tarefa principal"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Data Inicial"
              type="date"
              placeholder="Digite o título"
              variant="default"
              required
              error={formik.errors.startDate}
              value={formik.values.startDate}
              onChange={formik.handleChange}
              name="startDate"
            />

            <Input
              label="Data Final"
              type="date"
              placeholder="Digite o título"
              variant="default"
              required
              error={formik.errors.endDate}
              value={formik.values.endDate}
              onChange={formik.handleChange}
              name="endDate"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            className="px-4 py-2 border rounded-md"
            onClick={() => setIsModalOpen(false)}
          >
            Cancelar
          </button>

          <Button
            disabled={formik.isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
            type="submit"
          >
            Salvar
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalAddSprint;
