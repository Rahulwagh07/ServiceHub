import React from 'react'
import { MdOutlineMailOutline } from "react-icons/md";
import LoginTemplate from '../components/auth/LoginTemplate';
import { useState } from 'react';
import {Link } from "react-router-dom"
 

function Login() {
    const [showLoginTemplate, setShowLoginTemplate] = useState(false);
 
    const handleOnEmailLogin = () => {
        setShowLoginTemplate(true);
    }

  return (
    <div className='flex items-center justify-center mt-20'>
        { !showLoginTemplate ? (
            <div className=' shadow-lg flex flex-col justify-center items-center p-16'>
                <h3 className='text-lg font-semibold mb-4 flex flex-start'>Log in to HireZ</h3>
                
                {/* Email Login */}
                <button onClick={handleOnEmailLogin}  className='bg-blue-150 text-white-25 py-2 px-4 rounded flex items-center justify-center mb-4 sm:w-[260px] w-[325px] h-[50px]'>
                    <MdOutlineMailOutline className='mr-3' />
                    <p className='font-semibold'>Continue with Email</p>
                </button>

                {/* Don't have an account? Sign up text */}
                <div className='text-center'>
                    <Link to="/signup">
                        Don't have an account? <span className='font-semibold cursor-pointer hover:text-blue-150'>Sign up</span>
                    </Link>
                </div>
            </div>
            ) :
            (
            showLoginTemplate && <LoginTemplate setShowLoginTemplate={setShowLoginTemplate}/>
            )
        }
    </div>
  )
}

export default Login