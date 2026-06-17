import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction } from "react";
import Calendar from "react-calendar";

interface ISprintHeader {
  clickSprint: boolean;
  setClickSprint: (clickSprint: boolean) => void;
  openCalendar: boolean;
  setOpenCalendar: (openCalendar: boolean) => void;
  startDate: string;
  endDate: string;
  title: string;
  date: [Date, Date];
  setDate: Dispatch<SetStateAction<[Date, Date]>>;
}

const SprintHeader = ({
  clickSprint,
  setClickSprint,
  setOpenCalendar,
  openCalendar,
  startDate,
  endDate,
  title,
  setDate,
  date,
}: ISprintHeader) => {
  return (
    <header className="p-2 flex w-full cursor-pointer items-center gap-2">
      {clickSprint ? (
        <ChevronUpIcon
          height={20}
          width={20}
          onClick={() => setClickSprint(false)}
        />
      ) : (
        <ChevronDownIcon
          height={20}
          width={20}
          onClick={() => setClickSprint(true)}
        />
      )}

      <h5 className="p-auto my-auto font-semibold">{title}</h5>
      <div className="relative ml-auto">
        <button
          type="button"
          className=" bg-white border-solid  p-1 rounded-md shadow-md"
          onClick={() => setOpenCalendar(!openCalendar)}
          style={{ width: "230px" }}
        >
          {`${startDate} - ${endDate}`}
        </button>

        {openCalendar && (
          <Calendar
            className="absolute right-0 top-12 z-50 rounded-md bg-white shadow-lg"
            onChange={(value) => {
              if (Array.isArray(value) && value[0] && value[1]) {
                setDate([value[0], value[1]]);
              }
            }}
            value={date}
            calendarType="gregory"
            selectRange
          />
        )}
      </div>
    </header>
  );
};

export default SprintHeader;
