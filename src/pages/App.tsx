import { MantineProvider } from "@mantine/core";
import Board from "../components/Board";
import Navbar from "../components/Navbar";

const App = () => {
  return (
    <MantineProvider
      theme={{ fontFamily: "Roboto Slab" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Navbar />
      <Board />
    </MantineProvider>
  );
};

export default App;
