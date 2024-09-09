import { FC, useEffect, useRef, useState } from "react";

import moment from "jalali-moment";

//interface-function
import { StickyListProps } from "../types/interface";
import { formatTime } from "../helpers/changeDateInPersian";

const StickyList: FC<StickyListProps> = ({
  onClose,
  deadline,
  createdDate,
}) => {
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
    const checkDeadline = () => {
      if (deadline) {
        const timeLeft = deadline - Date.now();
        if (timeLeft <= 0) {
          setIsNearDeadline(false);
          setTimeRemaining("زمان به پایان رسید");
        } else {
          setIsNearDeadline(timeLeft <= 60000);
          setTimeRemaining(formatTime(timeLeft));
        }
      }
    };

    const interval = setInterval(checkDeadline, 1000);
    checkDeadline();

    return () => clearInterval(interval);
  }, [deadline]);

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
            className="border-[2px] border-blue-400 rounded-md shadow-md rounded-t-none hover:shadow-gray-400 transition-all ease-in duration-300 border-dashed w-[120%] outline-none"
            cols={30}
            rows={10}
            value={noteText}
            onChange={handleTextChange}
          />
        ) : (
          <div className="border-[2px] border-blue-400 rounded-md shadow-md rounded-t-none p-2">
            <textarea
              style={{ resize: "none" }}
              className="border-[2px] border-blue-400 rounded-md shadow-md rounded-t-none hover:shadow-gray-400 transition-all ease-in duration-300 border-dashed w-[120%] outline-none"
              cols={30}
              rows={10}
              value={noteText}
              onChange={handleTextChange}
            />
          </div>
        )}
        {isEditing ? (
          <button
            className="bg-green-500 text-white p-2 rounded mt-2"
            onClick={handleSave}
          >
            ذخیره
          </button>
        ) : isEditingMode ? (
          <button
            className="bg-blue-500 text-white p-2 absolute top-[80px] left-[14rem] rounded mt-2"
            onClick={handleSubmit}
          >
            ثبت
          </button>
        ) : (
          <button
            className="bg-yellow-500 text-white p-2 rounded mt-2"
            onClick={handleEdit}
          >
            ویرایش
          </button>
        )}
        <p className="absolute bottom-[60px] left-[16px] font-bold text-sm">
          {timeRemaining}
        </p>
        <p className="absolute bottom-[90px] left-[-10px] text-red-600 font-bold text-[14px] text-center">
          تاریخ ایجاد: {formattedCreatedDate}
        </p>
      </div>
    </div>
  );
};

export default StickyList;
