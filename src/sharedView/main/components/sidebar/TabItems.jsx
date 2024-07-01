import { useEffect, useState } from "react";
import { Avatar, Box, Stack, useColorMode } from "@chakra-ui/react";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { GoHeart, GoHeartFill, GoHome, GoHomeFill } from "react-icons/go";
import { RiSearch2Fill, RiSearchLine } from "react-icons/ri";
import { MdExplore, MdOutlineExplore } from "react-icons/md";
import { PiPaperPlaneTiltBold, PiPaperPlaneTiltFill } from "react-icons/pi";
import useAuthStore from "../../../../store/Backend-stores/authStore.js";
import { auth, firestore } from "../../../../config/firebase.js";
import PathNavItem from "./PathNavItem.jsx";
import DrawerNavItem from "./DrawerNavItem.jsx";
import ModalNavItem from "./ModalNavItem.jsx";
import { CreateLogo, HeartWithNotification } from "../../../../assets/constants.jsx";

function TabItems() {
    const { colorMode } = useColorMode();
    const switchMode = (dark, light) => (colorMode === 'dark' ? dark : light);

    const authUser = useAuthStore((state) => state.user);
    const [unread, setUnread] = useState(false);

    useEffect(() => {
        if (authUser?.uid) {
            const unsubscribe = onSnapshot(doc(firestore, "userNotifications", authUser.uid), (doc) => {
                if (doc.exists()) {
                    setUnread(doc.data().unread);
                }
            });

            return () => unsubscribe();
        }
    }, [authUser?.uid]);

    return (
        <Stack direction={{ base: 'row', md: 'column' }} width={'full'} alignItems={{ base: 'center', lg: 'inherit' }} justifyContent={{ base: "space-around", md: 'inherit' }} gap={{ base: 0, md: 3 }}>

            <PathNavItem name='Home' icon={<GoHome size={27} strokeWidth={0.5} />} filledIcon={<GoHomeFill size={27} />} path={'/main/home'} />

            <Box display={{ base: 'none', md: 'block' }}>
                <DrawerNavItem name='Search' icon={<RiSearchLine size={27} strokeWidth={0.5} />} filledIcon={<RiSearch2Fill size={27} />} />
            </Box>

            <PathNavItem name='Explore' icon={<MdOutlineExplore size={27} />} filledIcon={<MdExplore size={27} />} path={'explore'} />

            <PathNavItem name='Messages' path={'chat'} icon={<Box as={PiPaperPlaneTiltBold} size={25} sx={{ transform: 'rotate(10deg)' }} />} filledIcon={<Box as={PiPaperPlaneTiltFill} size={25} sx={{ transform: 'rotate(10deg)' }} />} />

            <Box display={{ base: 'none', md: 'block' }}>
                <PathNavItem name='Notifications' path={'notifications'} icon={unread ? <HeartWithNotification borderColor={switchMode('black', 'white')} /> : <GoHeart size={26} strokeWidth={0.5} />} filledIcon={<GoHeartFill size={26} />} />
            </Box>

            <ModalNavItem name='Create' icon={<CreateLogo />} />

            <PathNavItem name='profile' path={`profile/${authUser.username}`} icon={<Avatar src={authUser.profilePicURL} w='28px' h='28px' />} filledIcon={<Avatar src={authUser.profilePicURL} w='28px' h='28px' border={switchMode('white 2px solid ', 'black 2px solid ')} />} />

        </Stack>
    );
}

export default TabItems;
