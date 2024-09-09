import { useEffect } from "react";
import "./App.css";

//Custom hook
import { useTitle } from "./hooks/useTitle";

//types/enums
import { NAMETITLEPROJECT } from "./types/enum/enums";

function App() {
  useEffect(() => {
    useTitle(NAMETITLEPROJECT.titlePage);
  }, []);

  return <></>;
}

export default App;
