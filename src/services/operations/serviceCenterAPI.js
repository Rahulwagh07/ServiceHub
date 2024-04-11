import {toast} from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { serviceCenterEndpoints } from "../apis"

const {
    GET_SERVICECENTER_DETAILS_API,
    ADD_SERVICECENTER_DETAILS_API,
    EDIT_SERVICECENTER_API,
    GET_ALL_SERVICES_FOR_OWNER_API,
    GET_SERVICES_CATEGORIES_API,
    GET_SERVICE_DETAILS_API,
    GET_ALL_SERVICES_API,
} = serviceCenterEndpoints

export const listService = async (data, token) => {
    const toastId = toast.loading("Loading..")
    let result = null
    try{
        const response = await apiConnector("POST", ADD_SERVICECENTER_DETAILS_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })
        if(!response?.data?.success){
            throw new Error("Service added successfully")
        }
        toast.success("Service listed successfully")
        result = response?.data?.data
    } catch (error){
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const editServiceDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading....")

    try{
        const response = await apiConnector("POST", EDIT_SERVICECENTER_API, data, { 
           "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })
        if(!response?.data?.success) {
            throw new Error("Failed to update service detail")
        }
        toast.success("Service updated")
        result = response?.data?.data
    } catch (error){
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const getAllServicesOfOwner = async (token) => {
    let result = []

    const toastId = toast.loading("Loading...")
    try{
        const response  = await apiConnector("GET", GET_ALL_SERVICES_FOR_OWNER_API, null, 
            {
                Authorization: `Bearer ${token}`,
            }
        )
        if (!response?.data?.success) {
            throw new Error("Failed to get services data")
        }
        result = response?.data?.data
    } catch (error){
        console.log(error)
    }
    toast.dismiss(toastId)
    return result
}

export const fetchServicesCategories = async () => {
    let result = []
    try {
      const response = await apiConnector("GET", GET_SERVICES_CATEGORIES_API)
       if (!response?.data?.success) {
        throw new Error("Failed to get the categories")
      }
      result = response?.data?.data
    } catch (error) {
      toast.error("could not fetch categories")
    }
    return result
}

export const getServiceDetails = async (serviceId, token) => {
    const toastId = toast.loading("Loading...")
    let result = null
    try{
        const response = await apiConnector(
            "POST",
            GET_SERVICE_DETAILS_API,
            {
                serviceId,
            },
            {
                Authorization: `Bearer ${token}`,
            }
        )

        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response?.data?.data
    } catch(error){
        console.log("error in fetching service details", error)
    }
    toast.dismiss(toastId)
    return result
}

export const getAllServices = async (searchQuery, token) => {
    let result = [];

    try {
        const response = await apiConnector("POST", GET_ALL_SERVICES_API,
        searchQuery, 
        {
            Authorization: `Bearer ${token}`,
           
        });

        if (!response?.data?.success) {
            throw new Error("Could not get the all services");
        }
        result = response?.data?.data;
        console.log("Result getallservices", result)
    } catch (error) {
        toast.error(error.message);
    }
    return result;
}
 