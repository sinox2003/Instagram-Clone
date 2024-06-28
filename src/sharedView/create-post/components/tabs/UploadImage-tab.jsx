import React from 'react';
import {Center, Divider, FormLabel, Input, ModalCloseButton, ModalHeader, Text, VStack} from "@chakra-ui/react";
import {TbPhotoVideo} from "react-icons/tb";
import {usePreparePost} from "../../../../hooks/usePreparePost.jsx";


function UploadImageTab({handleSelect}) {




    const { setImageSrc } = usePreparePost();



    const handleImageUpload = (event) => {
       
        const file = event.target.files[0];
       

        const reader = new FileReader();

        reader.onload = () => {
            const imageDataUrl = reader.result;
            setImageSrc(imageDataUrl); // Set the image data URL to the state
            handleSelect(1); // Move to the next tab
        };

        reader.readAsDataURL(file); // Read the uploaded file as a data URL
    };



    return (
        <>

            <ModalHeader textAlign='center' py='2' fontSize='lg'>

                    <ModalCloseButton   bg={'transparent'}  display={{base:'block',md:'none'}}   zIndex={'1520'} size={'lg'} left={1} top={'2px'} />


                create new post
            </ModalHeader>
            <Divider />
            <Center h={'65vh'}   py='100px'  overflowY='auto'>
                <VStack textAlign='center'  >

                    <TbPhotoVideo size='110'  strokeWidth={'0.6'} />
                    <Text fontSize='xl' fontWeight='nomal' mb={4} >Upload your images here</Text>
                    <FormLabel bg='#0095F6' py='5px' px='4' color='white' fontSize='sm' borderRadius={'7'} cursor='pointer' htmlFor={'upload'}  >Select from computer</FormLabel>
                    <Input type='file' id='upload' accept='image/*'  multiple display='none' onChange={handleImageUpload}/>
                </VStack>

            </Center>


        </>
    );
}

export default UploadImageTab;