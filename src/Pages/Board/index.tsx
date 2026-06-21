import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import Sidebar from "../../Layout/SideBar";
import { Header } from "../../Layout/Header";

const initialTasks = {
  ToDo: [
    { id: "1", text: "Organizar reunião" },
    { id: "2", text: "Enviar e-mails" },
  ],
  InProgress: [{ id: "3", text: "Marcar reunião" }],
  Done: [{ id: "4", text: "Criar tema da reunião" }],
};

export const Board = () => {
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);

  const [date, setDate] = useState<[Date, Date]>([new Date(), new Date()]);

  const formatDateString = (d: Date): string => {
    return d.toLocaleDateString("pt-BR");
  };

  const startDate = formatDateString(date[0]);
  const endDate = formatDateString(date[1]);

  const [tasks, setTasks] = useState(initialTasks);

  const onDragEnd = (result: DropResult): void => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Clonar as tarefas
    const sourceTasks = [...tasks[source.droppableId]];
    const destTasks = [...tasks[destination.droppableId]];
    const [movedTask] = sourceTasks.splice(source.index, 1);

    destTasks.splice(destination.index, 0, movedTask);

    setTasks({
      ...tasks,
      [source.droppableId]: sourceTasks,
      [destination.droppableId]: destTasks,
    });
  };

  return (
    <div className="relative flex flex-col">
      <Sidebar />

      <Header />

      <main className="w-full h-full flex p-6 ">
        <div className="bg-white bg-opacity-50 h-[100%] w-[100%] m-auto rounded-md">
          <section>
            <div className="bg-white p-1 rounded-sm w-full flex flex-col">
              <header className="py-1 flex">
                <button
                  className="relative border-gray-200 border-solid border-2 p-1 ml-auto  rounded-md shadow-md"
                  onClick={() => setOpenCalendar(!openCalendar)}
                >
                  {`${startDate} - ${endDate}`}
                  {openCalendar && (
                    <Calendar
                      className="absolute right-0 top-10"
                      onChange={setDate}
                      value={date}
                      calendarType="gregory"
                      selectRange
                    />
                  )}
                </button>
              </header>
              <hr />

              <main className="flex  w-full">
                <section className="flex">
                  <div
                    className="flex col-span-1 flex-col "
                    style={{
                      height: 130,
                      minWidth: 250,
                      width: "80%",
                      maxWidth: 220,
                    }}
                  >
                    <h4 className="text-center font-bold text-lg mb-2">Task</h4>
                    <div
                      className="bg-gray-300 rounded-lg shadow-md p-2 mx-auto"
                      style={{
                        height: 130,
                        width: 200,
                      }}
                    >
                      <h6 className="font-medium text-sm">
                        Reunião de Gente e Gestão
                      </h6>
                      <hr />
                      <p className="text-xs">
                        Organizar, marcar, criar temas para reunião.
                      </p>
                    </div>
                  </div>
                  <DragDropContext onDragEnd={onDragEnd}>
                    <div
                      className="flex flex-grow gap-2 p-0"
                      style={{
                        height: "100%",
                        width: "100%",
                      }}
                    >
                      {Object.keys(tasks).map((columnId) => (
                        <Droppable key={columnId} droppableId={columnId}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className=""
                              style={{
                                height: "100%",
                                minWidth: 170,
                                width: "100%",
                              }}
                            >
                              <h4 className="text-center font-bold text-lg mb-2">
                                {columnId === "ToDo"
                                  ? "A Fazer"
                                  : columnId === "InProgress"
                                    ? "Em Andamento"
                                    : "Concluído"}
                              </h4>
                              {tasks?.[columnId]?.map((task, index) => (
                                <Draggable
                                  key={task.id}
                                  draggableId={task.id}
                                  index={index}
                                >
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className="p-4 bg-gray-100 rounded-lg shadow-md my-2 mx-auto"
                                      style={{
                                        height: 130,
                                        minWidth: 150,
                                        width: "80%",
                                      }}
                                    >
                                      <h6 className="font-medium text-sm">
                                        {task.text}
                                      </h6>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      ))}
                    </div>
                  </DragDropContext>
                </section>
              </main>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
