import React, { useEffect, useState } from "react";
import MenuBox from "./MenuBox";
import handleDragEnd from "@/app/Functioncall";
import { useRouter } from "next/navigation";

const Project = ({ setCount, project, divRefs,setWindow,
  setBin,
  bin,
  setName,
  setItems, setProject}) => {
  const [state, setState] = useState(false);
  const [currentIndex, setCurrentIndex] = useState();
  const [x, setX] = useState();
  const [y, setY] = useState();
  useEffect(() => {
    setCount(project?.length);
    
  }, []);
  const router = useRouter()

  const handleRightClick = (e, index, item) => {
    e.preventDefault();
    setState(true);
    const rect = divRefs.current["project"].getBoundingClientRect();
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
    if (icon?.name == "SchoolAid"){
     router.push("https://github.com/PrashantShrestha907/SchoolAid-AI-blog-SIte-")
   }else if (icon?.name == "Internest"){
     router.push("https://github.com/PrashantShrestha907/Interenest")
   }else if (icon?.name == "FaceGram"){
     router.push("https://github.com/PrashantShrestha907/FaceGram-Socia-Media-WebSite-")
   }else if (icon?.name == "Attendify"){
     router.push("https://github.com/PrashantShrestha907/Attendify")
   }
  };

  return (
    <div
      className="flex w-full h-[100%] gap-10 p-2 pl-4  relative justify-start cursor-default text-sm "
      ref={(el) => (divRefs.current["project"] = el)}
      onClick={(e) => {
        setState(false);
        e.stopPropagation();
      }}
    >
      {project &&
        project?.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 items-center"
            onContextMenu={(e) => handleRightClick(e, index, item)}
            draggable={true}
            onDragEnd={(e) => handleDragEnd(e, item, "project", divRefs)}
            onDoubleClick={(e)=>handleDoubleClick(e,item)}
          >
            <img src={item?.imgPath} alt="" className="h-10"/>
            <p>{item?.name}</p>
            {state === true && currentIndex === index && (
            <MenuBox
              x={x}
              y={y}
              setWindow={setWindow}
              setState={setState}
              name={item?.name}
              image={item?.imgPath}
              data={project}
              setData={setProject}
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

export default Project;
