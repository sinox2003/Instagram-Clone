import {useEffect, useRef, useState} from 'react';
import {
    Box,
    Button,
    Divider,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement, Spinner,
    useColorMode
} from "@chakra-ui/react";
import {BsEmojiSmile} from "react-icons/bs";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import usePostComment from "../../../hooks/back-end-hooks/usePostComment.js";

function PostCommentInput({id,refresh}) {


    const [isPickerVisible, setPickerVisible] = useState(false);
    const [comment, setComment] = useState('');
    const commentRef = useRef();
    const [showPost, setShowPost] = useState(false)

    const { colorMode } = useColorMode();
    const switchMode = (dark, light) => (colorMode === 'dark' ? dark : light);

    const {isCommenting,handlePostComment}=usePostComment()


    const handleEmojiSelect = (emoji) => {
        setComment(prevCaption => prevCaption + emoji.native);
        commentRef.current.focus();
    };

    const handleOverlayClick = () => {
        setPickerVisible(false);
        commentRef.current.focus()
    };

    const handleOnChange=(e)=>{
        setComment(e.target.value)
        if(e.target.value.length > 0){
            setShowPost(true)
        }else{
            setShowPost(false)
        }
    }


    const handleSubmitComment=async ()=>{

        if(commentRef.current.value.length > 0){
            await handlePostComment(id, commentRef.current.value)
            refresh()
            setComment('')
        }

    }

    const handleOnEnter=(e)=>{
        if(e.key === 'Enter'){
            handleSubmitComment()
        }
    }





    return (
        <Box  mb={2}  >
                <Divider borderColor={switchMode('whiteAlpha.400','blackAlpha.400')} />
            <Box  h={'54px'}  px={3}  pos={'relative'} >

                <InputGroup  size='lg' >
                    <InputLeftElement h={'54px'} >
                        <IconButton
                            aria-label={'emoji'}
                            onClick={() => setPickerVisible(!isPickerVisible)}
                            pos='relative'
                            variant='unstyled'
                            isRound
                            icon={<BsEmojiSmile size={24} strokeWidth={0.3} />}
                        />
                    </InputLeftElement >
                    <Input   borderRadius={0}  onKeyDown={handleOnEnter} h={'54px'} ref={commentRef} onChange={handleOnChange}  value={comment} variant='unstyled' fontSize='sm' placeholder='Add a Comment...' />
                    <InputRightElement  h={'54px'} >
                        {
                            isCommenting ?
                                <Spinner size={'xs'} />
                                :
                                <Button color={'#1698F6'} isDisabled={!showPost} onClick={handleSubmitComment} variant={'unstyled'}  _hover={{color:'#003273',_dark:{color:'white'}}} fontSize='sm' fontWeight={'semibold'}>Post</Button>

                        }
                    </InputRightElement>
                </InputGroup>


                {isPickerVisible && (
                    < >

                        <Box position="fixed" top={0} left={0} right={0} bottom={0}  onClick={handleOverlayClick} zIndex={1499} />
                        <Box overflow='auto'  pos={'absolute'} boxShadow={'xs'}  transform={`translateY(calc(-100% - 56px))`} zIndex={1500}>
                            <Picker data={data} darkMode='true'  onEmojiSelect={handleEmojiSelect} overflow='auto'  />
                        </Box>
                    </>

                )}

            </Box>



        </Box>
    );
}

export default PostCommentInput;