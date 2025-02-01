"use client";

import { createContext, Dispatch, SetStateAction, useState } from "react";
interface DrawingContextInterface {
  tool: DrawingTool;
  setTool: Dispatch<SetStateAction<DrawingTool>>;
  strokeColor: string;
  setStrokeColor: Dispatch<SetStateAction<string>>;
  strokeWidth: number;
  setStrokeWidth: Dispatch<SetStateAction<number>>;
  currentPoint: Point;
  setCurrentPoint: Dispatch<SetStateAction<Point>>;
  zoom: number;
  setZoom: Dispatch<SetStateAction<number>>;
}

export const defaultState: DrawingContextInterface = {
  tool: "pencil" as DrawingTool,
  setTool: () => {},
  strokeColor: "#000",
  setStrokeColor: () => {},
  strokeWidth: 5,
  setStrokeWidth: () => {},
  currentPoint: { x: 0, y: 0 },
  setCurrentPoint: () => {},
  zoom: 1,
  setZoom: () => {},
};

export const DrawingContext = createContext<DrawingContextInterface>(defaultState);

export default function DrawingContextProvider({ children }: { children: React.ReactNode }) {
  const [tool, setTool] = useState<DrawingTool>(defaultState.tool);
  const [strokeColor, setStrokeColor] = useState(defaultState.strokeColor);
  const [strokeWidth, setStrokeWidth] = useState(defaultState.strokeWidth);
  const [currentPoint, setCurrentPoint] = useState<Point>(defaultState.currentPoint);
  const [zoom, setZoom] = useState(1);
  return (
    <DrawingContext.Provider
      value={{
        tool,
        setTool,
        strokeColor,
        setStrokeColor,
        strokeWidth,
        setStrokeWidth,
        currentPoint,
        setCurrentPoint,
        zoom,
        setZoom,
      }}
    >
      {children}
    </DrawingContext.Provider>
  );
}
