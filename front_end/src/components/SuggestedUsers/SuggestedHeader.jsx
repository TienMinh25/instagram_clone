import { useState, useEffect } from 'react';
import { Flex, Avatar, Text, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

import fetchAvatar from '../../utils/fetchAvatar';

function SuggestedHeader() {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [imgAvatar, setImgAvatar] = useState();

  useEffect(() => {
    fetchAvatar(currentUser.avatar, setImgAvatar);
  }, [currentUser.avatar]);

  return (
    <Flex justifyContent={'space-between'} alignItems={'center'} w="full">
      <Flex alignItems={'center'} gap={2}>
        <Avatar name="as tienminh" size={'md'} src={imgAvatar} />
        <Text fontSize={12} fontWeight={'bold'}>
          {currentUser.username}
        </Text>
      </Flex>
      <Link
        as={RouterLink}
        to="/auth"
        fontSize={14}
        fontWeight={'medium'}
        color={'blue.400'}
        cursor={'pointer'}
        style={{ textDecoration: 'none' }}
      >
        Log out
      </Link>
    </Flex>
  );
}

export default SuggestedHeader;
