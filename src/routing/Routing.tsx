import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, } from "react-router-dom"
import Signin from "../pages/signin/Signin"
import Signup from "../pages/signup/Signup"
import Dashboard from "../layout/dashboard/Dashboard"


export default function Routing() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<Signin />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </>
        )
    )
    return (
        <RouterProvider router={router} />
    )
}
