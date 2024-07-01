import React, {useEffect} from 'react';
import {Box, Button, IconButton, Tooltip, useColorMode, useDisclosure} from "@chakra-ui/react";
import useToggleSidebar from "../../../../hooks/useToggleSidebar.jsx";
import SearchDrawer from "../../../../laptopView/search/SearchDrawer.jsx";

function DrawerNavItem({ name, icon, filledIcon }) {
    const { colorMode } = useColorMode();
    const switchMode = (dark, light) => (colorMode === 'dark' ? dark : light);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isSidebarMinimized, isDrawerOpen, toggleDrawer, setClose } = useToggleSidebar();

    const handleState = (state1, state2) => {
        if (isDrawerOpen || isSidebarMinimized) {
            return state1;
        }
        return state2;
    };

    useEffect(() => {
        toggleDrawer(isOpen);
    }, [isOpen]);

    useEffect(() => {
        setClose(onClose);
    }, []);

    return (
        <>
            <Box display={handleState('block', { base: 'block', xl: 'none' })}>
                <Tooltip
                    display={{ base: 'none', md: 'block' }}
                    label={name}
                    bg={switchMode('#262626', 'white')}
                    boxShadow={switchMode("none", 'xs')}
                    color={switchMode("white", 'black')}
                    m={2}
                    openDelay={500}
                    placement='right'
                    p={2}
                    borderRadius={9}
                >
                    <IconButton
                        variant={{ base: "styled", md: "ghost" }}
                        py={6}
                        px={3}
                        onClick={isDrawerOpen ? onClose : onOpen}
                        icon={isDrawerOpen ? filledIcon : icon}
                        aria-label={name}
                        _hover={{
                            bg: switchMode('whiteAlpha.200', 'blackAlpha.200'),
                            svg: {
                                transform: 'scale(1.08)',
                                transition: 'transform 0.2s',
                            },
                        }}
                        _active={{
                            bg: switchMode('whiteAlpha.200', 'blackAlpha.100'),
                        }}

                    />
                </Tooltip>
            </Box>

            <Box display={handleState('none', { base: 'none', xl: 'block' })} width={'full'}>
                <Button
                    fontSize={'lg'}
                    variant={"ghost"}
                    py={6}
                    justifyContent={'flex-start'}
                    pl={3}
                    width={'full'}
                    onClick={onOpen}
                    iconSpacing={4}
                    fontWeight={'400'}
                    leftIcon={icon}
                    _hover={{
                        bg: switchMode('whiteAlpha.200', 'blackAlpha.100'),
                    }}
                    _active={{
                        bg: switchMode('whiteAlpha.200', 'blackAlpha.100'),
                    }}

                    css={{
                        '.chakra-button__icon': {
                            transition: 'transform 0.2s',
                        },
                        '&:hover .chakra-button__icon': {
                            transform: 'scale(1.08)',
                        },
                    }}
                >
                    {name}
                </Button>
            </Box>
            <SearchDrawer isOpen={isOpen} onClose={onClose} />
        </>
    );
}

export default DrawerNavItem;
