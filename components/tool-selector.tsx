"use client";

import { DrawingContext } from "@/context/drawing-context";
import { useContext, useEffect } from "react";
import { IconType } from "react-icons";
import { LuCircle, LuEraser, LuMousePointer2, LuPencil, LuSquare } from "react-icons/lu";

const ToolSelector = () => {
  const { tool: activeTool, setTool } = useContext(DrawingContext);
  const tools = [
    {
      label: "pointer" as DrawingTool,
      code: 1,
      icon: LuMousePointer2 as IconType,
    },
    {
      label: "rectangle" as DrawingTool,
      code: 2,
      icon: LuSquare as IconType,
    },
    {
      label: "circle" as DrawingTool,
      code: 3,
      icon: LuCircle as IconType,
    },
    {
      label: "pencil" as DrawingTool,
      code: 4,
      icon: LuPencil as IconType,
    },
    {
      label: "eraser" as DrawingTool,
      code: 0,
      icon: LuEraser as IconType,
    },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      if (key === "1") setTool("pointer");
      if (key === "2") setTool("rectangle");
      if (key === "3") setTool("circle");
      if (key === "4") setTool("pencil");
      if (key === "0") setTool("eraser");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setTool]);

  return (
    <div className="flex gap-2 mb-4 border-[1px] shadow-md p-[10px] rounded-xl xl:w-1/3 w-full justify-center fixed bg-white top-5">
      {tools.map((tool, idx) => (
        <button
          key={idx}
          onClick={() => setTool(tool.label)}
          className={`relative px-3 py-3 rounded-lg hover:border-[1px] border-[1px] ${
            activeTool == tool.label ? " text-neutral-800 bg-violet-200" : " border-transparent text-black"
          }`}
        >
          <tool.icon size={17} />
          <div
            className={`text-[10px] absolute bottom-[1px]  right-1 ${activeTool == tool.label ? "text-neutral-800" : "text-neutral-400"} font-medium`}
          >
            {tool.code}
          </div>
        </button>
      ))}
    </div>
  );
};

export default ToolSelector;
