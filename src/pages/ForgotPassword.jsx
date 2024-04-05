import { useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { getPasswordResetToken } from "../services/operations/authAPI"

function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auth)

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(getPasswordResetToken(email, setEmailSent))
  }

  return (
    <div className="flex items-center justify-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-lg sm:w-[420px] p-12 mt-16 dark:bg-slate-800 text-black box-shadow border-t border-sky-500">
          <h1 className=" font-semibold text-lg">
            {!emailSent ? "Reset your password" : "Check email"}
          </h1>
          <p className="my-4 text-pure-greys-500">
            {!emailSent
              ? "Sure thing! Need a password reset? Cool. Look out for our email with instructions."
              : `We have sent the reset email to ${email}`}
          </p>
          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label className="w-full">
                <p className="mb-1">
                  Email Address <sup className="text-pink-200">*</sup>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full  h-[50px] border px-2 border-sky-500 rounded-md mb-4 focus:outline-none dark:bg-slate-700"
                />
              </label>
            )}
            <button
              type="submit"
              className="mt-6 w-full rounded-[8px] bg-blue-150 py-[12px] px-[12px] font-medium text-white-25"
            >
              {!emailSent ? "Sumbit" : "Resend Email"}
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default ForgotPassword