import React, { useEffect, useState } from "react";
import handleDragEnd from "../app/Functioncall.js";
import MenuBox from "./MenuBox.jsx";
import { useRouter } from "next/navigation";

const Resume = ({
  resumeData,
  setResumeData,
  divRefs,
  setCount,
  setWindow,
  setBin,
  bin,
  setName,
  setItems,
  setCurrentIcon,
  setIconState,
}) => {
  const [state, setState] = useState(false);
  const [currentIndex, setCurrentIndex] = useState();
  const [x, setX] = useState();
  const [y, setY] = useState();
  const router = useRouter()
  const handleRightClick = (e, index, item) => {
    e.preventDefault();
    setState(true);
    const rect = divRefs.current["resume"].getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const relativeY = e.clientY - rect.top;
    setX(relativeX);
    setY(relativeY);
    setCurrentIndex(index);
    e.stopPropagation();
  };

  const handleDoubleClick = (e, icon) => {
    e.preventDefault();
    e.stopPropagation();
    if(icon?.name==="Github"){
      router.push("https://github.com/PrashantShrestha907")
    }else{
    setCurrentIcon(icon);
    setWindow(true);
    setState(false);
    setIconState(false);
    setName(icon?.name);
    setImage(icon?.imgPath);
    }
  };

    
  useEffect(()=>{

    setCount(resumeData?.length);
  },[])

  // const handleNavigation = (e,name)=>{
  //   if(name === "Github"){

  //     const router = useRouter();
  //     router.push("https://www.youtube.com")
  //   }else { 
  //     null
  //   }



  // }

  return (
    <div
      className="flex w-full h-[100%] gap-10 p-2  relative justify-start cursor-default text-sm"
      ref={(el) => (divRefs.current["resume"] = el)}
      onClick={(e) => {
        setState(false);
        e.stopPropagation();
      }}
    >
      {resumeData.map((item, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 items-center "
          onContextMenu={(e) => handleRightClick(e, index, item)}
          draggable={true}
          onDragEnd={(e) => handleDragEnd(e, item, "resume", divRefs)}
          onDoubleClick={(e)=>handleDoubleClick(e,item)}
         
        >
          <img src={item?.imgPath} alt="" className="h-[2.5rem] w-[2.5rem]" />
          <p>{item?.name}</p>
          {state === true && currentIndex === index && (
            <MenuBox
              x={x}
              y={y}
              setWindow={setWindow}
              setState={setState}
              name={item?.name}
              image={item?.imgPath}
              data={resumeData}
              setData={setResumeData}
              setBin={setBin}
              bin={bin}
              setName={setName}
              setItems={setItems}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Resume;
