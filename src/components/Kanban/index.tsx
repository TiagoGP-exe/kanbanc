import { FC } from "react";
import { Droppable } from "react-beautiful-dnd";
import { Plus } from "tabler-icons-react";
import ItemKanban from "./ItemKaban";

export interface TasksKanbanProps {
  title: string;
  description: string;
  date: Date;
  id: string;
  index: number;
  kanbanIndex: string;
}

export interface KanbanProps {
  index: number;
  title: string;
  tasks: TasksKanbanProps[];
  addTask?: (id: string) => void;
  editTask?: (id: string) => void;
  deleteTask?: (id: string) => void;
}

const Kanban: FC<KanbanProps> = ({
  title,
  tasks,
  addTask,
  deleteTask,
  editTask,
}) => (
  <div className="bg-secondary w-full max-w-[320px] px-4 py-4 rounded-2xl ">
    <div className="flex items-center justify-between text-dark mt-3 mb-5 px-2 text-xl">
      <h2>{title}</h2>
      <Plus
        onClick={() => {
          addTask ? addTask(title) : undefined;
        }}
        className=" hover:scale-110 hover:text-blue-500 border-dark animation cursor-pointer duration-300 border-[2px] hover:border-blue-500 rounded-full"
      />
    </div>
    <div
      className={`flex flex-col gap-10 overflow-y-auto overflow-x-hidden h-auto transition-all duration-300 `}
    >
      <Droppable droppableId={title} type="task">
        {(provided, snapshot) => (
          <div
            className={`flex flex-col p-2 gap-4 transition-colors duration-200 rounded-2xl ${
              snapshot.isDraggingOver && "bg-slate-300  "
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, Iindex) => (
              <ItemKanban
                id={task.id}
                date={task?.date}
                description={task?.description}
                title={task?.title}
                kanbanIndex={title}
                index={Iindex}
                key={task.id}
                deleteTask={deleteTask}
                editTask={editTask}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  </div>
);

export default Kanban;
