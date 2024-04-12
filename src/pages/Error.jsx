import Navbar from "../components/common/Navbar"
import { useLocation } from "react-router-dom"
import { ACCOUNT_TYPE } from "../utils/constants";
import { useSelector } from "react-redux"

export default function ErrorPage() {
  const location = useLocation()
  const { user } = useSelector((state) => state.profile)
  const isServiceCenter = user?.accountType === ACCOUNT_TYPE.SERVICECENTER;
  const isVisitor = user?.accountType === ACCOUNT_TYPE.VISITOR;
  const restrictedRoutes = {
    "/search": isServiceCenter,
    "/listed-services": isVisitor,
    "/list-service": isVisitor,
  };

  // Check if the current location is a restricted route
  const isRestrictedRoute = restrictedRoutes[location.pathname];
  return (
    <div className="flex flex-col">
        {
          !isRestrictedRoute && <Navbar/>
        }
      <h1 className="text-3xl font-bold text-center mt-20 mb-4">Oops! Page not Found</h1>
    </div>
  );
}