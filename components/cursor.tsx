"use client";

import { DrawingContext } from "@/context/drawing-context";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";

const Cursor = () => {
  const [currentPoint, setCurrentPoint] = useState<Point>({ x: 0, y: 0 });
  const { tool } = useContext(DrawingContext);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setCurrentPoint({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  if (tool != "eraser") return null;

  const variants = {
    default: {
      x: currentPoint.x - 12,
      y: currentPoint.y - 12,
    },
  };
  return (
    <motion.div
      className="h-6 w-6 border-black border-[1px] bg-white rounded-full fixed top-0 left-0 pointer-events-none"
      variants={variants}
      animate={"default"}
      transition={{ duration: 0, ease: "linear" }}
    />
  );
};

export default Cursor;
