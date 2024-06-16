import {useState} from 'react';
import {Navigate, Outlet} from "react-router-dom";
import useAuthStore from "../store/Backend-stores/authStore.js";

function PublicRoute() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const authUser = useAuthStore(state => state.user);

    return (

        authUser ? <Navigate to={'/main/home'} />: <Outlet />
    );
}

export default PublicRoute;