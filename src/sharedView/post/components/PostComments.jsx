import {Box, Text} from "@chakra-ui/react";
import PostComment from "./PostComment.jsx";
import PostCommentSkeleton from "./PostCommentSkeleton.jsx";
import PostCaption from "./PostCaption.jsx";

function PostComments({  comments,isLoading,closeModal,owner,caption,createdAt }) {



    return (
        <Box
            h={"full"}
            w={"full"}
            css={{
                "&::-webkit-scrollbar": { width: "0px", height: "0px" },
            }}
            overflowY={"auto"}
        >
            <Box display={{base:'none',md:'block'}}>
                <PostCaption closeModal={closeModal} owner={owner} caption={caption} createdAt={createdAt} />

            </Box>
            {isLoading ? (
                <>
                    <PostCommentSkeleton />
                    <PostCommentSkeleton />
                    <PostCommentSkeleton />
                    <PostCommentSkeleton />
                </>
            ) : (
                <>
                {comments.length===0?
                    <Text p='4' size={'sm'} fontWeight={'semibold'}>No Comments</Text>
                    :
                    comments?.map((comment,index) => (
                        <PostComment
                            key={index}
                            comment={comment}
                            closeModal={closeModal}
                        />

                    ))


                }


                </>
            )}
        </Box>
    );
}

export default PostComments;
