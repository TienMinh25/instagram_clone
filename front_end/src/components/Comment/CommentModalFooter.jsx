import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorMode,
  useToast
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { CommentLogo, NotificationsLogo, UnlikeLogo } from '../../assets/constants.jsx';
import { makeRequest } from '../../axios.js';

function CommentModalFooter({username, postId, avatar, timerAgo, isOwner }) {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const { colorMode } = useColorMode();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [countComments, setCountComments] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [isModalOpenComment, setIsModalOpenComment] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await makeRequest(`likes?postId=${postId}`);
        let isLiked = false;
        let { likes, data } = response.data;

        for (let i = 0; i < data?.length; i++) {
          if (data[i].userId === currentUser.id) {
            isLiked = true;
            break;
          }
        }

        setLikes(likes);
        setLiked(isLiked);
      } catch (error) {
        toast({
          title: 'Cannot load like of posts',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom'
        });
      }
    };

    const fetchComments = async () => {
      try {
        const response = await makeRequest(`comments?postId=${postId}`);
        let { data, meta } = response.data;

        setCountComments(meta.itemCount);
        setComments(data);
      } catch (error) {
        toast({
          title: 'Cannot load comment of posts',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom'
        });
      }
    };

    fetchLikes();
    fetchComments();
  }, [postId, toast, currentUser.id]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
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
      await makeRequest(`/comments?postId=${postId}&userId=${currentUser.id}`, {
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

  const handleLike = async () => {
    try {
      if (liked) {
        // Gọi API để unlike
        await makeRequest(`/likes?userId=${currentUser.id}&postId=${postId}`, {
          method: 'DELETE'
        });
        setLiked(false);
        setLikes((prev) => prev - 1);
      } else {
        // Gọi API để like
        await makeRequest(`/likes?userId=${currentUser.id}&postId=${postId}`, {
          method: 'POST'
        });
        setLiked(true);
        setLikes((prev) => prev + 1);
      }
    } catch (error) {
      toast({
        title: 'Cannot like or unlike',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      });
    }
  };


  return (
    <Box >
      <Flex alignItems={'center'} gap={4} w="full" mb={2} borderTop={'1px solid #414141'}>
        <Box onClick={handleLike} cursor={'pointer'} fontSize={18}>
          {!liked ? <NotificationsLogo colorMode={colorMode} /> : <UnlikeLogo />}
        </Box>

        <Box cursor={'pointer'} fontSize={18}>
          <CommentLogo colorMode={colorMode} />
        </Box>
      </Flex>
      <Text fontWeight={600} fontSize={'sm'}>
        {likes} {likes > 1 ? 'likes' : 'like'}
      </Text>
      <Flex alignItems={'center'} gap={2} justifyContent={'space-between'} w="full" borderTop="#414141 1px solid" borderBottom={'none'} padding="8px">
        <InputGroup>
          <Input
            onChange={handleCommentChange}
            variant={'flushed'}
            value={newComment}
            placeholder="Add a comment..."
            fontSize={14}
            borderBottom={'none'}
            focusBorderColor="transparent"
          />
          <InputRightElement>
            <Button
              fontSize={14}
              color={'blue.500'}
              fontWeight={600}
              cursor={'pointer'}
              _hover={{
                color: 'white'
              }}
              onClick={handleCommentPost}
              bg="transparent">
              Post
            </Button>
          </InputRightElement>
        </InputGroup>
      </Flex>
    </Box>
  );
}

export default CommentModalFooter;
