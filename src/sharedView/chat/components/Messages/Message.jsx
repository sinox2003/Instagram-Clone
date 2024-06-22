import useAuthStore from "../../../../store/Backend-stores/authStore.js";
import useChatStore from "../../../../store/Backend-stores/chatStore.js";
import { useEffect, useRef } from "react";
import {Avatar, Box, Flex, Text, Image, useColorMode, VStack} from "@chakra-ui/react";
import { timeAgo } from "../../../../utils/timeAgo.js";
import { Link } from "react-router-dom";
import {messagesTime} from "../../../../utils/messagesTime.js";
import {serverTimestamp} from "firebase/firestore";

const Message = ({previousMessageTime,message,profilePicURL}) => {
    const authUser = useAuthStore((state) => state.user);
    const { colorMode } = useColorMode();
    const switchMode = (dark, light) => (colorMode === 'dark' ? dark : light);

    const isLink = message.text.startsWith('http');
    const isOwner = message.senderId === authUser.uid;


    const isEmojiOnly = (text) => {
        const emojiRegex = /^(?:\p{Emoji_Presentation}|\p{Emoji}\uFE0F|\p{Emoji}\u200D)+$/u;
        return emojiRegex.test(text);
    };


    useEffect(() => {
        console.log(previousMessageTime,message.date)
    }, []);

    const isEmojiMessage = isEmojiOnly(message.text);

    if (isEmojiMessage) {

        return (
            <Flex
                  w={'full'}
                  flexDir={isOwner ? "row-reverse" : "row"}

            >

                <Flex flexDir="column">
                    <Flex alignItems={'center'}>
                        {!isOwner &&
                            <Avatar  src={profilePicURL} size={"sm"} />
                        }
                        <Text py={2} px={3} fontSize={"50px"}>
                            {message.text}
                        </Text>
                    </Flex>
                    {
                        message.date - previousMessageTime  > 3600000 &&
                        <Text color={"gray"} fontSize={"xs"} alignSelf={isOwner? "start" : "end"}>
                            {messagesTime(message.date)}
                        </Text>
                    }
                    {/*<Text color={"gray"} fontSize={"xs"} alignSelf={isOwner ? "start" : "end"}>*/}
                    {/*    {messagesTime(message.date)}*/}
                    {/*</Text>*/}

                </Flex>


            </Flex>
                )
    }




    return (
        <>
            <Flex
                gap={2}
                w={'full'}
                flexDir={isOwner ? "row-reverse" : "row"}
            >
                {!isOwner &&
                    <Avatar size={"sm"} src={profilePicURL} />
                }

                <Flex flexDir={"column"} gap={1}>
                    <Box
                        background={isEmojiMessage || !message.text  ? "transparent" : (isOwner ? "linear-gradient(90deg, #9014FF,#7A10BD, #3314D6)" : switchMode("#262626", "#EFEFEF"))}
                        color={isEmojiMessage ? "inherit" : (isOwner ? "white" : switchMode("white", "black"))}
                        borderRadius={isOwner ? "20px 5px 20px  20px" : "5px 20px 20px 20px"}
                        w={"max-content"}
                        maxW={{ base: "200px", md: "300px" }}
                    >
                        <Image
                            src={message.img}
                            maxW={'full'}
                            borderRadius={message.text ? isOwner ? "20px 5px 0px  0px" : "5px 20px 0px 0px" :isOwner ? "20px 5px 20px 20px" : "5px 20px 20px 20px" }
                            overflow={"hidden"}
                            alt='image'
                            display={message.img ? "block" : "none"}
                        />

                        {isLink ? (
                            <Text py={2} px={3}>
                                <Link style={{ textDecoration: 'underline' }} to={message.text}>
                                    {message.text}
                                </Link>
                            </Text>
                        ) : (
                            message.text &&
                            <Text py={2} px={3} fontSize={"md"}>
                                {message.text}

                            </Text>
                        )}
                    </Box>

                    {
                        message.date - previousMessageTime > 3600000 &&
                        <Text color={"gray"} fontSize={"xs"} alignSelf={isOwner? "start" : "end"}>
                            {messagesTime(message.date)}
                        </Text>
                    }
                </Flex>
            </Flex>
        </>
    );
};

export default Message;
