import {Box, HStack, IconButton, Text, useColorMode, useDisclosure, VStack} from "@chakra-ui/react";
import { PiNotePencilLight } from "react-icons/pi";
import ChatUserItemSkeleton from "./Chat-UserItemSkeleton.jsx";
import PhoneChatUserItem from "./PhoneChat-UserItem.jsx";
import ChatSearchModal from "./Search-Modal/Chat-SearchModal.jsx";
import { Link } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import PhoneChatUserItemSkeleton from "./PhoneChat-UserItemSkeleton.jsx";
import useAuthStore from "../../../store/Backend-stores/authStore.js";
import { useEffect, useState, useMemo } from "react";
import { firestore } from "../../../config/firebase.js";
import { doc, onSnapshot } from "firebase/firestore";
import {FiEdit} from "react-icons/fi";

function PhoneChatUsersList() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const authUser = useAuthStore((state) => state.user);
    const { colorMode } = useColorMode();
    const switchMode = (dark, light) => (colorMode === 'dark' ? dark : light);
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authUser.uid) return;

        setLoading(true);
        const unsub = onSnapshot(
            doc(firestore, "userChats", authUser.uid),
            (doc) => {
                setChats(doc.data());
                setLoading(false);
            },
            (error) => {
                console.error("Error fetching chats: ", error);
                setLoading(false);
            }
        );

        return () => {
            unsub();
        };
    }, [authUser.uid]);

    const sortedChats = useMemo(() => {
        return chats ? Object.entries(chats).sort((a, b) => b[1].date - a[1].date) : [];
    }, [chats]);

    return (
        <VStack w={'full'} display={{ base: 'flex', md: 'none' }} bg={switchMode('black', 'white')} h={'100vh'}  zIndex={2000} alignItems={'center'}>
            <HStack w={'full'} justifyContent={'space-between'} py={2} px={3}>
                <Link to={'/main/home'}>
                    <GoArrowLeft size={29} strokeWidth={0.2} />
                </Link>
                <Text fontSize={'xl'} fontWeight={'semibold'} sx={{display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: 'vertical', overflow: 'hidden'}} maxW={'190px'}>{authUser.username}</Text>
                <IconButton aria-label={'New message'} variant='styled' icon={<FiEdit size={'25'} onClick={onOpen} strokeWidth={3} />} _active={{ color: 'gray' }} />
            </HStack>
            <HStack w={'full'} px={4} pb={1}>
                <Text fontSize={'md'} fontWeight={'bold'}>Messages</Text>
            </HStack>
            <Box h={'calc(100dvh - 100px)'}  w={'full'}>
                <VStack overflowY='scroll' h={'full'} pb={3} w={'full'} >
                    {
                        loading ?
                            Array.from({ length: 4 }).map((_, index) => (
                                <PhoneChatUserItemSkeleton key={index} />
                            ))
                            :
                            sortedChats.map((chat) => (

                                <PhoneChatUserItem key={chat[0]} myId={authUser.uid} userId={chat[1].userInfo.uid} lastMessage={chat[1].lastMessage?.text} />
                            ))
                    }
                </VStack>
            </Box>

            <ChatSearchModal onClose={onClose} isOpen={isOpen} />
        </VStack>
    );
}

export default PhoneChatUsersList;
