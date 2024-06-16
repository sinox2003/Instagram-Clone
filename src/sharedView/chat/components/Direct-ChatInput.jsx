import React, { useEffect, useRef, useState } from "react";
import {
    Box,
    IconButton,
    Image,
    Input,
    HStack,
    Text,
    useColorMode,
} from "@chakra-ui/react";
import { BsEmojiSmile } from "react-icons/bs";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { CiImageOn } from "react-icons/ci";
import { GoHeart } from "react-icons/go";
import { IoIosCloseCircleOutline } from "react-icons/io";
import useChatStore from "../../../store/Backend-stores/chatStore.js";
import useAuthStore from "../../../store/Backend-stores/authStore.js";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { firestore, storage } from "../../../config/firebase.js";

function DirectChatInput({user,chatId}) {
    const [isPickerVisible, setPickerVisible] = useState(false);
    const [message, setMessage] = useState("");
    const messageRef = useRef();
    const [showPost, setShowPost] = useState(false);
    const [image, setImage] = useState(null);
    const { colorMode } = useColorMode();
    const switchMode = (dark, light) => (colorMode === "dark" ? dark : light);
    const authUser = useAuthStore((state) => state.user);

    const handleEmojiSelect = (emoji) => {
        setMessage((prevCaption) => prevCaption + emoji.native);
        messageRef.current.focus();
        setShowPost(true)
    };

    const handleOverlayClick = () => {
        setPickerVisible(false);
        messageRef.current.focus();
    };

    const handleOnChange = (e) => {
        setMessage(e.target.value);
        setShowPost(e.target.value !== "");
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);

        }
    };

    const handleOnEnter = (e) => {
        if (e.key === "Enter") {
            handleOnClick();
        }
    };

    const handleHeart = () => {
        setMessage("❤️");
    };

    const handleOnClick = () => {
        if (message !== "" || image) {
            handleSend();
        }
    };

    useEffect(() => {
        if (message === "❤️") {
            handleSend();
        }
        if (image || message) {
            setShowPost(true);
        }else {
            setShowPost(false);
        }
    }, [message,image]);




    const handleSend = async () => {
        let imageUrl = null;
        if (image) {
            const storageRef = ref(storage, `chats/${v4()}`);
            const uploadTask = uploadBytesResumable(storageRef, image);
            await new Promise((resolve, reject) => {
                uploadTask.on(
                    "state_changed",
                    null,
                    (error) => {
                        console.error(error);
                        reject(error);
                    },
                    async () => {
                        imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
                        resolve();
                    }
                );
            });
        }

        const newMessage = {
            id: v4(),
            text: message ,
            senderId: authUser.uid,
            date: Date.now(),
            ...(imageUrl && { img: imageUrl }),
        };

        await updateDoc(doc(firestore, "chats", chatId), {
            messages: arrayUnion(newMessage),
        });

        await Promise.all([
            updateDoc(doc(firestore, "userChats", authUser.uid), {
                [`${chatId}.lastMessage`]: { text:message || "you sent a photo" },
                [`${chatId}.date`]: serverTimestamp(),
            }),
            updateDoc(doc(firestore, "userChats", user.uid), {
                [`${chatId}.lastMessage`]: { text:message || `${authUser.username } sent a photo`},
                [`${chatId}.date`]: serverTimestamp(),
            }),
        ]);

        setMessage("");
        setImage(null);
        setShowPost(false);
    };

    return (
        <Box px={4} py={"15px"}>
            <Box
                border={"1px"}
                alignItems={"center"}
                minH={"44px"}
                h={"auto"}
                maxH={"fit-content"}
                borderRadius={"25px"}
                borderColor={switchMode("whiteAlpha.400", "blackAlpha.300")}
            >
                {image && (
                    <Box pos="relative" m={4} h={"48px"} w={"48px"}>
                        <Image
                            src={URL.createObjectURL(image)}
                            borderRadius={"lg"}
                            objectFit={"cover"}
                            h={"48px"}
                            w={"48px"}
                            onLoad={() => URL.revokeObjectURL(image)}
                        />
                        <Box
                            pos="absolute"
                            onClick={() => setImage(null)}
                            cursor="pointer"
                            top={"-11px"}
                            right={"-11px"}
                        >
                            <IoIosCloseCircleOutline size={23} />
                        </Box>
                    </Box>
                )}
                <HStack h={"full"} spacing={0}>
                    <Box h={"full"} display={{ base: "none", md: "flex" }}>
                        <IconButton
                            ml={4}
                            aria-label={"emoji"}
                            onClick={() => setPickerVisible(!isPickerVisible)}
                            pos="relative"
                            variant="unstyled"
                            isRound
                            icon={<BsEmojiSmile size={24} strokeWidth={0.3} />}
                        />
                    </Box>
                    <Input
                        pl={{ base: 4, md: 0 }}
                        borderRadius={0}
                        onKeyDown={handleOnEnter}
                        h={"44px"}
                        ref={messageRef}
                        onInput={handleOnChange}
                        value={message}
                        variant="unstyled"
                        fontSize="sm"
                        placeholder="Message..."
                    />
                    {showPost ? (
                        <Text
                            color={"#1698F6"}
                            mr={4}
                            ml={2}
                            onClick={handleOnClick}
                            cursor="pointer"
                            _hover={{ color: "#003273", _dark: { color: "white" } }}
                            fontSize="sm"
                            fontWeight={"semibold"}
                        >
                            Send
                        </Text>
                    ) : (
                        <HStack mx={5} spacing={3}>
                            <Input
                                display={"none"}
                                type="file"
                                id="file"
                                onChange={handleImageChange}
                            />
                            <label htmlFor="file">
                                <CiImageOn size={29} cursor={"pointer"} strokeWidth={0.6} />
                            </label>
                            <GoHeart onClick={handleHeart} cursor={"pointer"} size={25} strokeWidth={0.7} />
                        </HStack>
                    )}
                </HStack>
            </Box>
            {isPickerVisible && (
                <>
                    <Box
                        position="fixed"
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        onClick={handleOverlayClick}
                        zIndex={1499}
                    />
                    <Box
                        overflow="auto"
                        pos={"absolute"}
                        boxShadow={"xs"}
                        transform={`translateY(calc(-100% - 56px))`}
                        zIndex={1500}
                    >
                        <Picker
                            data={data}
                            theme={colorMode === "dark" ? "dark" : "light"}
                            onEmojiSelect={handleEmojiSelect}
                        />
                    </Box>
                </>
            )}
        </Box>
    );
}

export default DirectChatInput;
