import React, { useEffect, useState } from 'react'
import Window from "../Component/Window"
import { useRouter } from 'next/navigation';

const MenuBox = ({x,y,setWindow,setState,name, data,setData,setBin,bin,image,setItems}) => {
  const router = useRouter();

   const handleOpen = (e)=>{
   if(name==="Resume/CV"){   
    setItems(prev => [...prev, { name: name, imgPath: image, status: false }]);
    setWindow(true);
    setState(false); 
    e.stopPropagation()
   }else if (name==="Github"){
    router.push("https://github.com/PrashantShrestha907")
   }else if (name == "SchoolAid"){
     router.push("https://github.com/PrashantShrestha907/SchoolAid-AI-blog-SIte-")
   }else if (name == "Internest"){
     router.push("https://github.com/PrashantShrestha907/Interenest")
   }else if (name == "FaceGram"){
     router.push("https://github.com/PrashantShrestha907/FaceGram-Socia-Media-WebSite-")
   }else if (name == "Attendify"){
     router.push("https://github.com/PrashantShrestha907/Attendify")
   }
   else{
   setWindow(true);
   setState(false); 
   e.stopPropagation()
  }

  }
 

  const handleDelete = (e)=>{
    e.preventDefault();
    if(typeof window !== undefined){
    const newData = data.filter(item=>item?.name!==name);
     const deleted = data
    .filter(item => item?.name === name)
    .map(item => ({
      ...item,
      parentName: "RecycleBin" 
    }));
    setData(localStorage.setItem("data",JSON.stringify(newData)));
    const deletedData = [...bin, ...deleted]
    setBin( localStorage.setItem("RecycleBin", JSON.stringify(deletedData)));
    window.location.reload()}
  }

  return (
    <div  className="bg-[#C5C4C4] h-[12.2rem] w-[8.1rem] cursor-default text-[13px] justify-center items-center  gap-[2px] border-t-[2px] border-r-[2px] border-b-[2px] border-l-[2px] border-t-white border-l-white border-r-black border-b-black flex flex-col z-100"
     style={{
          position: "absolute",
          fontFamily: "Google",
          top: y,
          left: x,
        }}>
       <p className="bg-[#C5C4C4] text-black hover:bg-blue-800 hover:text-white w-full flex justify-center " 
       onClick={(e)=>handleOpen(e)}>
          Open
        </p>
        <p className="bg-[#C5C4C4] text-black hover:bg-blue-800  hover:text-white w-full flex justify-center" onClick={(e)=>{setState(true); e.stopPropagation()}}>
          Edit
        </p>
        <div className=" w-full py-[1px] bg-[#adaaaa] shadow-[0_1px_0_0_rgba(255,255,255,1)]"></div>
        <p className="bg-[#C5C4C4] text-black hover:bg-blue-800  hover:text-white w-full flex justify-center">
          Send To
        </p>
         <div className=" w-full py-[1px] bg-[#adaaaa] shadow-[0_1px_0_0_rgba(255,255,255,1)]"></div>
        <p className="bg-[#C5C4C4] text-[#817e7e] hover:bg-blue-800  hover:text-white w-full flex justify-center">
          Cut
        </p>
        <p className="bg-[#C5C4C4] text-[#817e7e] hover:bg-blue-800  hover:text-white w-full flex justify-center">
          Copy
        </p>
         <div className=" w-full py-[1px] bg-[#a5a3a3] shadow-[0_1px_0_0_rgba(255,255,255,1)]"></div>
         <p className="bg-[#C5C4C4] text-black hover:bg-blue-800  hover:text-white w-full flex justify-center" onClick={(e)=>handleDelete(e)}>
          Delete
        </p>
        <p className="bg-[#C5C4C4] text-black hover:bg-blue-800  hover:text-white w-full flex justify-center">
          Rename
        </p>
        <div className=" w-full py-[1px] bg-[#a5a3a3] shadow-[0_1px_0_0_rgba(255,255,255,1)]"></div>
        <p className="bg-[#C5C4C4] text-black hover:bg-blue-800  hover:text-white w-full flex justify-center">
          Properties
        </p>
            
    </div>
  )
}

export default MenuBox
