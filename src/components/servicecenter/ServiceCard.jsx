import React from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { useNavigate } from "react-router-dom";
import { SlCallOut } from "react-icons/sl";
import { useSelector } from "react-redux"

const ServiceCard = ({ service, setServices }) => {
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.profile)
  return (
    <div className="flex text-slate-800 xs:flex-col gap-4 lg:w-8/12 md:w-full mx-auto items-center p-4 mb-6 rounded-md shadow-md">
    {/* Image */}
    <img
      src={service?.image}  
      alt={service?.name || "Service Image"} 
      className="aspect-square w-[300px] border-2 border-blue-150 rounded-md object-cover"
    />

    <div className="flex flex-col gap-2 items-start">
      <h2 className="text-2xl font-semibold text-sky-500">{service?.name}</h2>
      <div className="mt-2">
        <p className="font-semibold text-blue-600">Offered Services:</p>
        <ul className='flex flex-col gap-1'>
          {service?.services?.map((serviceItem, index) => (
            <li key={index} className='text-pure-greys-500 font-[500]'>{serviceItem}</li>
          ))}
        </ul>
      </div>
        <div className='flex gap-2 items-center'>
          <SlCallOut className='text-caribbeangreen-300'/> {service?.phone}
        </div>
        <div >Opening Hours: <span className='text-black font-semibold'>{service?.openingHours} 9AM-5PM</span>
        </div>
  
      {user?.accountType === "ServiceCenter" && (
        <div className='flex gap-2'>
        <p className='bg-yellow-25 p-2 rounded-md text-red-500 font-semibold'>{service?.status}</p>
          <button
            onClick={() => {
              navigate(`/edit-service/${service?._id}`)
            }}
            title="Edit"
            className="px-2 text-caribbeangreen-300"
          >
            <FiEdit2 size={20}/>
          </button>
        </div>
      )}
    </div>
  </div>
  );
}

export default ServiceCard;
