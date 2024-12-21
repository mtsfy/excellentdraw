import React from "react";

const CustomizationPanel = () => {
  return (
    <div className="border-[1px] shadow-md rounded-xl h-64 fixed top-10 left-10 z-50 bg-white flex flex-col justify-around">
      <div className="p-4 flex gap-2">
        <div className="bg-red-500 h-6 w-6 rounded-md" />
        <div className="bg-orange-500 h-6 w-6 rounded-md" />
        <div className="bg-yellow-500 h-6 w-6 rounded-md" />
        <div className="bg-emerald-500 h-6 w-6 rounded-md" />
        <div className="bg-sky-500 h-6 w-6 rounded-md" />
        <div className="bg-indigo-500 h-6 w-6 rounded-md" />
        <div className="bg-black h-6 w-6 rounded-md border-[2px] border-white outline outline-[2px] outline-neutral-500" />
      </div>
      <div className="flex gap-2 p-4 items-center">
        <div className="h-8 w-10 border-[1px] rounded-md bg-neutral-200 flex items-center justify-center">
          <div className="h-1 w-6 bg-neutral-500 rounded-2xl" />
        </div>
        <div className="h-8 w-10 border-[1px] rounded-md bg-neutral-200 flex items-center justify-center">
          <div className="h-2 w-6 bg-neutral-500 rounded-xl" />
        </div>
        <div className="h-8 w-10 border-[1px] rounded-md bg-neutral-200 flex items-center justify-center">
          <div className="h-[10px] w-6 bg-neutral-500 rounded-xl" />
        </div>
      </div>
      <div className="p-4 flex items-center">
        <input type="range" min="0" max="100" defaultValue="100" className="w-full" />
      </div>
    </div>
  );
};

export default CustomizationPanel;
