import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setService, setEditService } from "../slices/serviceSlice";
import { getServiceDetails } from "../services/operations/serviceCenterAPI";
import ServiceForm from "../components/servicecenter/ServiceForm";
 
export default function EditService() {
    const { service } = useSelector((state) => state.service) 
    const { serviceId } = useParams()
    const [loading, setLoading] = useState(false)
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    
    useEffect(() => {
      const fetchServiceDetails = async () => {
        
        try {
          setLoading(true);
          const result = await getServiceDetails(serviceId, token);
          if (result?.serviceDetail) {
            dispatch(setEditService(true));
            dispatch(setService(result?.serviceDetail));
          }
        } catch (error) {
          console.error('Error in fetching servie details', error);
        } finally {
          setLoading(false);
        }
      };
      fetchServiceDetails();  
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    if(loading) {
      return (
          <div className="grid place-items-center">
              <div >Loading....</div>
          </div>
      )
    }

    return (
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-medium text-black">
            Edit job
          </h1>
          <div className="mt-4 max-w-[600px]">
            {service ? (
              <ServiceForm/>
            ) : (
              <p className="mt-14 text-center text-3xl font-semibold text-pure-greys-600">
                Service not found
              </p>
            )}
          </div>
        </div>
      )
}

 