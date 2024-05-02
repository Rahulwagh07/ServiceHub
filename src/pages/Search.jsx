import React, { useEffect, useState } from 'react';
import {useSelector } from 'react-redux';
import { getAllServices } from '../services/operations/serviceCenterAPI';
import { FiSearch } from 'react-icons/fi';
import ServiceCard from '../components/servicecenter/ServiceCard';
import Fuse from 'fuse.js';
import Spinner from '../components/common/Spinner';

function Search() {
  const { token } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState('');
  const [search, setSearch] = useState(false);
  const [showNoResult, setShowNoResult] = useState(false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery && search) {
        fetchData();
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [searchQuery, search]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const servicesData = await getAllServices({ searchQuery }, token);
      const fuse = new Fuse(servicesData, {
        keys: ['name'],
      });
  
      const fuzzyResults = fuse.search(searchQuery);
      const finalResults = fuzzyResults.map((result) => result.item);
      setServices(finalResults);
      setShowNoResult(finalResults.length === 0);
      setLoading(false);
    } catch (error) {
      console.error('Error in fetching services', error);
      setLoading(false);
    }
  };
  
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setSearch(false);
  };

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
        setSearch(true);
    }
  };

  return (
    <div className="container md:mx-auto lg:mx-auto mt-8 flex flex-col ">
      <div className="relative">
        <input
          type="text"
          placeholder="Elctronics/Reparing store"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleEnterPress}
          className="w-full  relative p-4  h-[60px]  rounded-full sm:placeholder:ml-1 placeholder:ml-3 placeholder:absolute
            placeholder:text-lg dark:text-slate-400 dark:bg-slate-900 sm:placeholder:text-sm focus:outline-none border-2  border-sky-500 text-pure-greys-800 font-semibold"
        />
        <button
          onClick={() => setSearch(true)}
          className="absolute inset-y-3 text-white-25 p-5 font-semibold right-0 gap-2 flex items-center justify-center mr-[30px] bg-[#2563eb] rounded-full">
          <FiSearch width={32} height={32} />
          <p>Search</p>
        </button>
      </div>
  
      {/* Display Services */}
      <div className="grid gap-4 mt-8">
        {loading ? (
            <div className='flex items-center justify-center'><Spinner/></div>
        ) : (
          <>
            {services?.map((service) => (
              <span key={service._id} className='cursor-pointer'>
                <ServiceCard service={service} key={service._id} setServices={services}/>
              </span>
            ))}
          </>
        )}
      </div>
      {/* No  Service Found */}
      {
        showNoResult  && 
        <div className='flex items-center justify-center dark:bg-slate-700 shadow-lg h-[200px] p-8 border border-sky-500 mt-2'>
          <p className='text-pure-greys-400'>"No results! Adjust search term.. Your needed service just one step away from you"</p>
          </div>
      }
    </div>
  );
}

export default Search;
