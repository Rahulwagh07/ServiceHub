import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { ACCOUNT_TYPE } from '../../utils/constants';
import { useState } from 'react';
import {toast} from "react-hot-toast"
import Tab from '../common/Tab';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { setSignupData } from '../../slices/authSlice';
import { sendOtp } from '../../services/operations/authAPI';
 

function SignupForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.VISITOR)

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
      })

    const [showPassword, setShowPassword] = useState(false)
 
    const { username, email, password} = formData

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }))
      }

      // Handle Form Submission
    const handleOnSubmit = (e) => {
        e.preventDefault()
        const signupData = {
        ...formData,
        accountType,
        }

        // Setting signup data to state
        // To be used after otp verification
        dispatch(setSignupData(signupData))
        // Send OTP to user for verification
        dispatch(sendOtp(formData.email, navigate))

        // Reset
        setFormData({
        username: "",
        email: "",
        password: "",
        })
        setAccountType(ACCOUNT_TYPE.VISITOR)
    }

     // data to pass to Tab component
    const tabData = [
        {
        id: 1,
        tabName: "Visitor",
        type: ACCOUNT_TYPE.VISITOR,
        },
        {
        id: 2,
        tabName: "ServiceCenter",
        type: ACCOUNT_TYPE.SERVICECENTER,
        },
    ]

  return (
    <div className='lg:w-[500px] flex flex-col items-center justify-center text-black'>
        <Tab tabData={tabData} field={accountType} setField={setAccountType}/>

        <form onSubmit={handleOnSubmit} className="flex w-full flex-col items-center justify-center gap-4 lg:w-[380px]">
        <label className="w-full mr-4 ml-4 sm:mr-0">
          <p className="mb-1">
            Name <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="text"
            name="username"
            value={username}
            onChange={handleOnChange}
            placeholder="Enter your name"
            className="lg:w-[400px] md:w-full  sm:h-[42px] sm:items-center lg:ml-[-10px]  sm:w-[260px] h-[50px] rounded-md  border border-sky-500 focus:outline-none dark:bg-slate-700 pl-2"
          />
        </label>
        <label className="w-full mr-4 ml-4 sm:mr-0">
          <p className="mb-1">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            className="lg:w-[400px] md:w-full  sm:h-[42px] sm:items-center lg:ml-[-10px]  sm:w-[260px] h-[50px] rounded-md  border border-sky-500 focus:outline-none dark:bg-slate-700 pl-2"
          />
        </label>
        <label className="relative w-full mr-4 ml-4 sm:mr-0">
            <p className="mb-1">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              className="lg:w-[400px] md:w-full  sm:h-[42px] sm:items-center lg:ml-[-10px]  sm:w-[260px] h-[50px] rounded-md  border border-sky-500 focus:outline-none dark:bg-slate-700 pl-2"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-[38px] z-[10] cursor-pointer mt-1"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        <button
          type="submit"
          className="bg-blue-150 sm:w-[260px] py-2 px-4 text-white-25 rounded flex items-center justify-center mb-4 w-full h-[50px]"
        >
          Next  
        </button>
      </form>
    </div>
  )
}

export default SignupForm