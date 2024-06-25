import React, {useEffect, useState} from 'react';
import {Box, Flex, IconButton, Text, useColorMode, useDisclosure} from "@chakra-ui/react";
import {TbLogout2, TbMoon} from "react-icons/tb";
import {MdOutlineWbSunny} from "react-icons/md";
import {useParams} from "react-router-dom";
import LogOut from "../../log-out/LogOut.jsx";

function ProfileNavBar() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const params=useParams()
    const {colorMode,toggleColorMode} = useColorMode();
    const switchMode=(dark,light)=>(colorMode==='dark'?dark:light)

    const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
    const [isVisible, setIsVisible] = useState(true);



    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            const isScrollingUp = prevScrollPos > currentScrollPos;

            setIsVisible(isScrollingUp);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [prevScrollPos]);

    return (

      <Box   width='full ' h={{base:'35px',sm:'45px'}} display={{base:'block',md:'none'}}  >

          <Flex  pos='fixed' zIndex={1500}  bg={switchMode('black','white')}  width='full ' h={{base:'50px',sm:'60px'}}   px={2} transform={isVisible ? 'translateY(0)' : 'translateY(-100%)'}
                 transition='transform 0.3s ease-in-out'  alignItems={'center'} justifyContent={'space-between'} borderBottom={'1px '} borderColor={switchMode('whiteAlpha.300','blackAlpha.300')}>

              <IconButton variant='link' onClick={onOpen}  color={switchMode('white','black')} _hover={{transform: 'scale(1.05)' , '& svg': { strokeWidth: '2.5' } }} transition={'all ease 0.2s'}  icon={<TbLogout2 size={27} />}  aria-label={'log out'}/>



              <Text  fontWeight={'semibold'} fontSize={'lg'}   cursor={'default'} sx={{display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: 'vertical', overflow: 'hidden'}} maxW={'230px'} > { params.username }</Text>

              <IconButton  variant='link'  color={switchMode('white','black')}    onClick={toggleColorMode} icon={switchMode(<TbMoon size={27}  />,<MdOutlineWbSunny size={27}  />)}  aria-label={'theme'}/>
          </Flex>
          <LogOut isOpen={isOpen}  onClose={onClose} />
      </Box>

    );
}

export default ProfileNavBar;