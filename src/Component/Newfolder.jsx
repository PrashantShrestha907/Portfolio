import handleDragEnd from "@/app/Functioncall";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import MenuBox from "./MenuBox";

const Newfolder = ({
  data,
  parentName,
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
  const[number,setNumber] = useState([])
    const [currentIndex, setCurrentIndex] = useState();
    const [x, setX] = useState();
    const [y, setY] = useState();
    const router = useRouter()
    const handleRightClick = (e, index, item) => {
      e.preventDefault();
      setState(true);
      const rect = divRefs.current[parentName].getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;
      setX(relativeX);
      setY(relativeY);
      setCurrentIndex(index);
      e.stopPropagation();
    };
  

  useEffect(() => {
    setCount(data?.length);
    setNumber()
  }, []);

  const handleDoubleClick = (e, icon) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIcon(icon);
    setWindow(true);
    setState(false);
    setIconState(false);
    setName(icon?.name);
    setImage(icon?.imgPath);
  };
 
  return (<>
    <p className="text-red-600">Under Maintenance, Only Double CLick Works!!</p>
    <div
      ref={(el) => (divRefs.current[parentName] = el)}
      className="flex justify-start p-4"
    >
      {Array.isArray(data) &&
        data.map((item,index) => (
          <div
            key={item?.id}
            onDragEnd={(e) => handleDragEnd(e, item, parentName, divRefs)}
            onDoubleClick={(e)=>handleDoubleClick(e,item)}
             onContextMenu={(e) => handleRightClick(e, index, item)}
            className="flex flex-col items-center justify-center"
          >
            <img src={item?.imgPath} alt="" />
            {item?.name}
             {/* {state === true && currentIndex === index && (
            <MenuBox
              x={x}
              y={y}
              setWindow={setWindow}
              setState={setState}
              name={item?.name}
              image={item?.imgPath}
              data={data}
             
              setBin={setBin}
              bin={bin}
              setName={setName}
              setItems={setItems}
            />
          )} */}
          </div>
        ))}
    </div>
    </>
  );
};
// onDragEnd={(e) => handleDragEnd(e, icon, "data", divRefs)}
export default Newfolder;
