"use client";
import { useDraw } from "@/hooks/useDraw";

const MainCanvas = () => {
  const onDraw = ({ prevPoint, currentPoint, ctx }: Draw) => {
    const { x: cx, y: cy } = currentPoint;
    const color = "black";
    const lineWidth = 4;

    const start = prevPoint ?? currentPoint;
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
  };

  const { canvasRef, onMouseDown } = useDraw(onDraw);
  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen">
      <canvas ref={canvasRef} onMouseDown={onMouseDown} className="border-2" />;
    </div>
  );
};

export default MainCanvas;
