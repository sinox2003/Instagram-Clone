import {useState} from 'react';
import {Box, Divider, Flex, Text} from "@chakra-ui/react";
import {GoArrowLeft} from "react-icons/go";
import {usePreparePost} from "../../../../hooks/usePreparePost.jsx";
import Cropper from 'react-easy-crop'

import AspectRatioButton from "./crop-components/AspectRatio-button.jsx";

function ImageCropTab({ handleSelect }) {
    const { imageSrc,setCroppedImageSrc } = usePreparePost();

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedArea, setCroppedArea] = useState(null)
    const [aspect, setAspect] = useState()
    const [objectFit, setOjectFit] = useState('cover')

    

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedArea(croppedAreaPixels)
    }




    

    const onCropDone = () => {

        setCroppedImageSrc(croppedArea);

        handleSelect(2); // Move to the next tab

    }

    return (
        <Box >
            <Flex justifyContent={'space-between'} alignItems={'center'} py={1} px={3}>
                <GoArrowLeft size={'35'} cursor='pointer' onClick={() => handleSelect(0)}/>
                <Text fontWeight='semibold'>Crop</Text>
                <Text fontWeight='semibold' cursor='pointer' color='#0095F6' _hover={{color:'inherit'}} onClick={onCropDone} px={2}>Next</Text>
            </Flex>
            <Divider />

          <Box  py='32.5vh' minH='fit-content'>
              <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  objectFit={objectFit}
                  aspect={aspect}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  style={{
                      containerStyle:{
                          borderRadius:'0 0   16px  16px',
                          zIndex:'1500',
                          objectFit: {objectFit},
                          marginTop:'45px',
                          background:"transparent",
                      },
                  }}
              />
          </Box>
            <AspectRatioButton setAspect={setAspect} setOjectFit={setOjectFit} imageSrc={imageSrc} />

        </Box>
    );
}

export default ImageCropTab;
