import { useEffect, useState } from "react";
import "./App.css";

// alert-notification-react-hot toast
import toast, { Toaster } from "react-hot-toast";

//components
import StickyList from "./components/StickyList";

//Custom hook
import { useTitle } from "./hooks/useTitle";

//types/enums
import { NAMETITLEPROJECT, REACT_TOAST } from "./types/enum/enums";

//types/interface
import { Note } from "./types/interface";

function App() {
  const [write, setWrite] = useState<Note[]>([]);

  const writeNote = () => {
    setWrite([
      ...write,
      {
        id: Date.now(),
        deadline: Date.now() + 600000,
      },
    ]);
    toast.success(REACT_TOAST.add);
  };

  useEffect(() => {
    useTitle(NAMETITLEPROJECT.titlePage);
  }, []);

  const removeMyNotes = (id: number) => {
    setWrite(write.filter((node) => node.id !== id));
    toast.error(REACT_TOAST.remove);
  };

  return (
    <>
      <button
        onClick={writeNote}
        className="bg-blue-500 cursor-pointer p-2 text-[#ffff] font-bold mt-4 mr-4 rounded-md hover:scale-105 duration-300 "
      >
        اضافه کردن نوشته +
      </button>
      {write.map((items) => (
        <StickyList
          createdDate={Date.now() + 60000}
          key={items.id}
          deadline={items.deadline}
          onClose={() => removeMyNotes(items.id)}
        />
      ))}
      <Toaster />
    </>
  );
}

export default App;
