"use Client";

import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import RecycleBin from "../Component/RecycleBin";
import Detective from "../Component/Detective";
import Youtube from "../Component/Youtube";
import emailjs from "@emailjs/browser";
import Resume from "../Component/Resume";
import ResumeCV from "../Component/ResumeCV";
import Properties from "../Component/Properties";
import handleDragEnd from "../app/Functioncall";
import Newfolder from "../Component/Newfolder";
import MyComputer from "../Component/MyComputer";
import Project from "../Component/Project";
import About from "../Component/About";

const Window = ({
  setItems,
  name,
  image,
  items,
  bin,
  data,
  setBin,
  divRefs,
  resumeData,
  setResumeData,
  setWindow,
  setState,
  setName,
  setColor,
  color,
  project,
  setProject,
  setCurrentIcon,
  setIconState,
  setData
}) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [isPositionSet, setIsPositionSet] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const nodeRef = useRef(null);
  const currentStatus = items.find((item) => item.name === name);
  const [count, setCount] = useState(0);
  const [emailname, setEmailName] = useState("");
  const [emailaddress, setEmailAddress] = useState("");
  const [emailmsg, setEmailMsg] = useState("");
  const [newFolder,setNewFolder] = useState([])
  // console.log(name)

  useEffect(() => {
    setX(Math.floor(Math.random() * (540 - 92 + 1)) + 92);
    setY(Math.floor(Math.random() * (450 - 80 + 1)) + 80);
    setIsPositionSet(true);
  }, [name]);

  useEffect(()=>{
    if(typeof window!== undefined){
    setNewFolder(JSON.parse(localStorage.getItem(name)))}
  },[])
  

  const handleStart = (e, data) => {
    setIsDragging(true);
  };

  const handleDrag = (e, data) => {
    if (currentStatus?.status !== true) {
      setX(data.x);
      setY(data.y);
    }
  };

  const handleStop = (e, data) => {
    setIsDragging(false);
    if (currentStatus?.status !== true) {
      setX(data.x);
      setY(data.y);
    }
  };

  if (!isPositionSet) {
    return null;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const serviceId = "service_tf8sm3m";
    const templateId = "template_zp28sas";
    const publicKey = "EmwlOwEScFpqZqGXX";

    const templateParams = {
      from_name: emailname,
      from_email: emailaddress,
      to_name: "Prashant Shrestha",
      message: emailmsg,
    };
    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((res) => {
        setEmailName("");
        setEmailAddress("");
        setEmailMsg("");
      })
      .catch((err) => {
        console.log("Error:", err.message);
      });
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      axis="both"
      handle=".handle"
      defaultPosition={{ x, y }}
      position={{ x, y }}
      grid={[25, 25]}
      scale={1}
      onStart={handleStart}
      onDrag={handleDrag}
      onStop={handleStop}
    >
      <div
        ref={(el) => {
          nodeRef.current = el; 
          if(isNaN(Number(name))&&name!=="About"&&name!=="Mail"&&name!=="Youtube"&&name!=="MyComputer"&&name!=="Detective"){
            divRefs.current[name] = el; 
          }else{
            divRefs.current["data"]=el
          }
        }}
        className={`${
          name === "Mail" || name === "Resume/CV" || name === "Properties" || name === "About"
            ? "h-[40rem] w-[35rem]"
            : "h-[20rem] w-[25rem]"
        } bg-[#C5C4C4] flex flex-col p-1 text-black overflow-hidden`}
        style={{
          position: "absolute",
          fontFamily: "Google",
          top: currentStatus?.status === true ? 900 : 0,
          left: 0,
          transition: isDragging ? "none" : "top 0.1s ease-in-out",
        }}
        onDragEnd={(e) => {
          
          handleDragEnd(e, items, "data", divRefs);
          console.log(name);
        }}
      >
        <div className="flex justify-between bg-[#3F4565] handle h-[40px]">
          <div className="flex gap-[2px] justify-center items-center ml-1 h-max-xs">
            <img src={image} alt="" className="h-[70%]" />
            <p className="text-white">{name}</p>
          </div>
          <div className="flex gap-[1px] justify-center items-center">
            <div
              className="px-[6px] h-[26px] bg-[#C5C4C4] border-t-[2px] border-r-[2px] border-b-[2px] border-l-[2px] border-t-white border-l-white border-r-black border-b-black flex justify-center items-center cursor-default"
              onClick={(e) => {
                e.stopPropagation();
                setItems((prev) =>
                  prev.map((item) =>
                    item.name === name ? { ...item, status: true } : item
                  )
                );
              }}
            >
              <p className="font-bold text-2xl relative bottom-2">_</p>
            </div>
            <div className="px-[6px] h-[26px] bg-[#C5C4C4] border-t-[2px] border-r-[2px] border-b-[2px] border-l-[2px] border-t-white border-l-white border-r-black border-b-black flex justify-center items-center">
              <p className="text-xl relative bottom-0.5">▢</p>
            </div>
            <div
              className="px-[6px] h-[26px] bg-[#C5C4C4] border-t-[2px] border-r-[2px] border-b-[2px] border-l-[2px] border-t-white border-l-white border-r-black border-b-black flex justify-center items-center cursor-default"
              onClick={() => {
                setItems((prev) => prev.filter((items) => items.name !== name));
              }}
            >
              <p className="relative bottom-0.5">X</p>
            </div>
          </div>
        </div>
        {name === "Detective" ||
        name === "Resume/CV" ||
        name === "Properties" ? null : (
          <>
            <div className="flex gap-2 ml-2.5 mb-1">
              <p>
                <u>F</u>ile
              </p>
              <p>
                <u>E</u>dit
              </p>
              <p>
                <u>V</u>iew
              </p>
              <p>
                <u>H</u>elp
              </p>
            </div>
          </>
        )}
        {name === "Mail" ? (
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col gap-2 p-2"
          >
            <div className="flex gap-3 justify-center item-center">
              <button
                type="submit"
                className="flex-[0_0_15%] border-t-[2px] border-r-[2px] border-b-[2px] border-l-[2px] border-t-white border-l-white border-r-black border-b-black "
              >
                Send
              </button>
              <p className="bg-[#D4D1D1] text-[#7c7575] flex-[0_0_85%] pl-1 border-1 focus:outline-[0px]">
                peashant907@gmail.com
              </p>
            </div>
            <div className="flex gap-3 justify-center item-center">
              <button
                type="button"
                className="flex-[0_0_15%] border-t-[2px] border-r-[2px] border-b-[2px] border-l-[2px] border-t-white border-l-white border-r-black border-b-black "
              >
                Name
              </button>
              <input
                type="text"
                className="bg-[#ffffff] flex-[0_0_85%] pl-1 border-1 focus:outline-[0px]"
                placeholder="Enter your name"
                value={emailname}
                onChange={(e) => setEmailName(e.target.value)}
                required
              />
            </div>
            <div className="flex gap-3 justify-center item-center">
              <button
                type="button"
                className="flex-[0_0_15%] border-t-[2px] border-r-[2px] border-b-[2px] border-l-[2px] border-t-white border-l-white border-r-black border-b-black "
              >
                Email
              </button>
              <input
                type="email"
                className="bg-[#ffffff] flex-[0_0_85%] pl-1 border-1 focus:outline-[0px]"
                placeholder="Enter your email"
                value={emailaddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                required
              />
            </div>
          </form>
        ) : null}
        <div
          className={`${
            name === "Properties" ? "bg-[#C5C4C4]" : "bg-white"
          } h-[100%] mb-1`}
        >
          {name === "RecycleBin" ? (
            <RecycleBin
              bin={bin}F
              data={data}
              setBin={setBin}
              divRefs={divRefs}
              setCount={setCount}
            />
          ) : name === "Detective" ? (
            <Detective />
          ) : name === "Youtube" ? (
            <Youtube />
          ) : name === "Mail" ? (
            <textarea
              type="text"
              className="w-full p-1 focus:outline-0 resize-none break-words"
              placeholder="Enter your message"
              value={emailmsg}
              onChange={(e) => setEmailMsg(e.target.value)}
            />
          ) : name === "Resume" ? (
            <Resume
              resumeData={resumeData}
              setResumeData={setResumeData}
              divRefs={divRefs}
              setCount={setCount}
              setWindow={setWindow}
              setState={setState}
              setBin={setBin}
              bin={bin}
              setName={setName}
              setItems={setItems}
              setCurrentIcon={setCurrentIcon}
              setIconState={setIconState}
            />
          ) : name === "Resume/CV" ? (
            <ResumeCV />
          ) : name === "Properties" ? (
            <Properties setColor={setColor} color={color} />
          ) : name==="MyComputer" ? <MyComputer/>: name ==="Project"?<Project setCount={setCount} project={project} divRefs={divRefs}
              setWindow={setWindow}
              setState={setState}
              setBin={setBin}
              bin={bin}
              setName={setName}
              setItems={setItems}
              setProject={setProject}
              />:name==="About"?<About/>:<Newfolder data={newFolder} parentName={name} divRefs={divRefs} setCount={setCount}  setWindow={setWindow}
              setState={setState}
              setBin={setBin}
              bin={bin}
              setName={setName}
              setItems={setItems}
              setCurrentIcon={setCurrentIcon}
              setIconState={setIconState}/>}
        </div>
        {count > 0 ? (
          <div className="flex gap-1 justify-center items-center ml-1 w-[98.5%]">
            <div className="flex-[0_0_55%] border-t-[2px] border-r-[2px] border-b-[2px] border-l-[2px] border-t-white border-l-white border-r-black border-b-black pl-1">
              {count} object
            </div>
            <div className="flex-[0_0_45%] border-t-[2px] border-r-[2px] border-b-[2px] border-l-[2px] border-t-white border-l-white border-r-black border-b-black pl-1">
              Hello World
            </div>
          </div>
        ) : null}
      </div>
    </Draggable>
  );
};

export default Window;
