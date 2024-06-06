import { Flex, Box, Avatar, Text } from '@chakra-ui/react';
import formatTimeAgo from '../../utils/formatTimeAgo';

function PostHeader({ username, avatar, isOwner, timerAgo }) {
  const timerShowUp = formatTimeAgo(timerAgo);

  return (
    <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'} my={2}>
      <Flex alignItems={'center'} gap={2}>
        <Avatar src={avatar} alt="user profile pic" size={'sm'} cursor={'pointer'}/>
        <Flex fontSize={12} fontWeight={'bold'} gap={1} >
          {username} •
          <Box color={'gray.500'}> {timerShowUp}</Box>
        </Flex>
      </Flex>
      {!isOwner && (
        <Box cursor={'pointer'}>
          <Text
            fontSize={12}
            color={'blue.500'}
            fontWeight={'bold'}
            _hover={{
              color: 'white'
            }}
            transition={'0.2 ease-in-out'}>
            Unfollow
          </Text>
        </Box>
      )}
    </Flex>
  );
}

export default PostHeader;
