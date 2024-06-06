import { useState } from 'react';
import { Avatar, Flex, Text, Input, Button, Box, InputGroup, InputRightElement, IconButton, Center } from '@chakra-ui/react';
import formatTime from '../../utils/formatTime';
import { FiSend } from "react-icons/fi";

function Comment({ createdAt, username, profilePic, text, children, onReply }) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleReplyClick = () => {
    setShowReplyForm(!showReplyForm);
  };

  const handleReplySubmit = () => {
    if (replyText.trim()) {
      onReply(replyText);
      setReplyText('');
      setShowReplyForm(false);
    }
  };

  const handleCommentPost = async (e) => {
    e.preventDefault();
    if (newComment.trim() === '') {
      toast({
        title: 'Comment cannot be empty',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'bottom'
      });
      return;
    }

    try {
      await makeRequest(`/comments?postId=${postId}&userId=${currentUser.id}&parentComment=${comment.id}`, {
        method: 'POST',
        data: {
          content: newComment
        }
      });
      setCountComments((prev) => prev + 1);
      setNewComment('');
    } catch (error) {
      toast({
        title: 'Cannot post comment',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      });
    }
  };

  const timerShowUp = formatTime(createdAt);

  return (
    <Box>
      <Flex gap={4}>
        <Avatar src={profilePic} name={username} size="sm" cursor="pointer" />
        <Flex direction="column" flex="1">
          <Flex gap={2}>
            <Text fontWeight="bold" fontSize={12} cursor="pointer" _hover={{ color: 'gray' }}>
              {username}
            </Text>
            <Text fontSize={12}>{text}</Text>
          </Flex>
          <Flex gap={2}>
            <Text fontSize={12} color="gray">
              {timerShowUp}
            </Text>
            <Text fontSize={12} fontWeight={400} color="gray" cursor="pointer" onClick={handleReplyClick}>
              Reply
            </Text>
          </Flex>
          {showReplyForm && (
            <Box mt={2}>
              <InputGroup alignItems="center">
                <Input
                  placeholder="Write a reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  borderRadius={'full'}
                  fontSize={12}
                />
                <InputRightElement>
                  <IconButton icon={<FiSend/>} mt={2} fontSize={18} onClick={handleReplySubmit} background={"transparent"} _hover={{background:"transparent"}}>
                    Reply
                  </IconButton>
                </InputRightElement>
              </InputGroup>
            </Box>
          )}
          {children}
        </Flex>
      </Flex>
    </Box>
  );
}

export default Comment;
