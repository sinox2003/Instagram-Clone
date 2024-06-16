import {useState} from 'react';
import {Box, Image, keyframes} from "@chakra-ui/react";
import heart from '../../../../assets/images/heart.png'

function FeedPostImage({setDoubleClickLike,post}) {

    const [like, setLike] = useState('none')

    const animationKeyframes = keyframes`
    0% {  scale: 0 ;opacity:0;transform: rotateZ(30deg)}
    30%{ scale: 1.2;transform: rotateZ(30deg)}
    80%{ scale: 0.9;opacity:1;transform: translateY(0)rotateZ(0) }
    100% { transform: translateY(-400px) }
 
    `;

    const animation = `${animationKeyframes} 1.1s ease `;

    const handleLike = () => {
        setLike('block')
        setDoubleClickLike(prevState=>!prevState)
        setTimeout(() => {
            setLike('none')
        }, 1070);
    }

    return (


        <Box border={'1px'} borderColor={'whiteAlpha.300'} w={'full'} objectFit='contain' display={'flex'} alignItems={'center'} pos={'relative'} onDoubleClick={handleLike}  bg={'black'} minH={'400px'} borderRadius={'3px'}  maxW={'470px'} maxH={'587px'} overflow={'hidden'}  >
            <Image  h={'full'} w={'full'} objectPosition={'center'} objectFit='contain'  src={post.imageURL} />
            <Image src={heart} w={'160px'}  animation={animation}  display={like}  pos={'absolute'}  bottom={`calc(50% - 80px)`}  right={`calc(50% - 80px)`}   />
        </Box>


    );
}

export default FeedPostImage;