import {Center, Image} from "@chakra-ui/react";
import InstagramLogo from "../../../public/Instgram-logo.png";


function LoadingPage() {
    return (
        <Center height={'100vh'} >

            <Image src={InstagramLogo} width={{base:'40px',md:'80px'}}/>
        </Center>
    );
}

export default LoadingPage;