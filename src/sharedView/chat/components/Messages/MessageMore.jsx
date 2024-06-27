import React from 'react';
import {
    Box,
    Center,
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Tooltip,
    useColorMode
} from "@chakra-ui/react";
import {HiOutlineDotsVertical} from "react-icons/hi";

function MessageMore(props) {

    const { colorMode } = useColorMode();
    const switchMode = (dark, light) => (colorMode === 'dark' ? dark : light);

    return (



        <Menu closeOnBlur={false}  closeOnSelect={false} size={'sm'} >
            <Tooltip
                label="More"
                bg={switchMode('#262626', 'white')}
                hasArrow
                boxShadow={switchMode('none', 'xs')}
                color={switchMode('white', 'black')}
                m={3}
                placement="top"
                p={2}
                borderRadius={9}
            >
                <MenuButton
                    as={IconButton}
                    aria-label="More"
                    icon={<HiOutlineDotsVertical size={14} color={switchMode('white', 'black')} />}
                    variant="link"
                />
            </Tooltip>
            <MenuList

            >
                <MenuItem>Item 1</MenuItem>
                <MenuItem>Item 2</MenuItem>
            </MenuList>
        </Menu>



    );
}

export default MessageMore;