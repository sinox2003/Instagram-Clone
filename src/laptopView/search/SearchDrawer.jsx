import {Drawer, DrawerCloseButton, DrawerContent, DrawerOverlay, useBreakpointValue,} from "@chakra-ui/react";

import SearchBox from "./components/SearchBox.jsx";
import {useEffect} from "react";

function SearchDrawer({isOpen,onClose}) {


    const display = useBreakpointValue(
        {
            base: 'base',
            md: 'md',
            xl: 'xl',
        }
    )
    useEffect(()=>{
        if(display==='base'){
            onClose()
        }
    },[display])


    return (

            <Drawer as={'section'}
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                    blockScrollOnMount={false}

            >
                <DrawerOverlay  />

                <DrawerContent maxW={'397px'}  >
                    <DrawerCloseButton />
                    <SearchBox />
                </DrawerContent>
            </Drawer>




    );
}

export default SearchDrawer;