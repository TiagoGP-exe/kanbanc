import { FC, useContext, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { TasksKanbanProps } from ".";
import kanbanContext from "../../context/kanbanContext";

const ItemKanban: FC<TasksKanbanProps> = (value) => {
  const ref = useRef(null);
  const { move } = useContext<any>(kanbanContext);

  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: "CARD",
      item: {
        id: value.id,
        index: value.index,
        kanbanIndex: value.kanbanIndex,
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    []
  );

  const [, dropRef] = useDrop({
    accept: "CARD",
    hover(item: any, monitor) {
      const draggedListIndex = item.kanbanIndex;
      const targetListIndex = value.kanbanIndex;

      const draggedIndex = item.index;
      const targetIndex = value.index;

      if (draggedIndex === targetIndex && value.id === item.id) {
        return;
      }

      const targetSize = ref.current?.getBoundingClientRect()!;
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;

      const draggedOffset = monitor.getClientOffset();
      const draggedTop = draggedOffset?.y - targetSize.top;

      if (draggedIndex < targetIndex! && draggedTop < targetCenter) {
        return;
      }

      if (draggedIndex > targetIndex! && draggedTop > targetCenter) {
        return;
      }

      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

      item.index = targetIndex;
      item.kanbanIndex = targetListIndex;
    },
    drop: () => {},
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  dragRef(dropRef(ref));

  return (
    <div
      ref={ref}
      className={`${
        isDragging && "border-slate-500 bg-transparent"
      } bg-white px-4 rounded-2xl py-4 animation border-2 border-dashed border-transparent`}
    >
      <div className={`${isDragging && "opacity-0"}`}>
        <div className="flex items-center justify-between mb-2 text-lg">
          <h4>{value?.title}</h4>
          <BiDotsHorizontalRounded className="animation hover:opacity-50 cursor-pointer" />
        </div>

        <p className="text-sm text-justify align-middle">
          {value?.description}
        </p>

        <p className="opacity-70 mt-5 text-right text-xs">{value?.date}</p>
      </div>
    </div>
  );
};

export default ItemKanban;
