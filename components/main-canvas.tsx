"use client";
import { useDraw } from "@/hooks/useDraw";
import { LuEraser, LuPencil } from "react-icons/lu";
import CustomizationPanel from "./customization-panel";
import { useContext } from "react";
import { DrawingContext } from "@/context/drawing-context";

const MainCanvas = () => {
  const { strokeWidth, strokeColor } = useContext(DrawingContext);
  const { canvasRef, onMouseDown, isDrawing, setIsDrawing, isErasing, setIsErasing } = useDraw(onDraw);

  function onDraw({ prevPoint, currentPoint, ctx }: Draw): void {
    const { x: cx, y: cy } = currentPoint;
    const color = strokeColor;
    const lineWidth = strokeWidth;

    const start = prevPoint ?? currentPoint;
    ctx.globalCompositeOperation = "source-over";
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(cx, cy);
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen p-4 overflow-hidden text-black">
      <div className="flex gap-2 mb-4 border-[1px] shadow-md p-[10px] rounded-xl xl:w-1/3 w-full justify-center fixed bg-white top-5">
        <button
          onClick={() => {
            setIsDrawing(true);
            setIsErasing(false);
          }}
          className={`px-2 py-2 rounded hover:border-[1px] border-[1px] ${
            isDrawing ? " text-black bg-neutral-200" : " border-transparent text-black"
          }`}
        >
          <LuPencil size={15} />
        </button>
        <button
          onClick={() => {
            setIsDrawing(false);
            setIsErasing(true);
          }}
          className={`px-2 py-2 rounded hover:border-[1px] border-[1px] ${
            isErasing ? " text-black bg-neutral-200" : " border-transparent text-black"
          }`}
        >
          <LuEraser size={15} />
        </button>
      </div>
      {isDrawing && <CustomizationPanel />}
      <div className="flex-1 flex items-center justify-center">
        <canvas ref={canvasRef} onMouseDown={onMouseDown} className="border-2" />
      </div>
    </div>
  );
};

export default MainCanvas;
