import {useRef} from 'react';
import {
    Box,
    Divider,
    DrawerHeader,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    useColorMode
} from "@chakra-ui/react";
import {IoMdCloseCircle} from "react-icons/io";
import SearchItems from "./SearchItems.jsx";
import useSearchUser from "../../../hooks/back-end-hooks/useSearchUser.js";

function SearchBox() {

    const searchReference = useRef();
    const {colorMode}=useColorMode();
    const switchMode=(dark,light)=>(colorMode==='dark'?dark:light)

    const{isLoading,getUserProfile,user}=useSearchUser()


    const handleResetSearch=()=>{
        searchReference.current.value="";
    }

    const handleSearch=()=>{
        let query=searchReference.current.value
            getUserProfile(query)



    }





    return (
        <>
            <DrawerHeader mb={4}  fontSize={'x-large'}>
                Search
            </DrawerHeader>

            <InputGroup mb={6} width={'92%'} mx={'4%'}   borderRadius={'md'}>

                <Input  placeholder='Search' borderWidth={0}  onChange={handleSearch} ref={searchReference} _placeholder={{ fontWeight:'light', color:switchMode('whiteAlpha.600','blackAlpha.600')} }  focusBorderColor='transparent'  bg={switchMode('whiteAlpha.300','blackAlpha.100')}/>
                <InputRightElement >

                    <IconButton size="xl" variant="link" onClick={handleResetSearch}  aria-label="reset icon" icon={<IoMdCloseCircle size={'18'} fill={'#C8C8C8'} />}/>

                </InputRightElement>

            </InputGroup>
            <Divider />

            {
                user.length ?
                    <SearchItems searchedUsers={user} isSearchLoading={isLoading}  />
                    :
                    <Box p={5}>No user found</Box>
            }





        </>
    );
}

export default SearchBox;