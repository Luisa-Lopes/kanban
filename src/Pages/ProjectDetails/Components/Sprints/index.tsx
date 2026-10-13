import { useEffect, useMemo, useRef, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { PlusIcon } from "@heroicons/react/24/outline";
import { formatDate } from "react-calendar/src/shared/dateFormatter.js";
import SprintHeader from "./Components/SprintHeader";
import MainTaskCard from "./Components/MainTaskCard";
import TaskColumn from "./Components/TaskColumn";
import ModalTaskColumn from "./Components/ModalTaskColumn";
import {
  IProjectMember,
  IProjectSprint,
  IProjectTask,
  TaskStatus,
} from "@/Interfaces/Projects";
import { updateTask } from "@/services/task";

interface ISprints {
  sprint: IProjectSprint;
  memberList: IProjectMember[];
}

const taskColumns = [
  {
    id: TaskStatus.Todo,
    title: "A Fazer",
    marker: "bg-slate-400",
    count: "bg-slate-100 text-slate-600",
  },
  {
    id: TaskStatus.InProgress,
    title: "Em Andamento",
    marker: "bg-sky-500",
    count: "bg-sky-100 text-sky-700",
  },
  {
    id: TaskStatus.Review,
    title: "Revisão",
    marker: "bg-amber-500",
    count: "bg-amber-100 text-amber-700",
  },
  {
    id: TaskStatus.Done,
    title: "Concluído",
    marker: "bg-emerald-500",
    count: "bg-emerald-100 text-emerald-700",
  },
];

const Sprints = ({ sprint, memberList }: ISprints) => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [clickSprint, setClickSprint] = useState(false);
  const [date, setDate] = useState<[Date, Date]>([new Date(), new Date()]);
  const [tasks, setTasks] = useState<IProjectTask[]>(sprint.tasks ?? []);
  const [selectedTaskId, setSelectedTaskId] = useState<string>();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [newTaskStatus, setNewTaskStatus] = useState(TaskStatus.Todo);
  const boardRef = useRef<HTMLDivElement>(null);

  const startDate = formatDate("pt", date[0]);
  const endDate = formatDate("pt", date[1]);

  useEffect(() => {
    setTasks(sprint.tasks ?? []);

    if (sprint.startDate && sprint.endDate) {
      setDate([new Date(sprint.startDate), new Date(sprint.endDate)]);
    } else {
      setDate([new Date(), new Date()]);
    }
  }, [sprint]);

  useEffect(() => {
    const board = boardRef.current;
    if (!board) return;
  }, [clickSprint, tasks.length]);

  const onDragEnd = async ({ source, destination }: DropResult) => {
    if (!destination) return;

    const sourceStatus = Number(source.droppableId) as TaskStatus;
    const destinationStatus = Number(destination.droppableId) as TaskStatus;
    const sourceTasks = tasks.filter((task) => task.status === sourceStatus);
    const movedTask = sourceTasks[source.index];
    if (!movedTask) return;

    if (sourceStatus === destinationStatus) {
      if (source.index === destination.index) return;
      sourceTasks.splice(source.index, 1);
      sourceTasks.splice(destination.index, 0, movedTask);
      setTasks([
        ...tasks.filter((task) => task.status !== sourceStatus),
        ...sourceTasks,
      ]);
      return;
    }

    const destinationTasks = tasks.filter(
      (task) => task.status === destinationStatus,
    );
    sourceTasks.splice(source.index, 1);
    destinationTasks.splice(destination.index, 0, {
      ...movedTask,
      status: destinationStatus,
    });

    const previousTasks = tasks;
    const movedTasks = [
      ...tasks.filter(
        (task) =>
          task.status !== sourceStatus && task.status !== destinationStatus,
      ),
      ...sourceTasks,
      ...destinationTasks,
    ];

    setTasks(movedTasks);

    try {
      const savedTask = await updateTask(
        {
          id: movedTask.id,
          projectSprintId: sprint.id,
          title: movedTask.title,
          description: movedTask.description,
          assigneeId: movedTask.assigneeId,
          status: destinationStatus,
        },
        sprint.id,
        movedTask.id,
      );
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === movedTask.id ? { ...task, ...savedTask } : task,
        ),
      );
    } catch (error) {
      setTasks(previousTasks);
    }
  };

  const selectedTask = useMemo(
    () => tasks.find((task) => String(task.id) === selectedTaskId),
    [selectedTaskId, tasks],
  );

  return (
    <div className="mb-4 flex w-full flex-col overflow-visible rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
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

      <main
        className={`box-border w-full overflow-hidden transition-all duration-300 ease-in-out ${
          clickSprint ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div
          ref={boardRef}
          className="sprint-board-scroll block h-[360px] max-h-[360px] w-full min-w-0 max-w-full overscroll-x-contain bg-gradient-to-b from-slate-50 to-white p-4 pb-5"
        >
          <div className="flex w-max min-w-[1360px] gap-3">
            <div className="flex w-[250px] min-w-[250px] shrink-0 flex-col">
              <div className="mb-3 flex h-10 items-center justify-between px-1">
                <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <span className="h-2 w-2 rounded-full bg-indigo-500" />
                  Resumo da sprint
                </h4>
                <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] font-semibold text-indigo-700">
                  {tasks.length} tarefas
                </span>
              </div>
              <MainTaskCard sprint={sprint} />
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
              <div className="flex w-max flex-none gap-3">
                {taskColumns.map((column) => (
                  <Droppable key={column.id} droppableId={String(column.id)}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="min-h-[320px] w-[260px] shrink-0 rounded-xl border border-slate-200/90 bg-slate-100/70 p-2.5 transition-colors duration-200 hover:border-slate-300 hover:bg-slate-100"
                      >
                        <div className="mb-3 flex h-10 items-center justify-between gap-2 px-1">
                          <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                            <span
                              className={`h-2 w-2 rounded-full ${column.marker}`}
                            />
                            {column.title}
                          </h4>
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${column.count}`}
                            >
                              {
                                tasks.filter(
                                  (task) => task.status === column.id,
                                ).length
                              }
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedTaskId(undefined);
                                setNewTaskStatus(column.id);
                                setIsTaskModalOpen(true);
                              }}
                              aria-label={`Adicionar tarefa em ${column.title}`}
                              title="Adicionar tarefa"
                              className="rounded-md p-1 text-slate-500 transition-colors hover:bg-white hover:text-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
                            >
                              <PlusIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="min-h-[250px]">
                          {tasks.filter((task) => task.status === column.id)
                            .length === 0 && (
                            <div className="mx-1 mt-1 rounded-lg border border-dashed border-slate-300 px-3 py-5 text-center text-xs text-slate-400">
                              Arraste uma tarefa para cá
                            </div>
                          )}
                          {tasks
                            .filter((task) => task.status === column.id)
                            .map((task, index) => (
                              <Draggable
                                key={task.id}
                                draggableId={String(task.id)}
                                index={index}
                              >
                                {(draggableProvided) => (
                                  <div
                                    ref={draggableProvided.innerRef}
                                    {...draggableProvided.draggableProps}
                                    {...draggableProvided.dragHandleProps}
                                    style={{
                                      ...draggableProvided.draggableProps.style,
                                      cursor: "grab",
                                    }}
                                  >
                                    <TaskColumn
                                      task={{ ...task, id: String(task.id) }}
                                      handleModal={() => {
                                        setSelectedTaskId(String(task.id));
                                        setIsTaskModalOpen(true);
                                      }}
                                    />
                                  </div>
                                )}
                              </Draggable>
                            ))}
                          {provided.placeholder}
                        </div>
                      </div>
                    )}
                  </Droppable>
                ))}
              </div>
            </DragDropContext>
          </div>
        </div>
      </main>

      <ModalTaskColumn
        isModalOpen={isTaskModalOpen}
        setIsModalOpen={setIsTaskModalOpen}
        task={selectedTask}
        sprintId={sprint.id}
        memberList={memberList ?? []}
        initialStatus={newTaskStatus}
        onTaskSaved={(savedTask) => {
          setTasks((currentTasks) => {
            const exists = currentTasks.some(
              (task) => task.id === savedTask.id,
            );
            return exists
              ? currentTasks.map((task) =>
                  task.id === savedTask.id ? { ...task, ...savedTask } : task,
                )
              : [...currentTasks, savedTask];
          });
        }}
      />
    </div>
  );
};

export default Sprints;
