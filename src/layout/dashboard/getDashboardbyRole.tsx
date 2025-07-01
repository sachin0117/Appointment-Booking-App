import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

export default function GetDashboardbyRole() {
  const currentUser = localStorage.getItem("currentUser");
  const parsedRole = currentUser ? JSON.parse(currentUser).role : null;
  return (
    <>
      {parsedRole === "admin" && <AdminDashboard />}
      {parsedRole === "user" && <UserDashboard />}
    </>
  );
}