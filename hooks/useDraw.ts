import { log } from "console";
import { useEffect, useRef, useState } from "react";

export const useDraw = (onDraw: ({ currentPoint, prevPoint, ctx }: Draw) => void) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [color, setColor] = useState("black");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevPoint = useRef<Point | null>(null);

  const onMouseDown = () => setIsMouseDown(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth - 100;
    canvas.height = window.innerHeight - 100;
  }, []);

  useEffect(() => {
    const { current: canvas } = canvasRef;
    if (!canvas) {
      return;
    }

    const computePoints = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      return { x, y };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseDown) return;
      const currentPoint = computePoints(e);

      const ctx = canvas.getContext("2d");

      if (!ctx || !currentPoint) return;

      onDraw({ currentPoint: currentPoint, prevPoint: prevPoint.current, ctx: ctx });
      prevPoint.current = currentPoint;
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
      prevPoint.current = null;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [onDraw]);

  return {
    canvasRef,
    onMouseDown,
  };
};
