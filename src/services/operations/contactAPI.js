import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { contactusEndpoint } from "../apis"

const {
    CONTACT_US_API
} = contactusEndpoint

export const submitContactResponse = async(data) => {
    try {
      await apiConnector(
          "POST",
          CONTACT_US_API,
          data
        )
        toast.success("Your message was Recieved. Thank you for contacting!");
      } catch (error) {
        console.log("Error Message ", error.message)
      }
}