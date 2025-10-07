import React from 'react'

const ResumeCV = () => {
  return (
    <>
      <div className='flex flex-col w-full h-full overflow-y-scroll relative'>
        <a 
          href="/PrashantShrestha.pdf" 
          download='Resume' 
          className='bg-white border px-2 py-1 m-1 text-black hover:bg-[#878b9e] hover:text-white transition duration-250 ease-in rounded shadow-sm self-start'
        >
          Download PDF
        </a>
        <img src="/PrashantShrestha1.jpg" alt="" />
        <img src="/PrashantShrestha2.jpg" alt="" />
      </div>
    </>
  )
}
export default ResumeCV
