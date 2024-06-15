import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Portal,
  Text,
  Textarea,
  useColorMode,
  useToast
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IoMdSend } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { makeRequest } from '../../axios';
import fetchAvatar from '../../utils/fetchAvatar';
import formatTimeAgo from '../../utils/formatTimeAgo';

function Comment({ comment, currentUser, onwerPostId, setComments, setCountComments }) {
  const timerShowUp = formatTimeAgo(comment.createdAt);
  const [imgAvatar, setImgAvatar] = useState();
  const navigate = useNavigate();
  const toast = useToast();
  const { colorMode } = useColorMode();
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);
  const iconRef = useRef(null);
  const editRef = useRef(null);
  const [optionsPosition, setOptionsPosition] = useState({ top: 0, left: 0 });
  const [isEdit, setIsEdit] = useState(false);
  const [editComment, setEditComment] = useState(comment.content);

  const handleIconBoxClick = () => {
    setShowOptions(!showOptions);
  };

  useEffect(() => {
    fetchAvatar(comment.User.avatar, setImgAvatar);
  }, [comment.User.avatar]);

  useEffect(() => {
    if (showOptions && iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      setOptionsPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX - 140
      });
    }
  }, [showOptions]);

  const handleProfileClick = () => {
    navigate(`/${comment.User.name_tag}`, {
      state: { userId: comment.User.id, isOwnerProfile: false }
    });
  };

  const handleClickOutside = (event) => {
    if (optionsRef.current && !optionsRef.current.contains(event.target)) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmitEdit = async () => {
    try {
      const { data } = await makeRequest.put(
        `/comments/${comment.id}?postId=${comment.postId}&userId=${currentUser.id}`,
        {
          content: editComment
        }
      );

      setComments((prevComments) =>
        prevComments.map((prevComment) => {
          if (prevComment.id !== data.id) return prevComment;

          return data;
        })
      );
    } catch (error) {
      toast({
        title: 'Cannot edit this comment',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      });
    } finally {
      setShowOptions(false);
      setIsEdit(false);
    }
  };

  const handleEdit = async () => {
    setIsEdit(true);
    setShowOptions(false);
    editRef.current.focus();
  };

  const handleDelete = async () => {
    try {
      await makeRequest.delete(`/comments/${comment.id}?postId=${comment.postId}`);
      setCountComments((prevCountComment) => prevCountComment - 1);
      setComments((prevComments) =>
        prevComments.filter((prevComment) => prevComment.id !== comment.id)
      );
    } catch (error) {
      toast({
        title: 'Cannot delete this comment',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      });
    } finally {
      setShowOptions(false);
    }
  };

  const handleHideComment = () => {
    setShowOptions(false);
  };

  return (
    <Flex
      gap={4}
      _hover={{
        '& .icon-box': {
          visibility: 'visible'
        }
      }}>
      <Avatar
        src={imgAvatar}
        name={comment.User.name_tag}
        size="sm"
        onClick={handleProfileClick}
        cursor="pointer"
      />
      <Flex
        direction="column"
        bg={colorMode === 'dark' ? '#424242' : 'rgb(240, 242, 245)'}
        borderRadius="8px"
        padding="2">
        <Box>
          <Text
            fontWeight="bold"
            as="span"
            fontSize={12}
            marginRight={2}
            _hover={{
              color: colorMode === 'dark' ? 'rgb(123, 123, 123)' : 'rgb(146, 146, 146)'
            }}
            cursor="pointer"
            onClick={handleProfileClick}>
            {comment.User.name_tag}
          </Text>
          {isEdit ? (
            <Flex alignItems="center">
              <Textarea
                value={editComment}
                onChange={(e) => setEditComment(e.target.value)}
                size="sm"
                resize="none"
                minHeight="60px"
                minWidth="300px"
                ref={editRef}
              />
              <IconButton
                icon={<IoMdSend />}
                onClick={handleSubmitEdit}
                size="sm"
                colorScheme="blue"
                marginLeft={2}
              />
            </Flex>
          ) : (
            <Text fontSize={12} as="span" whiteSpace="normal" wordBreak="break-word">
              {comment.content}
            </Text>
          )}
        </Box>
        <Flex gap={3}>
          <Text fontSize={12} color="gray">
            {timerShowUp}
          </Text>
          <Text fontSize={12} color="rgb(49, 130, 206)" cursor="pointer">
            Reply
          </Text>
          {isEdit && (
            <Text
              fontSize={12}
              color="rgb(49, 130, 206)"
              cursor="pointer"
              onClick={() => setIsEdit(false)}>
              Cancel
            </Text>
          )}
        </Flex>
      </Flex>
      <Flex alignItems="center" position="relative">
        <Flex
          ref={iconRef} // Tham chiếu đến biểu tượng <BsThreeDots />
          className="icon-box"
          visibility="hidden"
          _hover={{ background: colorMode === 'dark' ? '#424242' : 'rgb(240, 242, 245)' }}
          padding={2}
          borderRadius="50%"
          color="#aaa"
          onClick={handleIconBoxClick}
          cursor={'pointer'}>
          <BsThreeDots />
        </Flex>

        {showOptions && (
          <Portal>
            <Flex
              direction="column"
              position="absolute"
              top={`${optionsPosition.top}px`} // Sử dụng vị trí tính toán
              left={`${optionsPosition.left}px`} // Sử dụng vị trí tính toán
              bg={colorMode === 'dark' ? 'rgb(36 37 38)' : '#fff'}
              // boxShadow="2xl"
              borderRadius="md"
              ref={optionsRef}
              w={200}
              padding={2}
              zIndex={1500} // Đặt zIndex cao hơn modal
              boxShadow="0px 4px 16px rgba(0, 0, 0, 0.4)">
              <svg
                style={{
                  position: 'absolute',
                  top: '-9px',
                  right: '20px',
                  transform: 'scale(1, -1)'
                  // filter: " drop-shadow(2px 0px 4px rgba(0, 0, 0, 0)) drop-shadow(2px 0px 6px rgba(0, 0, 0, 0.2))",
                }}
                aria-hidden="true"
                height="10"
                viewBox="0 0 25 12"
                width="25"
                fill={colorMode === 'dark' ? 'rgb(36 37 38)' : '#fff'}>
                <path d="M24.553.103c-2.791.32-5.922 1.53-7.78 3.455l-9.62 7.023c-2.45 2.54-5.78 1.645-5.78-2.487V2.085C1.373 1.191.846.422.1.102h24.453z"></path>
              </svg>
              {currentUser.id === comment.userId ? (
                <Box
                  fontWeight="semibold"
                  padding={2}
                  cursor="pointer"
                  borderRadius="md"
                  _hover={{ bg: colorMode === 'dark' ? '#3a3b3c' : '#F2F3F5' }}
                  onClick={handleEdit}>
                  Edit
                </Box>
              ) : null}
              {currentUser.id === comment.userId || currentUser.id === onwerPostId ? (
                <Box
                  fontWeight="semibold"
                  padding={2}
                  cursor="pointer"
                  borderRadius="md"
                  _hover={{ bg: colorMode === 'dark' ? '#3a3b3c' : '#F2F3F5' }}
                  onClick={handleDelete} // Xử lý sự kiện Delete
                >
                  Delete
                </Box>
              ) : null}
              <Box
                fontWeight="semibold"
                padding={2}
                cursor="pointer"
                borderRadius="md"
                _hover={{ bg: colorMode === 'dark' ? '#3a3b3c' : '#F2F3F5' }}
                onClick={handleHideComment}>
                Hide Comment
              </Box>
            </Flex>
          </Portal>
        )}
      </Flex>
    </Flex>
  );
}

export default Comment;
