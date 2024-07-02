import React, { useEffect } from 'react';
import { doc, updateDoc } from "firebase/firestore";
import useToggleSidebar from "../../../hooks/useToggleSidebar.jsx";
import useAuthStore from "../../../store/Backend-stores/authStore.js";
import { firestore } from "../../../config/firebase.js";
import useGetNotification from "../../../hooks/back-end-hooks/useGetNotification.js";
import {Center} from "@chakra-ui/react";

function NotificationsPage() {


    const {toggle} = useToggleSidebar();
    const authUser = useAuthStore(state => state.user);
    const {isLoading,isFetchingMore,notifications}=useGetNotification()



    useEffect(() => {
        toggle(false)

        if (authUser?.uid) {
            const notificationsRef = doc(firestore, "userNotifications", authUser.uid);
            updateDoc(notificationsRef, {
                unread: false
            }).catch((error) => {
                console.error("Error updating notifications: ", error);
            });
        }

    }, []);




    return (

             isLoading ?
                <Center >
                    <p>Loading...</p>
                </Center>
                :
                 notifications.map((notification,key) =>{
                
                <div key={key}>
                  <h3>{notification.type}</h3>
                </div>
                 }

    )
}

export default NotificationsPage;
