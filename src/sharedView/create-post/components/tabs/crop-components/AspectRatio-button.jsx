import React, {useEffect, useState} from 'react';
import {Box, Button, IconButton, Menu, MenuButton, MenuDivider, MenuList, useColorMode} from "@chakra-ui/react";
import {MdAspectRatio} from "react-icons/md";
import {FaRegSquare} from "react-icons/fa";
import {LuRectangleHorizontal, LuRectangleVertical} from "react-icons/lu";
import {TbRectangle} from "react-icons/tb";

function AspectRatioButton({setAspect,setOjectFit,imageSrc}) {

    const { colorMode, toggleColorMode } = useColorMode();
    const switchMode = (dark, light) => (colorMode === 'dark' ? dark : light);

    const setFullAspectRatio=()=>{
        const img=new Image();
        img.src=imageSrc;
        setAspect(img.width/img.height);
        setOjectFit('contain')
    }

    


    return (
        <Box position='absolute'  bottom='5' left='5'  zIndex={3000} >
            <Menu placement={'top-start'} isLazy lazyBehavior  >
                <MenuButton as={IconButton} aria-label='Options' bgColor={switchMode('blackAlpha.700','whiteAlpha.900')} isRound={true} icon={<MdAspectRatio />}/>
                <MenuList  bg={'whiteAlpha.900'} w='fit-content' >

                    <Button variant='ghost'  onClick={()=>setOjectFit('contain')}>
                        contain
                    </Button>

                    <Button variant='ghost'  onClick={()=>setOjectFit('cover')}>
                        cover
                    </Button>
                    <MenuDivider />
             
                    <Button variant='ghost' onClick={setFullAspectRatio} icon={<FaRegSquare size={25} />}>
                        full
                    </Button>
                    <Button variant='ghost' onClick={()=>setAspect(1)} icon={<FaRegSquare size={25} />}>
                        1:1
                    </Button>

                    <Button variant='ghost' onClick={()=>setAspect(4/5)} icon={<LuRectangleVertical size={25} />}>
                        4:5
                    </Button>

                    <Button variant='ghost'  onClick={()=>setAspect(16/9)} icon={<LuRectangleHorizontal size={25} />}>
                        16:9
                    </Button>
                    <Button variant='ghost'  onClick={()=>setAspect(4/3)} icon={<TbRectangle size={25} />}>
                        4:3
                    </Button>
                </MenuList>
            </Menu>
        </Box>
    );
}

export default AspectRatioButton;