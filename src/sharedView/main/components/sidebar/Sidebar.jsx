import {Flex, StackItem, useColorMode} from "@chakra-ui/react";
import {InstagramLogo, InstagramMobileLogo} from "../../../../assets/constants.jsx";
import SidebarMenuButton from "./SidebarMenuButton.jsx";
import useToggleSidebar from "../../../../hooks/useToggleSidebar.jsx";
import TabItems from "./TabItems.jsx";
import {useNavigate} from "react-router-dom";


function Sidebar() {

    const {colorMode}=useColorMode()

    const switchMode=(dark,light)=>(colorMode==='dark'?dark:light)

    const {isSidebarMinimized,isDrawerOpen} = useToggleSidebar();

    const navigate=useNavigate()


    const handleState=(state1,state2)=>{
        if(isDrawerOpen || isSidebarMinimized){
            return state1
        }
        return state2
    }







    return(


            <Flex    pos="fixed" bg={switchMode('black','white')}  bottom={0}
                   direction={{ base: 'row', md: 'column'}} pt={{base:0,md:10}} px={{base:0,md:2}}
                   py={{base:1,md:10}}  justifyContent={"space-between"} minHeight={{base:'50px',md:'full'}}
                   minWidth={handleState('72px',{base:'full', md: '72px', xl: '245px', '2xl': '340px' })} alignItems={handleState('center',{md:'center',xl:'normal'})}
                  borderWidth={{base:'1px 0 0 0 ',md:"0 1px 0 0 "}}     borderColor={switchMode("whiteAlpha.300","blackAlpha.300")}>

                <Flex as={'section'} direction={ 'column'} width={'full'}   alignItems={handleState('center',{md:'center',xl:'normal'})}  gap={12}>

                    <StackItem  onClick={()=>navigate('')}  display={handleState('block',{base:'none',md:'block',xl:'none'})} mb={handleState('5px',{md:'5px',xl:0})}>
                        <InstagramMobileLogo width={24} height={24} cursor='pointer' />
                    </StackItem>

                    <StackItem  px={3}  display={handleState('none',{base:'none',xl:'block'})} onClick={()=>navigate('')}>
                        < InstagramLogo  cursor='pointer'  width={103} height={29}  />
                    </StackItem>

                    <StackItem  >
                        <TabItems />
                    </StackItem>

                </Flex>

                <SidebarMenuButton  />

            </Flex>

        );

}

export default Sidebar;