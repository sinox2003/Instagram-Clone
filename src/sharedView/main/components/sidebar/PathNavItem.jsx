import {Box, Button, IconButton, Tooltip, useColorMode} from "@chakra-ui/react";


import useToggleSidebar from "../../../../hooks/useToggleSidebar.jsx";
import {NavLink} from "react-router-dom";


function PathNavItem({path,name,icon,filledIcon}) {



    const {colorMode}=useColorMode();
    const switchMode=(dark,light)=>(colorMode==='dark'?dark:light)

    const {isSidebarMinimized,isDrawerOpen,close} = useToggleSidebar();







    const handleState=(state1,state2)=>{
        if(isDrawerOpen || isSidebarMinimized ){

            return state1
        }
        return state2
    }


        return (

           <NavLink to={path} >
               {({ isActive }) => (
                   <>


                     <Box  display={handleState('block',{base:'block',xl:'none'})}>

                         <Tooltip display={{base:'none',md:'block'}} label={name} bg={switchMode('#262626','white')} boxShadow={switchMode("none",'xs')} color={switchMode("white",'black')}  m={2} placement='right'  p={2} borderRadius={9} >
                             <IconButton    variant={{base:"styled",md:"ghost"}}   onClick={close}  px={3} py={6}     icon={isActive ? filledIcon : icon}  aria-label={name}/>
                         </Tooltip>
                     </Box>


                     <Box  display={handleState('none' , {base: 'none', xl: 'block'})}
                           width={'full'}>
                         <Button    variant={"ghost"} fontSize={'lg'} py={6} justifyContent={'flex-start'} pl={3}  width={'full'}  iconSpacing={4} fontWeight={isActive?'bold':'400'}  leftIcon={isActive ? filledIcon : icon}     >
                             {name}
                         </Button>
                     </Box>
                   </>

               )}

           </NavLink>

        )




}

export default PathNavItem;

