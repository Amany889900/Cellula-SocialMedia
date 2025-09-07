import React from 'react'

function InputField({ type,name,id,placeholder,label,...rest }) {
  return (
    <div className="relative z-0 w-full mb-5 group">
      <input type={type} name={name} id={id} className="focus:placeholder-transparent block py-5 px-5 w-full text-sm text-gray-900 bg-transparent rounded-2xl border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#34D15C] focus:outline-none focus:ring-0 focus:border-[#34D15C] peer" placeholder={placeholder} {...rest}/>
      <label htmlFor={id} className="opacity-0 peer-focus:opacity-100 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-5 left-5 -z-10 origin-[0] peer-focus:start-5 peer-focus:top-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#34D15C] peer-focus:dark:text-[#34D15C] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{label}</label>
  </div>
  )
}

export default InputField