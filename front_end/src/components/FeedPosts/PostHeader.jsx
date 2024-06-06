import { Avatar, Box, Flex } from '@chakra-ui/react';
import formatTimeAgo from '../../utils/formatTimeAgo';
import { useNavigate } from 'react-router-dom';

function PostHeader({ username, avatar, timerAgo, targetId }) {
  const timerShowUp = formatTimeAgo(timerAgo);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(`/${username}`, { state: { userId: targetId, isOwnerProfile: false } });
  };

  return (
    <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'} my={2}>
      <Flex alignItems={'center'} gap={2} onClick={handleProfileClick} cursor={'pointer'}>
        <Avatar src={avatar} alt="user profile pic" size={'sm'} />
        <Flex fontSize={12} fontWeight={'bold'} gap={2}>
          {username}
          <Box color={'gray.500'}>• {timerShowUp}</Box>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default PostHeader;
