import {Box, Flex, GridItem, Image, Text, useBreakpoint} from "@chakra-ui/react";

import usePostModal from "../../../hooks/usePostModal.jsx";
import {GoHeartFill} from "react-icons/go";
import {IoChatbubbleSharp} from "react-icons/io5";
import {useNavigate} from "react-router-dom";


function ProfilePost({post}) {

    const {onOpenPostModal,setUrl}=usePostModal()
    const navigate=useNavigate()



    const display = useBreakpoint({
        base: 'base',
        xs: 'xs',
        sm: 'sm',
        smd: 'smd',
        md: 'md',
    });


    const isSmallScreen = ['base', 'xs', 'sm', 'smd'].includes(display);



    const handleClick = () => {
        if (isSmallScreen){
            navigate(`/main/p/${post.id}`)

        }else {
            setUrl(document.URL)
            console.log(post.id)

            window.history.replaceState(null, null, `/main/p/${post.id}`)
            onOpenPostModal()
        }
    };




    return (
        <Box     >

        <GridItem bg={'gray'} overflow='hidden' onClick={handleClick} cursor='pointer' aspectRatio={1} position='relative'  >
            <Flex pos='absolute' top='0' left='0' right='0' bottom='0' opacity='0'
                  _hover={{bg: 'blackAlpha.500',opacity:1}} zIndex={1} transition={"all 0.3s ease"}
                  justifyContent={'center'} alignItems='center' gap={{base:1,md:'30'}}
                  direction={{base:'column',md:'row'}} color="white"
            >

                    <Flex gap={2}  >
                        <GoHeartFill size={20}  />
                        <Text fontWeight='bold'>{post?.likes.length}</Text>
                    </Flex>
                    <Flex gap={2}>
                        <IoChatbubbleSharp size={20} style={{transform:'rotateY(180deg)'}} />
                        <Text fontWeight='bold' >{post?.comments.length}</Text>
                    </Flex>

            </Flex>

            <Image src={post?.imageURL} w='full' h='full' objectFit='cover' alt='post' />
        </GridItem>



        </Box>
    );
}

export default ProfilePost;