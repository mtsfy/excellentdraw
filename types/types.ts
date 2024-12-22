type Draw = {
  ctx: CanvasRenderingContext2D;
  currentPoint: Point;
  prevPoint: Point | null;
};

type Point = {
  x: number;
  y: number;
};

type DrawingTool = "pencil" | "eraser" | "pointer" | "rectangle";
