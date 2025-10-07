import React, { useRef, useState } from "react";
import handleDragEnd from "../app/Functioncall.js";

const RecycleBin = ({ bin, data, setBin, divRefs,setCount}) => {
  const [state, setState] = useState(false);
  const [currentIndex, setCurrentIndex] = useState();
  const [x, setX] = useState();
  const [y, setY] = useState();
  const handleRightClick = (e, index, item) => {
    e.preventDefault();
    setState(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const relativeY = e.clientY - rect.top;
    setX(relativeX);
    setY(relativeY);
    setCurrentIndex(index);
    e.stopPropagation();
  };
  setCount(bin.length)
 



  const handleRestore = (e, name) => {
    e.preventDefault();
    const deleted = bin.filter((item) => item.name !== name);
    setBin(localStorage.setItem("RecycleBin", JSON.stringify(deleted)));
    const final = bin.filter((item) => item.name === name);
    const last = [...data, ...final];
    localStorage.setItem("data", JSON.stringify(last));
    window.location.reload();
  };

  const handleDelete = (e, name) => {
    e.preventDefault();
    const final = bin.filter((item) => item.name !== name);
    localStorage.setItem("RecycleBin", JSON.stringify(final));
    localStorage.removeItem(name)
    window.location.reload();
  };

  return (
    <div
      className="flex w-full h-[100%] gap-10 p-2  relative justify-start"
      onClick={(e) => {
        setState(false);
        e.stopPropagation();
      }}
      ref={(el) => (divRefs.current["RecycleBin"] = el)}
    >
      {bin &&
        bin.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 justify-start relative items-center"
            onContextMenu={(e) => handleRightClick(e, index, item)}
            draggable={true} // Make sure this is explicitly true
            // onDragStart={(e) => {
            //   // Optional: Add drag start handling
            //   e.dataTransfer.effectAllowed = "move";
            // }}
            onDragEnd={(e) => handleDragEnd(e, item, "RecycleBin", divRefs)}
          >
            <img src={item?.imgPath} alt="" className="h-10"/>
            <p>{item.name}</p>
            {state === true && currentIndex === index && (
              <div
                className="bg-[#C5C4C4] h-[6.9rem] w-[7.25rem] cursor-default text-[12.8px] justify-center items-center  gap-1 shadow-[0_-2px_0_0_rgba(255,255,255,1),-2px_0_0_0_rgba(255,255,255,1),0_1.5px_0_0_rgba(0,0,0,1),1.5px_0_0_0_rgba(0,0,0,1)] flex flex-col p-[2px] overflow-hidden z-100"
                style={{
                  position: "absolute",
                  fontFamily: "Google",
                  top: y,
                  left: x,
                }}
              >
                <p
                  className="bg-[#C5C4C4] hover:bg-blue-800 hover:text-white w-full flex justify-center"
                  onClick={(e) => handleRestore(e, item?.name)}
                >
                  Restore
                </p>
                <div className=" w-full py-[1px] bg-[#a5a3a3] shadow-[0_1px_0_0_rgba(255,255,255,1)]"></div>
                <p className="bg-[#C5C4C4] hover:bg-blue-800  hover:text-white w-full flex justify-center">
                  Cut
                </p>
                <div className=" w-full py-[1px] bg-[#a5a3a3] shadow-[0_1px_0_0_rgba(255,255,255,1)]"></div>
                <p
                  className="bg-[#C5C4C4] hover:bg-blue-800 hover:text-white w-full flex justify-center"
                  onClick={(e) => handleDelete(e, item?.name)}
                >
                  Delete
                </p>
                <div className=" w-full py-[1px] bg-[#a5a3a3] shadow-[0_1px_0_0_rgba(255,255,255,1)]"></div>
                <p className="bg-[#C5C4C4] hover:bg-blue-800  hover:text-white w-full flex justify-center">
                  Properties
                </p>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default RecycleBin;
