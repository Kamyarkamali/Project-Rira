import { FC, useEffect, useRef, useState } from "react";

import moment from "jalali-moment";

//interface-function
import { StickyListProps } from "../types/interface";
import { formatTime } from "../helpers/changeDateInPersian";
import toast, { Toaster } from "react-hot-toast";
import { REACT_TOAST } from "../types/enum/enums";

const StickyList: FC<StickyListProps> = ({ onClose, createdDate }) => {
  const [move, setMove] = useState<boolean>(false);

  const [tx, setTx] = useState<number>(0);
  const [ty, setTy] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  const [isNearDeadline, setIsNearDeadline] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [noteText, setNodeText] = useState<string>("");
  const [isEditingMode, setIsEditingMode] = useState<boolean>(true);

  const refElement = useRef<HTMLDivElement | null>(null);

  // format date
  const formattedCreatedDate = moment(createdDate).format(
    "jYYYY/jMM/jDD ساعت HH:mm:ss"
  );

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

  useEffect(() => {
    const deadline = Date.now() + 80 * 1000; // تنظیم deadline به 1 دقیقه و 20 ثانیه بعد

    const checkDeadline = () => {
      const timeLeft = deadline - Date.now();
      if (timeLeft <= 0) {
        setIsNearDeadline(false);
        setTimeRemaining("زمان به پایان رسید");
      } else {
        setIsNearDeadline(timeLeft <= 60000);
        setTimeRemaining(formatTime(timeLeft));
      }
    };

    const interval = setInterval(checkDeadline, 1000);
    checkDeadline();

    return () => clearInterval(interval);
  }, []);
  const handleEdit = () => {
    setIsEditingMode(true);
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    setIsEditingMode(false);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNodeText(e.target.value);
  };

  const handleSubmit = () => {
    setIsEditing(false);
    setIsEditingMode(false);
    toast.error(REACT_TOAST.submit);
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
      <div className="relative">
        {isEditingMode ? (
          <textarea
            style={{ resize: "none" }}
            className={`${
              isNearDeadline ? "bg-red-400" : "bg-white"
            } border-[2px] border-blue-400 rounded-md shadow-md rounded-t-none hover:shadow-gray-400 transition-all ease-in duration-300 border-dashed w-[120%] outline-none`}
            cols={30}
            rows={10}
            value={noteText}
            onChange={handleTextChange}
            readOnly={false}
          />
        ) : (
          <textarea
            disabled={true}
            style={{ resize: "none" }}
            className={`${
              isNearDeadline ? "bg-red-400" : "bg-white"
            } border-[2px] border-blue-400 rounded-md shadow-md rounded-t-none hover:shadow-gray-400 transition-all ease-in duration-300 border-dashed w-[120%] p-3 outline-none`}
            cols={30}
            rows={10}
            value={noteText}
            onChange={handleTextChange}
          />
        )}
        {isEditing ? (
          <button
            className="bg-green-500 left-[11.3rem] bottom-[8px] absolute text-white p-2 rounded mt-2"
            onClick={handleSave}
          >
            ذخیره
          </button>
        ) : isEditingMode ? (
          <button
            className="bg-blue-500 text-white p-2 absolute bottom-[8px] text-sm hover:scale-105 duration-300 w-[80px] left-[10rem] rounded"
            onClick={handleSubmit}
          >
            ثبت
          </button>
        ) : (
          <button
            className="bg-yellow-500 left-[12.3rem] bottom-[8px] absolute text-white p-2 rounded mt-2"
            onClick={handleEdit}
          >
            ویرایش
          </button>
        )}
        <p
          className={`${
            isNearDeadline ? "text-white" : "text-red-500"
          } absolute bottom-[60px] left-[16px] font-bold text-sm`}
        >
          {timeRemaining}
        </p>
        <p
          className={`${
            isNearDeadline ? "text-white" : "text-red-400"
          } absolute bottom-[90px] left-[-10px] font-bold text-[14px] text-center`}
        >
          تاریخ ایجاد: {formattedCreatedDate}
        </p>
      </div>
      <Toaster />
    </div>
  );
};

export default StickyList;
