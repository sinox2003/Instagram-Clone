import {Box, Slide, Text} from "@chakra-ui/react";
import {useEffect} from "react";
import useSliderAlert from "../../hooks/useSliderAlert.jsx";


function SliderAlert() {


    const {isOpen,onClose,message}=useSliderAlert()


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
                bg='#262626'
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

export default SliderAlert;