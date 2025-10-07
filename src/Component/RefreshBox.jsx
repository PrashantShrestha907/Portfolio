import React, { useState } from "react";

const RefreshBox = ({ x, y, data,setItems }) => {
  const [newfolder, setNewfolder] = useState(false);


  const handleNewFolder = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const lastItem = data[data.length - 1];
    const newSwapyItem = String.fromCharCode(
      lastItem?.swapyItem?.charCodeAt(0) + 1
    );
    const newSwapySlot = String.fromCharCode(
      lastItem?.swapySlot?.charCodeAt(0) + 1
    );

    const newItem = {
      id: data.length + 1,
      swapyItem: newSwapyItem,
      swapySlot: newSwapySlot,
      imgPath: "/folder.ico",
      name: formData.get("folderName"),
      parentName: "data"
    };
    const newData = [ ...data, newItem ];
    localStorage.setItem("data", JSON.stringify(newData));
    localStorage.setItem(newItem?.name, JSON.stringify([]))
    setNewfolder(false);
    window.location.reload();
  };

  const handleProperties = (e)=>{
    e.preventDefault()
    setItems(prev => [...prev, { name: "Properties", imgPath: "/start.ico", status: false }]);
  }


  return (
    <>
      <div
        className="bg-[#C5C4C4] h-[11.2rem] w-[8.1rem] cursor-default text-[12.8px] justify-center items-center  gap-1 shadow-[0_-2px_0_0_rgba(255,255,255,1),-2px_0_0_0_rgba(255,255,255,1),0_1.5px_0_0_rgba(0,0,0,1),1.5px_0_0_0_rgba(0,0,0,1)] flex flex-col p-[2px] overflow-hidden"
        style={{
          position: "absolute",
          fontFamily: "Google",
          top: y,
          left: x,
        }}
      >
        <p className="bg-[#C5C4C4] hover:bg-blue-800 hover:text-white w-full flex justify-center">
          Arrange Icons
        </p>
        <p className="bg-[#C5C4C4] hover:bg-blue-800  hover:text-white w-full flex justify-center">
          Task Manager
        </p>
        <div className=" w-full h-[2px] bg-[#a5a3a3] shadow-[0_1px_0_0_rgba(255,255,255,1)]"></div>
        <p className="bg-[#C5C4C4] text-[#817e7e] hover:bg-blue-800  hover:text-white w-full flex justify-center">
          Paste
        </p>
        <p className="bg-[#C5C4C4]  text-[#817e7e] hover:bg-blue-800  hover:text-white w-full flex justify-center">
          Paste Shortcut
        </p>
        <p
          className="bg-[#C5C4C4] hover:bg-blue-800  hover:text-white w-full flex justify-center"
          onClick={() => {
            window.location.reload();
          }}
        >
          Refresh
        </p>
        <div className=" w-full h-[2px] bg-[#a5a3a3] shadow-[0_1px_0_0_rgba(255,255,255,1)]"></div>
        <p
          className="bg-[#C5C4C4] hover:bg-blue-800  hover:text-white w-full flex justify-center"
         onClick={(e) => {
  e.stopPropagation();
  setNewfolder(true);
}}
        >
          New Folder
        </p>
        <div className=" w-full h-[2px] bg-[#a5a3a3] shadow-[0_1px_0_0_rgba(255,255,255,1)]"></div>
        <p className="bg-[#C5C4C4] hover:bg-blue-800  hover:text-white w-full flex justify-center" onClick={(e)=>handleProperties(e)}>
          Properties
        </p>
        {newfolder && (
          <form
            onSubmit={(e) => handleNewFolder(e)}
            onClick={(e) => e.stopPropagation()}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#C5C4C4]  shadow-[0_-2px_0_0_rgba(255,255,255,1),-2px_0_0_0_rgba(255,255,255,1),0_2px_0_0_rgba(0,0,0,1),2px_0_0_0_rgba(0,0,0,1)] flex flex-col gap-2 justify-center items-center h-[10rem] w-[16rem] text-[1rem]"
          >
            <p>Enter folder name:</p>
            <input
              type="text"
              name="folderName"
              className="w-[70%] bg-white focus:outline-0 px-1"
            />
            <div className="flex gap-5 my-2">
              <button
                type="submit"
                className="bg-[#C5C4C4] h-[1.5rem] shadow-[0_-1px_0_0_rgba(255,255,255,1),-1px_0_0_0_rgba(255,255,255,1),0_1px_0_0_rgba(0,0,0,1),1px_0_0_0_rgba(0,0,0,1)] px-5 cursor-pointer"
              >
                Ok
              </button>
              <button
                className="bg-[#C5C4C4]  h-[1.5rem] shadow-[0_-1px_0_0_rgba(255,255,255,1),-1px_0_0_0_rgba(255,255,255,1),0_1px_0_0_rgba(0,0,0,1),1px_0_0_0_rgba(0,0,0,1)] px-5 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  setNewfolder(false);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
       
    </>
  );
};

export default RefreshBox;
