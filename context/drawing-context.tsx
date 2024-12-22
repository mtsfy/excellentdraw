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
};

export const DrawingContext = createContext<DrawingContextInterface>(defaultState);

export default function DrawingContextProvider({ children }: { children: React.ReactNode }) {
  const [tool, setTool] = useState<DrawingTool>(defaultState.tool);
  const [strokeColor, setStrokeColor] = useState(defaultState.strokeColor);
  const [strokeWidth, setStrokeWidth] = useState(defaultState.strokeWidth);
  const [strokeOpacity, setStrokeOpacity] = useState(defaultState.strokeOpacity);

  return (
    <DrawingContext.Provider value={{ tool, setTool, strokeColor, setStrokeColor, strokeWidth, setStrokeWidth, strokeOpacity, setStrokeOpacity }}>
      {children}
    </DrawingContext.Provider>
  );
}
