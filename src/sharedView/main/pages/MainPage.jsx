import {Box, Flex} from "@chakra-ui/react";
import Sidebar from "../components/sidebar/Sidebar.jsx";
import useToggleSidebar from "../../../hooks/useToggleSidebar.jsx";

import {Outlet} from "react-router-dom";
import React, {Suspense, useEffect, useState} from "react";
import ProgressLoader from "../../loading-pages/ProgressLoader.jsx";
import PostModal from "../../post/modals/PostModal.jsx";

import SliderAlert from "../../Alert-messages/Slider-Alert.jsx";

import PostOptionsModal from "../../post/modals/PostOptions-Modal.jsx";
import PostLikesModal from "../../post/modals/PostLikes-Modal.jsx";
import SharePostModal from "../../post/modals/SharePost-Modal.jsx";
import { onDisconnect } from "firebase/database";
import useAuthStore from "../../../store/Backend-stores/authStore.js";
import useUserPresence from "../../../hooks/back-end-hooks/useUserPresence.js";

function MainPage() {


    const {isSidebarMinimized,isDrawerOpen} = useToggleSidebar();

    const {uid}=useAuthStore((state)=>state.user)
    useUserPresence(uid)

    const handleState=(state1,state2)=>{
        if(isDrawerOpen || isSidebarMinimized){
            return state1
        }
        return state2
    }





    return (
        <Flex bg='transparent' >

            <Box  zIndex={'popover'}  minWidth={handleState('72px',{ md: '72px', xl: '245px', '2xl': '340px' })} >

                <Sidebar />

            </Box>

            <Suspense  fallback={<ProgressLoader/>}>

                    <Outlet />

            </Suspense>

            <PostModal  />
            <SliderAlert  />
            <PostOptionsModal />
            <PostLikesModal />
            <SharePostModal />

        </Flex>

    );
}

export default MainPage;