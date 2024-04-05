import React from 'react'
import LoginForm from './LoginForm';
import { FaArrowLeftLong } from "react-icons/fa6";


const LoginTemplate = ({setShowLoginTemplate}) => {
  const handleOnClick = () => {
    setShowLoginTemplate(false);
  }

  return (
    <div className='shadow-lg flex flex-col mx-auto justify-center items-center relative p-20 sm:p-8 dark:bg-slate-800'>
        <p className="font-bold">Welcome Back!</p>
        <FaArrowLeftLong size={24}
          onClick={handleOnClick}
          className='absolute top-8 left-20 sm:left-6 cursor-pointer'
        />
        <LoginForm/>
    </div>
  )
}

export default LoginTemplate