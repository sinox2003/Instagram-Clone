import React from 'react';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogOverlay,
    Box,
    Button,
    Flex,
    Heading,
    Text,
    useColorMode
} from "@chakra-ui/react";
import useLogout from "../../hooks/back-end-hooks/useLogout.js";

function LogOut({isOpen, onClose}) {
    const cancelRef = React.useRef()
    const {colorMode}=useColorMode()
    const switchMode=(dark,light)=>(colorMode==='dark'?dark:light)
    const { handleLogout, loading, error}=useLogout();

    return (
        <>
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
                size={{base:'xs',md:'sm'}}
            >
                <AlertDialogOverlay zIndex={3000} />
                <Box zIndex={3000} pos={'relative'}>
                    <AlertDialogContent alignItems={'center'} borderRadius={17} overflow={'clip'}  bgColor={switchMode('#292929','white')}>
                        <Heading size={'md'} fontWeight={'semibold'} mb={2} mt={7}>Logging Out</Heading>
                        <Text mb={7} >You need to log back in.</Text>
                        <Flex width={'full'}  direction={{base:'column',md:'row'}} borderTop={'1px'} borderColor={switchMode('whiteAlpha.300','blackAlpha.300')}>
                            <Button width={{base:'full',md:'50%'}} variant={'ghost'} _hover={{bg: switchMode('whiteAlpha.200', 'blackAlpha.100')}} fontSize={'md'} size={'lg'} borderRadius={0} ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>

                            <Box borderTop={{base:'1px',md:'0'}} borderColor={switchMode('whiteAlpha.300','blackAlpha.300')} width={{base:'full',md:'50%'}}>
                                <Button width={'full'} variant={'ghost'}  _hover={{bg: switchMode('whiteAlpha.200', 'blackAlpha.100')}}   onClick={handleLogout} isLoading={loading}  fontSize={'md'} size={'lg'}  borderRadius={0} >
                                    Log out
                                </Button>
                            </Box>

                        </Flex>
                    </AlertDialogContent>
                </Box>

            </AlertDialog>
        </>
    )
}

export default LogOut;