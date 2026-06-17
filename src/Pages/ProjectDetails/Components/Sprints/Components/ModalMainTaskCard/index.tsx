import { Button, Input, Modal } from "../../../../../../Layout";
import { Dispatch, SetStateAction, useState } from "react";
import { useFormik } from "formik";

interface IModalMainTaskCard {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  description: string;
}

const ModalMainTaskCard = ({
  isModalOpen,
  setIsModalOpen,
  title,
  description,
}: IModalMainTaskCard) => {
  const formik = useFormik({
    initialValues: {
      title: title || "",
      description: description || "",
      startDate: "",
      endDate: "",
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
      className="flex flex-col w-[700px] max-w-[90vw] p-6"
    >
      <div className="flex items-center mb-6">
        <h2 className="text-xl font-semibold">Editar Tarefa Principal</h2>
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
            value={description}
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
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
          onClick={() => {
            // salvar
            setIsModalOpen(false);
          }}
        >
          Salvar
        </Button>
      </div>
    </Modal>
  );
};

export default ModalMainTaskCard;
