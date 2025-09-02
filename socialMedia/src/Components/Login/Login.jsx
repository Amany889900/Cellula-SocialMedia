import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputField from '../InputField/InputField';

function Login() {
    const navigate = useNavigate();
    const loginInputs = [
        {type:"email",name:"floating_email",id:"floating_email",placeholder:"Enter your email",label:"Email address"},
        {type:"password",name:"floating_password",id:"floating_password",placeholder:"Enter your password",label:"Password"},
    ]
  return (
    <>
      <div className="w-[80%] mx-auto">
        <div onClick={
            ()=>{
                navigate("/");
            }
        } className="bg-[#34D15C] p-5 w-[15%] rounded-[4px] flex justify-center items-center mt-15 cursor-pointer">
           <i class="fa-solid fa-arrow-left text-white"></i>
        </div>
        <div className="mt-10 text-center">
          <p className="font-bold text-5xl">Hello Again!</p>
          <p className="mt-5 text-[#b3b3b3]">Sign in to your account</p>
        </div>

        

<form class="max-w-md mx-auto mt-15">
  
  {loginInputs.map((input,idx)=>(
    <InputField key={idx} type={input.type} name={input.name} id={input.id} placeholder={input.placeholder} label={input.label} />
  ))}
  <Link className="underline cursor-pointer text-[#34D15C] block mb-15">Forgot your password?</Link>
  <button type="submit" className="text-white bg-[#34D15C] hover:bg-[#22a343] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-4 text-center">Sign in</button>
 <div className="flex items-center justify-center mt-5">
  <div className="flex-grow border-t border-dotted border-gray-300"></div>
  <span className="px-3 text-gray-500">Or with</span>
  <div className="flex-grow border-t border-dotted border-gray-300"></div>
</div>

  <button type="submit" className="bg-white hover:bg-gray-400 focus:ring-4 mt-10 mb-5 border-2 border-gray-300 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-4 text-center"><i className="fa-brands fa-google mr-5"></i>Sign in with Google</button>
  <button type="submit" className="bg-white hover:bg-gray-400 focus:ring-4 border-2 border-gray-300 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-4 text-center"><i className="fa-brands fa-twitter mr-5"></i>Sign in with Twitter</button>

 <p className="mt-5 text-[#b3b3b3] text-center">Don’t have account? Let’s <Link className="text-[#34D15C] underline">Sign up</Link> </p>
 

</form>

      </div>
    </>
  )
}

export default Login