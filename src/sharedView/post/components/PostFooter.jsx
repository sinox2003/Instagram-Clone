import {useState} from 'react';
import {Divider, Flex, IconButton, keyframes, Text, useColorMode} from "@chakra-ui/react";
import usePostLikes from "../../../hooks/usePostLikes.jsx";
import useSharePost from "../../../hooks/useSharePost.jsx";
import {GoHeart, GoHeartFill} from "react-icons/go";
import {RiChat3Line, RiSendPlaneLine} from "react-icons/ri";
import {FaBookmark, FaRegBookmark} from "react-icons/fa";
import PostCommentInput from "./PostCommentInput.jsx";
import {timeAgo} from "../../../utils/timeAgo.js";
import useLikePost from "../../../hooks/back-end-hooks/useLikePost.js";
import useSavePost from "../../../hooks/back-end-hooks/useSavePost.js";


function PostFooter({post,user,id,refresh}) {


    const {colorMode} = useColorMode();
    const switchMode=(dark,light)=>(colorMode==='dark'?dark:light)

    const {likes,handleLikePost,isLiked}=useLikePost(post,id)



    const {saved, handleSavePost, isUpdating}=useSavePost(post,id)

    const{onLikesOpen,setPostId}=usePostLikes()
    const {onShareOpen,setSharedPostId}=useSharePost();

    let [focus, setFocus] = useState(0);



    const handleOnLikesClick=()=>{
        setPostId(post.id)
        onLikesOpen()

    }

    const handleOnShareClick=()=>{
        setSharedPostId(`p/${post.id}`)
        onShareOpen()
    }

    const handleFocus = () => {
        setFocus(++focus)
    }



    return (


            <Flex w={'full'}  direction={'column'} >
                <Divider borderColor={switchMode('whiteAlpha.400','blackAlpha.400')} />


            <Flex justifyContent={'space-between'} w={'full'} py={1} px={1} h='55px' >
                <Flex >
                    {isLiked?
                        <IconButton onClick={handleLikePost} variant={'link'}    aria-label={'like'}  animation={animation}  icon={ <GoHeartFill  size={27} color={'#FE2F40'} />} />
                        :
                        <IconButton onClick={handleLikePost} _hover={{color:'gray'}}  variant={'link'} color={switchMode('white','black')}  aria-label={'unlike'}   icon={<GoHeart strokeWidth={0.3} size={27} />} />

                    }
                    <IconButton  _hover={{color:'gray'}}   transform="rotateY(180deg)"  onClick={handleFocus} variant={'link'} color={switchMode('white','black')}  aria-label={'comments'}   icon={<RiChat3Line strokeWidth={0} size={28} />} />
                    <IconButton  _hover={{color:'gray'}}  onClick={handleOnShareClick} transform="rotate(10deg)"  variant={'link'} color={switchMode('white','black')}  aria-label={'unsaved'}   icon={<RiSendPlaneLine strokeWidth={0} size={28} />} />
                </Flex>
                {saved?
                    <IconButton   onClick={handleSavePost}   variant={'link'} color={switchMode('white','black')}  aria-label={'unsaved'}   icon={<FaBookmark strokeWidth={3} size={23} />} />
                    :
                    <IconButton  _hover={{color:'gray'}}  onClick={handleSavePost}   variant={'link'} color={switchMode('white','black')}  aria-label={'unsaved'}   icon={<FaRegBookmark strokeWidth={3} size={23} />} />

                }

            </Flex>
                {
                    likes===0?
                        <>
                            <Text  px={3} pb={1} onClick={handleLikePost} as='span' w={'full'} fontWeight={'semibold'} cursor='pointer' fontSize={'sm'} ><span style={{fontWeight:'normal'}} > be the first to</span>  like this </Text>

                        </>
                        :
                        <Text  px={3} pb={1} onClick={handleOnLikesClick} as='span' w={'full'} fontWeight={'semibold'} cursor='pointer' fontSize={'sm'}  >{likes} likes </Text>

                }
            <Text  px={3}   as='span' w={'full'}   pb={3}  cursor='pointer' fontSize={'xs'}  color={'gray'}  > {timeAgo(post.createdAt)}</Text>

            <PostCommentInput post={post} id={id} focused={focus} refresh={refresh} />




        </Flex>

    );
}

export default PostFooter;



const animationKeyframes = keyframes`
    50%{ scale: 1.3;}
    100%{ scale: 1; }
    `;

const animation = `${animationKeyframes} 0.25s ease `;