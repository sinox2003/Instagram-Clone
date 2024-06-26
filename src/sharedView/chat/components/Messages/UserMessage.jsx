import useAuthStore from "../../../../store/Backend-stores/authStore.js";
import {Box, Flex, IconButton, Image, Text, Tooltip, useColorMode, VStack} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {HiOutlineDotsVertical} from "react-icons/hi";
import {useState} from "react";

const UserMessage = ({groupSize,index,message}) => {
    const { colorMode } = useColorMode();
    const switchMode = (dark, light) => (colorMode === 'dark' ? dark : light);
    const [showMore, setShowMore] = useState(false)


    const isLink = message.text.startsWith('http');

    const oneMessage=groupSize===1  ;
    const firstMessage =groupSize > 1 && index===0;
    const lastMessage =groupSize > 1 && index===groupSize-1;


    const isEmojiOnly = (text) => {
        const emojiRegex = /^(?:\p{Emoji}|\p{Emoji_Component}|\p{Emoji_Modifier}|\p{Emoji_Modifier_Base}|\p{Emoji_Presentation})+$/u;
        return emojiRegex.test(text);
    };



    const isEmojiMessage = isEmojiOnly(message.text);

    if (isEmojiMessage) {

        return (
            <VStack w={'full'} flexDir="row" onMouseEnter={()=>setShowMore(true)} onMouseLeave={()=>setShowMore(false)} >
                <Text  fontSize={"50px"}>
                    {message.text}
                </Text>
                {
                    showMore &&
                    <Tooltip display={{base:'none',md:'block'}}  label={"More"} bg={switchMode('#262626','white')} hasArrow  boxShadow={switchMode("none",'xs')} color={switchMode("white",'black')}  m={3} placement='top'  p={2} borderRadius={9} >

                        <IconButton aria-label={"More"} icon={ <HiOutlineDotsVertical size={14} color={switchMode("white",'black')} />}  variant={'link'}  />

                    </Tooltip>

                }

            </VStack>

        )
    }


    return (



            <VStack w={'full'} flexDir="row" onMouseEnter={()=>setShowMore(true)} onMouseLeave={()=>setShowMore(false)} >

                <Box background={ !message.text  ? "transparent"  : switchMode("#262626", "#EFEFEF") } color={ switchMode("white", "black") }   borderRadius={oneMessage ? "20px" : firstMessage ? "20px 20px 20px 5px " : lastMessage ? " 5px  20px  20px 20px" :" 5px 20px 20px 5px" } w={"max-content"} maxW={{ base: "200px", md: "300px" }}>
                    <Image
                        src={message.img}
                        maxW={'full'}
                        borderRadius={ oneMessage ? (message.text ? "20px 20px 0px 0px ":"20px") : firstMessage ? (message.text ? "20px 20px 0px 0px ": "20px 20px 20px 5px ")  : lastMessage ? (message.text ? " 5px  20px  0px 0px": " 5px  20px  20px 20px")   : (message.text ? " 5px  20px  0px 0px": " 5px 20px 20px 5px")  }
                        overflow={"hidden"}
                        alt='image'
                        display={message.img ? "block" : "none"}
                    />

                    {isLink ? (
                        <Text py={1} px={3}>
                            <Link style={{ textDecoration: 'underline' }} to={message.text}>
                                {message.text}
                            </Link>
                        </Text>
                    ) : (
                        message.text &&
                        <Text py={1} px={3} fontSize={"md"}>
                            {message.text}

                        </Text>
                    )}
                </Box>
                {
                    showMore &&
                    <Tooltip display={{base:'none',md:'block'}}  label={"More"} bg={switchMode('#262626','white')} hasArrow  boxShadow={switchMode("none",'xs')} color={switchMode("white",'black')}  m={3} placement='top'  p={2} borderRadius={9} >

                        <IconButton aria-label={"More"} icon={ <HiOutlineDotsVertical size={14} color={switchMode("white",'black')} />}  variant={'link'}  />

                    </Tooltip>

                }


            </VStack>

    );
};

export default UserMessage;
