import React from 'react'
import ServiceForm from '../components/servicecenter/ServiceForm'
 
function ListServices() {
  return (
      <div className="flex w-10/12 sm:w-full mx-auto justify-center items-start">
        <div className="flex mx-auto flex-1 flex-col">
          <h1 className="text-3xl mx-auto font-medium text-sky-400">
            List Service
          </h1>
          <h3 className='mx-auto mt-2 text-slate-900 font-semibold'>Effortlessly showcase your services and reach potential clients</h3>
          <div className="mt-6 lg:w-8/12 md:w-11/12 sm:w-full sm:mx-0 lg:mx-auto md:mx-auto">
            <ServiceForm/>
          </div>
        </div>
      </div>
  )
}
export default ListServices

 