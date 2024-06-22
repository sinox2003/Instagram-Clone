import {
    Box,
    Button,
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    useBreakpointValue,
    useColorMode,
    useDisclosure
} from '@chakra-ui/react'
import {MdOutlineWbSunny} from "react-icons/md";
import {FiMoon} from "react-icons/fi";
import {RxHamburgerMenu} from "react-icons/rx";
import useToggleSidebar from "../../../../hooks/useToggleSidebar.jsx";
import {BiLogOut} from "react-icons/bi";
import LogOut from "../../../log-out/LogOut.jsx";
import {useNavigate} from "react-router-dom";
import {LiaBookmarkSolid} from "react-icons/lia";
import {GoHeart} from "react-icons/go";
import useAuthStore from "../../../../store/Backend-stores/authStore.js";

function SidebarMenuButton() {


    const { isOpen, onOpen, onClose } = useDisclosure()
    const {colorMode,toggleColorMode}=useColorMode()

    const {isSidebarMinimized,isDrawerOpen} = useToggleSidebar();

    const navigate=useNavigate()

    const authUser=useAuthStore((state)=>state.user);


    const handleState=(state1,state2)=>{
        if(isDrawerOpen || isSidebarMinimized){
            return state1
        }
        return state2
    }



    const display = useBreakpointValue(
        {
            base: 'base',
            md: 'md',
            xl: 'xl',
        }
    )

    const triggerButton=(isOpen)=>{
      if(isSidebarMinimized ||isDrawerOpen || display==='md' ){

            return  <MenuButton  as={IconButton}     variant={"ghost"}   px={3} py={6}     icon={isOpen ? <RxHamburgerMenu size={29} strokeWidth={1} />:<RxHamburgerMenu size={29} strokeWidth={0.5}/>} aria-label={name}/>

        }else {
            return   <MenuButton as={Button}  variant={"ghost"} py={6} iconSpacing={5}   pl={3} width={'full'}   textAlign={'start'} fontWeight={isOpen ? 'bolder':'400'}  leftIcon={isOpen ?<RxHamburgerMenu size={29} strokeWidth={1} />:<RxHamburgerMenu size={29} strokeWidth={0.5}/>}     >
                        More
                    </MenuButton>

        }
    }


    return (
    display!=='base'?
    <Box display={{base:'none',md:'block'}} >
        <Menu closeOnBlur={true}   isLazy={true}  lazyBehavior="unmount"  >
            {({ isOpen }) => (
                <>
                    {triggerButton(isOpen)}


                    <MenuList w={'270px'}  >
                        <MenuItem  fontSize={'14px'} py={4} onClick={()=>navigate(`/main/profile/${authUser.username}/liked`)} icon={<GoHeart size={21} />} >
                            Liked
                        </MenuItem>
                        <MenuItem  fontSize={'14px'} py={4} onClick={()=>navigate(`/main/profile/${authUser.username}/saved`)} icon={<LiaBookmarkSolid  size={23} />} >
                            Saved
                        </MenuItem>
                        <MenuItem fontSize={'14px'} py={4} onClick={toggleColorMode} icon={colorMode==='dark'?<FiMoon size={22}  />:<MdOutlineWbSunny size={23}  />}>
                            Switch appearance
                        </MenuItem>
                        <MenuDivider />

                        <MenuItem fontSize={'15px'} fontWeight={'500'} py={4} onClick={onOpen} >
                            Log out
                        </MenuItem>
                    </MenuList>
                </>

            )}
        </Menu>
        <LogOut isOpen={isOpen}  onClose={onClose} />

    </Box>
        :<></>
    );
}

export default SidebarMenuButton;