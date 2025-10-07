import React from "react";

const Navbar = ({items,setItems,setStartClick,startClick}) => {
  const now = new Date();


  let hours = now.getHours();
  let minutes = now.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;
//shadow-[0_-2px_0_0_rgba(0,0,0,1),-2px_0_0_0_rgba(0,0,0,1),0_1.5px_0_0_rgba(255,255,255,1),1.5px_0_0_0_rgba(255,255,255,1)]
// bg-[#ddd7d7]
  minutes = minutes < 10 ? "0" + minutes : minutes;

  const time = `${hours}:${minutes} ${ampm}`;
  return (
    <div className="w-[100vw] h-[34px] bg-[#bbb5b5] shadow-[0_0_0_2px_rgba(255,255,255,1)] flex items-center justify-between overflow-hidden ">
      <div className="flex gap-1">
        <div className={`text-black font-bold flex gap-1 items-center ${startClick?"shadow-[0_-2px_0_0_rgba(0,0,0,1),-2px_0_0_0_rgba(0,0,0,1),0_1.5px_0_0_rgba(255,255,255,1),1.5px_0_0_0_rgba(255,255,255,1)]":"shadow-[0_-1px_0_0_rgba(255,255,255,1),-1px_0_0_0_rgba(255,255,255,1),0_1px_0_0_rgba(0,0,0,1),1px_0_0_0_rgba(0,0,0,1)]"} ${startClick?"bg-[#ddd7d7]":null} px-2  m-2 cursor-default`}
        onClick={()=>{setStartClick(prev=>!prev)}}>
          <img src="/start.png" alt="" className="w-[21px] h-[21px]" />
          <p>Start</p>
        </div>
        { items&& items.map((folder,index)=>(
        <div key={index} className="flex gap-1 justify-start items-center outline-1 outline-black bg-[#e9e1e1] w-[10rem] h-[30px] mt-1 pl-2 cursor-default"  onClick={(e) => {
              e.stopPropagation();
              setItems((prev) =>
                prev.map((item) =>
                  item.name === folder?.name
                    ? { ...item, status: false } 
                    : item
                )
              );
            }}>
          <img src={folder?.imgPath} alt="" className="h-5" />
          <p>{folder?.name}</p>
        </div>
        ))

        }
        
      </div>
      <div className="shadow-[0_-1px_0_0_rgba(0,0,0,1),-1px_0_0_0_rgba(0,0,0,1),0_1px_0_0_rgba(0,0,0,1),1px_0_0_0_rgba(0,0,0,1)] px-2 py-[1px] mr-2">
        <p className="text-sm font-bold" style={{ fontFamily: "Google" }}>
          Time: {time}
        </p>
      </div>
    </div>
  );
};

export default Navbar;
