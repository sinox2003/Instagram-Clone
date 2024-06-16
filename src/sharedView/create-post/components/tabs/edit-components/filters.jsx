import React, {useEffect, useState} from 'react';
import {Box, IconButton, Menu, MenuButton, MenuDivider, MenuList, Text, useColorMode} from "@chakra-ui/react";
import FilterSlider from "./FilterSlider.jsx";

import {LuSettings2} from "react-icons/lu";


function Filters({handleFilters}) {


    const [brightness, setBrightness] = useState(100);
    const [contrast, setContrast] = useState(100);
    const [saturation, setSaturation] = useState(100);
    const [temperature, setTemperature] = useState(0);

    const { colorMode, toggleColorMode } = useColorMode();
    const switchMode = (dark, light) => (colorMode === 'dark' ? dark : light);

    useEffect(() => {
        const filterString = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) sepia(${temperature}%) `;
        handleFilters(filterString);
    }, [brightness, contrast, saturation, temperature]);


    return (
        <Box position='absolute'  bottom='5' left='5'  zIndex={3000} >
            <Menu placement={'top-start'} isLazy lazyBehavior  >
                <MenuButton as={IconButton} aria-label='Options' isRound={true}  bgColor={switchMode('blackAlpha.700','whiteAlpha.900')} icon={ <LuSettings2 />}/>
                <MenuList  bg={'whiteAlpha.700'} w={{md:'xs',lg:'sm'}} >
                    <Text pl={2}>click on filter to reset </Text>
                    <MenuDivider />

                    <FilterSlider label="Brightness" value={brightness} onChange={setBrightness} min={0} max={200} defaultValue={100} />
                    <FilterSlider label="Contrast" value={contrast} onChange={setContrast} min={0} max={200} defaultValue={100} />
                    <FilterSlider label="Saturation" value={saturation} onChange={setSaturation} min={0} max={200} defaultValue={100} />
                    <FilterSlider label="Temperature" value={temperature} onChange={setTemperature} min={0} max={100} defaultValue={0} />
                </MenuList>
            </Menu>
        </Box>


    );
}

export default Filters;