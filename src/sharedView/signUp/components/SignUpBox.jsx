import {Button, Divider, Flex, HStack, Image, StackItem, Text, useColorMode, VStack} from "@chakra-ui/react";
import {InstagramLogo} from "../../../assets/constants.jsx";
import {Link, NavLink} from "react-router-dom";
import {FaGoogle} from "react-icons/fa";
import SignUp from "./SignUp.jsx";
import useGoogle from "../../../hooks/back-end-hooks/useGoogle.js";

function SignUpBox() {


    const {colorMode}=useColorMode()
    const switchMode=(dark,light)=>(colorMode==='dark'?light:dark)

    const {googleAuth, error} = useGoogle();






    return (
            <VStack  maxWidth='350px'  width='350px' my={2} height={'full'}  >
                <VStack py={10} w={'full'} alignItems={'center'} borderWidth={{base:'0px ',sm:`1px `}} justifyContent={'space-evenly'}  borderColor={switchMode('blackAlpha.300','whiteAlpha.300')}>
                    <StackItem >
                        <Link to={'/'}><InstagramLogo  width={250} height={53} /></Link>
                    </StackItem>

                    <StackItem width={'full'} >



                        <VStack spacing={5}>

                            <Text width={'80%'} textAlign={'center'} color={switchMode('blackAlpha.600','whiteAlpha.600')} fontWeight={'semibold'}>Sign up to see photos and videos from your friends.</Text>


                            <Button  size={'sm'} width={'80%'} onClick={googleAuth}  bg={'red.600'} colorScheme={'green'} fontWeight={'semibold'} color={'white'} leftIcon={ <FaGoogle />}>
                                Log in with google
                            </Button>


                            <VStack width={'full'} spacing={8}>
                                <Flex width={'80%'} alignItems={'center'}  justifyContent={'space-around'}>
                                    <Divider width={'40%'} borderColor={switchMode('blackAlpha.400','whiteAlpha.400')} />
                                    <Text fontSize='sm' fontWeight={'bold'} color={switchMode('blackAlpha.600','whiteAlpha.800')} >OR</Text>
                                    <Divider width={'40%'} borderColor={switchMode('blackAlpha.400','whiteAlpha.400')} />
                                </Flex>
                            </VStack>
                        </VStack>

                    </StackItem>

                    <StackItem width={'full'} >
                        <SignUp />
                    </StackItem>


                </VStack>

                <Flex width={'full'} height={'63px'} alignItems={'center'} gap={1} justifyContent={'center'} borderWidth={{base:'0px ',sm:`1px `}}  borderColor={switchMode('blackAlpha.300','whiteAlpha.300')}>

                    <Text fontSize='sm'  >Have an account? </Text>
                    <NavLink to={'/accounts/login'}>
                        <Text fontSize='sm'  fontWeight={'semibold'} color={'blue.400'} >  Log in</Text>
                    </NavLink>
                </Flex>
                <VStack>
                    <Text fontSize='sm'>Get te app.</Text>
                    <HStack pt={3} mb={4}>
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

export default SignUpBox;