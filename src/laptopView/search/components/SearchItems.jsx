
import {Box} from "@chakra-ui/react";
import SearchItem from "./SearchItem.jsx";
import UserProfileSkeleton from "../../../sharedView/profile/components/UserProfileSkeleton.jsx";

function SearchItems({searchedUsers,isSearchLoading}) {



    return (

        <Box overflowY='auto' my={3}>

            {
                isSearchLoading ?
                    [0,1,2].map((key) =>{
                        return (
                            <Box key={key} px={4} >
                                <UserProfileSkeleton />
                            </Box>
                        )
                    })

                    :
                    searchedUsers.map((user,key) => <SearchItem key={key} user={user} />)
            }




        </Box>
    );
}

export default SearchItems;