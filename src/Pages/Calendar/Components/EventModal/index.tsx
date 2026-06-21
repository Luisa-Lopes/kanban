import { useFormik } from "formik";
import { Button, Dropdown, Input, Modal } from "../../../../Layout";
import { ICalendarEvent } from "../..";
import {
  DateToTimestamp,
  formatDateForInput,
} from "../../../../utils/DatesFunctions";

interface IEventModal {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  event?: ICalendarEvent;
  setSelectedEvent: (selectedEvent: ICalendarEvent | undefined) => void;
}

const EventModal = ({
  isModalOpen,
  setIsModalOpen,
  event,
  setSelectedEvent,
}: IEventModal) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: event?.title ?? "",
      type: event?.type ?? "",
      description: event?.description ?? "",
      startDate: event?.start
        ? formatDateForInput(DateToTimestamp({ date: event?.start }))
        : "",
      endDate: event?.end
        ? formatDateForInput(DateToTimestamp({ date: event?.end }))
        : event?.end,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const HandleDeleteEvent = () => {};

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => {
        setIsModalOpen(false);
        setSelectedEvent(undefined);
        formik.resetForm();
      }}
      className="flex  flex-col h-3/4 w-2/3"
    >
      <div className="flex flex-col items-center justify-center">
        <h1>Evento</h1>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-3 w-full h-full p-5"
        >
          <Input
            label="Título"
            type="text"
            placeholder="Digite o título do evento"
            variant="default"
            required
            error={formik.errors.title}
            value={formik.values.title}
            onChange={formik.handleChange}
            name="title"
          />
          <Input
            label="Descrição"
            type="text"
            placeholder="Digite a descrição do evento"
            variant="default"
            required
            error={formik.errors.description}
            value={formik.values.description}
            onChange={formik.handleChange}
            name="description"
          />

          <Dropdown
            label="Tipo"
            name="type"
            value={formik.values.type}
            onChange={(value) => formik.setFieldValue("type", value)}
            options={[
              {
                value: "task",
                label: (
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span>Task</span>
                  </div>
                ),
              },
              {
                value: "meeting",
                label: (
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span>Reunião</span>
                  </div>
                ),
              },
              {
                value: "personal",
                label: (
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span>Pessoal</span>
                  </div>
                ),
              },
            ]}
          />

          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Data de Início"
              type="date"
              name="startDate"
              value={formik.values.startDate}
              onChange={formik.handleChange}
              error={formik.errors.startDate}
            />

            <Input
              label="Data de Final"
              type="date"
              name="endDate"
              value={formik.values.endDate}
              onChange={formik.handleChange}
              error={formik.errors.endDate}
            />
          </section>

          <section className="flex justify-end gap-3">
            <Button
              className=" border-blue-600 border-2"
              variant="secondary"
              onClick={() => HandleDeleteEvent()}
            >
              Excluir Evento
            </Button>
            <Button className="" type="submit">
              Editar Evento
            </Button>
          </section>
        </form>
      </div>
    </Modal>
  );
};

export default EventModal;
