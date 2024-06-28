import {HStack, IconButton, Text, useColorMode, useDisclosure, VStack} from "@chakra-ui/react";
import ChatUserItem from "./Chat-UserItem.jsx";
import ChatUserItemSkeleton from "./Chat-UserItemSkeleton.jsx";
import ChatSearchModal from "./Search-Modal/Chat-SearchModal.jsx";
import useAuthStore from "../../../store/Backend-stores/authStore.js";
import {useEffect, useMemo, useState} from "react";
import {firestore} from "../../../config/firebase.js";
import {doc, onSnapshot} from "firebase/firestore";
import {FiEdit} from "react-icons/fi";

function ChatUsersList() {
    const { colorMode } = useColorMode();
    const switchMode = (dark, light) => (colorMode === 'dark' ? dark : light);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [chats, setChats] = useState([]);
    const authUser = useAuthStore((state) => state.user);

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
        <VStack w={{ base: '119px', lg: '400px' }} display={{ base: 'none', md: 'flex' }} minW={{ base: '119px', lg: '400px' }} h={'100dvh'} alignItems={'center'} borderRight={'1px'} borderColor={switchMode('whiteAlpha.300', 'blackAlpha.300')}>
            <HStack w={'full'} justifyContent={{ base: 'center', lg: 'space-between' }} pt={8} pb={2} px={6}>
                <Text fontSize={'xl'} display={{ base: 'none', lg: '-webkit-box' }} sx={{ WebkitLineClamp: '1', WebkitBoxOrient: 'vertical', overflow: 'hidden'}} maxW={'270px'} fontWeight={'semibold'}>{authUser.username}</Text>
                <IconButton aria-label={'New message'} variant='styled' icon={<FiEdit size={'25'} onClick={onOpen}  />} _active={{ color: 'gray' }} />
            </HStack>
            <HStack w={'full'} display={{ base: 'none', lg: 'block' }} px={6} pb={1}>
                <Text fontSize={'md'} fontWeight={'bold'}>Messages</Text>
            </HStack>
            <VStack overflowY='scroll' h={'full'} w={'full'}>
                {
                    loading ?
                        Array.from({ length: 8 }).map((_, index) => (
                            <ChatUserItemSkeleton key={index} />
                        ))
                        :
                        sortedChats.map((chat) => (
                            <ChatUserItem key={chat[0]} myId={authUser.uid} userId={chat[1].userInfo.uid} date={chat[1].date} lastMessage={chat[1].lastMessage?.text} />
                        ))
                }
            </VStack>
            <ChatSearchModal isOpen={isOpen} onClose={onClose} />
        </VStack>
    );
}

export default ChatUsersList;
