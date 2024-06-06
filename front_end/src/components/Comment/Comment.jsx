import { Avatar, Flex, Text, Box, useColorMode } from '@chakra-ui/react';
import formatTimeAgo from '../../utils/formatTimeAgo';
import { useEffect, useState } from 'react';
import fetchAvatar from '../../utils/fetchAvatar';
import { useNavigate } from 'react-router-dom';

function Comment({ comment }) {
  const timerShowUp = formatTimeAgo(comment.createdAt);
  const [imgAvatar, setImgAvatar] = useState();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  useEffect(() => {
    fetchAvatar(comment.User.avatar, setImgAvatar);
  }, [comment.User.avatar]);

  const handleProfileClick = () => {
    navigate(`/${comment.User.name_tag}`, {
      state: { userId: comment.User.id, isOwnerProfile: false }
    });
  };

  return (
    <Flex gap={4}>
      <Avatar
        src={imgAvatar}
        name={comment.User.name_tag}
        size="sm"
        onClick={handleProfileClick}
        cursor={'pointer'}
      />
      <Flex direction={'column'}>
        <Box>
          <Text
            fontWeight={'bold'}
            as="span"
            fontSize={12}
            marginRight={2}
            _hover={{
              color: colorMode === 'dark' ? 'rgb(123, 123, 123)' : 'rgb(146,146,146)'
            }}
            cursor={'pointer'}
            onClick={handleProfileClick}>
            {comment.User.name_tag}
          </Text>
          <Text fontSize={12} as="span" whiteSpace="normal" wordBreak="break-word">
            {comment.content}
          </Text>
        </Box>
        <Flex gap={3}>
          <Text fontSize={12} color={'gray'}>
            {timerShowUp}
          </Text>
          <Text fontSize={12} color="rgb(49,130,206)" cursor="pointer">
            Reply
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Comment;
