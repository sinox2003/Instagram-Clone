import React from 'react';
import {
    Box,
    Button,
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Text,
    Tooltip,
    useClipboard,
    useColorMode
} from "@chakra-ui/react";
import {HiOutlineDotsVertical} from "react-icons/hi";
import {messagesTime} from "../../../../utils/messagesTime.js";
import {TbArrowBackUp} from "react-icons/tb";
import {FaRegCopy} from "react-icons/fa";
import {PiPaperPlaneTiltBold} from "react-icons/pi";
import {useParams} from "react-router-dom";
import useDeleteMessage from "../../../../hooks/back-end-hooks/useDeleteMessage.js";
import useAuthStore from "../../../../store/Backend-stores/authStore.js";
import useSharePost from "../../../../hooks/useSharePost.jsx";

function MessageMore({ message,direction }) {
    const { colorMode } = useColorMode();
    const switchMode = (dark, light) => (colorMode === 'dark' ? dark : light);
    const { onCopy } = useClipboard(message.text || '')
    const params=useParams()
    const {deleteMessage,loading}=useDeleteMessage()
    const authUser = useAuthStore((state) => state.user);
    const { onShareOpen, setSharedMessage,setSharedImage } = useSharePost();


    const handleOnForwardClick = () => {

        setSharedImage(message.img || null)
        setSharedMessage(message.text || "");
        onShareOpen();
    };


    return (
        <Menu isLazy autoSelect={false} lazyBehavior="unmount"  placement={direction} size="sm">

                        <Tooltip
                            label="More"
                            bg={switchMode('#262626', 'white')}
                            hasArrow
                            display={{base:'none',md:'block'}}
                            boxShadow={switchMode('none', 'xs')}
                            color={switchMode('white', 'black')}
                            m={3}
                            placement="top"
                            p={2}
                            borderRadius={9}
                        >
                            <MenuButton
                                as={IconButton}
                                aria-label="More"
                                isRound
                                _hover={{
                                    bg: switchMode('whiteAlpha.200', 'blackAlpha.100'),
                                }}
                                _active={{
                                    bg: switchMode('whiteAlpha.200', 'blackAlpha.100'),
                                }}
                                icon={<HiOutlineDotsVertical size={14} color={switchMode('white', 'black')} />}
                                size="xs"
                                variant="ghost"
                                w="26px"
                                h="26px"
                            />
                        </Tooltip>
                        <MenuList>
                            <Text px={3} fontSize="xs" color="gray" fontWeight="semibold" m={1}>{messagesTime(message.date)}</Text>
                            <MenuDivider />
                            <MenuItem as={Button}  fontWeight={'400'} onClick={handleOnForwardClick}  justifyContent={'space-between'} rightIcon={<Box  sx={{ transform: 'rotate(10deg)' }} pb={1.5}><PiPaperPlaneTiltBold size={19} /></Box>}>Forward</MenuItem>
                            {
                                message.text &&
                                     <MenuItem as={Button} onClick={onCopy}  fontWeight={'400'}  justifyContent={'space-between'} rightIcon={<FaRegCopy size={18} />}>Copy</MenuItem>

                            }
                            {
                                authUser.uid === message.senderId &&
                                <>
                                    <MenuDivider />
                                    <MenuItem as={Button} color={"#ED4932"} isLoading={loading} onClick={()=>deleteMessage(params.id,message.id)} fontWeight={'400'}  justifyContent={'space-between'} rightIcon={<Box border={'1px solid'} borderRadius={'50%'} p={'1px'}> <TbArrowBackUp size={'14'} strokeWidth={2} /> </Box>}>Unsend</MenuItem>
                                </>

            }
                                 </MenuList>


        </Menu>
    );
}

export default MessageMore;
