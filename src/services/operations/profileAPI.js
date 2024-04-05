import { toast } from "react-hot-toast";
import { setLoading, setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector"
import { profileEndpoints } from "../apis"
import { logout } from "./authAPI"

const {
    GET_USER_DETAILS_API,
  } = profileEndpoints

export function getUserDetails(token, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true))
        try {
        const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
            Authorization: `Bearer ${token}`,
        })
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        const userImage = response.data.data.image
            ? response.data.data.image
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.username} ${response.data.data.username}`
        dispatch(setUser({ ...response.data.data, image: userImage }))
        } catch (error) {
        dispatch(logout(navigate))
        }
        dispatch(setLoading(false))
    }
}