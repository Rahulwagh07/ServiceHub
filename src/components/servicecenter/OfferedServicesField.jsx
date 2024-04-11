import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function OfferedServicesField({
  name,
  label,
  register,
  setValue,
  errors,
  getValues,
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
    setValue(name, setServicesList)
   }, [setServicesList])

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
    <div className="flex flex-col space-y-2">
      <label htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>
      <div className="flex flex-col items-start space-y-2">
        <input
          type="text"
          id={name}
          value={services}
          onChange={(e) => setServices(e.target.value)}
          className="form-style w-full border border-sky-500"
        />
        <button
          type="button"
          onClick={handleAddServices}
          className="font-semibold"
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
                className="ml-2 text-xs text-pure-greys-300 "
                onClick={() => handleRemoveServices(index)}
              >
                clear
              </button>
            </li>
          ))}
        </ul>
      )}
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  )
}