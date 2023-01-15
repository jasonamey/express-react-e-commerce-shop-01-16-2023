import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, userRole }) => {
  const userState = useSelector((state) => state.userLogin);
  const { loading, userInfo } = userState;
  if (loading) {
    return <div>loading... </div>;
  }
  if (userInfo.role !== userRole) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
