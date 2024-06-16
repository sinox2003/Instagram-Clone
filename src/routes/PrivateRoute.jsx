import React, {useState} from 'react';
import {Navigate, Outlet} from "react-router-dom";
import useAuthStore from "../store/Backend-stores/authStore.js";

function PrivateRoute() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const authUser = useAuthStore(state => state.user);


    return (

        authUser ? <Outlet /> : <Navigate to={'/'} />
    );
}

export default PrivateRoute;
