import React, {useRef, useState} from 'react';
import {Button, FormControl, Input, InputGroup, InputRightElement, useColorMode, VStack} from "@chakra-ui/react";
import useLogin from "../../../hooks/back-end-hooks/useLogin.js";

function LogIn({handleShowError}) {



    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const {colorMode}=useColorMode()
    const switchMode=(dark,light)=>(colorMode==='dark'?light:dark)

    const emailRef=useRef()
    const passwordRef=useRef()

    const [disabledButton, setDisabledButton] = useState(true)

    const {login,error,loading}=useLogin()

    const handleDisabledButton=()=>{
        const emailValue=emailRef.current.value;
        const passwordValue=passwordRef.current.value;

        if(emailValue.trim()!=='' && passwordValue.trim()!==''){
            if( passwordValue.length >= 6){
                setDisabledButton(false);
            }else {
                setDisabledButton(true);
            }
        }else {
            setDisabledButton(true);
        }
    }


    const handleSubmit = async () => {
        if (!disabledButton) {
            const emailValue = emailRef.current.value;
            const passwordValue = passwordRef.current.value;

            await login(emailValue, passwordValue);

            if (error || error===undefined ) {
                handleShowError('block');
            } else {
                handleShowError('none');
            }
        }
    };




    return (
        <FormControl   >
            <VStack alignItems={'center'} >
                <Input   bg={switchMode('blackAlpha.50','whiteAlpha.300')} onInput={handleDisabledButton} focusBorderColor={switchMode('blackAlpha.300','whiteAlpha.300')} ref={emailRef} borderColor={switchMode('blackAlpha.200','whiteAlpha.200')} fontSize={'xs'} id={'email'} placeholder='Phone number, username, or email' width={'80%'} borderRadius={4} />
                <InputGroup    width={'80%'}  borderRadius={4}>
                    <Input  bg={switchMode('blackAlpha.50','whiteAlpha.300')} onInput={handleDisabledButton} fontSize={'xs'} focusBorderColor={switchMode('blackAlpha.300','whiteAlpha.300')} ref={passwordRef} placeholder='Password'  id={'password'} type={show ? 'text' : 'password'} borderRadius={4}/>
                    <InputRightElement width='3rem'>
                        <Button variant={'unstyled'} bg={'transparent'}  size='xs' onClick={handleClick}> {show ? 'Hide' : 'Show'}</Button>
                    </InputRightElement>
                </InputGroup>
                <Button   mt={'6px'} isLoading={loading}  onClick={handleSubmit}  color={'white'} isDisabled={disabledButton} width={'80%'} colorScheme='facebook' size='sm'  bg={'#0095F6'} borderRadius={9}>Log in</Button>
            </VStack>
        </FormControl>
    );
}

export default LogIn;