"use client";
import { useDraw } from "@/hooks/useDraw";
import CustomizationPanel from "./customization-panel";
import { useContext } from "react";
import { DrawingContext } from "@/context/drawing-context";
import ToolSelector from "./tool-selector";

const MainCanvas = () => {
  const { strokeWidth, strokeColor, tool } = useContext(DrawingContext);
  const { canvasRef, onMouseDown } = useDraw(onDraw);

  function onDraw({ prevPoint, currentPoint, ctx }: Draw): void {
    const { x: cx, y: cy } = currentPoint;

    const start = prevPoint ?? currentPoint;
    ctx.globalCompositeOperation = "source-over";
    ctx.beginPath();
    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle = strokeColor;
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(cx, cy);
    ctx.stroke();

    ctx.fillStyle = strokeColor;
    ctx.beginPath();
    ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen p-4 overflow-hidden text-black">
      <ToolSelector />
      {tool == "pencil" && <CustomizationPanel />}
      <div className="flex-1 flex items-center justify-center">
        <canvas ref={canvasRef} onMouseDown={onMouseDown} className="border-2" />
      </div>
    </div>
  );
};

export default MainCanvas;
