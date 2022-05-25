import { Menu } from "@mantine/core";
import { FC } from "react";
import { Settings, Trash } from "tabler-icons-react";

interface MenuKanbanProps {
  editTask?: (id: string, kanbanIndex: string) => void;
  deleteTask?: (id: string, kanbanIndex: string) => void;
  id: string;
  kanbanIndex: string;
}

const MenuKanban: FC<MenuKanbanProps> = ({
  deleteTask,
  editTask,
  id,
  kanbanIndex,
}) => {
  console.log(editTask);

  return (
    <Menu>
      <Menu.Item
        onClick={() => editTask && editTask(id, kanbanIndex)}
        icon={<Settings size={14} />}
      >
        Editar
      </Menu.Item>

      <Menu.Item
        onClick={() => deleteTask && deleteTask(id, kanbanIndex)}
        color="red"
        icon={<Trash size={14} />}
      >
        Deletar tarefa
      </Menu.Item>
    </Menu>
  );
};

export default MenuKanban;
