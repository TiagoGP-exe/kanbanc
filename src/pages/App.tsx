import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Board from "../components/Board";
import Navbar from "../components/Navbar";

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Navbar />
      <Board />
    </DndProvider>
  );
};

export default App;
