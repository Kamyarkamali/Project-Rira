import { FC, useRef, useState } from "react";

//interface-function
import { StickyListProps } from "../types/interface";

const StickyList: FC<StickyListProps> = ({ onClose }) => {
  const [move, setMove] = useState<boolean>(false);

  const [tx, setTx] = useState<number>(0);
  const [ty, setTy] = useState<number>(0);

  const refElement = useRef<HTMLDivElement | null>(null);

  // functions move

  const haneleDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setMove(true);
    const dimensions = refElement.current?.getBoundingClientRect();

    if (dimensions) {
      setTx(e.clientX - dimensions?.x);
      setTy(e.clientY - dimensions?.y);
    }
  };

  const haneleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (move && refElement.current) {
      let x = e.clientX - tx;
      let y = e.clientY - ty;
      refElement.current.style.left = x + "px";
      refElement.current.style.top = y + "px";
    }
  };

  const haneleUp = () => {
    setMove(false);
  };

  return (
    <div
      className=" cursor-move absolute left-[90px] top-[30px]"
      onMouseDown={haneleDown}
      onMouseMove={haneleMove}
      onMouseUp={haneleUp}
      ref={refElement}
    >
      <div className="w-[120%] p-[10px] mt-9 rounded-md rounded-b-none bg-[#04D1F1] flex items-center justify-between">
        <div className="text-xl font-bold">یاد آوری های من</div>
        <div
          onClick={onClose}
          className="text-2xl bg-red-300 hover:opacity-[0.5] duration-300 rounded-[100%] w-[40px] h-[40px] grid text-red-500 place-content-center"
        >
          &times;
        </div>
      </div>
      <textarea
        style={{ resize: "none" }}
        className="border-[2px] border-blue-400 rounded-md shadow-md rounded-t-none hover:shadow-gray-400 transition-all ease-in duration-300 border-dashed w-[120%]
      outline-none"
        cols={30}
        rows={10}
      />
    </div>
  );
};

export default StickyList;
