import { useEffect, useState } from "react";
import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult,
} from "@hello-pangea/dnd";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { formatDate } from "react-calendar/dist/cjs/shared/dateFormatter";
import { ITasks } from "../..";
import Calendar from "react-calendar";
import {
    DateToTimestamp,
    TimestampToDate,
} from "../../../../utils/DatesFuntions";

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

    return (
        <div
            className="p-1 rounded-md w-full flex flex-col bg-white mb-3 shadow-lg"
            style={{ maxWidth: "100%" }}
        >
            <header className="py-1 flex w-full cursor-pointer">
                {clickSprint ? (
                    <ChevronDownIcon
                        height={30}
                        width={30}
                        onClick={() => setClickSprint(!clickSprint)}
                    />
                ) : (
                    <ChevronUpIcon
                        height={30}
                        width={30}
                        onClick={() => setClickSprint(!clickSprint)}
                    />
                )}

                <h5 className="p-auto my-auto font-semibold">
                    {sprint?.title}
                </h5>
                <button
                    className="relative border-gray-200 border-solid border-2 p-1 ml-auto rounded-md shadow-md"
                    onClick={() => setOpenCalendar(!openCalendar)}
                    style={{ width: "230px" }}
                >
                    {`${startDate} - ${endDate}`}
                    {openCalendar && (
                        <Calendar
                            className="absolute right-0 top-10"
                            onChange={(newDate: Date[]) => setDate(newDate)}
                            value={date}
                            calendarType="gregory"
                            selectRange
                        />
                    )}
                </button>
            </header>
            <hr />

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
                            height: 130,
                            minWidth: 250,
                            width: "80%",
                            maxWidth: 220,
                        }}
                    >
                        <h4 className="text-center font-bold text-lg mb-2">
                            Task
                        </h4>
                        <div
                            className="bg-gray-300 rounded-lg shadow-md p-2 mx-auto"
                            style={{ height: 130, width: 200 }}
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
                            style={{ width: "100%" }}
                        >
                            {Object.keys(tasks).map((columnId) => (
                                <Droppable
                                    key={columnId}
                                    droppableId={columnId}
                                >
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className=""
                                            style={{
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
                                            {tasks?.[columnId]?.map(
                                                (task, index) => (
                                                    <Draggable
                                                        key={task.id}
                                                        draggableId={task.id}
                                                        index={index}
                                                    >
                                                        {(provided) => (
                                                            <div
                                                                ref={
                                                                    provided.innerRef
                                                                }
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
                                                )
                                            )}
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
    );
};

export default Sprints;
