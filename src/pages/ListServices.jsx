import React from 'react'
import ServiceForm from '../components/servicecenter/ServiceForm'
 
function ListServices() {
  return (
      <div className="flex w-10/12 xs:w-full mx-auto justify-center items-start">
        <div className="flex mx-auto flex-1 flex-col">
          <h1 className="text-3xl mx-auto mt-2 font-medium text-sky-400">
            List Service
          </h1>
          <h3 className='mx-auto mt-2 text-slate-900 font-semibold'>Effortlessly showcase your services and reach potential clients</h3>
          <div className="mt-6  mx-auto xs:w-full lg:w-7/12 md:w-9/12 sm:w-11/12">
            <ServiceForm/>
          </div>
        </div>
      </div>
  )
}
export default ListServices

 