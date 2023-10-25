import { useState } from "react";
import { localTime } from "../functions/localTimeConverter";

const AccordionItem = ({
  title,
  content,
  task,
  editButtonHandler,
  deleteButtonHandler,
  showUser,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const createTime = localTime(task.createdAt);

  return (
    <div className="border-b">
      <button
        className="flex items-center justify-between w-full p-4 focus:outline-none"
        onClick={toggleAccordion}
      >
        <span className="text-left font-medium ">{title}</span>
        <span className="flex flex-row space-x-2">
          <span className="text-xs text-gray-600">
            {showUser ? <span>{`created by : ${showUser}`}</span> : null}
          </span>
          <span className={`transform ${isOpen ? "rotate-180" : "rotate-0"}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6"
            >
              <path
                fill-rule="evenodd"
                d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </span>
      </button>
      <div className={`p-4 ${isOpen ? "" : "hidden"}  flex flex-col`}>
        <div className="text-sm">{content}</div>
        <div className="flex flex-row justify-between">
          <div className="text-xs">Time : {createTime} </div>
          <div className="space-x-4">
            <button
              className="deleteTaskbutton"
              onClick={() => deleteButtonHandler(task.id)}
            >
              Delete
            </button>
            <button
              className="editTaskbutton"
              onClick={() => editButtonHandler(task)}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
