import React, { useEffect, useRef } from 'react';
import {
    Box,
    Divider,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Text,
    VStack,
    useColorMode,
} from '@chakra-ui/react';
import { IoMdCloseCircle } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import UserProfileItem from './UserProfileItem';
import UserProfileSkeleton from './UserProfileSkeleton';
import useGetFollowing from '../../../hooks/back-end-hooks/useGetFollowing';

function Following({ isOpen, onClose }) {
    const { colorMode } = useColorMode();
    const switchMode = (dark, light) => (colorMode === 'dark' ? dark : light);
    const searchReference = useRef();
    const params = useParams();

    const { following, loading, error, fetchFollowing } = useGetFollowing();

    useEffect(() => {
        fetchFollowing(params.username, "");
    }, [params.username,isOpen]);

    const handleResetSearch = () => {
        searchReference.current.value = '';
        fetchFollowing(params.username, '');
    };

    const handleSearch = () => {
        fetchFollowing(params.username, searchReference.current.value);
    };

    return (
        <Modal onClose={onClose} isOpen={isOpen} isCentered size={{ base: 'full', smd: 'md' }}>
            <ModalOverlay zIndex={2000} bg={'blackAlpha.800'} />
            <Box zIndex={2000} pos='relative'>
                <ModalContent h={'430px'} bg={switchMode('#262626', 'white')} borderRadius={'14px'} overflow='hidden'>
                    <Text textAlign={'center'} fontWeight='640' py='10px'>
                        Following
                    </Text>
                    <Divider borderColor={switchMode('whiteAlpha.300', 'blackAlpha.300')} />
                    <ModalCloseButton bg='transparent' size={'lg'} right={'2'} top={'3px'} />

                    <InputGroup h={'35px'} w={'auto'} mx={5} my={2}>
                        <Input
                            placeholder='Search'
                            h={'35px'}
                            size={'sm'}
                            borderWidth={0}
                            borderRadius={'lg'}
                            onChange={handleSearch}
                            ref={searchReference}
                            _placeholder={{ fontWeight: 'light', color: switchMode('whiteAlpha.600', 'blackAlpha.600') }}
                            bg={switchMode('transparent', 'blackAlpha.100')}
                            focusBorderColor='transparent'
                        />
                        <InputRightElement h={'35px'}>
                            <IconButton
                                variant='link'
                                onClick={handleResetSearch}
                                aria-label='reset icon'
                                icon={<IoMdCloseCircle size={'18'} fill={'#C8C8C8'} />}
                            />
                        </InputRightElement>
                    </InputGroup>

                    <ModalBody overflowY={'auto'}>
                        <VStack spacing={0}>
                            {loading
                                ? [0, 1, 2, 3].map((i) => <UserProfileSkeleton key={i} />)
                                : following.length > 0
                                    ? following.map((user) => (
                                        <UserProfileItem
                                            profilePicURL={user.profilePicURL}
                                            key={user.uid}
                                            uid={user?.uid}
                                            username={user.username}
                                            fullName={user.fullName}
                                            close={onClose}
                                        />
                                    ))
                                    : (
                                        <Text textAlign={'center'} color={switchMode('whiteAlpha.600', 'blackAlpha.600')}>
                                            No Followers
                                        </Text>
                                    )}
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Box>
        </Modal>
    );
}

export default Following;
