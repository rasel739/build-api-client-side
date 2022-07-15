import { Navigate } from "react-router-dom";

const PrivateRoute = ({ auth, children }) => {
  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
