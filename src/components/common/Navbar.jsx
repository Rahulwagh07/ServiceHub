import React, { useState }  from 'react'
import { Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IoReorderThree } from 'react-icons/io5';
import { useRef } from 'react';
import  useOnClickOutside  from "../../hooks/useOnClickOutside"
import logo from "../../assets/logo.png"
import ProfileDropdown from '../auth/ProfileDropdown';
 
function Navbar() {
  const {token} = useSelector((state) => state.auth)
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => {    
    setShowDropdown(false);                 
  });

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
    
  return (
    <div className='flex items-center justify-center transition-all duration-300 py-4'>
      <nav className='flex justify-between max-w-maxScreen w-10/12 text-lg relative h-[40px] sm:h-[30px]'>
      <Link to={"/"} className="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl">
            Servi<span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">cehub</span>
      </Link>

        {/*Small and Medium screen*/}
        <div className='flex gap-4 mt-2 md:hidden xs:flex'>
          {
            token === null ? (
              <div className="cursor-pointer  text-blue-150" onClick={toggleDropdown}>
                <IoReorderThree size={32}/>
              </div>
            ): ( <ProfileDropdown/>) 
          }
        </div>   
        {
        showDropdown && (
        <div  ref={dropdownRef} className='absolute section_bg top-12 border-t border-sky-500 shadow-lg w-full'>
          <div className='flex flex-col items-center'>
            </div>
            <div className="flex flex-col  items-center">      
              {token === null && (
                <Link to="/login">
                  <button className="hover:text-[#6674CC]" onClick={() => setShowDropdown(false)}>
                    Log in
                  </button>
                </Link>
              )}
              {token === null && (
                <Link to="/signup">
                  <button className="hover:text-[#6674CC] py-2" onClick={() => setShowDropdown(false)}>
                    Sign up
                  </button>
                </Link>
              )}
            </div>
          </div>
        )}
        {/* Large Screen */}
      <div className='flex items-center   gap-12 xs:hidden lg:flex md:flex'>
        </div>
        <div className="flex items-center gap-8 sm:hidden xs:hidden md:flex">
          {token === null && (
            <Link to="/login">
              <button className="rounded-md  border-brand items-center px-7 py-2">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-md border-brand items-center px-7 py-2">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown/>}
        </div>    
      </nav>
    </div>
  )
}

export default Navbar