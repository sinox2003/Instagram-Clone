import {Divider, HStack, ModalBody, ModalContent, Text, useColorMode} from "@chakra-ui/react";
import {IoIosArrowBack} from "react-icons/io";
import PostComments from "./PostComments.jsx";
import PostCommentInput from "./PostCommentInput.jsx";
import useGetCommentsByPost from "../../../hooks/back-end-hooks/useGetCommentsByPost.js";
import {useEffect} from "react";

function PostBoxPhone({close}) {

    const {colorMode} = useColorMode();
    const switchMode=(dark,light)=>(colorMode==='dark'?dark:light)



    const newURL = window.location.href.split('/');
    const id = newURL[newURL.length - 1];
    const{areCommentsLoading,comments}=useGetCommentsByPost(id)




    return (

        <ModalContent h={'430px'} bg={switchMode('#262626','white')}  overflow='hidden' >
            <HStack justifyContent={'center'} pos={'relative'}>
                <IoIosArrowBack size={30} onClick={close}  style={{position:'absolute',left:'10px'}} />
                <Text  textAlign={'center'} fontWeight='640' py='10px' >Comments</Text>

            </HStack>
            <Divider borderColor={switchMode('whiteAlpha.300','blackAlpha.300')} />



            <ModalBody  h={'full'} px={0} overflowY={'auto'} >

                <PostComments closeModal={close} comments={comments} isLoading={areCommentsLoading} />
            </ModalBody>


            <PostCommentInput   id={id} focused={null} />
        </ModalContent>


    );
}

export default PostBoxPhone;