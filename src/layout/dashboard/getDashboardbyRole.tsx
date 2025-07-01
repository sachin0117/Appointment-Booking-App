import AdminDashboard from "./AdminDashboard"
import UserDashboard from "./UserDashboard"

export default function GetDashboardbyRole() {
    const role = localStorage.getItem("userData")
    const parsedRole =  role ? JSON.parse(role).role : null
  return (
    <>
      {parsedRole === "admin" && <AdminDashboard />}
      {parsedRole === "user" && <UserDashboard />}
    </>
  )
}
