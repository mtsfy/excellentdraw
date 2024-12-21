"use client";

import { DrawingContext } from "@/context/drawing-context";
import { useContext } from "react";
import { LuEraser, LuPencil } from "react-icons/lu";

const ToolSelector = () => {
  const { tool, setTool } = useContext(DrawingContext);
  return (
    <div className="flex gap-2 mb-4 border-[1px] shadow-md p-[10px] rounded-xl xl:w-1/3 w-full justify-center fixed bg-white top-5">
      <button
        onClick={() => setTool("pencil")}
        className={`px-2 py-2 rounded hover:border-[1px] border-[1px] ${
          tool == "pencil" ? " text-black bg-neutral-200" : " border-transparent text-black"
        }`}
      >
        <LuPencil size={15} />
      </button>
      <button
        onClick={() => setTool("eraser")}
        className={`px-2 py-2 rounded hover:border-[1px] border-[1px] ${
          tool == "eraser" ? " text-black bg-neutral-200" : " border-transparent text-black"
        }`}
      >
        <LuEraser size={15} />
      </button>
    </div>
  );
};

export default ToolSelector;
