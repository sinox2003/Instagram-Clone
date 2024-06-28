import {Box, Button, IconButton, Tooltip, useColorMode} from "@chakra-ui/react";
import {NavLink} from "react-router-dom";
import useToggleSidebar from "../../../../hooks/useToggleSidebar.jsx";

function PathNavItem({ path, name, icon, filledIcon }) {
    const { colorMode } = useColorMode();
    const switchMode = (dark, light) => (colorMode === 'dark' ? dark : light);
    const { isSidebarMinimized, isDrawerOpen, close } = useToggleSidebar();

    const handleState = (state1, state2) => {
        if (isDrawerOpen || isSidebarMinimized) {
            return state1;
        }
        return state2;
    };

    return (
        <NavLink to={path}>
            {({ isActive }) => (
                <>
                    <Box display={handleState('block', { base: 'block', xl: 'none' })}>
                        <Tooltip
                            display={{ base: 'none', md: 'block' }}
                            label={name}
                            bg={switchMode('#262626', 'white')}
                            boxShadow={switchMode("none", 'xs')}
                            color={switchMode("white", 'black')}
                            m={2}
                            placement='right'
                            p={2}
                            borderRadius={9}
                        >
                            <IconButton
                                variant={{ base: "styled", md: "ghost" }}
                                onClick={close}
                                px={3}
                                py={6}
                                icon={isActive ? filledIcon : icon}
                                aria-label={name}
                                _hover={{
                                    bg: switchMode('whiteAlpha.200', 'blackAlpha.100'),
                                    svg: {
                                        transform: 'scale(1.08)',
                                        transition: 'transform 0.2s',
                                    },
                                }}
                                _active={{
                                    bg: switchMode('whiteAlpha.200', 'blackAlpha.100'),
                                }}

                                css={{
                                    'img': {
                                        transition: 'transform 0.2s',
                                    },
                                    '&:hover img': {
                                        transform: 'scale(1.05)',
                                    },
                                }}
                            />
                        </Tooltip>
                    </Box>

                    <Box display={handleState('none', { base: 'none', xl: 'block' })} width={'full'}>
                        <Button
                            variant={"ghost"}
                            fontSize={'lg'}
                            py={6}
                            justifyContent={'flex-start'}
                            pl={3}
                            width={'full'}
                            iconSpacing={4}
                            fontWeight={isActive ? 'bold' : '400'}

                            leftIcon={isActive ? filledIcon : icon}
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
                </>
            )}
        </NavLink>
    );
}

export default PathNavItem;
