import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, } from "react-router-dom"
import Signin from "../pages/signin/Signin"
import Signup from "../pages/signup/Signup"
import BookAppointment from "../components/BookAppointment"
import Dashboard from "../layout/dashboard/Dashboard"
import UserDashboard from "../layout/dashboard/UserDashboard"



export default function Routing() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<Signin />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />}>
                    <Route index element={<UserDashboard />} />
                    <Route path="book-appointment" element={<BookAppointment />} />
                </Route>
            </>
        )
    )
    return (
        <RouterProvider router={router} />
    )
}
