//ref:https://github.com/tailwindtoolbox/Rainblur-Landing-Page/tree/main
import React from 'react';
import macbook from "../assets/macbook.svg"
import headerImg from "../assets/header.png"
import { FcContacts } from "react-icons/fc";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileDropdown from '../components/auth/ProfileDropdown';

const LandingPage = () => {
  const {token} = useSelector((state) => state.auth)
  return (
    <div className="leading-normal tracking-normal h-screen text-indigo-400 bg-cover bg-fixed" style={{backgroundImage: `url(${headerImg})`}}>
      <div className="w-full container mx-auto">
        <div className="w-full flex items-center justify-between">
          <a className="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl" href="/">
            Servi<span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">cehub</span>
          </a>
          <div className="flex w-1/2 justify-end content-center">
            {
                token ? <ProfileDropdown/> : 
                <Link to={"/signup"} className="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out">
                    Sign in
                </Link>
            }
            <Link to={"/contact"} className="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out">
               <FcContacts size={28}/>
            </Link>
          </div>
        </div>
      </div>

      <div className="container pt-24 md:pt-36 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
          <h1 className="my-4 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left">
           Your {" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
            One-Stop Destination
            </span>
            for Trusted Services!
          </h1>
          <p className="leading-normal text-base md:text-2xl mb-8 text-center md:text-left">
            Find any service you need in your area just by one click
          </p>
          <form className="bg-gray-900 opacity-75 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
          <Link to={"/signup"}
                className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-blue-150 text-white-25 font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
              >
                Sign up
              </Link>
          </form>
        </div>
        <div className="w-full xl:w-3/5 p-12 overflow-hidden">
          <img className="mx-auto w-full md:w-4/5 transform -rotate-6 transition hover:scale-105 duration-700 ease-in-out hover:rotate-6" src={macbook} alt="macbook"/>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
