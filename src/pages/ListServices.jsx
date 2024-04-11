import React from 'react'
import ServiceForm from '../components/servicecenter/ServiceForm'
 
function ListServices() {
  return (
      <div className="flex w-full items-start gap-x-6">
        <div className="flex flex-1 flex-col">
          <h1 className="text-3xl font-medium text-black">
            List Service
          </h1>
          <div className="mt-8 max-w-[600px]">
            <ServiceForm/>
          </div>
        </div>
      </div>
  )
}
export default ListServices

 