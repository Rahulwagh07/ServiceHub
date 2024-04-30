import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { ACCOUNT_TYPE } from '../utils/constants';
import { useState } from 'react';
import Tab from '../components/common/Tab'
import { setSignupData } from '../slices/authSlice';
import { sendOtp } from '../services/operations/authAPI';
 
function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.VISITOR)
  const [formData, setFormData] = useState({
      username: "",
      email: "",
      password: "",
    })

  const { username, email, password} = formData
  const handleOnChange = (e) => {
      setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }))
    }

  const handleOnSubmit = (e) => {
      e.preventDefault()
      const signupData = {
      ...formData,
      accountType,
      }
      dispatch(setSignupData(signupData))
      dispatch(sendOtp(formData.email, navigate))
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
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create an account
        </h2>
      </div>
      <div className='mt-6 sm:mx-auto sm:w-full sm:max-w-sm'>
         <div className='mx-auto flex items-center justify-center'>
         <Tab tabData={tabData} field={accountType} setField={setAccountType}/>
        </div>
        <form className="space-y-6" onSubmit={handleOnSubmit}>
        <div>
            <label htmlFor="username" className="block text-sm font-medium   text-gray-900">
              Name
            </label>
            <input
              id="username"
              name="username"
              value={username}
              type="text"
              onChange={handleOnChange}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 
                shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium   text-gray-900">
              Email
            </label>
            <input
              id="email"
              name="email"
              value={email}
              type="email"
              onChange={handleOnChange}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 
              shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
              focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Create Password
            </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={handleOnChange}
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 
                  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 
              px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm
              hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
              focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Next  
          </button>
      </form>
     
      </div>
  </div>
  )
}

export default Signup