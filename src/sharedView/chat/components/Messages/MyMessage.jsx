
import {Box, Flex, HStack, IconButton, Image, Text, Tooltip, useColorMode, VStack} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {SlOptionsVertical} from "react-icons/sl";
import {HiOutlineDotsVertical} from "react-icons/hi";
import {useState} from "react";

const MyMessage = ({groupSize,index,message}) => {

    const { colorMode } = useColorMode();
    const switchMode = (dark, light) => (colorMode === 'dark' ? dark : light);

    const isLink = message.text.startsWith('http');

    const [showMore, setShowMore] = useState(false)

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

            <VStack w={'full'} flexDir= "row-reverse" spacing={1} onMouseEnter={()=>setShowMore(true)} onMouseLeave={()=>setShowMore(false)} >

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


                <VStack w={'full'} flexDir= "row-reverse" spacing={1} onMouseEnter={()=>setShowMore(true)} onMouseLeave={()=>setShowMore(false)} >

                        <Box background={ !message.text  ? "transparent" :  "linear-gradient(90deg, #9014FF,#7A10BD, #3314D6)" } color={ "white" } borderRadius={oneMessage ? "20px" : firstMessage ? "20px 20px 5px 20px" : lastMessage ? "20px  5px 20px 20px" :"20px 5px 5px 20px" } w={"max-content"} maxW={{ base: "200px", md: "300px" }}>
                            <Image
                                src={message.img}
                                maxW={{ base: "200px", md: "236px" }}
                                maxH={'340px'}
                                borderRadius={oneMessage ? (message.text ? "20px 20px 0px 0px" : "20px") : firstMessage ? (message.text ? "20px 20px 0px 0px" :  "20px 20px 5px 20px") : lastMessage ? (message.text ? "20px  5px 0px 0px" :  "20px  5px 20px 20px")   : (message.text ? "20px 5px 0px 0px" :  "20px 5px 5px 20px")  }
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

export default MyMessage;
