import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputField from '../InputField/InputField';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { AuthContext } from '../../context/Authentication';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../Store/Slices/UserSlice';

const updateSchema = z.object({
  name:z.string().min(1,"name is required").regex(/^[a-z0-9_-]{3,15}$/,"Username must be 3–15 characters, only lowercase letters, numbers, underscores, or hyphens"),
  email:z.string().min(1,"email is required").email("The email is invalid"),
  password:z.string().min(1,"password is required").regex(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
    "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
  ),
})

function EditProfile() {
    const dispatch = useDispatch();
    const {user,loading, error } = useSelector((state) => state.user);
    const userId = JSON.parse(localStorage.getItem("userId"))
  
   useEffect(() => {
    dispatch(getUser(userId));
  }, [user]);

    const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(updateSchema),
    })

    const navigate = useNavigate();
    const registerInputs = [
        {type:"text",name:"floating_name",id:"floating_name",placeholder:"Enter your name",label:"Username",register:"name",value:user.name},
        {type:"email",name:"floating_email",id:"floating_email",placeholder:"Enter your email",label:"Email address",register:"email",value:user.email},
        {type:"password",name:"floating_password",id:"floating_password",placeholder:"Enter your password",label:"Password",register:"password",value:user.password},
    ]
  return (
    <>
      <div className="w-[80%] mx-auto">
        <div onClick={
            ()=>{
                navigate("/profile");
            }
        } className="bg-[#34D15C] p-5 w-[15%] lg:w-[10%] rounded-[4px] flex justify-center items-center mt-15 cursor-pointer">
           <i className="fa-solid fa-arrow-left text-white"></i>
        </div>
        <div className="mt-10 text-center">
          <p className="font-bold text-5xl">Hello!</p>
          <p className="mt-5 text-[#b3b3b3]">Update Your info</p>
        </div>

        

<form className="max-w-md mx-auto mt-15">
  
  {registerInputs.map((input,idx)=>(<div key={idx}>
    <InputField type={input.type} name={input.name} value={input.value} id={input.id} placeholder={input.placeholder} label={input.label} {...register(input.register)}/>
    {errors[input.register] && <p className="text-red-500 text-sm my-2 max-w-xs break-words">{errors[input.register].message}</p>} 
  </div>
  ))}
  
  <button type="submit" className="text-white bg-[#34D15C] hover:bg-[#22a343] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-4 text-center lg:w-full">Update Info</button>

</form>

      </div>
    </>
  )
}

export default EditProfile