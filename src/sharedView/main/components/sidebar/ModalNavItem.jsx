import {Box, Button, IconButton, Tooltip, useColorMode, useDisclosure} from "@chakra-ui/react";
import useToggleSidebar from "../../../../hooks/useToggleSidebar.jsx";
import CreatePostModal from "../../../create-post/CreatePost-Modal.jsx";


function ModalNavItem({name,icon}) {
    const {colorMode}=useColorMode();
    const switchMode=(dark,light)=>(colorMode==='dark'?dark:light)

    const { isOpen, onOpen, onClose } = useDisclosure();

    const {isSidebarMinimized,isDrawerOpen,close} = useToggleSidebar();




    const handleState=(state1,state2)=>{
        if(isDrawerOpen || isSidebarMinimized){
            return state1
        }
        return state2
    }


    return (



                <>
                    <Box  display={handleState('block',{base:'block',xl:'none'})}>

                        <Tooltip display={{base:'none',md:'block'}} label={name} bg={switchMode('#262626','white')} boxShadow={switchMode("none",'xs')} color={switchMode("white",'black')}  m={2} placement='right'  p={2} borderRadius={8} >
                            <IconButton    variant={{base:"styled",md:"ghost"}}  onClick={close && onOpen} py={6} px={3}      icon={ icon}  aria-label={name}/>
                        </Tooltip>
                    </Box>


                    <Box  display={handleState( 'none' , {base: 'none', xl: 'block'})}
                          width={'full'}>
                        <Button  fontSize={'lg'}  variant={"ghost"} py={6} justifyContent={'flex-start'} pl={3} onClick={onOpen} width={'full'}  iconSpacing={4} fontWeight='400'  leftIcon={ icon }    >
                            {name}
                        </Button>
                    </Box>

                    <CreatePostModal onClose={onClose} isOpen={isOpen} />
                </>


    )


}

export default ModalNavItem;