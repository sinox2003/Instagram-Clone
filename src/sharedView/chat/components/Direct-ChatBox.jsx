import {useEffect, useRef, useState} from "react";
import {doc, limit, onSnapshot} from "firebase/firestore";
import { firestore } from "../../../config/firebase.js";
import { Box, VStack, Spinner } from "@chakra-ui/react";
import Message from "./Messages/Message.jsx";
import {useInView} from "react-intersection-observer";

function DirectChatBox({ id ,user}) {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const refBottom=useRef()
    const {inView,ref}=useInView()

    useEffect(() => {
        const unSub = onSnapshot(doc(firestore, "chats", id), (doc) => {
            console.log(doc.data())
            if (doc.exists()) {
                setMessages(doc.data().messages);
                setLoading(false);
            }
        });


        return () => {
            unSub();
        };
    }, [id]);


    useEffect(() => {
        refBottom.current.scrollIntoView();
    }, [messages]);




    return (
        <Box h="full">
            <VStack overflowY="scroll" ref={ref} gap={{ base: 2, md: 4 }} p={{ base: 3, md: 6 }} h="full">
                {loading ? (
                    <Spinner size="xl" />
                ) : (
                    messages.map((m, index) => (
                        <Message
                            key={m.id}
                            message={m}
                            profilePicURL={user?.profilePicURL}
                        />
                    ))
                )}
                <Box ref={refBottom}  />
            </VStack>
        </Box>
    );
}

export default DirectChatBox;
