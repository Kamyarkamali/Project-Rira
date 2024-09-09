import { FC } from "react";

const StickyList: FC = () => {
  // functions move

  const haneleDown = () => {};

  const haneleMove = () => {};

  const haneleUp = () => {};

  return (
    <div
      className=" cursor-move absolute left-[90px] top-[30px]"
      onMouseDown={haneleDown}
      onMouseMove={haneleMove}
      onMouseUp={haneleUp}
    >
      <div className="w-[120%] p-[10px] mt-9 rounded-md rounded-b-none bg-[#04D1F1] flex items-center justify-between">
        <div className="text-xl font-bold">یاد آوری های من</div>
        <div className="text-2xl bg-red-300 hover:opacity-[0.5] duration-300 rounded-[100%] w-[40px] h-[40px] grid text-red-500 place-content-center">
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
