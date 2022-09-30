import { Route, Outlet, Navigate } from "react-router-dom";
import Register from "./Register";

// этот компонент принимает другой компонент в качестве пропса
// он также может взять неограниченное число пропсов и передать их новому компоненту
const ProtectedRoute = ({ component: Component, ...props }) => {
  return props.loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;
