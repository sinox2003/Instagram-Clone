import React, {useState} from 'react';
import {Divider, Flex, HStack, Image, StackItem, Text, useColorMode, VStack} from "@chakra-ui/react";
import {InstagramLogo} from "../../../assets/constants.jsx";
import {Link, NavLink} from "react-router-dom";
import {FcGoogle} from "react-icons/fc";
import LogIn from "./LogIn.jsx";
import useGoogle from "../../../hooks/back-end-hooks/useGoogle.js";


function LogInBox() {

    // const [show, setShow] = React.useState(false)
    // const handleClick = () => setShow(!show)
    const {colorMode}=useColorMode()
    const switchMode=(dark,light)=>(colorMode==='dark'?light:dark)

    const [showError, setShowError] = useState('none')

    const handleShowError =(data)=>{
        setShowError(data)
    }
    const {googleAuth, error} = useGoogle();



    return (

       <VStack  maxWidth='350px'  width='350px' >
            <VStack minH='430px' py={3} w={'full'} alignItems={'center'} borderWidth={{base:'0px ',sm:`1px `}} justifyContent={'space-evenly'} borderColor={switchMode('blackAlpha.300','whiteAlpha.300')}>
                <StackItem my={8} >
                    <Link to={'/'}><InstagramLogo  width={250} height={53} /></Link>
                </StackItem>

                <StackItem width={'full'} >

                    <VStack spacing={5}>

                      <LogIn  handleShowError={handleShowError} />

                        <VStack width={'full'} spacing={8}>
                            <Flex width={'80%'} alignItems={'center'}  justifyContent={'space-around'}>
                                <Divider width={'40%'} borderColor={switchMode('blackAlpha.400','whiteAlpha.400')} />
                                <Text fontSize='sm' fontWeight={'bold'} color={switchMode('blackAlpha.600','whiteAlpha.800')} >OR</Text>
                                <Divider width={'40%'} borderColor={switchMode('blackAlpha.400','whiteAlpha.400')} />
                            </Flex>
                            <NavLink to={'/'}>
                                <Flex gap={2} alignItems={'center'}>
                                    <FcGoogle />
                                    <Text  fontSize='sm'  fontWeight={'semibold'} color={switchMode('blue.700','blue.500')} onClick={googleAuth} >Log in with google</Text>
                                </Flex>
                            </NavLink>
                        </VStack>
                        <Text textAlign={"center"} display={showError} fontSize='sm' width={'80%'} color={'red.500'}>
                            Sorry, your password was incorrect. Please double-check your password.
                        </Text>
                        <NavLink to={'/'}>
                            <Text fontSize='xs' pb={3}  color={switchMode('blue.700','blue.500')} >Forgot password?</Text>
                        </NavLink>

                    </VStack >

                </StackItem>




            </VStack>

           <Flex width={'full'} height={'63px'} alignItems={'center'} gap={1} justifyContent={'center'} borderWidth={{base:'0px ',sm:`1px `}}  borderColor={switchMode('blackAlpha.300','whiteAlpha.300')}>
               {/* eslint-disable-next-line react/no-unescaped-entities */}
                <Text fontSize='sm'  >Don't have an account?</Text>
               <NavLink to={'/accounts/signup'}>
                   <Text fontSize='sm'  fontWeight={'semibold'} color={'blue.400'} >Sign up</Text>
               </NavLink>
           </Flex>
            <VStack>
                <Text fontSize='sm'>Get te app.</Text>
                <HStack pt={3}>
                    <a target={"_blank"}  href='https://play.google.com/store/apps/details?id=com.instagram.android' >
                        <Image src={"https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png"} sizes={'sm'} height={'45px'}/>


                    </a>
                    <a href='ms-windows-store://pdp/?productid=9nblggh5l9xt&referrer=appbadge&source=www.instagram.com&mode=mini&pos=-7%2C0%2C1069%2C1399'>
                        <Image src={"https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png"} sizes={'sm'} height={'45px'}/>


                    </a>
                </HStack>
            </VStack>


       </VStack>



    );
}

export default LogInBox;