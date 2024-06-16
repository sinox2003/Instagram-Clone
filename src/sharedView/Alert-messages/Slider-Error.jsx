import {useEffect} from "react";
import {Box, Slide, Text} from "@chakra-ui/react";

function SliderError({isOpen,onClose,message}) {


    useEffect(() => {

        setTimeout(()=>{
            onClose()
        },2000)
    }, [isOpen]);


    return (

        <Slide direction='bottom'  in={isOpen} style={{ zIndex: 3000 }}>

            <Box
                p={2}
                color='white'
                bg='red'
                shadow='md'
                pos={'relative'}
            >
                <Text fontSize={'sm'}  >
                    {message}
                </Text>

            </Box>
        </Slide>
    );
}

export default SliderError;