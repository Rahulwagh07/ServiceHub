import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function OfferedServicesField({
  name,
  label,
  register,
  setValue,
  errors,
}) {
  const { editService, service } = useSelector((state) => state.service)
  const [services, setServices] = useState("")
  const [servicesList, setServicesList] = useState([])
  useEffect(() => {
    if (editService) {
        setServicesList(service?.services)
    }
    register(name, { required: true, validate: (value) => value.length > 0 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setValue(name, servicesList)
   }, [servicesList])

  const handleAddServices = () => {
    if (services) {
        setServicesList([...servicesList, services])
        setServices("")
    }
  }

  const handleRemoveServices = (index) => {
    const updatedServices = [...servicesList]
    updatedServices.splice(index, 1)
    setServicesList(updatedServices)
  }

  return (
    <div className="flex flex-col space-y-2 mb-2">
      <label htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>
      <div className="flex flex-col items-start space-y-2">
        <input
          type="text"
          id={name}
          placeholder="Enter service & click on add"
          value={services}
          onChange={(e) => setServices(e.target.value)}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 
            shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
            focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        <button
          type="button"
          onClick={handleAddServices}
          className="font-semibold text-sky-400"
        >
          Add
        </button>
      </div>
      {servicesList.length > 0 && (
        <ul className="mt-2 list-inside list-disc">
          {servicesList.map((service, index) => (
            <li key={index} className="flex items-center">
              <span>{service}</span>
              <button
                type="button"
                className="ml-2 text-sm text-red-500"
                onClick={() => handleRemoveServices(index)}
              >
                clear
              </button>
            </li>
          ))}
        </ul>
      )}
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-500">
          {label} is required
        </span>
      )}
    </div>
  )
}