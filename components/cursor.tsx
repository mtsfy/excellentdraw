"use client";

import { DrawingContext } from "@/context/drawing-context";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";

const Cursor = () => {
  const [currentPoint, setCurrentPoint] = useState<Point>({ x: 0, y: 0 });
  const { tool } = useContext(DrawingContext);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      console.log(e.clientX, e.clientY);

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

  const variants = {
    default: {
      x: currentPoint.x - 12,
      y: currentPoint.y - 12,
    },
  };
  if (tool == "eraser") {
    return (
      <motion.div
        className="h-6 w-6 border-black border-[1px] bg-white rounded-full fixed top-0 left-0 pointer-events-none"
        variants={variants}
        animate={"default"}
        transition={{ duration: 0, ease: "linear" }}
      />
    );
  }
  if (tool == "pencil") {
    return (
      <motion.div
        className="h-6 w-6 fixed top-0 left-0 pointer-events-none"
        variants={variants}
        animate={"default"}
        transition={{ duration: 0, ease: "linear" }}
      >
        <div className="absolute left-1/2 top-0 w-[1px] h-[30%] bg-black shadow-[0_0_0_2px_#fff] rounded-lg -translate-x-[0.5px]" />
        <div className="absolute left-1/2 bottom-0 w-[1px] h-[30%] bg-black shadow-[0_0_0_2px_#fff] rounded-lg -translate-x-[0.5px]" />
        <div className="absolute top-1/2 left-0 h-[1px] w-[30%] bg-black shadow-[0_0_0_2px_#fff] rounded-lg -translate-y-[0.5px]" />
        <div className="absolute top-1/2 right-0 h-[1px] w-[30%] bg-black shadow-[0_0_0_2px_#fff] rounded-lg -translate-y-[0.5px]" />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="h-4 w-4 border-black border-[1px] bg-transparent rounded-full fixed top-0 left-0 pointer-events-none"
      variants={variants}
      animate="default"
      transition={{ duration: 0, ease: "linear" }}
    />
  );
};

export default Cursor;
