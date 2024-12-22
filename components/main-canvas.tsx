"use client";
import { useDraw } from "@/hooks/useDraw";
import CustomizationPanel from "./customization-panel";
import { useContext } from "react";
import { DrawingContext } from "@/context/drawing-context";
import ToolSelector from "./tool-selector";

const MainCanvas = () => {
  const { strokeWidth, strokeColor, tool } = useContext(DrawingContext);
  const { canvasRef, offscreenCanvasRef, onMouseDown } = useDraw(onDraw);

  function onDraw({ prevPoint, currentPoint, ctx }: Draw): void {
    const { x: cx, y: cy } = currentPoint;
    const start = prevPoint ?? currentPoint;
    const offscreenCanvas = offscreenCanvasRef.current;

    if (offscreenCanvas) {
      ctx.drawImage(offscreenCanvas, 0, 0);
    }

    ctx.globalCompositeOperation = "source-over";
    ctx.beginPath();
    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle = strokeColor;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(cx, cy);
    ctx.stroke();

    ctx.fillStyle = strokeColor;
    ctx.beginPath();
    ctx.arc(start.x, start.y, strokeWidth / 2, 0, 2 * Math.PI);
    ctx.fill();

    if (offscreenCanvas) {
      const offscreenCtx = offscreenCanvas.getContext("2d");
      offscreenCtx?.drawImage(ctx.canvas, 0, 0);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen p-4 overflow-hidden text-black">
      <ToolSelector />
      {tool == "pencil" && <CustomizationPanel />}
      <div className="flex-1 flex items-center justify-center">
        <canvas ref={canvasRef} onMouseDown={(e) => onMouseDown(e.nativeEvent)} className="border-2" style={{ cursor: "none" }} />
      </div>
    </div>
  );
};

export default MainCanvas;
