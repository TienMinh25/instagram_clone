import { Box, Stack, Text } from '@chakra-ui/react';
import Comment from './Comment';

function Comments({ comments, currentUser, onwerPostId, setComments, setCountComments }) {
  const handleShowReplies = (commentId) => {};

  return (
    <Stack spacing={4} w={'100%'}>
      {comments.map((comment) => (
        <Box key={comment.id} pb={2} minW={'100%'}>
          <Comment comment={comment} currentUser={currentUser} onwerPostId={onwerPostId} setComments={setComments} setCountComments={setCountComments}/>
          {comment.childrenCommentCount > 0 && (
            <Text
              fontSize="sm"
              color="blue.500"
              cursor="pointer"
              onClick={() => handleShowReplies(comment.id)}>
              View all {comment.childrenCommentCount} replies
            </Text>
          )}
        </Box>
      ))}
    </Stack>
  );
}

export default Comments;
