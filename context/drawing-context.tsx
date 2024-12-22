"use client";

import { createContext, Dispatch, SetStateAction, useState } from "react";
interface DrawingContextInterface {
  tool: DrawingTool;
  setTool: Dispatch<SetStateAction<DrawingTool>>;
  strokeColor: string;
  setStrokeColor: Dispatch<SetStateAction<string>>;
  strokeWidth: number;
  setStrokeWidth: Dispatch<SetStateAction<number>>;
  strokeOpacity: number;
  setStrokeOpacity: Dispatch<SetStateAction<number>>;
  currentPoint: Point;
  setCurrentPoint: Dispatch<SetStateAction<Point>>;
}

export const defaultState: DrawingContextInterface = {
  tool: "pencil" as DrawingTool,
  setTool: () => {},
  strokeColor: "#000",
  setStrokeColor: () => {},
  strokeWidth: 5,
  setStrokeWidth: () => {},
  strokeOpacity: 100,
  setStrokeOpacity: () => {},
  currentPoint: { x: 0, y: 0 },
  setCurrentPoint: () => {},
};

export const DrawingContext = createContext<DrawingContextInterface>(defaultState);

export default function DrawingContextProvider({ children }: { children: React.ReactNode }) {
  const [tool, setTool] = useState<DrawingTool>(defaultState.tool);
  const [strokeColor, setStrokeColor] = useState(defaultState.strokeColor);
  const [strokeWidth, setStrokeWidth] = useState(defaultState.strokeWidth);
  const [strokeOpacity, setStrokeOpacity] = useState(defaultState.strokeOpacity);
  const [currentPoint, setCurrentPoint] = useState<Point>(defaultState.currentPoint);

  return (
    <DrawingContext.Provider
      value={{
        tool,
        setTool,
        strokeColor,
        setStrokeColor,
        strokeWidth,
        setStrokeWidth,
        strokeOpacity,
        setStrokeOpacity,
        currentPoint,
        setCurrentPoint,
      }}
    >
      {children}
    </DrawingContext.Provider>
  );
}
