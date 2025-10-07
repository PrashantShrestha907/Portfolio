import React, { useEffect } from 'react'

const Youtube = () => {
  useEffect(()=>{
    window.location.href = "https://www.youtube.com"

  },[])
  return (
    <div className='absolute top-0 left-0 w-[100%] h-[100%] bg-white flex justify-center items-center' s>
      GOING TO YOUTUBE~~~~~
    </div>
  )
}

export default Youtube
