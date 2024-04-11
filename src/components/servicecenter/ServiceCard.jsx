import React from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { useNavigate } from "react-router-dom";
import { SlCallOut } from "react-icons/sl";
import { useSelector } from "react-redux"

const ServiceCard = ({ service, setServices }) => {
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.profile)
  return (
    <div className="flex text-pure-greys-700 sm:flex-col gap-4 lg:w-8/12 md:w-full mx-auto items-center p-6 mb-6 border border-sky-500 rounded-md shadow-md">
      {/* Image */}
        <img
          src={service?.image}  
          alt={service?.name || "service img"} 
          className="aspect-square w-[300px] rounded-md object-cover"
        />

      <div className="flex flex-col gap-6">
         <h2 className="text-lg font-semibold">{service.name}</h2>
        <div className="mt-2">
          <p className="font-semibold">Offered Services:</p>
          <li>{service?.services}</li>  
        </div>
        <div className='flex items-baseline gap-2 '>
          <div className='flex items-center gap-2'><SlCallOut/> {service.phone}</div>
          <div className="mt-2">Opening Hours: {service?.openingHours} 9AM-5PM</div>
        </div>
       {
        user?.accountType === "ServiceCenter" && 
         <div className='flex '>
         <button
          onClick={() => {
          navigate(`/edit-service/${service._id}`)
          }}
          title="Edit"
          className="px-2 hover:text-caribbeangreen-300"
        >
          <FiEdit2 size={20} />
        </button>
        <p>{service?.status}</p>
         </div>
       }
      </div>
    </div>
  );
}

export default ServiceCard;
