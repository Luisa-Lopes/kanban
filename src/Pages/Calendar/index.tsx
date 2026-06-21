import { format, getDay, parse, startOfWeek } from "date-fns";
import { useState } from "react";
import { Calendar, dateFnsLocalizer, Event } from "react-big-calendar";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { ptBR } from "date-fns/locale";
import Sidebar from "../../Layout/SideBar";
import { Header } from "../../Layout/Header";
import EventModal from "./Components/EventModal";

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

export interface ICalendarEvent extends Event {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  type: "task" | "meeting" | "personal";
}

const initialEvents: ICalendarEvent[] = [
  {
    id: "1",
    title: "Entrega Sprint 1",
    description: "Finalizar dashboard principal",
    start: new Date(2026, 5, 17, 9, 0),
    end: new Date(2026, 5, 17, 10, 0),
    type: "task",
  },

  {
    id: "2",
    title: "Reunião Marketing",
    description: "Planejamento de campanhas",
    start: new Date(2026, 5, 18, 14, 0),
    end: new Date(2026, 5, 18, 15, 0),
    type: "meeting",
  },

  {
    id: "3",
    title: "Academia",
    description: "Treino de pernas",
    start: new Date(2026, 5, 19, 19, 0),
    end: new Date(2026, 5, 19, 20, 0),
    type: "personal",
  },
];

const CalendarPage = () => {
  const [events, setEvents] = useState<ICalendarEvent[]>(initialEvents);
  const [isOpenEvent, setIsOpenEvent] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<
    ICalendarEvent | undefined
  >();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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

  const handleSelectSlot = ({ start }: { start: Date }) => {
    setIsOpenEvent(true);
    setSelectedEvent(undefined);
  };

  const handleSelectEvent = (event: ICalendarEvent) => {
    setIsOpenEvent(true);
    setSelectedEvent(event);
  };

  return (
    <div className="relative flex flex-col w-screen">
      <Sidebar />
      <Header />
      <div className="flex flex-col p-6 gap-6">
        <div>
          <h1 className="text-3xl font-bold">Calendário</h1>

          <p className="text-slate-500">
            Visualize tarefas, reuniões e eventos pessoais.
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
            eventPropGetter={eventStyleGetter}
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            onNavigate={(date) => setSelectedDate(date)}
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
