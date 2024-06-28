import {
    Avatar,
    Box,
    HStack,
    IconButton,
    Skeleton,
    SkeletonCircle,
    Text,
    useColorMode,
    useDisclosure
} from "@chakra-ui/react";
import {IoInformationCircle, IoInformationCircleOutline} from "react-icons/io5";
import {GoArrowLeft} from "react-icons/go";
import {Link, useNavigate} from "react-router-dom";

import ChatInfos from "./Chat-Infos.jsx";


function DirectNavBar({user,chatId,isLoading}) {

    const {colorMode}=useColorMode()
    const switchMode=(dark,light)=>(colorMode==='dark'?dark:light)
    const navigate=useNavigate()

    const { isOpen, onOpen, onClose } = useDisclosure()


    const checkUser=()=>{
        navigate(`/main/profile/${user.username}`)
    }



    return (

        <>
            <Box px={4}  py={'15px'} display={{base:'none',md:'block'}} borderBottom={'1px'} borderColor={switchMode('whiteAlpha.300','blackAlpha.300')} >
                <HStack justifyContent={'space-between'} >
                    <HStack spacing={3}    >
                        {
                            isLoading ?
                                <>
                                    <SkeletonCircle startColor={switchMode('whiteAlpha.100','blackAlpha.100')} endColor={switchMode('whiteAlpha.300','blackAlpha.300')} w={'44px'} h={'44px'} />
                                    <Skeleton startColor={switchMode('whiteAlpha.100','blackAlpha.100')} endColor={switchMode('whiteAlpha.300','blackAlpha.300')} h={'18px'} borderRadius={'lg'} w={'200px'} />
                                </>
                                :
                                <>
                                    <Avatar w={'44px'} h={'44px'} onClick={checkUser} src={user?.profilePicURL} cursor={'pointer'} />
                                    <Text fontWeight={'semibold'} onClick={checkUser} cursor={'pointer'} sx={{display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: 'vertical', overflow: 'hidden'}} maxW={'300px'} >{user?.username}</Text>
                                </>
                        }

                    </HStack>
                    <Box>
                        <IconButton minW={'29px' } onClick={onOpen} h={'29px'} aria-label={'infos'} icon={isOpen ? <IoInformationCircle  size={29} /> : <IoInformationCircleOutline size={29} />} variant='styled' isRound  _active={{color:'gray'}} />

                    </Box>

                </HStack>
            </Box>
            <Box px={4}  py={'8px'} borderBottom={'1px'} display={{base:'block',md:'none'}} borderColor={switchMode('whiteAlpha.300','blackAlpha.300')} >
                <HStack justifyContent={'space-between'} >
                    <HStack spacing={3}  >
                        <Link to={'/main/chat/inbox'}>
                            <GoArrowLeft size={29} strokeWidth={0.2} />
                        </Link>
                        {
                            isLoading ?
                                <>
                                    <SkeletonCircle startColor={switchMode('whiteAlpha.100','blackAlpha.100')} endColor={switchMode('whiteAlpha.300','blackAlpha.300')}  w={'24px'} h={'24px'} />
                                    <Skeleton startColor={switchMode('whiteAlpha.100','blackAlpha.100')} endColor={switchMode('whiteAlpha.300','blackAlpha.300')} h={'16px'} borderRadius={'lg'} w={'170px'} />
                                </>
                                :
                                <>
                                    <Avatar w={'24px'} h={'24px'} cursor={'pointer'} src={user?.profilePicURL} onClick={checkUser}  />
                                    <Text fontWeight={'semibold'} cursor={'pointer'} onClick={checkUser} sx={{display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: 'vertical', overflow: 'hidden'}} maxW={'200px'} >{user?.username}</Text>
                                </>
                        }
                           </HStack>
                    <Box>
                        <IconButton  onClick={onOpen} minW={'29px'} h={'29px'} aria-label={'infos'} icon={isOpen ? <IoInformationCircle  size={29} /> : <IoInformationCircleOutline size={29} /> } variant='styled' isRound  _active={{color:'gray'}} />

                    </Box>

                </HStack>
            </Box>
           <ChatInfos isOpen={isOpen} onClose={onClose} user={user} chatId={chatId} />
        </>

    );
}

export default DirectNavBar;