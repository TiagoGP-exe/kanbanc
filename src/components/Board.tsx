import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Modal } from "@mantine/core";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { Blockquote, LetterT, Plus } from "tabler-icons-react";
import * as yup from "yup";
import { intialData } from "../utils/intialData";
import Kanban from "./Kanban";

const createGuidId = () =>
  "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

const schema = yup
  .object({
    title: yup.string().required("O título é obrigatório"),
    description: yup.string().required("A descrição é obrigatória"),
  })
  .required();

interface IFormInput {
  title: string;
  description: string;
  date: Date;
}

export interface IOpened {
  idKanban: string;
  type: string;
}

const Board = () => {
  const [boardData, setBoardData] = useState(intialData);
  const [ready, setReady] = useState(false);
  const [opened, setOpened] = useState<IOpened>({ idKanban: "", type: "" });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const data = localStorage.getItem("kanbanData");
    if (data) {
      const parsedData = JSON.parse(data);

      if (parsedData.length) {
        setBoardData(parsedData);
      }
    }
    setReady(true);
  }, []);

  const onDragEnd = (re: any) => {
    if (!re.destination) return;
    const newBoardData = boardData;

    const findInitial = newBoardData.findIndex(
      (e) => e.title === re.source.droppableId
    );
    const findFinal = newBoardData.findIndex(
      (e) => e.title === re.destination.droppableId
    );
    const dragItem = newBoardData[findInitial].tasks[re.source.index];
    newBoardData[findInitial].tasks.splice(re.source.index, 1);
    newBoardData[findFinal].tasks.splice(re.destination.index, 0, dragItem);
    localStorage.setItem("kanbanData", JSON.stringify(newBoardData));
    setBoardData(newBoardData);
  };

  const addTask = async (kanbanIndex: string) => {
    console.log(kanbanIndex);
    setOpened({ idKanban: kanbanIndex, type: "add" });
  };

  const onSubmit = (data: IFormInput) => {
    const newData = [...boardData];
    const findIndex = newData.findIndex((e) => e.title === opened.idKanban);

    console.log(data);

    if (opened.type === "edit") {
      const result = newData.map((task) => ({
        ...task,
        tasks: task.tasks.map((item) => {
          if (item.date === data.date) {
            return {
              ...item,
              ...data,
            };
          }
          return item;
        }),
      }));

      setBoardData(result);
    } else {
      newData[findIndex].tasks.push({
        title: data.title,
        description: data.description,
        date: data.date,
        id: createGuidId(),
        index: newData[findIndex].tasks.length,
        kanbanIndex: opened.idKanban,
      });
    }

    localStorage.setItem("kanbanData", JSON.stringify(newData));

    reset();
    setOpened({ idKanban: "", type: "" });
  };

  const editTask = (id: string, kanbanIndex: string) => {
    const findIndex = boardData.findIndex((e) => e.title === kanbanIndex);
    const findTaskIndex = boardData[findIndex].tasks.findIndex(
      (e) => e.id === id
    );

    const task = boardData[findIndex].tasks[findTaskIndex];
    setValue("title", task.title);
    setValue("description", task.description);
    setValue("date", task.date);
    setOpened({ idKanban: kanbanIndex, type: "edit" });
  };

  const deleteTask = (id: string, kanbanIndex: string) => {
    console.log(id);
    // const findIndex = boardData.findIndex((e) => e.title === opened);
    // const findTaskIndex = boardData[findIndex].tasks.findIndex(
    //   (e) => e.id === id
    // );
    // const newData = [...boardData];
    // newData[findIndex].tasks.splice(findTaskIndex, 1);
    // localStorage.setItem("kanbanData", JSON.stringify(newData));
    // setBoardData(newData);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex w-full justify-center items-start pt-12 container-kanban bg-background">
        <Modal
          opened={!!opened.idKanban}
          onClose={() => {
            setOpened({ idKanban: "", type: "" }), reset();
          }}
          centered
          title="Adicionar Tarefa"
          styles={{
            title: {
              fontWeight: "bold",
              fontSize: "1.5rem",
            },
            modal: {
              borderRadius: "0.75rem",
            },
          }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col  gap-3"
          >
            <Input
              {...register("title")}
              icon={<LetterT size={18} />}
              placeholder="Título da atividade"
              radius="md"
              invalid={!!errors.title}
            />
            {errors.title?.message && (
              <p className="font-bold text-red-500 text-xs">
                {errors.title?.message}
              </p>
            )}
            <Input
              {...register("description")}
              icon={<Blockquote size={18} />}
              placeholder="Descrição da atividade"
              radius="md"
              invalid={!!errors.description}
            />
            {errors.description?.message && (
              <p className="font-bold text-red-500 text-xs">
                {errors.description?.message}
              </p>
            )}

            <button
              onClick={() =>
                opened.type === "add" && setValue("date", new Date())
              }
              className="bg-blue-500 text-white text-sm py-2 px-5 rounded-xl asdasd font-bold hover:bg-transparent hover:text-blue-500 border-blue-500 border-2 transition-all duration-200 ease-in-out"
            >
              <div className="flex items-center justify-center gap-2">
                <Plus size={18} />
                Adicionar atividade
              </div>
            </button>
          </form>
        </Modal>

        {ready ? (
          <Droppable
            droppableId="all-collumns"
            direction="horizontal"
            type="column"
          >
            {(provided) => (
              <div
                className="flex flex-wrap gap-5 w-11/12 max-w-screen-xl justify-center items-start"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {boardData.map(({ title, tasks }, i) => (
                  <Kanban
                    title={title}
                    tasks={tasks}
                    index={i}
                    key={title}
                    addTask={addTask}
                    deleteTask={deleteTask}
                    editTask={editTask}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ) : null}
      </div>
    </DragDropContext>
  );
};

export default Board;
