"use client";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Component/Navbar";
import RefreshBox from "../Component/RefreshBox";
import MenuBox from "../Component/MenuBox";
import { createSwapy } from "swapy";
import Window from "@/Component/Window";
import { dummydata } from "../app/dummydata.js";
import handleDragEnd from "./Functioncall";
import StartMenu from "../Component/StartMenu";

const page = () => {
  const swapy = useRef(null);
  const container = useRef(null);
  const [state, setState] = useState(false);
  const [iconstate, setIconState] = useState(false);
  const [X, setX] = useState();
  const [Y, setY] = useState();
  const [window, setWindow] = useState(false);
  const [data, setData] = useState([]);
  const [bin, setBin] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [items, setItems] = useState([]);
  const [currentIcon, setCurrentIcon] = useState(null);
  const [resumeData, setResumeData] = useState([]);
  const divRefs = useRef({});
  const [startClick, setStartClick] = useState(false)
  // const [propertyState, setPropertyState] = useState(false);
  const [color, setColor] = useState();
  const [project,setProject] = useState([])


  useEffect(() => {
    if(typeof window !== undefined){
    const stored = localStorage.getItem("data");
    if (!stored) {
      localStorage.setItem("data", JSON.stringify(dummydata));
      setData(dummydata);
    } else {
      setData(JSON.parse(stored));
    }
    const binData = localStorage.getItem("RecycleBin");
    if (binData) setBin(JSON.parse(binData));
    const resume = localStorage.getItem("resume");
    if (!resume) {
      localStorage.setItem(
        "resume",
        JSON.stringify([
          {
            id: 10,
            name: "Resume/CV",
            imgPath: "/resume.jpg",
            parentName: "resume",
            swapyItem: "z",
            swapySlot: "z",
          },
          {
            id: 10,
            name: "Github",
            imgPath: "github.jpg",
            parentName: "resume",
            swapyItem: "x",
            swapySlot: "x",
          },
        ])
      );
    } else {
      setResumeData(JSON.parse(resume));
    }
    const bgColor = localStorage.getItem("bgColor");
    if (!bgColor) {
      localStorage.setItem("bgColor", JSON.stringify({ color: "#3F4565" }));
    } else {
      setColor(JSON.parse(bgColor));
    }}
  }, []);
  // useEffect(()=>{
  //   const project = localStorage.getItem("Project");
  //   if(!project){
  //     localStorage.setItem("Project")
  //   }else{
  //     setProject(project)
  //   }
    

  // },[])
  useEffect(() => {
    swapy.current = createSwapy(container.current);
  }, [data]);

  useEffect(() => {
    if (window === true && currentIcon) {
      setItems((prev) => {
        const newItem = {
          name: currentIcon?.name,
          imgPath: currentIcon?.imgPath,
          status: false,
        };

        // check if name already exists
        const exists = prev.some((item) => item.name === newItem.name);

        if (exists) return prev; // don’t add duplicate

        return [...prev, newItem];
      });
      setWindow(false);
    }
  }, [window]);

  const handleRightClick = (e) => {
    e.preventDefault();
    setIconState(false);
    setX(e.clientX);
    setY(e.clientY);
    setState(true);
  };

  const handleIconClick = (e, icon) => {
    e.preventDefault();
    e.stopPropagation();
    setIconState(true);
    setState(true);
    setX(e.clientX);
    setY(e.clientY);
    setName(icon?.name);
    setImage(icon?.imgPath);
    console.log("hello");
  };

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

  return (
    <div
      className="w-full h-screen fixed overflow-x-hidden overflow-y-hidden"
      style={{ backgroundColor: color?.color }}
      onContextMenu={(e) => handleRightClick(e)}
      onClick={() => {
        setState(false);
        setIconState(false); 
       
      }}
    >
      {state && iconstate == false && (
        <RefreshBox x={X} y={Y} data={data} setItems={setItems} />
      )}

      <div
        ref={(el) => {
          container.current = el;
          divRefs.current["data"] = el;
        }}
        className="flex flex-col flex-wrap gap-6 overflow-x-hidden overflow-y-hidden h-[calc(100vh-40px)] text-white text-[13px] w-full items-center content-start p-4 pl-1.6"
        style={{ fontFamily: "Google" }}
        onClick={()=> setStartClick(false)}
      >
        {data &&
          data.map((icon) => (
            <div
              key={icon?.id}
    //             ref={(el) => {
    //   if (el) divRefs.current[icon.id] = el; 
    // }}
              className="w-max "
              draggable
              onContextMenu={(e) => {
                handleIconClick(e, icon);
                setCurrentIcon(icon);
              }}
              onDoubleClick={(e) => handleDoubleClick(e, icon)}
              style={{
                userSelect: "none",
              }}
              onDragEnd={(e) => handleDragEnd(e, icon, "data", divRefs)}
            >
              <div data-swapy-slot={icon?.swapySlot}>
                <div
                  data-swapy-item={icon?.swapyItem}
                  className="flex flex-col gap-2 justify-center items-center cursor-default "
                >
                  <img src={icon?.imgPath} alt="" className="h-10" />
                  <div>{icon?.name}</div>
                </div>
              </div>
            </div>
          ))}

        {iconstate === true && state && (
          <MenuBox
            x={X}
            y={Y}
            setWindow={setWindow}
            setState={setState}
            name={name}
            data={data}
            setData={setData}
            setBin={setBin}
            bin={bin}
            setName={setName}
            setImage={setImage}
            setItems={setItems}
          />
        )}
      </div>

      <div className="absolute bottom-0">
        <Navbar items={items} name={name} setItems={setItems} setStartClick={setStartClick} startClick={startClick} 
           />
      </div>

      {items &&
        items?.map((icon, index) => (
          <Window
            key={index}
            setItems={setItems}
            name={icon?.name}
            image={icon?.imgPath}
            items={items}
            bin={bin}
            data={data}
            setBin={setBin}
            divRefs={divRefs}
            resumeData={resumeData}
            setResumeData={setResumeData}
            setWindow={setWindow}
            setState={setState}
            setName={setName}
            setColor={setColor}
            color={color}
          />
        ))}
        {startClick?<StartMenu setItems={setItems}/>:null}
    </div>
  );
};

export default page;
