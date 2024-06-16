import {Avatar, Box, Flex, Text} from "@chakra-ui/react";
import {Link, useNavigate} from "react-router-dom";
import useGetUserProfileById from "../../../hooks/back-end-hooks/useGetUserProfileById.js";
import {useEffect} from "react";
import PostCommentSkeleton from "./PostCommentSkeleton.jsx";
import {timeAgo} from "../../../utils/timeAgo.js";

function PostComment({ comment,closeModal }) {

    const navigate=useNavigate()



    const{userProfile,isUserLoading,getUserProfile}=useGetUserProfileById()

    useEffect(() => {
        getUserProfile(comment.createdBy)
    }, []);

    const handleClick=()=>{
        navigate(`/main/profile/${userProfile.username}`);
        closeModal()

    }


    return (

        isUserLoading ?
            <PostCommentSkeleton />
            :

        <Flex gap={2} py={2} px={3}  w={{base:'auto',md:'450px'}}>
            <Avatar w={'32px'} cursor='pointer' onClick={handleClick}  src={userProfile.profilePicURL}  h={'32px'} />
            <Flex direction={'column'} gap={'3px'} >

            <Flex
                fontSize={'sm'}
                wrap={'wrap'}
                alignItems={'center'}
                whiteSpace={'pre-wrap'}
                wordBreak={'break-word'}
            >
                <Box
                    onClick={handleClick}
                    sx={{display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: 'vertical', overflow: 'hidden'}} maxW={'240px'}
                    style={{ fontWeight: 500, marginRight: '10px', cursor: 'pointer' }}>
                    {userProfile.username}
                </Box>
                   <Text  >{comment.comment}</Text>
            </Flex>
                <Text color={'gray'} mt={'3px'} fontSize={'13px'} >{timeAgo(comment.createdAt)}</Text>

            </Flex>

        </Flex>


    );
}

export default PostComment;
