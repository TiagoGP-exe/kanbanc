import { FC } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Dots } from "tabler-icons-react";
import { TasksKanbanProps } from ".";
import MenuKanban from "../MenuKanban";

interface ItemKanbanProps extends TasksKanbanProps {
  editTask?: (id: string, kanbanIndex: string) => void;
  deleteTask?: (id: string, kanbanIndex: string) => void;
}

const ItemKanban: FC<ItemKanbanProps> = (value) => {
  const date = new Date(value.date);
  return (
    <Draggable index={value.index} draggableId={value.id.toString()}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={` bg-white px-4 rounded-2xl py-4 animation border-2 border-dashed border-transparent`}
        >
          <div className="flex items-center justify-between mb-2 text-lg">
            <h4>{value?.title}</h4>
            <MenuKanban
              editTask={value && value.editTask}
              deleteTask={value && value.deleteTask}
              id={value.id}
              kanbanIndex={value.kanbanIndex}
            />
          </div>
          <p className="text-sm text-justify align-middle break-words">
            {value?.description}
          </p>
          {value?.date && (
            <p className="opacity-70 mt-5 text-right text-xs">
              {date.toLocaleDateString("pt-BR", {
                year: "2-digit",
                month: "2-digit",
                day: "2-digit",
              })}
              {" • "}
              {date.toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default ItemKanban;
