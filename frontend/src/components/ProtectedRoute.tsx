import { Navigate } from "react-router-dom";
import { useAuth } from "../pages/user-api/hooks-api";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (!user && !isLoading) {
    return <Navigate to="/" replace />;
  }

  return children;
}
