import React, {useEffect} from 'react';
import {Box, Container, Heading, VStack} from "@chakra-ui/react";
import useToggleSidebar from "../../../hooks/useToggleSidebar.jsx";
import HomeNavBar from "../../home/components/HomeNavBar.jsx";
import FeedPosts from "../../home/components/FeedPosts/FeedPosts.jsx";
import ExplorePosts from "../components/ExplorePosts.jsx";

function ExplorePage(props) {


    const {toggle} = useToggleSidebar();

    useEffect(() => {
        toggle(false)
    }, []);


    return (
        <VStack w={'full'}>
            <HomeNavBar />
            <Box w="full" my={{base: '50px', md: "0px"}}>
                <ExplorePosts />
            </Box>
        </VStack>

    );
}

export default ExplorePage;