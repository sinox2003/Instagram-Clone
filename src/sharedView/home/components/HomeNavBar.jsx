import {useEffect, useRef, useState} from 'react';
import {
    Box,
    Flex,
    HStack,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Menu,
    MenuList,
    useColorMode
} from "@chakra-ui/react";
import {IoMdCloseCircle} from "react-icons/io";
import {Link, NavLink} from "react-router-dom";
import {HeartWithNotification, InstagramLogo} from "../../../assets/constants.jsx";
import {GoHeart, GoHeartFill} from "react-icons/go";
import SearchItems from "../../../laptopView/search/components/SearchItems.jsx";
import useAuthStore from "../../../store/Backend-stores/authStore.js";
import useSearchUser from "../../../hooks/back-end-hooks/useSearchUser.js";
import {doc, onSnapshot} from "firebase/firestore";
import {firestore} from "../../../config/firebase.js";

function HomeNavBar() {
    const searchReference = useRef();
    const menuRef = useRef();
    const { colorMode } = useColorMode();
    const switchMode = (dark, light) => (colorMode === 'dark' ? dark : light);

    const [isMenuOpen, setMenuOpen] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
    const [isVisible, setIsVisible] = useState(true);
    const [unread, setUnread] = useState(false);

    const authUser = useAuthStore((state) => state.user);
    const { isLoading, getUserProfile, users } = useSearchUser();

    const handleResetSearch = () => {
        searchReference.current.value = "";
    };

    const handleSearch = () => {
        let query = searchReference.current.value;
        getUserProfile(query);
    };


    useEffect(() => {
        if (authUser?.uid) {
            const unsubscribe = onSnapshot(doc(firestore, "userNotifications", authUser.uid), (doc) => {
                if (doc.exists()) {
                    setUnread(doc.data().unread);
                }
            });

            return () => unsubscribe();
        }
    }, [authUser?.uid]);


    useEffect(() => {
        const handleOutsideClick = (event) => {
            if(event){
                if (
                    !menuRef.current.contains(event.target) &&
                    !searchReference.current.contains(event.target)
                ) {
                    setMenuOpen(false);
                }
            }

        };

        document.body.addEventListener("click", handleOutsideClick);

        return () => {
            document.body.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            const isScrollingUp = prevScrollPos > currentScrollPos;

            setIsVisible(isScrollingUp);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [prevScrollPos]);

    return (
        <Flex
            bg={switchMode('black', 'white')}
            display={{ base: 'block', md: 'none' }}
            zIndex={1501}
            pos='fixed'
            w={'full'}
            h='62px'
            borderBottom={'1px'}
            borderColor={switchMode('whiteAlpha.300', 'blackAlpha.300')}
            transform={isVisible ? 'translateY(0)' : 'translateY(-100%)'}
            transition='transform 0.3s ease-in-out'
        >
            <HStack h={'full'} w={'full'} px={4} justifyContent={{ base: 'end', 'smd': 'space-between' }} >
                <Box display={{ base: 'none', 'smd': 'block' }} >
                    <Link to={''}>
                        <InstagramLogo width={103} height={29} />
                    </Link>
                </Box>

                <HStack spacing={3} w={'full'} justifyContent={'end'} >
                    <InputGroup maxW={{ base: 'full', 'smd': '270px' }} borderRadius={'md'}>
                        <Menu isOpen={isMenuOpen} isLazy lazyBehavior>
                            <MenuList ref={menuRef} pos={'absolute'} top={'48px'} left={{ base: 0, 'smd': '-25px' }} zIndex={201} width={'320px'} borderRadius={'lg'}>
                                <Box overflowY={'auto'} h={'fit-content'} maxH={'80vh'}>
                                    <SearchItems searchedUsers={users} isSearchLoading={isLoading} />
                                </Box>
                            </MenuList>
                        </Menu>
                        <Input placeholder='Search' borderWidth={0} onChange={handleSearch} onFocus={() => setMenuOpen(true)} ref={searchReference} _placeholder={{ fontWeight: 'light', color: switchMode('whiteAlpha.600', 'blackAlpha.600') }} focusBorderColor='transparent' bg={switchMode('whiteAlpha.300', 'blackAlpha.100')} />
                        <InputRightElement >
                            <IconButton size="xl" variant="link" onClick={handleResetSearch} aria-label="reset icon" icon={<IoMdCloseCircle size={'18'} fill={'#C8C8C8'} />} />
                        </InputRightElement >
                    </InputGroup>

                    <NavLink to={`/main/notifications`} style={{ alignSelf: 'end' }} >
                        {({ isActive }) => (
                            <IconButton aria-label={'notifications'} _hover={{ transform: 'scale(1.06)', '& svg': { strokeWidth: '0.4' } }} transition={'all ease 0.1s'} variant='link' color={switchMode('white', 'black')} icon={isActive ? <GoHeartFill size={28} strokeWidth={0.3} /> : ( unread ? <HeartWithNotification borderColor={switchMode('black', 'white')} /> : <GoHeart size={28} strokeWidth={0.3} /> ) } />
                        )}
                    </NavLink>
                </HStack>
            </HStack>
        </Flex>
    );
}

export default HomeNavBar;
