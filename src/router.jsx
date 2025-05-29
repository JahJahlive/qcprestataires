import { createBrowserRouter} from "react-router-dom";
import Home from "../src/views/Home.jsx";
import Dashboard from "../src/views/auth/Dashboard.jsx";
import Profil from "../src/views/auth/Profil.jsx";
import Services from "../src/views/auth/Services.jsx";
import Reservations from "../src/views/auth/Reservations.jsx";
import Equipes from "../src/views/auth/Equipes.jsx";
import HeuresOuvertures from "../src/views/auth/HeuresOuvertures.jsx";
import Abonnements from "../src/views/auth/Abonnements.jsx";
import NotFound from "../src/views/NotFound.jsx";
import AuthLayout from "./components/layout/AuthLayout.jsx";
import DefaultLayout from "./components/layout/DefaultLayout.jsx";
import Search from "./views/Search.jsx";

const router = createBrowserRouter([
    {
        path: '/', 
        element: <DefaultLayout />, 
        children: [
            { path: '/', element: <Home /> },
            { path: '/recherche', element: <Search /> }
        ]
    },
    {
        path: '/', 
        element: <AuthLayout />, 
        children: [
           // { path: '/dashboard', element: <Dashboard />  },
            { path: '/profil', element: <Profil />  },
        //    { path: '/services', element: <Services />  },
            { path: '/reservations', element: <Reservations />  },
        //    { path: '/equipes', element: <Equipes />  },
         //   { path: '/heures_ouvertures', element: <HeuresOuvertures />  },
        //    { path: '/abonnements', element: <Abonnements />  },
        ]
    },
    { 
        path: '*', 
        element: <NotFound /> 
    }
]);

export default router;
