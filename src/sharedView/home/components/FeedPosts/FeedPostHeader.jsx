import {Avatar, HStack, IconButton, Spacer, Text, useColorMode,} from "@chakra-ui/react";
import {TbDots} from "react-icons/tb";
import {useNavigate} from "react-router-dom";

import useFeedPostOptions from "../../../../hooks/useFeedPostOptions.jsx";
import {postTimeAgo} from "../../../../utils/postTimeAgo.js";

function FeedPostHeader({post,user}) {

    const navigate=useNavigate()
    const {colorMode} = useColorMode();
    const switchMode=(dark,light)=>(colorMode==='dark'?dark:light)
    const {onOpen,setPostId,setPostOwner}=useFeedPostOptions()


    const handleClickOnOptions=()=>{
        setPostId(post.id);
        setPostOwner(user?.username)
        onOpen()
    }



    return (

        <HStack  w={'full'} px={{base:3,'smd':0}} >
            <HStack pb={1.5}>
                <HStack cursor='pointer' onClick={()=>navigate(`/main/profile/${user?.username}`)} >
                        <Avatar w='35px' src={user?.profilePicURL} h='35px'/>
                        <Text fontWeight='semibold' sx={{display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: 'vertical', overflow: 'hidden'}} maxW={'180px'} fontSize='sm' >{user?.username}</Text>
                </HStack>
                <Text color={'#737373'} fontSize='14px' fontWeight='400'  >• {postTimeAgo(post.createdAt)}</Text>


            </HStack>
            <Spacer />
            <IconButton aria-label={'options'} onClick={handleClickOnOptions}  _active={{color:'gray'}} color={switchMode('white','black')} justifyContent={'end'} icon={<TbDots size={25} />} variant='link' />




        </HStack>
    );
}

export default FeedPostHeader;