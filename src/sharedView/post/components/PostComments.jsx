import {Box, Text} from "@chakra-ui/react";
import PostComment from "./PostComment.jsx";
import PostCommentSkeleton from "./PostCommentSkeleton.jsx";

function PostComments({  comments,isLoading,closeModal }) {



    return (
        <Box
            h={"full"}
            w={"full"}
            css={{
                "&::-webkit-scrollbar": { width: "0px", height: "0px" },
            }}
            overflowY={"auto"}
        >
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
                    comments?.map((comment) => (
                        <PostComment
                            key={comment.id}
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
