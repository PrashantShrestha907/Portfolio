"use client";
import { useRef, useState } from "react";

const page = () => {
  // Dynamic divs with items
 const keys = [];

for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  // Only push keys that are strings and not empty or internal like starting with "__"
  if (typeof key === "string" && !key.startsWith("__")) {
    keys.push(key);
  }
}


console.log(keys);
  const [divs, setDivs] = useState([
    { id: "A", label: "Div A", items: [{ id: 1, label: "Item A1" }, { id: 2, label: "Item A2" }] },
    { id: "B", label: "Div B", items: [{ id: 3, label: "Item B1" }] },
    { id: "C", label: "Div C", items: [] }, // can add more divs
  ]);
  

  // Refs for each div
  const divRefs = useRef({});

  // Handle drag end
  const handleDragEnd = (e, draggedItem, fromId) => {
    const x = e.clientX;
    const y = e.clientY;

    // Find which div the item was dropped into
    for (const div of divs) {
      const rect = divRefs.current[div.id].getBoundingClientRect();
      if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
        if (div.id !== fromId) {
          // Remove from original div
          const newDivs = divs.map(d => {
            if (d.id === fromId) {
              return { ...d, items: d.items.filter(i => i.id !== draggedItem.id) };
            } else if (d.id === div.id) {
              return { ...d, items: [...d.items, draggedItem] };
            } else return d;
          });
          setDivs(newDivs);
        }
        break; // item dropped, exit loop
      }
    }
  };

  return (
    <div className="flex flex-wrap gap-4 p-6">
      {divs.map((div) => (
        <div
          key={div.id}
          ref={(el) => (divRefs.current[div.id] = el)}
          className="border-2 p-4 min-h-[120px] w-60"
        >
          <h2>{div.label}</h2>
          {div.items.map((item) => (
            <div
              key={item.id}
              draggable
              onDragEnd={(e) => handleDragEnd(e, item, div.id)}
              className="p-2 bg-gray-200 m-1 cursor-grab"
            >
              {item.label}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default page;
