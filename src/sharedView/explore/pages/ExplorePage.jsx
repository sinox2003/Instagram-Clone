import React, {useEffect, useRef} from 'react';
import {Box, VStack} from "@chakra-ui/react";
import useToggleSidebar from "../../../hooks/useToggleSidebar.jsx";
import HomeNavBar from "../../home/components/HomeNavBar.jsx";
import ExplorePosts from "../components/ExplorePosts.jsx";

function ExplorePage(props) {


    const {toggle} = useToggleSidebar();
    const topRef=useRef()


    useEffect(() => {
        toggle(false)
    }, []);

    useEffect(() => {
        topRef.current.scrollIntoView();

    }, []);



    return (
        <VStack w={'full'} ref={topRef}>
            <HomeNavBar />
            <Box w="full" my={{base: '50px', md: "0px"}}>
                <ExplorePosts />
            </Box>
        </VStack>

    );
}

export default ExplorePage;