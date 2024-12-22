import { DrawingContext } from "@/context/drawing-context";
import { useContext, useEffect, useRef, useState } from "react";

const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 600;

export const useDraw = (onDraw: ({ currentPoint, prevPoint, ctx }: Draw) => void) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const { tool, strokeColor, strokeWidth } = useContext(DrawingContext);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const prevPoint = useRef<Point | null>(null);

  const onMouseDown = (e: MouseEvent) => {
    setIsMouseDown(true);
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const point = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      setStartPoint(point);
      prevPoint.current = point;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === "undefined") return;

    offscreenCanvasRef.current = document.createElement("canvas");
    offscreenCanvasRef.current.width = window.innerWidth;
    offscreenCanvasRef.current.height = window.innerHeight;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === "undefined") return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const offscreenCanvas = offscreenCanvasRef.current;
    if (!canvas || !offscreenCanvas) return;

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

      if (tool === "pencil") {
        onDraw({ currentPoint, prevPoint: prevPoint.current, ctx });
      } else if (tool === "eraser") {
        onErase({ currentPoint, prevPoint: prevPoint.current, ctx });
      } else if (tool === "rectangle") {
        onRectangle({ currentPoint, ctx });
      } else if (tool == "circle") {
        if (!startPoint) return;

        const distance = Math.sqrt(Math.pow(currentPoint.x - startPoint.x, 2) + Math.pow(currentPoint.y - startPoint.y, 2));
        if (distance < 20) return;

        onCircle({ currentPoint, ctx });
      }

      prevPoint.current = currentPoint;
    };

    const handleMouseUp = () => {
      if (tool === "rectangle" && canvas && offscreenCanvas) {
        const offscreenCtx = offscreenCanvas.getContext("2d");
        offscreenCtx?.drawImage(canvas, 0, 0);
      }
      if (tool == "circle" && canvas && offscreenCanvas) {
        const offscreenCtx = offscreenCanvas.getContext("2d");
        offscreenCtx?.drawImage(canvas, 0, 0);
      }
      setIsMouseDown(false);
      prevPoint.current = null;
      setStartPoint(null);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [onDraw, tool, isMouseDown]);

  const onErase = ({ prevPoint, currentPoint, ctx }: Draw) => {
    const { x: cx, y: cy } = currentPoint;
    const lineWidth = 24;
    const start = prevPoint ?? currentPoint;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    if (offscreenCanvasRef.current) {
      ctx.drawImage(offscreenCanvasRef.current, 0, 0);
    }

    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(cx, cy);
    ctx.stroke();
    ctx.restore();

    if (offscreenCanvasRef.current) {
      const offscreenCtx = offscreenCanvasRef.current.getContext("2d");
      offscreenCtx?.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      offscreenCtx?.drawImage(ctx.canvas, 0, 0);
    }
  };

  const onRectangle = ({ currentPoint, ctx }: { currentPoint: Point; ctx: CanvasRenderingContext2D }) => {
    if (!startPoint || !offscreenCanvasRef.current) return;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(offscreenCanvasRef.current, 0, 0);

    const width = currentPoint.x - startPoint.x;
    const height = currentPoint.y - startPoint.y;

    ctx.beginPath();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.strokeRect(startPoint.x, startPoint.y, width, height);
  };

  const onCircle = ({ currentPoint, ctx }: { currentPoint: Point; ctx: CanvasRenderingContext2D }) => {
    if (!startPoint || !offscreenCanvasRef.current) return;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(offscreenCanvasRef.current, 0, 0);

    const offset = 20; // Adjust this value to change offset distance
    const offsetStartPoint = {
      x: startPoint.x + offset,
      y: startPoint.y + offset,
    };

    const radius = Math.sqrt(Math.pow(currentPoint.x - offsetStartPoint.x, 2) + Math.pow(currentPoint.y - offsetStartPoint.y, 2));

    // Draw circle with offset
    ctx.beginPath();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth / 2;
    ctx.arc(offsetStartPoint.x, offsetStartPoint.y, radius / 2, 0, 2 * Math.PI);
    ctx.stroke();
  };
  return {
    canvasRef,
    offscreenCanvasRef,
    onMouseDown,
  };
};
