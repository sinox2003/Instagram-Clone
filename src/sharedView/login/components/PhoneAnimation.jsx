import React, {useEffect, useState} from 'react';
import phoneImg from '../../../assets/images/phone.png'
import screenshot1 from '../../../assets/images/screenshots/screenshot1.png'
import screenshot2 from '../../../assets/images/screenshots/screenshot2.png'
import screenshot3 from '../../../assets/images/screenshots/screenshot3.png'
import screenshot4 from '../../../assets/images/screenshots/screenshot4.png'
import {Box, Flex, Image, keyframes} from "@chakra-ui/react";
import {motion} from 'framer-motion';


const animationKeyframes = keyframes`
    0% { opacity: 0; }
    20%{ opacity: 1; }
     49% { opacity: 1; }
    60% { opacity: 0; }
    100% { opacity: 0; } `;

const animation1 = `${animationKeyframes} 14s ease infinite`;
const animation2 = `${animationKeyframes} 14s 7s ease infinite`;

function PhoneAnimation() {

    const images1 = [screenshot1,screenshot2]
    const [image1, setImage1] = useState()
    const images2 = [screenshot3,screenshot4]
    const [image2, setImage2] = useState()

    useEffect(() => {
        let i=0
        let j=0

        setImage1(images1[0])
       setInterval(( ) => {
           setImage1(images1[i])
            i++;
            if(i===images1.length){
                i=0
            }
       },14000)
        //
        setTimeout(() =>{
            setImage2(images2[0])
            setInterval(( ) => {
                j++;
                if(j===images2.length){
                    j=0
                }
                setImage2(images2[j])
            },14000)
        },7000)
        
    },[])

    return (

        <Flex position={'relative'}>
            <Image  src={phoneImg}></Image>
            <Box as={motion.div} animation={animation1}>
                <Image  position={'absolute'} m={'auto'} bottom={10} top={0}  left={97} right={0} src={image1} />
            </Box>
            <Box as={motion.div} animation={animation2}>
                <Image  position={'absolute'} m={'auto'} bottom={10} top={0}  left={97} right={0} src={image2} />
            </Box>
        </Flex>
    );
}

export default PhoneAnimation;