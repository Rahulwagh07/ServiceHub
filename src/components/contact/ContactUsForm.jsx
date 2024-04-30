import React, { useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { VscSend } from "react-icons/vsc";
import { submitContactResponse } from "../../services/operations/contactAPI";

export function ContactUsForm(){
    const [loading, setLoading] = useState(false);
    const [isNameFocused, setIsNameFocused] = useState(false);
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPhoneNoFocused, setIsPhoneNoFocused] = useState(false);
    const [isSubjectFocused, setIsSubjectFocused] = useState(false);
    const [isMessageFocused, setIsMessageFocused] = useState(false);

    const {
      register,
      handleSubmit,
      reset,
      getValues,
      formState: { errors, isSubmitSuccessful },
    } = useForm();
  
    const submitContactForm = async (data) => {
      setLoading(true);
      try {
        await submitContactResponse(data);
      } catch (error) {
        console.log("Error", error.message);
      }
      setLoading(false);
    };
  
    useEffect(() => {
      if (isSubmitSuccessful) {
        reset({
          email: "",
          name: "",
          message: "",
          phoneNo: "",
          subject: "",
        });
        setIsNameFocused(false)
        setIsEmailFocused(false)
        setIsPhoneNoFocused(false)
        setIsSubjectFocused(false)
        setIsMessageFocused(false)
      }
    }, [reset, isSubmitSuccessful]);

    const handleNameFocus = () => {
      setIsNameFocused(true);
    }

    const handleNameBlur = () => {
      const value = getValues("name");
      if(value === ""){
          setIsNameFocused(false);
      }
    }
    
    const handleEmailFocus = () => {
      setIsEmailFocused(true);
    };
    
    const handleEmailBlur = () => {
      const value = getValues("email");
      if (value === "") {
        setIsEmailFocused(false);
      }
    };
    
    const handlePhoneNoFocus = () => {
      setIsPhoneNoFocused(true);
    };
  
    const handlePhoneNoBlur = () => {
      const value = getValues("phoneNo");
      if (value === "") {
        setIsPhoneNoFocused(false);
      }
    };
    
    const handleSubjectFocus = () => {
      setIsSubjectFocused(true);
    };
  
    const handleSubjectBlur = () => {
      const value = getValues("subject");
      if (value === "") {
        setIsSubjectFocused(false);
      }
    };
    
    const handleMessageFocus = () => {
      setIsMessageFocused(true);
    };
  
    const handleMessageBlur = () => {
      const value = getValues("message");
      if (value === "") {
        setIsMessageFocused(false);
      }
    };
    
  return (
    <form
      className=" lg:w-[800px] md:w-[600px] sm:w-[400px] md:mx-auto mt-16 xs:mt-8"
      onSubmit={handleSubmit(submitContactForm)}
    >
      <div className="grid grid-cols-2 xs:grid-cols-1 gap-10 mb-9">
        <div className="relative">
          <input
            type="text"
            name="name"
            id="name"
            className={`border-0 w-full  bg-transparent focus:outline-none ${isNameFocused ? 'border-sky-500' : 'border-b-2 border-sky-500'}`}
            {...register("name", { required: true })}
            onFocus={handleNameFocus}
            onBlur={handleNameBlur}
          />
          <label
            htmlFor="name"
            className={`absolute top-0 left-0 transition-transform duration-300 ${
                isNameFocused ? 'text-sky-500 -translate-y-6' : 'text-pure-greys-300'
            }`}
          >
            Name
          </label>
          {errors.name && (
            <span className="-mt-1 text-[12px] text-[#b91c1c]">
              Please enter your name.
            </span>
          )}
      </div>
      <div className="relative">
        <input
          type="email"
          name="email"
          id="email"
          className={`border-0 w-full bg-transparent focus:outline-none ${isEmailFocused ? 'border-sky-500' : 'border-b-2 border-sky-500'}`}
          {...register("email", { required: true })}
          onFocus={handleEmailFocus}
          onBlur={handleEmailBlur}
        />
        <label
          htmlFor="email"
          className={`absolute top-0 left-0  transition-transform duration-300 ${
              isEmailFocused ? 'text-sky-500 -translate-y-6' : 'text-pure-greys-300'
          }`}
        >
          Email
        </label>
        {errors.email && (
          <span className="-mt-1 text-[12px] text-[#b91c1c]">
            Please enter Email.
          </span>
        )}
      </div>
      <div className="relative">
        <input
          type="text"
          name="phoneNo"
          id="phoneNo"
          className={`border-0 w-full bg-transparent appearance-none focus:outline-none ${isPhoneNoFocused ? 'border-sky-500' : 'border-b-2 border-sky-500'}`}
          {...register("phoneNo", { required: true })}
          onFocus={handlePhoneNoFocus}
          onBlur={handlePhoneNoBlur}
        />
        <label
          htmlFor="phoneNo"
          className={`absolute top-0 left-0 transition-transform duration-300 ${
              isPhoneNoFocused ? 'text-sky-500 -translate-y-6' : 'text-pure-greys-300'
          }`}
        >
          PhoneNo
        </label>
        {errors.phoneNo && (
          <span className="-mt-1 text-[12px] text-[#b91c1c]">
            Please enter phone no.
          </span>
        )}
      </div>
      <div className="relative">
        <input
          type="text"
          name="subject"
          id="subject"
          className={`border-0 w-full bg-transparent focus:outline-none ${isSubjectFocused ? 'border-sky-500' : 'border-b-2 border-sky-500'}`}
          {...register("subject", { required: true })}
          onFocus={handleSubjectFocus}
          onBlur={handleSubjectBlur}
        />
        <label
          htmlFor="subject"
          className={`absolute top-0 left-0 transition-transform duration-300 ${
              isSubjectFocused ? 'text-sky-500 -translate-y-6' : 'text-pure-greys-300'
          }`}
        >
          Subject
        </label>
        {errors.name && (
          <span className="-mt-1 text-[12px] text-[#b91c1c]">
            Please enter subject.
          </span>
        )}
      </div>
      <div className="relative lg:col-span-2 md:col-span-2">
          <input
              type="text"
              name="message"
              id="message"
              className={`border-0 w-full bg-transparent focus:outline-none ${isMessageFocused ? 'border-sky-500' : 'border-b-2 border-sky-500'}`}
              {...register("message", { required: true })}
              onFocus={handleMessageFocus}
              onBlur={handleMessageBlur}
          />
          <label
              htmlFor="name"
              className={`absolute top-0 left-0 transition-transform duration-300 ${
                  isMessageFocused ? 'text-sky-500 -translate-y-6' : 'text-pure-greys-300'
              }`}
          >
              Message
          </label>
          {errors.name && (
              <span className="-mt-1 text-[12px] text-[#b91c1c]">
              Please enter your Message.
              </span>
          )}
      </div>
    </div>
    <button
      disabled={loading}
      type="submit"
      className={`rounded-md bg-[#60a5fa] mt-8 px-6 py-5 sm:px-4 sm:py-3 flex xs:mx-auto items-center gap-4 text-center text-[13px] font-semibold text-white-25 text-lg shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
        ${
          !loading &&
          "transition-all duration-200 hover:scale-95 hover:shadow-none"
        }  disabled:bg-gray-500 sm:text-[16px] `}
    >
      {loading ?   "sending..." : "Send Message"} <VscSend/>
    </button>
  </form>
  )
}

 