import React, {useEffect} from 'react';
import {Button, HStack, Text, useColorMode, VStack} from "@chakra-ui/react";
import {InstagramLogo} from "../../assets/constants.jsx";
import {Link, NavLink, useNavigate} from "react-router-dom";
import useToggleSidebar from "../../hooks/useToggleSidebar.jsx";
import useAuthStore from "../../store/Backend-stores/authStore.js";

function NotFoundPage() {


    const navigate=useNavigate()

    let handleClick = (path)=>{
        navigate(path)
    }

    const {colorMode}=useColorMode();
    const switchMode=(dark,light)=>(colorMode==='dark'?dark:light)


    const {toggle} = useToggleSidebar();


    const authUser=useAuthStore((state)=>state.user)






    useEffect(()=>{

        toggle(false)

    },[])



    return (
        ! authUser ?   //if user is authenticated

        <VStack spacing={6} width={'full'}>
                <HStack p={4}  width={'full'} spacing={{base:0,md:'50%'}} justifyContent={{base:'space-between',md:'center'}} alignItems={'center'} borderBottom={'1px solid'} borderColor={switchMode('whiteAlpha.300','blackAlpha.300')} >
                    <Link   to={'/'} ><InstagramLogo  width={113} height={31} /> </Link>
                    <HStack  spacing={4} pr={2}>
                        <Button  colorScheme={'blue'} size={'sm'} bg={'#0095F6 '} onClick={()=>handleClick('/accounts/login')} color={'white'}>Log In</Button>
                        <Button  size={'sm'} variant={'unstyled'} color={'#009DF8'}  onClick={()=>handleClick('/')} _hover={{color: 'gray'}} >Sign up</Button>
                    </HStack>
                </HStack>
            <VStack spacing={6} width={'90%'} textAlign={"center"}>
                <Text fontSize={'2xl'} fontWeight={'semibold'}>Sorry, this page isn{"'"}t available.</Text>
                <Text  fontWeight={'400'}>The link you followed may be broken, or the page may have been removed.<NavLink to="/" style={{ color: '#0095F6' }} > Go back to Instagram</NavLink> </Text>
            </VStack>
        </VStack>

            :    //else

                <VStack spacing={6} width={'full'} pt={50}  px={'10%'} textAlign="center">
                    <Text textAlign="center" fontSize={'2xl'} fontWeight={'semibold'}>Sorry, this page isn{"'"}t available.</Text>
                    <Text textAlign="center" fontWeight={'400'}>The link you followed may be broken, or the page may have been removed.<NavLink to="/main" style={{ color: '#0095F6' }} > Go back to Instagram</NavLink> </Text>
                </VStack>



    );
}

export default NotFoundPage;