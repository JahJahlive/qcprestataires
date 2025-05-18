import { createBrowserRouter} from "react-router-dom";
import Home from "../src/views/Home.jsx";
import Dashboard from "../src/views/auth/Dashboard.jsx";
import NotFound from "../src/views/NotFound.jsx";
import AuthLayout from "./components/layout/AuthLayout.jsx";
import DefaultLayout from "./components/layout/DefaultLayout.jsx";

const router = createBrowserRouter([
    {
        path: '/', 
        element: <DefaultLayout />, 
        children: [
            { path: '/', element: <Home /> }
        ]
    },
    {
        path: '/', 
        element: <AuthLayout />, 
        children: [
            { path: '/dashboard', element: <Dashboard />  },
        ]
    },
    { 
        path: '*', 
        element: <NotFound /> 
    }
]);

export default router;
