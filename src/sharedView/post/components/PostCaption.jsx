import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import useGetUserProfileById from "../../../hooks/back-end-hooks/useGetUserProfileById.js";
import PostCommentSkeleton from "./PostCommentSkeleton.jsx";
import {Avatar, Box, Flex, Text} from "@chakra-ui/react";
import {timeAgo} from "../../../utils/timeAgo.js";

function PostCaption({ caption,owner,closeModal ,createdAt}) {

    const navigate=useNavigate()




    const handleClick=()=>{
        navigate(`/main/profile/${owner?.username}`);
        closeModal()

    }


    return (


            <Flex gap={2} py={2} px={3}  w={{base:'auto',md:'450px'}}>
                <Avatar w={'32px'} cursor='pointer' onClick={handleClick}  src={owner?.profilePicURL}  h={'32px'} />
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
                            {owner?.username}
                        </Box>
                        <Text  >{caption}</Text>
                    </Flex>
                    <Text color={'gray'} mt={'3px'} fontSize={'13px'} >{timeAgo(createdAt)}</Text>

                </Flex>

            </Flex>
    );
}

export default PostCaption;