import {Suspense, useEffect} from 'react';
import {Box, Button, Center, Divider, IconButton, useColorMode} from "@chakra-ui/react";
import {NavLink, Outlet, useNavigate, useParams} from "react-router-dom";
import {BsGrid3X3} from "react-icons/bs";
import SpinnerLoader from "../../loading-pages/SpinnerLoader.jsx";
import {LiaBookmarkSolid} from "react-icons/lia";
import {GoHeart} from "react-icons/go";
import useAuthStore from "../../../store/Backend-stores/authStore.js";

function ProfileTabs() {

    const {colorMode} = useColorMode();
    const switchMode=(dark,light)=>(colorMode==='dark'?dark:light)
    const navigate=useNavigate()

    const params=useParams()
    const authUser = useAuthStore((state) => state.user);


    useEffect(() => {
        if(params.username!==authUser?.username){
            navigate("/main/profile/"+params.username)
        }
    }, []);



    const tabButton=(path,icon,name,bigIcon)=>{

      return <Box w={{base:'full',md:'auto'}}  >
                <NavLink to={path}  >
                      {({ isActive }) =><>

                          <IconButton display={{base:'flex',md:'none'}} aria-label={name} w='full' borderRadius={0} icon={bigIcon}  h='44px'  borderTop={isActive && '1px'} color={isActive?  '#0095F6' : '#737373'} borderColor={switchMode('white','black')} fontSize={28} variant='styled' />
                          <Button  display={{base:'none',md:'flex'}}  leftIcon={icon} size='xs' h={12} variant='styled' borderTop={isActive && '1px'} color={!isActive && 'gray'}  borderRadius={0} > { name}</Button>

                      </>}

                 </NavLink>
             </Box>

    }


    return (
        <Box mt={{md:12}} >
            <Divider  borderColor={switchMode('whiteAlpha.500','blackAlpha.400')} />



                <Center  gap={{base: 0, md: '12'}} w='full'  >
                    {tabButton('posts',<BsGrid3X3  size={11}/>,'POSTS',<BsGrid3X3 size={20} />)}
                    {   params.username === authUser?.username &&
                        tabButton('saved',<LiaBookmarkSolid  size={15}  />,'SAVED',<LiaBookmarkSolid  />)
                    }
                    {tabButton('liked',<GoHeart  size={15} />,'LIKED',<GoHeart size={25} />)}

                </Center>
             <Divider display={{base:'block',md:'none'}}  borderColor={switchMode('whiteAlpha.500','blackAlpha.400')} />

                <Box mb={3}>
                    <Suspense fallback={<SpinnerLoader/>}>
                        <Outlet />
                    </Suspense>
                </Box>
        </Box>
    );
}

export default ProfileTabs;