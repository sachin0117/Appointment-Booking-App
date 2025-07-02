import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, } from "react-router-dom"
import Signin from "../pages/signin/Signin"
import Signup from "../pages/signup/Signup"
import BookAppointment from "../components/userdashboardhelpers/BookAppointment"
import Dashboard from "../layout/dashboard/Dashboard"
import GetDashboardbyRole from "../layout/dashboard/getDashboardbyRole"
import ManagerServices from "../components/admindashboardhelper/ManagerServices"
import ProtectedRoute from "./ProtectedRoute"
import ErrorPage from "../components/error/Error"




export default function Routing() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<Signin />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />}>
                        <Route index element={<GetDashboardbyRole />} />
                        <Route path="book-appointment" element={<BookAppointment />} />
                        <Route path="manage-services" element={<ManagerServices />} />
                    </Route>
                </Route>
                <Route path="*" element={<ErrorPage/>}/>

            </>
        )
    )
    return (
        <RouterProvider router={router} />
    )
}
