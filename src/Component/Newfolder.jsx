import handleDragEnd from '@/app/Functioncall'
import React from 'react'

const Newfolder = ({data,parentName, divRefs}) => {
  // console.log(data)
  return (
    <div ref={(el) => (divRefs.current[parentName] = el)}>
    {Array.isArray(data) && data.map((item)=>(
    <div key = {item?.id} onDragEnd={(e) => handleDragEnd(e, item, parentName, divRefs)}>
      <img src={item?.imgPath} alt="" />
      {item?.name}
    </div>
    ))}
    </div>
  )
}
// onDragEnd={(e) => handleDragEnd(e, icon, "data", divRefs)}
export default Newfolder
