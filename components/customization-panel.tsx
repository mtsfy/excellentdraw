import { DrawingContext } from "@/context/drawing-context";
import React, { useContext } from "react";

const CustomizationPanel = () => {
  const { strokeColor, setStrokeColor, strokeWidth, setStrokeWidth } = useContext(DrawingContext);
  const colors = [
    {
      label: "black",
      code: "#000",
      active: strokeColor == "#000",
    },
    {
      label: "red",
      code: "#ef4444",
      active: strokeColor == "#ef4444",
    },
    {
      label: "orange",
      code: "#fb923c",
      active: strokeColor == "#fb923c",
    },
    {
      label: "green",
      code: "#10b981",
      active: strokeColor == "#10b981",
    },
    {
      label: "blue",
      code: "#0ea5e9",
      active: strokeColor == "#0ea5e9",
    },
  ];
  const sizes = [
    {
      label: "small",
      size: 5,
      active: strokeWidth == 5,
    },
    {
      label: "medium",
      size: 10,
      active: strokeWidth == 10,
    },
    {
      label: "large",
      size: 15,
      active: strokeWidth == 15,
    },
  ];
  return (
    <div className="border-[1px] shadow-md rounded-xl h-40 fixed top-10 left-10 z-50 bg-white flex flex-col justify-around">
      <div className="p-4 flex gap-2">
        {colors.map((color, idx) => (
          <button
            onClick={() => setStrokeColor(color.code)}
            key={idx}
            className={`h-6 w-6 rounded-md ${color.active ? "border-[2px] border-white outline outline-[1px] outline-neutral-700" : "border-none"}`}
            style={{ backgroundColor: color.code }}
          />
        ))}
      </div>
      <div className="flex gap-2 p-4 items-center">
        {sizes.map((size, idx) => (
          <button
            onClick={() => setStrokeWidth(size.size)}
            key={idx}
            className={`h-8 w-10 border-[1px] rounded-md ${size.active ? "bg-violet-200" : "bg-neutral-200"} flex items-center justify-center`}
          >
            <div className="bg-neutral-700 rounded-2xl" style={{ height: size.size / 2, width: 20 }} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default CustomizationPanel;
