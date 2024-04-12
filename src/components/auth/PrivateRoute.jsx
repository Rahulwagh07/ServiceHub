// This will prevent non-authenticated users from accessing this route
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ErrorPage from "../../pages/Error"

function PrivateRoute({ children }) {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const location = useLocation()

  if(user?.accountType === ACCOUNT_TYPE.SERVICECENTER && location.pathname === "/search"){
    return <ErrorPage/>
  }
  if(user?.accountType === ACCOUNT_TYPE.VISITOR && location.pathname === "/listed-services" || location.pathname === "/list-service"){
    return <ErrorPage/>
  }
  if (token !== null) {
    return children
  } else {
    return <Navigate to="/login" />
  }
}

export default PrivateRoute