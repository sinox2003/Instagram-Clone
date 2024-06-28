import {Box, Flex, IconButton, Menu, MenuButton, MenuList, Textarea, useColorMode} from "@chakra-ui/react";

import Picker from '@emoji-mart/react'
import {useRef, useState} from "react";
import data from '@emoji-mart/data'
import {BsEmojiSmile} from "react-icons/bs";


import {FaRegPenToSquare} from "react-icons/fa6";
import {usePreparePost} from "../../../../../hooks/usePreparePost.jsx";

function PostCaption() {

    const [isPickerVisible, setPickerVisible] = useState(false);
    const [caption, setCaption] = useState('');
    const captionReference = useRef();
    const { setCaptionValue} = usePreparePost();

    const { colorMode } = useColorMode();
    const switchMode = (dark, light) => (colorMode === 'dark' ? dark : light);

    // Function to handle emoji selection
    const handleEmojiSelect = (emoji) => {
        // Add the selected emoji to the current text
        setCaption(prevCaption => prevCaption + emoji.native);
        captionReference.current.focus();
    };

    // useEffect(() => {
    //     setCaptionValue(caption)
    //
    // }, [post]);




    return (
        <Box position='absolute' bottom='5' left='5' zIndex={3000} >
            <Menu placement={'top-start'} isLazy lazyBehavior>
                <MenuButton as={IconButton} aria-label='Options' bgColor={switchMode('blackAlpha.700','whiteAlpha.900')} isRound icon={<FaRegPenToSquare />} />
                <MenuList bg={'whiteAlpha.900'} w={{ md: 'xs', lg: 'sm' }} px='2' overflow={{base: 'auto', md: 'hidden'}} h={{base:'200px',md:'auto'}} >
                    <Textarea
                        ref={captionReference}
                        value={caption}
                        onBlur={(e)=>setCaptionValue(e.target.value)}
                        onChange={(e) => setCaption(e.target.value)}
                        placeholder="Write your caption..."
                    />
                    <Flex justifyContent='end' py={1}>
                        <IconButton
                            aria-label={'emoji'}
                            onClick={() => setPickerVisible(!isPickerVisible)}
                            pos='relative'
                            variant='unstyled'
                            isRound
                            icon={<BsEmojiSmile size={22} />}
                        />
                    </Flex>
                    <Box display={isPickerVisible ? 'block' : 'none'} overflow='auto'  h={'200px'}    >
                        <Picker  data={data} darkMode='true' onEmojiSelect={handleEmojiSelect} overflow='auto'   />
                    </Box>
                </MenuList>
            </Menu>
        </Box>
    );
}

export default PostCaption;
