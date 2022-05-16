import { useState } from "react";
import Kanban, { KanbanProps } from "./Kanban";
import kanbanContext from "../context/kanbanContext";
import { useDrop } from "react-dnd";

const fakeDate: KanbanProps[] = [
  {
    title: "A FAZER",
    tasks: [
      {
        title: "Tarefa 1",
        description: "asdad",
        date: "10/04/2022 • 08:30",
        id: 1,
      },
    ],
  },
  {
    title: "EM ANDAMENTO",
    tasks: [
      {
        title: "Tarefa 1",
        description: "asdad",
        date: "10/04/2022 • 08:30",
        id: 2,
      },
    ],
  },
  {
    title: "FINALIZADO",
    tasks: [
      {
        title: "Tarefa 1",
        description: "asdad",
        date: "10/04/2022 • 08:30",
        id: 3,
      },
    ],
  },
];

const Board = () => {
  const [kanban, setKanban] = useState(fakeDate);

  const move = (fromList: number, toList: number, from: number, to: number) => {
    const newKanban = kanban.map((item) => item);
    const dragged = newKanban[fromList].tasks[to];

    newKanban[fromList].tasks.splice(from, 1);
    newKanban[toList].tasks.splice(to, 0, dragged);
    setKanban(newKanban);
  };

  return (
    <kanbanContext.Provider value={{ kanban, move }}>
      <div className="flex w-full justify-center items-start pt-12 container-kanban bg-background">
        <div className="flex flex-wrap gap-5  w-11/12 max-w-screen-xl justify-center">
          {kanban.map(({ title, tasks }, i) => (
            <Kanban title={title} tasks={tasks} key={i} index={i} />
          ))}
        </div>
      </div>
    </kanbanContext.Provider>
  );
};

export default Board;
