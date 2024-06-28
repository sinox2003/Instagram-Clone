import React, {useEffect, useRef, useState} from 'react';
import {
    Button,
    Flex,
    FormControl,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    useColorMode,
    VStack
} from "@chakra-ui/react";
import {FaRegCheckCircle} from "react-icons/fa";
import {IoCloseCircleOutline} from "react-icons/io5";
import useSignUpWithEmailAndPassword from "../../../hooks/back-end-hooks/useSignUpWithEmailAndPassword.js";

function SignUp() {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    const { signup, checkUsernameExists, checkEmailExists, loading } = useSignUpWithEmailAndPassword();
    const { colorMode } = useColorMode();
    const switchMode = (dark, light) => (colorMode === 'dark' ? light : dark);

    const emailRef = useRef();
    const fullNameRef = useRef();
    const usernameRef = useRef();
    const passwordRef = useRef();

    const [disabledButton, setDisabledButton] = useState(true);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        console.log(loading);
    }, [loading]);

    const handleDisabledButton = () => {
        const emailValue = emailRef.current.value;
        const fullNameValue = fullNameRef.current.value;
        const usernameValue = usernameRef.current.value;
        const passwordValue = passwordRef.current.value;

        if (
            errors.email ||
            errors.name ||
            errors.username ||
            errors.password ||
            emailValue.trim() === '' ||
            fullNameValue.trim() === '' ||
            usernameValue.trim() === '' ||
            passwordValue.trim() === ''
        ) {
            setDisabledButton(true);
        } else {
            setDisabledButton(false);
        }
    };

    useEffect(() => {
        handleDisabledButton();
    }, [errors]);

    const displayError = (error) => {
        if (error === undefined) return "";
        return error ? <IoCloseCircleOutline size={27} color={'crimson'} /> : <FaRegCheckCircle size={22} color={'gray'} />;
    };

    const handleEmailError = async () => {
        const emailValue = emailRef.current.value;
        if (emailValue.match(/^\S+@\S+\.\S+$/)) {
            let emailExists = await checkEmailExists(emailValue);
            if (!emailExists) {
                setErrors(prevState => ({ ...prevState, email: false }));
            } else {
                setErrors(prevState => ({ ...prevState, email: true }));
            }
        } else {
            setErrors(prevState => ({ ...prevState, email: true }));
        }
    };

    const handleNameError = () => {
        const nameValue = fullNameRef.current.value;
        if (nameValue.trim() !== '') {
            setErrors(prevState => ({ ...prevState, name: false }));
        } else {
            setErrors(prevState => ({ ...prevState, name: true }));
        }
    };

    const handleUsernameError = async () => {
        const usernameValue = usernameRef.current.value;
        if (usernameValue.trim() !== '') {
            let usernameExists = await checkUsernameExists(usernameValue);
            if (!usernameExists) {
                setErrors(prevState => ({ ...prevState, username: false }));
            } else {
                setErrors(prevState => ({ ...prevState, username: true }));
            }
        } else {
            setErrors(prevState => ({ ...prevState, username: true }));
        }
    };

    const handlePasswordError = () => {
        const passwordValue = passwordRef.current.value;
        if (passwordValue.trim() !== '') {
            if (passwordValue.length >= 6) {
                setErrors(prevState => ({ ...prevState, password: false }));
            } else {
                setErrors(prevState => ({ ...prevState, password: true }));
            }
        } else {
            setErrors(prevState => ({ ...prevState, password: true }));
        }
    };

    const handleSubmit = () => {
        if (!disabledButton) {
            const emailValue = emailRef.current.value;
            const fullNameValue = fullNameRef.current.value;
            const usernameValue = usernameRef.current.value;
            const passwordValue = passwordRef.current.value;
            signup(usernameValue, fullNameValue, emailValue, passwordValue);
        }
    };

    return (
        <FormControl>
            <VStack alignItems={'center'}>
                <InputGroup width={'80%'} borderRadius={4}>
                    <Input
                        bg={switchMode('blackAlpha.50', 'whiteAlpha.300')}
                        onChange={handleEmailError}
                        focusBorderColor={switchMode('blackAlpha.300', 'whiteAlpha.300')}
                        ref={emailRef}
                        borderColor={switchMode('blackAlpha.200', 'whiteAlpha.200')}
                        fontSize={'xs'}
                        id={'email'}
                        placeholder='Phone number or email'
                    />
                    <InputRightElement>
                        <Flex>
                            {displayError(errors.email)}
                        </Flex>
                    </InputRightElement>
                </InputGroup>

                <InputGroup width={'80%'} borderRadius={4}>
                    <Input
                        bg={switchMode('blackAlpha.50', 'whiteAlpha.300')}
                        onChange={handleNameError}
                        focusBorderColor={switchMode('blackAlpha.300', 'whiteAlpha.300')}
                        ref={fullNameRef}
                        borderColor={switchMode('blackAlpha.200', 'whiteAlpha.200')}
                        fontSize={'xs'}
                        id={'fullName'}
                        placeholder='Full Name'
                    />
                    <InputRightElement>
                        <Flex>
                            {displayError(errors.name)}
                        </Flex>
                    </InputRightElement>
                </InputGroup>

                <InputGroup width={'80%'} borderRadius={4}>
                    <Input
                        bg={switchMode('blackAlpha.50', 'whiteAlpha.300')}
                        onChange={handleUsernameError}
                        focusBorderColor={switchMode('blackAlpha.300', 'whiteAlpha.300')}
                        ref={usernameRef}
                        borderColor={switchMode('blackAlpha.200', 'whiteAlpha.200')}
                        fontSize={'xs'}
                        id={'username'}
                        placeholder='Username'
                    />
                    <InputRightElement>
                        <Flex>
                            {displayError(errors.username)}
                        </Flex>
                    </InputRightElement>
                </InputGroup>

                <InputGroup width={'80%'} borderRadius={4}>
                    <Input
                        pr={20}
                        bg={switchMode('blackAlpha.50', 'whiteAlpha.300')}
                        onChange={handlePasswordError}
                        fontSize={'xs'}
                        focusBorderColor={switchMode('blackAlpha.300', 'whiteAlpha.300')}
                        ref={passwordRef}
                        placeholder='Password'
                        id={'password'}
                        type={show ? 'text' : 'password'}
                        borderRadius={4}
                    />
                    <InputRightElement width='3rem'>
                        <Flex gap={2} mr={7}>
                            {displayError(errors.password)}
                            <Button variant={'unstyled'} bg={'transparent'} size='xs' onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </Flex>
                    </InputRightElement>
                </InputGroup>

                <VStack width={'80%'} fontSize={'xs'} textAlign={'center'} spacing={5}>
                    <Text>
                        People who use our service may have uploaded your contact information to Instagram. Learn More at the real website.
                    </Text>
                    <Text>
                        By signing up, you agree to our Terms, Privacy Policy and Cookies Policy.
                    </Text>
                </VStack>

                <Button
                    mt={2}
                    isLoading={loading}
                    onClick={handleSubmit}
                    color={'white'}
                    isDisabled={disabledButton}
                    width={'80%'}
                    colorScheme='facebook'
                    size='sm'
                    bg={'#0095F6'}
                    borderRadius={9}
                >
                    Sign up
                </Button>
            </VStack>
        </FormControl>
    );
}

export default SignUp;
