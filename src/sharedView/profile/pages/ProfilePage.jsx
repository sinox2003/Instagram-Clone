import { Box, VStack } from "@chakra-ui/react";
import ProfileNavBar from "../components/ProfileNavBar.jsx";
import ProfileHeader from "../components/ProfileHeader.jsx";
import useToggleSidebar from "../../../hooks/useToggleSidebar.jsx";
import { useEffect } from "react";
import ProfileTabs from "../components/ProfileTabs.jsx";
import { useNavigate, useParams } from "react-router-dom";
import NotFoundPage from "../../error-pages/NotFoundPage.jsx";
import ProgressLoader from "../../loading-pages/ProgressLoader.jsx";
import UseGetUserByUsernameRealTime from "../../../hooks/back-end-hooks/useGetUserByUsername-RealTime.js";

function ProfilePage() {
    const { toggle } = useToggleSidebar();
    const { username } = useParams();
    const navigate = useNavigate();
    const { isLoading, user } = UseGetUserByUsernameRealTime(username);
    const userNotFound = !isLoading && !user;

    useEffect(() => {
        toggle(false);
    }, [toggle]);

    useEffect(() => {
        const newURL = window.location.href.split('/');
        if(newURL[6]!=="liked" && newURL[6]!=="saved" && newURL[6]!=="posts" ){
            navigate("posts")
        }


    },[])



    if (isLoading) {
        return <ProgressLoader />;
    }

    return userNotFound ? (
        <NotFoundPage />
    ) : (
        <VStack w="full">
            <ProfileNavBar />
            <Box w={{ base: 'full', md: '94%', sxl: '935px' }} mb={{ base: '57px', md: '0' }}>
                <ProfileHeader user={user} isUserLoading={isLoading} />
                <ProfileTabs />
            </Box>
        </VStack>
    );
}

export default ProfilePage;
