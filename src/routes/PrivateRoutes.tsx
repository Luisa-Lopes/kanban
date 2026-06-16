import { Navigate } from "react-router-dom";
import useAuth from "../hooks/userAuth";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const token = localStorage.getItem("user_token");

  if (!token) {
    return <Navigate to={"/"} replace />;
  }

  return token ? <>{children}</> : <Navigate to="/landingpage" replace />;
}
