import { Outlet } from "react-router-dom";
import Navbar from "../header/Navbar";



export default function Dashboard() {
  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}
