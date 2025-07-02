import { Navigate, Outlet } from "react-router-dom"


export default function ProtectedRoute() {
    const  currentUser = localStorage.getItem("currentUser")
  return currentUser? <Outlet/> : <Navigate to="/signin" replace />;
}
