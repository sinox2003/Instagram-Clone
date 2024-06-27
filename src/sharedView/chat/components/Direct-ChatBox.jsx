import { useEffect, useRef, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { firestore } from "../../../config/firebase.js";
import { Box, VStack, Spinner, HStack, Avatar, Center, Text } from "@chakra-ui/react";
import MyMessage from "./Messages/MyMessage.jsx";
import { useInView } from "react-intersection-observer";
import useAuthStore from "../../../store/Backend-stores/authStore.js";
import { messagesTime } from "../../../utils/messagesTime.js";
import UserMessage from "./Messages/UserMessage.jsx";

function DirectChatBox({ id, user }) {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const refBottom = useRef();
    const { inView, ref } = useInView();
    const authUser = useAuthStore((state) => state.user);


    useEffect(() => {

        refBottom.current.scrollIntoView({  });

    }, [messages]);

    useEffect(() => {
        const unSub = onSnapshot(doc(firestore, "chats", id), (doc) => {
            if (doc.exists()) {
                setMessages(doc.data().messages);
                setLoading(false);
            }
        });
        return () => {
            unSub();
        };
    }, [id]);



    const groupMessagesBySender = (messages) => {
        const groupedMessages = [];
        let currentGroup = [];

        messages.forEach((message, index) => {
            if (index === 0 || (message.senderId === messages[index - 1].senderId && message.date - messages[index - 1].date < 1800000)) {
                currentGroup.push(message);
            } else {
                groupedMessages.push(currentGroup);
                currentGroup = [message];
            }
        });

        if (currentGroup.length > 0) {
            groupedMessages.push(currentGroup);
        }

        return groupedMessages;
    };

    const groupedMessages = groupMessagesBySender(messages);

    return (
        <Box h="full">
            <VStack overflowY="scroll" ref={ref} spacing={1} px={{ base: 3, md: 4 }} h="full">
                {loading ? (
                    <Spinner size="xl" />
                ) : (
                    groupedMessages.map((group, groupIndex) => {
                        const showTimestamp = groupIndex === 0 || group[0].date - groupedMessages[groupIndex - 1][0].date >= 1800000;

                        return (
                            <VStack key={groupIndex} w="full">
                                {showTimestamp && (
                                    <Center w="full" py={3}>
                                        <Text color="gray" fontSize="0.75rem">
                                            {messagesTime(group[0].date)}
                                        </Text>
                                    </Center>
                                )}
                                {
                                    group[0].senderId === authUser.uid ? (
                                    <VStack w="full" spacing={'3px'}>
                                        {group.map((m,index) => (

                                            <MyMessage key={index} groupSize={group.length} index={index} message={m} />
                                        ))}
                                    </VStack>

                                ) : (

                                    <HStack alignItems="end" w="full">
                                        <Avatar src={user?.profilePicURL} size="sm" />
                                        <VStack w="full" spacing={'3px'}>
                                            {group.map((m,index) => (
                                                <UserMessage key={index} groupSize={group.length} index={index} message={m} />
                                            ))}
                                        </VStack>
                                    </HStack>

                                )}
                            </VStack>
                        );
                    })
                )}
                <Box ref={refBottom} />
            </VStack>
        </Box>
    );
}

export default DirectChatBox;
