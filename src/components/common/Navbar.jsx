import React, { useState }  from 'react'
import { Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link as ScrollLink } from 'react-scroll';
import { NavbarLinks } from '../../data/navabarlinks'
import {useLocation } from "react-router-dom"
import { IoReorderThree } from 'react-icons/io5';
import { RxCross1 } from "react-icons/rx";
import { useRef } from 'react';
import  useOnClickOutside  from "../../hooks/useOnClickOutside"
import logo from "../../assets/newLogo.png"
import ProfileDropdown from '../auth/ProfileDropdown';
import { CiShoppingCart } from "react-icons/ci";


function Navbar() {

  const {token} = useSelector((state) => state.auth)
  const location = useLocation();
  const isHomeRoute = location.pathname === '/';
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => {    
    setShowDropdown(false);                 
  });

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
    
  return (
    
    <div className='flex items-center justify-center dark:bg-slate-900 transition-all duration-300 section_bg py-4 box-shadow'>
        <nav className='flex justify-between max-w-maxScreen w-10/12 text-lg relative h-[50px] sm:h-[40px]'>
            <Link to={"/"} className='flex gap-4 items-center justify-center'>
                <img src={logo} alt='logo' className="h-28 w-28 absolute left-[-30px] sm:top-[-25px] top-[-20px]"/>
                <h3 className='text-sky-400 font-semibold ml-16'>HireZ</h3>
            </Link>

             {/*Small and Medium screen*/}
            
                <div className='flex lg:hidden gap-4 items-center justify-center mt-2'>
                  {
                    token === null ? (
                      <div className="cursor-pointer  text-blue-150" onClick={toggleDropdown}>
                        <IoReorderThree size={32} className={`${showDropdown ? "hidden" : "flex"}`}/>
                      </div>
                    ): ( <ProfileDropdown/>) 
                  }
                </div>
        
               
            {
              showDropdown && (
                <div  ref={dropdownRef} className='absolute rounded-lg dark:bg-slate-800 section_bg right-0 top-12 shadow-lg py-6 px-12 '>
                <div className="absolute top-[-37px] right-[45px]">
                  <RxCross1 size={24} color='#333' onClick={() => setShowDropdown(false)}/>
                </div>

                {
                (isHomeRoute || token === null) && 
                <div className='flex flex-col items-center'>
                  {NavbarLinks.map((link, index) => (
                      <li key={index} className='py-2 leading-5 flex items-center hover:text-[#6674CC] transition-all duration-150 cursor-pointer'>
                        <ScrollLink
                          to={link.path}
                          smooth={true}
                          duration={1000}
                          offset={-70}
                          spy={true}
                          exact="true"
                          activeClass="active"
                          onClick={() => setShowDropdown(false)}
                        >
                          {link.title}
                        </ScrollLink>
                      </li>
                    ))}
                  </div>
              }
            
            {/* LOGIN AND SIGNUP */}
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
              )
            }
                 {/* Large Screen */}
              {
                isHomeRoute  && 
                <div className='flex items-center   gap-12 sm:hidden md:hidden'>
                  {NavbarLinks.map((link, index) => (
                      <li key={index} className='py-5 leading-5 flex gap-1 items-center hover:text-[#6674CC] transition-all duration-150 cursor-pointer'>
                        <ScrollLink
                          to={link.path}
                          smooth={true}
                          duration={1000}
                          offset={-70}
                          spy={true}
                          exact="true"
                          activeClass="active"
                        >
                          {link.title}
                        </ScrollLink>
                      </li>
                    ))}
                  </div>
              }
            
            {/* LOGIN AND SIGNUP */}
            <div className="flex items-center gap-8 sm:hidden md:hidden">
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
              <Link to="/cart">
                <CiShoppingCart/>
              </Link>
            </div>

             
        </nav>
    </div>
  )
}

export default Navbar