import { format, getDay, parse, startOfWeek } from "date-fns";
import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer, Event } from "react-big-calendar";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { ptBR } from "date-fns/locale";
import Sidebar from "../../Layout/SideBar";
import { Header } from "../../Layout/Header";
import EventModal from "./Components/EventModal";
import { useGetUserTasks } from "./hooks/useGetUserTasks";

const locales = {
  "pt-BR": ptBR,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const calendarMessages = {
  allDay: "Dia inteiro",
  previous: "Anterior",
  next: "Próximo",
  today: "Hoje",
  month: "Mês",
  week: "Semana",
  day: "Dia",
  agenda: "Agenda",
  date: "Data",
  time: "Horário",
  event: "Tarefa",
  noEventsInRange: "Não há tarefas neste período.",
  showMore: (total: number) => `+ ${total} mais`,
};

export interface ICalendarEvent extends Event {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  type: "task" | "meeting" | "personal";
}

const CalendarPage = () => {
  const { data: userTask } = useGetUserTasks();

  const [events, setEvents] = useState<ICalendarEvent[]>([]);
  const [isOpenEvent, setIsOpenEvent] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<
    ICalendarEvent | undefined
  >();

  useEffect(() => {
    const toValidDate = (value?: string) => {
      if (!value) return undefined;
      const dateOnly = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
      if (dateOnly) {
        return new Date(
          Number(dateOnly[1]),
          Number(dateOnly[2]) - 1,
          Number(dateOnly[3]),
        );
      }
      const date = new Date(value);
      return Number.isNaN(date.getTime()) ? undefined : date;
    };

    setEvents(
      (userTask ?? []).flatMap((task) => {
        const datedTask = task as typeof task & {
          startDate?: string;
          dueDate?: string;
          endDate?: string;
        };
        const start = toValidDate(
          datedTask.startDate ?? datedTask.dueDate ?? datedTask.endDate,
        );
        if (!start) return [];

        const end = toValidDate(datedTask.endDate) ?? start;
        return [
          {
            id: String(task.id),
            title: task.title,
            description: task.description,
            start,
            end: end < start ? start : end,
            allDay: true,
            type: "task" as const,
          },
        ];
      }),
    );
  }, [userTask]);

  const eventStyleGetter = (event: ICalendarEvent) => {
    const styles = {
      task: {
        backgroundColor: "#3b82f6",
      },

      meeting: {
        backgroundColor: "#f59e0b",
      },

      personal: {
        backgroundColor: "#10b981",
      },
    };

    return {
      style: {
        ...styles[event.type],
        border: "none",
        color: "#fff",
        borderRadius: "6px",
      },
    };
  };

  const handleSelectSlot = () => {
    setIsOpenEvent(true);
    setSelectedEvent(undefined);
  };

  const handleSelectEvent = (event: ICalendarEvent) => {
    setIsOpenEvent(true);
    setSelectedEvent(event);
  };

  return (
    <div className="relative flex w-full flex-col">
      <Sidebar />
      <Header />
      <div className="flex flex-col p-6 gap-6">
        <div>
          <h1 className="text-3xl font-bold">Calendário</h1>

          <p className="text-slate-500">
            Visualize suas tarefas no calendário.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            selectable
            popup
            views={["month", "week", "day", "agenda"]}
            defaultView="month"
            style={{
              height: 800,
            }}
            culture="pt-BR"
            messages={calendarMessages}
            eventPropGetter={eventStyleGetter}
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
          />
        </div>

        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded" />
            <span>Tarefas</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded" />
            <span>Reuniões</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded" />
            <span>Pessoal</span>
          </div>
        </div>
      </div>

      <EventModal
        isModalOpen={isOpenEvent}
        setIsModalOpen={setIsOpenEvent}
        event={selectedEvent}
        setSelectedEvent={setSelectedEvent}
      />
    </div>
  );
};

export default CalendarPage;
