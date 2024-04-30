import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setService, setEditService } from "../../slices/serviceSlice"
import toast from "react-hot-toast"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import OfferedServicesField from "./OfferedServicesField"
import ImageUpload from "./ImageUpload"
import { listService, editServiceDetails, fetchServicesCategories} from "../../services/operations/serviceCenterAPI"
import IconBtn from "../common/IconBtn"
import { BsBoxArrowInUpRight } from "react-icons/bs";
 
export default function ServiceForm() {
    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { service, editService } = useSelector((state) => state.service)
    const [categories, setCategories] = useState([])

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: {errors},
    } = useForm()

     useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true)
            const categories = await fetchServicesCategories()
            if (categories.length > 0) {
              setCategories(categories)
            }
            setLoading(false)
          }
        if(editService){
            setValue("name", service.name)
            setValue("phone", service.phone)
            setValue("email", service.email)
            setValue("category", service.category)
            setValue("status", service.status)
            setValue("services", service.services)
            setValue("image", service.image)
        }
        fetchCategories()
        // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [])

    const isFormUpdated = () => {
        const currentValues = getValues()
        if (
          currentValues.name !== service.name ||
          currentValues.phone !== service.phone ||
          currentValues.email !== service.email ||
          currentValues.category._id !== service.category._id ||
          currentValues.status !== service.status ||
          currentValues.services.toString() !== service.services.toString() ||
          currentValues.image !== service.image
        ) {
          return true
        } else{
            return false
        }
      }
    
      const onSubmit = async (data) => {
        if (editService) {
            if (isFormUpdated()) {
                const currentValues = getValues()
                const formData = new FormData()
                formData.append("serviceId", service._id)
                formData.append("name", data.name)
                formData.append("phone", data.phone)
                formData.append("email", data.email)
                formData.append("category", data.category)
                formData.append("status", data.status)
                formData.append("services", data.services)
                formData.append("image", data.image)
           
                setLoading(true)
                const result = await editServiceDetails(formData, token)
                setLoading(false)
                if (result) {
                    dispatch(setService(result))
                    dispatch(setEditService(false))
                    navigate("/listed-services")
                }
            } else {
                toast.error("No changes made in the form")
            }
        } else {
            const formData = new FormData()
            formData.append("name", data.name)
            formData.append("phone", data.phone)
            formData.append("email", data.email)
            formData.append("category", data.category)
            formData.append("services", data.services)
            formData.append("image", data.image)
            formData.append("status", data.status)
    
            setLoading(true)
            const result = await listService(formData, token)
            setLoading(false)
            dispatch(setEditService(false))
            navigate("/listed-services")
        }
    }
    
    return (
        <form 
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-md md:p-8 lg:p-8 xs:p-2  shadow-xl text-sm text-slate-800 font-semibold"
        >
        {/* ServiceCenter Name */}
        <div className="flex flex-col mb-2">
            <label htmlFor="name">
            ServiceCenter Name <sup className="text-pink-500">*</sup>
            </label>
            <input
            id="name"
            placeholder="ServiceCenter Name"
            {...register("name", { required: true })}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 
                shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            {errors.name && (
            <span className="ml-2 text-xs tracking-wide text-pink-500">
                Service Name is required
            </span>
            )}
            </div>
        {/* Contact No */}
        <div className="flex flex-col mb-2">
            <label htmlFor="phone">
            Contact No <sup className="text-pink-500">*</sup>
            </label>
            <input
            id="phone"
            type="number"
            placeholder="Enter Phone No"
            {...register("phone", { required: true })}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 
                shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            {errors.phone && (
            <span className="ml-2 text-xs tracking-wide text-pink-500">
                Phone no  is required
            </span>
            )}
        </div>
        {/* Email */}
        <div className="flex flex-col mb-2">
            <label htmlFor="email">
            Email <sup className="text-pink-500">*</sup>
            </label>
            <input
            id="email"
            type="email"
            placeholder="Enter Email"
            {...register("email", { required: true })}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 
                shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            {errors.email && (
            <span className="ml-2 text-xs tracking-wide text-pink-500">
                Email is required
            </span>
            )}
        </div>

        {/* Category */}
        <div className="flex flex-col mb-2">
            <label htmlFor="category">
            Course Category <sup className="text-pink-500">*</sup>
            </label>
            <select
            {...register("category", { required: true })}
            defaultValue=""
            id="category"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 
                shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            <option value="" disabled>
                Choose a Category
            </option>
            {!loading &&
                categories?.map((category, index) => (
                <option key={index} value={category?._id}>
                    {category?.name}
                </option>
                ))}
            </select>
            {errors.category && (
            <span className="ml-2 text-xs tracking-wide text-pink-500">
                Course Category is required
            </span>
            )}
        </div>

        {/* Image upload */}
        <ImageUpload
            name="image"
            label="Service Image"
            register={register}
            setValue={setValue}
            errors={errors}
            editData={editService ? service?.image : null}
        />

        {/* Offered services */}
        <OfferedServicesField
            name="services"
            label="Offered services"
            register={register}
            setValue={setValue}
            errors={errors}
            getValues={getValues}
        />

        {/* status */}
        <div className="flex flex-col mb-2">
            <label htmlFor="status">
                Select Service Status <sup className="text-pink-500">*</sup>
            </label>
            <select
                id="status"
                {...register("status", { required: true })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 
                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                    focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            <option value="published">Published</option>
            <option value="draft">Draft(publish later)</option>
            </select>
            {errors.status && (
                <span className="ml-2 text-xs tracking-wide text-pink-500">
                    Please select status
                </span>
            )}
        </div>

        <div className="flex justify-end gap-x-2 mt-3 sm:flex-col sm:gap-4">
            <IconBtn
            onClick={() => navigate("/listed-services")}
            disabled={loading}
            text={!editService ? "List Service" : "Save Changes"}
            customClasses={`flex w-full justify-center rounded-md bg-indigo-600 
            px-3 py-1.5 text-sm font-semibold leading-6 text-white-25 shadow-sm
             hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
             focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
            >
            <BsBoxArrowInUpRight/>
            </IconBtn>

            {editService && (
            <button
            onClick={() => {
                    navigate("/listed-services");
                    dispatch(setEditService(false));
                }}
                disabled={loading}
                className="flex w-full justify-center rounded-md bg-indigo-600 
                px-3 py-1.5 text-sm font-semibold leading-6 text-white-25 shadow-sm
              hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
                focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                List service without saving
            </button>
            )}
        </div>
    </form>
);
}

