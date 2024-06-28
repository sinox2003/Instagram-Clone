import React, {useEffect, useRef} from 'react';
import {Box, Container, Flex, useBreakpoint, VStack} from "@chakra-ui/react";
import useToggleSidebar from "../../../hooks/useToggleSidebar.jsx";

import HomeNavBar from "../components/HomeNavBar.jsx";
import FeedPosts from "../components/FeedPosts/FeedPosts.jsx";
import SuggestedUsers from "../components/suggestedUsers/SuggestedUsers.jsx";

function HomePage() {
    const { toggle } = useToggleSidebar();
    const topRef=useRef()

    useEffect(() => {
        toggle(false);
    }, [toggle]);

    const display = useBreakpoint({
        base: 'base',
        xs: 'xs',
        sm: 'sm',
        smd: 'smd',
        md: 'md',
    });

    useEffect(() => {
        topRef.current.scrollIntoView();

    }, []);




    const isSmallScreen = ['base', 'xs', 'sm', 'smd'].includes(display);

    return (
        <VStack w="full"  ref={topRef}>
            <HomeNavBar />
            {isSmallScreen ? (
                <Box w="full" my="50px">
                    <FeedPosts />
                </Box>
            ) : (
                <Container maxW="container.lg">
                    <Flex gap={20}>
                        <FeedPosts />
                        <Box flex={3} display={{ base: 'none', sxl: 'block' }} my="50px" maxW="320px">
                            <SuggestedUsers />
                        </Box>
                    </Flex>
                </Container>
            )}
        </VStack>
    );
}

export default HomePage;
