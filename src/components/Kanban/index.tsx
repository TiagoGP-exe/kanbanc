import { FC, useContext } from "react";
import { useDrop } from "react-dnd";
import { TiPlus } from "react-icons/all";
import kanbanContext from "../../context/kanbanContext";
import ItemKanban from "./ItemKaban";

export interface TasksKanbanProps {
  title: string;
  description: string;
  date: string;
  id: number;
  index?: number;
  kanbanIndex?: number;
}

export interface KanbanProps {
  index?: number;
  title: string;
  tasks: TasksKanbanProps[];
}

const Kanban: FC<KanbanProps> = ({ title, tasks, index: kanbanIndex }) => {
  const { move } = useContext<any>(kanbanContext);
  const [, dropRef] = useDrop({
    accept: "CARD",
    hover(item: any) {
      const draggedListIndex = item.kanbanIndex;
      const targetListIndex = kanbanIndex;

      const draggedIndex = item.index;
      const targetIndex = item.index;
      if (tasks.length) return;

      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

      item.index = targetIndex;
      item.kanbanIndex = targetListIndex;

      console.log(item, kanbanIndex);
    },
    drop: () => {},
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={dropRef}
      className="bg-secondary w-full max-w-[320px] px-4 py-4 rounded-2xl "
    >
      <div className="flex items-center justify-between text-dark mt-3 mb-5 px-2 text-xl">
        <h2>{title}</h2>
        <TiPlus className=" hover:scale-110 hover:text-blue-500 border-dark animation cursor-pointer duration-300 border-[2px] hover:border-blue-500 rounded-full" />
      </div>

      <div className="flex flex-col gap-3">
        {tasks.map((task, index) => (
          <ItemKanban
            id={task?.id}
            date={task?.date}
            description={task?.description}
            title={title}
            key={index}
            kanbanIndex={kanbanIndex}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Kanban;
