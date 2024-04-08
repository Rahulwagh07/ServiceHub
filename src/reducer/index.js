import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import serviceReducer from "../slices/serviceSlice"

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    service: serviceReducer,
})

export default rootReducer;