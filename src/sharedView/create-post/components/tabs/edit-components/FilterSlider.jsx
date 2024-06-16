import React from 'react';
import {Box, Flex, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text} from '@chakra-ui/react';

function FilterSlider({ label, value, onChange, min, max, defaultValue }) {
    return (
        <Box p={4} w={'full'} h={'full'}>
            <Text cursor='pointer' onClick={() => onChange(defaultValue)}>{label}</Text>
            <Flex gap={4} alignItems="center">
                <Slider aria-label={`slider-${label}`} value={value} onChange={onChange} min={min} max={max}>
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb boxSize={6} />
                </Slider>
                <Text>{value}%</Text>
            </Flex>
        </Box>
    );
}

export default FilterSlider;
