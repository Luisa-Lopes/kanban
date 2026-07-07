import { useEffect, useMemo, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { TimestampToDate } from "../../../../utils/DatesFunctions";
import { formatDate } from "react-calendar/src/shared/dateFormatter.js";
import SprintHeader from "./Components/SprintHeader";
import MainTaskCard from "./Components/MainTaskCard";
import TaskColumn from "./Components/TaskColumn";
import ModalTaskColumn from "./Components/ModalTaskColumn";
import { ITasks } from "../../types";

interface ISprint {
  title: string;
  tasks: ITasks;
  startDate: number;
  endDate: number;
}

interface ISprints {
  sprint: ISprint;
}

const Sprints = ({ sprint }: ISprints) => {
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);
  const [clickSprint, setClickSprint] = useState<boolean>(false);
  const [date, setDate] = useState<[Date, Date]>([new Date(), new Date()]);
  const [tasks, setTasks] = useState<ITasks>(sprint.tasks);

  const [selectedTaskId, setSelectedTaskId] = useState<string | undefined>();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false);

  const startDate = formatDate("pt", date[0]);
  const endDate = formatDate("pt", date[1]);

  useEffect(() => {
    if (sprint.startDate && sprint.endDate) {
      let start = TimestampToDate({ timestamp: sprint.startDate });
      let end = TimestampToDate({ timestamp: sprint.endDate });
      setDate([start, end]);
    } else {
      setDate([new Date(), new Date()]);
    }
  }, [sprint?.endDate, sprint?.startDate]);

  const onDragEnd = (result: DropResult) => {
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

  const selectedTask = useMemo(() => {
    if (selectedTaskId === undefined) {
      return undefined;
    }

    const allTasks = [
      ...sprint?.tasks?.["ToDo"],
      ...sprint?.tasks?.["InProgress"],
      ...sprint?.tasks?.["Done"],
    ];

    return allTasks.find((task) => task.id === selectedTaskId);
  }, [selectedTaskId, sprint?.tasks]);

  return (
    <div
      className="p-1 rounded-md w-full flex flex-col bg-sky-100 mb-3 shadow-lg"
      style={{ maxWidth: "100%" }}
    >
      <SprintHeader
        clickSprint={clickSprint}
        setClickSprint={setClickSprint}
        setOpenCalendar={setOpenCalendar}
        openCalendar={openCalendar}
        startDate={startDate}
        endDate={endDate}
        title={sprint.title}
        setDate={setDate}
        date={date}
      />

      {clickSprint && <hr />}

      <main
        className={`flex box-border overflow-hidden w-full transition-all duration-1000 ease-in-out ${
          clickSprint ? "h-[330px]" : "h-0"
        }`}
      >
        <section
          className="flex "
          style={{ minWidth: "100%", overflowX: "auto" }}
        >
          <div
            className="flex col-span-1 flex-col "
            style={{
              minHeight: 130,
              minWidth: 250,
              width: "80%",
              maxWidth: 220,
            }}
          >
            <h4 className="text-center font-bold text-lg mb-2">Task</h4>

            <MainTaskCard
              title="Reunião de Gente e Gestão"
              description="Organizar, marcar, criar temas para reunião."
            />
          </div>

          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex flex-grow gap-2 p-0" style={{ width: "100%" }}>
              {Object.keys(tasks)?.map((columnId) => (
                <Droppable key={columnId} droppableId={columnId}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{
                        width: "100%",
                        minHeight: 250,
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
                              style={{
                                ...provided.draggableProps.style,
                              }}
                            >
                              <TaskColumn
                                task={task}
                                setIsModalOpen={setIsTaskModalOpen}
                                handleModal={() => {
                                  setIsTaskModalOpen(true);
                                  setSelectedTaskId(task.id);
                                }}
                              />
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

      <ModalTaskColumn
        isModalOpen={isTaskModalOpen}
        setIsModalOpen={setIsTaskModalOpen}
        task={selectedTask}
      />
    </div>
  );
};

export default Sprints;
