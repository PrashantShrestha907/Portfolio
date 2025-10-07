import React, { useState } from "react";

const Properties = ({ setColor, color }) => {
  const [clicked, setCLicked] = useState(false);
  const [clickName, setClickName] = useState("");
  const [apply, setApply] = useState(false);
  const colorMap = {
    "Matt Green": { color: "#008081" },
    "Matt Blue": { color: "#456EA6" },
    "Blue Sky": { color: "#87CEEB" },
    "Dark Tone": { color: "#1E1E1E" },
    "Light Pink": { color: "#FFB6C1" },
    "Authentic Gray": { color: "#A9A9A9" },
    "Deep Ocean": { color: "#013A63" },
    "Purple Blue": { color: "#6A5ACD" },
  };
  const finalColor = color.color;
  console.log(finalColor);

  const handleOk = (e) => {
    e.preventDefault();
    console.log("fired");
    if (apply === false) {
      alert("Press Apply First");
      console.log("hello");
    }
    if (typeof window !== "undefined") {
      const finalColor = color.color;
      localStorage.setItem("bgColor", JSON.stringify({ color: finalColor }));
      window.location.reload();
    }
  };

  const handleApply = (e) => {
    e.preventDefault();
    setApply(true);
  };

  return (
    <div className="h-[80%] w-[80%] border-[4px] border-[#585353] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div
        className="bg-white h-[8.5rem] w-[12rem] absolute top-12 left-30"
        style={{ backgroundColor: color.color }}
      ></div>
      <div className="flex flex-col justify-center items-center h-full w-full bg-[#C5C4C4]  gap-10">
        <img src="/PC.png" alt="" className="h-[45%]" />

        <div>
          <p className="text-l mb-2">
            <u>Select a wallpaper</u>
          </p>
          <div className="h-[8rem] w-[20rem] bg-white overflow-y-auto  border-[1px] border-black mb-5">
            <ul className="cursor-default">
              <li
                className={`${
                  clicked === true && clickName === "Matt Green"
                    ? "bg-blue-700 text-white"
                    : null
                } pl-2`}
                onClick={(e) => {
                  setCLicked(true);
                  setClickName("Matt Green");
                  setColor(colorMap["Matt Green"]);
                }}
              >
                Matt Green
              </li>
              <li
                className={`${
                  clicked === true && clickName === "Matt Blue"
                    ? "bg-blue-700 text-white"
                    : null
                } pl-2`}
                onClick={(e) => {
                  setCLicked(true);
                  setClickName("Matt Blue");
                  setColor(colorMap["Matt Blue"]);
                }}
              >
                Matt Blue
              </li>
              <li
                className={`${
                  clicked === true && clickName === "Blue Sky"
                    ? "bg-blue-700 text-white"
                    : null
                } pl-2`}
                onClick={(e) => {
                  setCLicked(true);
                  setClickName("Blue Sky");
                  setColor(colorMap["Blue Sky"]);
                }}
              >
                Blue Sky
              </li>
              <li
                className={`${
                  clicked === true && clickName === "Dark Tone"
                    ? "bg-blue-700 text-white"
                    : null
                } pl-2`}
                onClick={(e) => {
                  setCLicked(true);
                  setClickName("Dark Tone");
                  setColor(colorMap["Dark Tone"]);
                }}
              >
                Dark Tone
              </li>
              <li
                className={`${
                  clicked === true && clickName === "Light Pink"
                    ? "bg-blue-700 text-white"
                    : null
                } pl-2`}
                onClick={(e) => {
                  setCLicked(true);
                  setClickName("Light Pink");
                  setColor(colorMap["Light Pink"]);
                }}
              >
                Light Pink
              </li>
              <li
                className={`${
                  clicked === true && clickName === "Authentic Gray"
                    ? "bg-blue-700 text-white"
                    : null
                } pl-2`}
                onClick={(e) => {
                  setCLicked(true);
                  setClickName("Authentic Gray");
                  setColor(colorMap["Authentic Gray"]);
                }}
              >
                Authentic Gray
              </li>
              <li
                className={`${
                  clicked === true && clickName === "Deep Ocean"
                    ? "bg-blue-700 text-white"
                    : null
                } pl-2`}
                onClick={(e) => {
                  setCLicked(true);
                  setClickName("Deep Ocean");
                  setColor(colorMap["Deep Ocean"]);
                }}
              >
                Deep Ocean
              </li>
              <li
                className={`${
                  clicked === true && clickName === "Purple Blue"
                    ? "bg-blue-700 text-white"
                    : null
                } pl-2`}
                onClick={(e) => {
                  setCLicked(true);
                  setClickName("Purple Blue");
                  setColor(colorMap["Purple Blue"]);
                }}
              >
                Purple Blue
              </li>
            </ul>
          </div>
          <div className="flex gap-1 items-center justify-end">
            <button
              type="submit"
              className="bg-[#C5C4C4] h-[1.5rem] shadow-[0_-1px_0_0_rgba(255,255,255,1),-1px_0_0_0_rgba(255,255,255,1),0_1px_0_0_rgba(0,0,0,1),1px_0_0_0_rgba(0,0,0,1)] px-5 cursor-pointer"
              onClick={(e) => handleOk(e)}
            >
              Ok
            </button>
            <button
              type="submit"
              className="bg-[#C5C4C4] h-[1.5rem] shadow-[0_-1px_0_0_rgba(255,255,255,1),-1px_0_0_0_rgba(255,255,255,1),0_1px_0_0_rgba(0,0,0,1),1px_0_0_0_rgba(0,0,0,1)] px-5 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#C5C4C4] h-[1.5rem] shadow-[0_-1px_0_0_rgba(255,255,255,1),-1px_0_0_0_rgba(255,255,255,1),0_1px_0_0_rgba(0,0,0,1),1px_0_0_0_rgba(0,0,0,1)] px-5 cursor-pointer"
              onClick={(e) => handleApply(e)}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;
