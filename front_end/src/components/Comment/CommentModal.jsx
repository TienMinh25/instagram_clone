import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Image,
  Box,
  Flex,
  useColorMode,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import PostHeader from '../FeedPosts/PostHeader';
import Comment from './Comment';
import CommentModalFooter from './CommentModalFooter';

const CommentModal = ({ isOpen, onClose, postImage, comments, username, avatar, timerAgo, isOwner, postId }) => {
  const { colorMode } = useColorMode();
  const [commentsState, setCommentsState] = useState(comments);

  useEffect(() => {
    console.log('All Comments:', comments);
    setCommentsState(comments);
  }, [comments]);

  const handleReply = (commentId, replyText) => {
    setCommentsState((prevComments) => {
      const updatedComments = prevComments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), { id: Date.now(), createdAt: new Date().toISOString(), User: { name_tag: username, avatar }, content: replyText }],
          };
        }
        return comment;
      });
      return updatedComments;
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} overflow="hidden">
      <ModalOverlay style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
      <ModalContent position="relative" p={0} borderRadius="4px">
        <ModalCloseButton
          position="fixed"
          top="4"
          right="10"
          color="white"
          fontSize={18}
          _hover={{ backgroundColor: 'transparent' }}
        />
        <ModalBody display="flex" justifyContent="center" p={0} borderRadius="4px">
          <Flex w="878px" h="660px" margin="auto" bg={colorMode === 'light' ? 'white' : 'black'} borderRadius="4px">
            <Box flex="1" w="374px" height="660px">
              <Image src={postImage} alt="Post" />
            </Box>
            <Box w="504px" position="relative">
              <PostHeader username={username} avatar={avatar} isOwner={isOwner} timerAgo={timerAgo} />
              <Box
              borderTop="#414141 1px solid"
                flex="1"
                maxW="100%"
                pl={4}
                pt={4}
                mt={2}
                overflowY="scroll"
                maxH="500px"
                className="no-scrollbar"
                sx={{
                  scrollbarWidth: 'none',
                  '&::-webkit-scrollbar': {
                    display: 'none',
                  },
                  msOverflowStyle: 'none',
                }}
              >
                {commentsState.map((comment) => (
                  <Box key={comment.id} mb="10px">
                    <Comment
                      createdAt={comment.createdAt}
                      username={comment.User.name_tag}
                      profilePic={comment.User.avatar}
                      text={comment.content}
                      onReply={(replyText) => handleReply(comment.id, replyText)}
                    >
                      {comment.replies && comment.replies.map((reply) => (
                        <Box key={reply.id} ml={4} mt={2}>
                          <Comment
                            createdAt={reply.createdAt}
                            username={reply.User.name_tag}
                            profilePic={reply.User.avatar}
                            text={reply.content}
                            onReply={(replyText) => handleReply(reply.id, replyText)}
                          />
                        </Box>
                      ))}
                    </Comment>
                  </Box>
                ))}
              </Box>
              <Box position="absolute" bottom="0" width="100%">
                <CommentModalFooter postId={postId} />
              </Box>
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CommentModal;
