import {Box, Flex, Spacer, Text} from "@chakra-ui/react";
import SuggestedHeader from "./SuggestedHeader.jsx";
import SuggestedUser from "./SuggestedUser.jsx";
import useGetSuggestedUsers from "../../../../hooks/back-end-hooks/useGetSuggestedUsers.js";
import {useEffect} from "react";

function SuggestedUsers() {


    const{suggestedUsers,isLoading}=useGetSuggestedUsers()



    return (

        <Box w='full' px={4}>
            <SuggestedHeader />
            <Box py={5} >
                <Flex>
                    <Text fontSize={'sm'} cursor={'default'} color='#737373' fontWeight={'semibold'} >
                        Suggested for you
                    </Text>
                    <Spacer />
                    <Text fontSize={'xs'} mb={2} cursor={'pointer'}  fontWeight={'semibold'} >
                        See All
                    </Text>
                </Flex>

                {
                    isLoading?
                        <Text fontSize={'xs'} color={'#CFCFCF'} fontWeight={'400'}>
                            Loading...
                        </Text>
                        :
                        suggestedUsers.map((user,index)=>(
                            <SuggestedUser key={index} user={user} />
                        ))
                }


            </Box>
            <Text fontSize={'xs'} color={'#CFCFCF'} fontWeight={'400'}>
                © INSTAGRAM CLONE FROM MITA MEHDI BM SINOX2003
            </Text>

        </Box>


    );
}

export default SuggestedUsers;