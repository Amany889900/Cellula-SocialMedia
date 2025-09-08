import { Button } from 'flowbite-react'
import React from 'react'
import hero from "../../assets/Images/hero.png"
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate();
  return (
  <>
    <div className="lg:flex lg:justify-between"> 
      <img src={hero} alt="hero" className="w-full mb-5 lg:w-[49%] lg:h-screen" />
    
   <div className="w-[80%] mx-auto text-center lg:w-[49%] lg:self-center">
     
     <h1 className="font-medium text-[40px] leading-[56px] mb-3 lg:text-5xl ">Let’s connect <br /> with each other</h1>
    <p className="text-[14px] leading-[24px] text-[#919191] mb-20 ">Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit, sed do eiusmod</p>
   <button onClick={()=>{navigate("/login")}} className="text-white bg-[#34D15C] hover:bg-[#22a343] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-4 text-center lg:w-[70%]">Get started</button>
   </div>

    </div>
  </>
  )
}

export default Home