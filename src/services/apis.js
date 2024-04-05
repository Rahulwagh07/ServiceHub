const BASE_URL = "http://localhost:4000/api"

//Auth endpoints
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
  }

  //job endpoints
  export const profileEndpoints = {
    GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  }

  //ServiceCenter endpoints
  export const serviceCenterEndpoints = {
    GET_SERVICECENTER_DETAILS_API: BASE_URL + "/serviceCenter/getServiceCenterDetails",
    ADD_SERVICECENTER_DETAILS_API: BASE_URL + "/serviceCenter/createServiceCenter",
    DELETE_SERVICECENTER_API: BASE_URL + "./serviceCenter/deleteServiceCenter",
  }
