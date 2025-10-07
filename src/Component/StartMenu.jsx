import { useRouter } from 'next/navigation';
import React from 'react'

const StartMenu = ({setItems}) => {
  const router = useRouter();
  const handleItems = (item, img) => {
  setItems(prev => [
    ...prev,
    {
      name: item,
      imgPath: img,
      status: false
    }
  ]);
};
const handleNavigation = () =>{
  router.push("https://github.com/PrashantShrestha907")
}
  
  return (
    <div className=" flex flex-col gap-1 items-start  py-2 content-start bg-[#bbb5b5]  shadow-[0_-2px_0_0_rgba(255,255,255,1),-2px_0_0_0_rgba(255,255,255,1),0_1.5px_0_0_rgba(0,0,0,1),1.5px_0_0_0_rgba(0,0,0,1)] h-max w-[180px] absolute bottom-[2.2rem] left-1 text-sm cursor-default">
          <div className="flex gap-2 justify-center w-full pr-10 items-center hover:text-white hover:bg-blue-800 py-2" onClick={()=>handleItems("Project","folder.ico")}>
            <img src="folder.ico" alt="" />
            <p>Project</p>
          </div>
          <div className="flex gap-2 justify-center w-full  hover:text-white hover:bg-blue-800 items-center pr-10 py-2" onClick={()=>handleItems("Resume","resume.ico")}>
            <img src="resume.ico" alt="" />
            <p>Resume</p>
          </div>
          <div className="flex gap-2 justify-center w-full  hover:text-white hover:bg-blue-800 items-center pr-10 py-2" onClick={handleNavigation}>
            <img src="github.jpg" alt="" className="h-8" />
            <p>Github</p>
          </div>
          <div className="flex gap-2 justify-center w-full  hover:text-white hover:bg-blue-800 items-center pr-10 py-2" onClick={()=>handleItems("Properties","setting.ico")}>
            <img src="setting.png" alt="" className='h-8' />
            <p>Properties</p>
          </div>
          <div className="flex gap-2 justify-center w-full  hover:text-white hover:bg-blue-800 items-center pr-10 py-2" onClick={()=>handleItems("Youtube","notepad.ico")}>
            <img src="notepad.ico" alt="" />
            <p>Youtube</p>
          </div>
          <div className=" w-full h-[2px] bg-[#a5a3a3] shadow-[0_1px_0_0_rgba(255,255,255,1)]"></div>
          <div className="flex gap-2 flex-nowrap justify-center items-center w-full  hover:text-white hover:bg-blue-800 pr-10 py-2" onClick={()=>handleItems("Recycle Bin","recycle.ico")}>
            <img src="recycle.ico" alt="" />
            <p>Recycle Bin</p>
          </div>
        </div>
  )
}

export default StartMenu
