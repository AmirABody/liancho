import { Navigate } from "react-router-dom";
import { useAuth } from "../pages/user-api/hooks-api";
import Loading from "./Loading";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />
  }

  if (!user && !isLoading) {
    return <Navigate to="/" replace />;
  }

  return children;
}
