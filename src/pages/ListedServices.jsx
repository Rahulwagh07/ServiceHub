import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getAllServicesOfOwner } from "../services/operations/serviceCenterAPI"
import ServiceCard from "../components/servicecenter/ServiceCard"

function ListedServices() {
    const { token } = useSelector((state) => state.auth)
    const [services, setServices] = useState([])

    useEffect(() => {
        const fetchServices = async () => {
            const result = await getAllServicesOfOwner(token)
            if(result) {
                setServices(result)
            }
        }
        fetchServices();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="w-10/12 sm:w-11/12 mx-auto sm:mx-0 mt-8">
            <h1 className="text-3xl text-center font-semibold text-slate-700 mt-4 mb-6">
            <span className=" p-2 border border-blue-150 rounded-md">Your Listed Services</span>
          </h1>
            {services && <div>
                {services?.length === 0 ? (
                    <div className="shadow-lg p-10 mt-10  border-sky-500 border-t flex items-center justify-center">
                        <h3 className="text-pure-greys-600 font-semibold">No listed services found</h3>
                    </div>
                ) : (
                    services.map((service) => (
                        <div key={service._id} 
                            className="flex flex-col gap-2">
                        <ServiceCard key={service._id} service={service} setServices={setServices}/>
                        </div>
                    ))
                )}
            </div>
            }
        </div>
    )
}

export default ListedServices