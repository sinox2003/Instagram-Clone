import {useState} from 'react';
import {usePreparePost} from "../../../../hooks/usePreparePost.jsx";
import {Box, Center, Divider, Flex, Image, Text, useColorMode, VStack} from "@chakra-ui/react";
import {GoArrowLeft} from "react-icons/go";
import Filters from "./edit-components/filters.jsx";


function ImageEditTab({ handleSelect }) {
        const { croppedImageSrc, setEditedImageSrc } = usePreparePost();
        const [filter, setFilter] = useState("");





        const handleFilters=(filters)=>{
            setFilter(filters)

        }

        const applyFilters = () => {
            setEditedImageSrc(filter)
            handleSelect(3)
        }

        const { colorMode, toggleColorMode } = useColorMode();
        const switchMode = (dark, light) => (colorMode === 'dark' ? dark : light);




        return (
            <Box minW='fit-content' minH='fit-content'  borderRadius='15px'  borderBottomRadius='16px'  overflow={'clip'}>
                <Flex justifyContent='space-between' alignItems='center' py={1} px={3}>
                    <GoArrowLeft size='35' cursor='pointer' onClick={() => handleSelect(1)} />
                    <Text fontWeight='semibold'>Edit</Text>
                    <Text fontWeight='semibold' cursor='pointer' onClick={applyFilters} color='#0095F6' _hover={{ color: 'inherit' }} px={2}>Next</Text>
                </Flex>
                <Divider />
                <VStack bg={switchMode('whiteAlpha.300','blackAlpha.300')}   position='relative'  h='65vh' w={'full'}  overflow='hidden'  >
                    <Center   w='full%' h='full'  pos='absolute' top='0' left='0' right='0' bottom='0'    >
                        <Image src={croppedImageSrc}    w='full%' h='100%' objectFit='cover'   style={{filter:filter}} />

                    </Center>


                        <Filters  handleFilters={handleFilters} />

                </VStack>
            </Box>
        );

        // Slider component

    }

    export default ImageEditTab;
