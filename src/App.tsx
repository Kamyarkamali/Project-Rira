import { useEffect } from "react";
import "./App.css";

//components
import StickyList from "./components/StickyList";

//Custom hook
import { useTitle } from "./hooks/useTitle";

//types/enums
import { NAMETITLEPROJECT } from "./types/enum/enums";

function App() {
  useEffect(() => {
    useTitle(NAMETITLEPROJECT.titlePage);
  }, []);

  return (
    <>
      <StickyList />
    </>
  );
}

export default App;
