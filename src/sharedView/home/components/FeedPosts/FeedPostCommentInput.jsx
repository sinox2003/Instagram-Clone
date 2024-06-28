import {
    Box,
    Divider,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Spinner,
    Text,
    useColorMode
} from "@chakra-ui/react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import {useRef, useState} from "react";
import {HiOutlineEmojiHappy} from "react-icons/hi";
import usePostComment from "../../../../hooks/back-end-hooks/usePostComment.js";

function FeedPostCommentInput({id}) {

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
            setComment('')
        }

    }



    return (
        <>
            <InputGroup size='lg' px={{base:2,'smd':1}} mb={3} py={3}>
                    <Input   borderRadius={0}  color={'gray'} pr={20} ref={commentRef} onChange={handleOnChange}  value={comment} variant='unstyled' fontSize='sm' placeholder='Add a Comment...' />
                <InputRightElement gap={3}  >

                        {isCommenting ?
                                <Spinner size={'xs'} />
                                :

                                (
                                    showPost &&
                                <Text color={'#1698F6'} onClick={handleSubmitComment} cursor='pointer'  _hover={{color:'#003273',_dark:{color:'white'}}} fontSize='sm' fontWeight={'semibold'}>Post</Text>
                                )
                    }
                    <IconButton aria-label={'emojis'}  display={{base:'none',md:'flex'}} icon={<HiOutlineEmojiHappy />} onClick={() => setPickerVisible(!isPickerVisible)} variant='unstyled' isRound/>


                </InputRightElement>
            </InputGroup>
            <Divider borderColor={switchMode('whiteAlpha.300','blackAlpha.300')} />

            {isPickerVisible && (
                < >

                    <Box position="fixed" top={0} left={0} right={0} bottom={0}  onClick={handleOverlayClick} zIndex={1499} />
                    <Box overflow='auto'  pos={'absolute'} boxShadow={'xs'} transform={'translateY(-310px)translateX(100px)'} zIndex={1500}>
                        <Picker data={data} darkMode='true'  onEmojiSelect={handleEmojiSelect} overflow='auto'  />
                    </Box>
                </>

            )}


        </>
    );
}

export default FeedPostCommentInput;
