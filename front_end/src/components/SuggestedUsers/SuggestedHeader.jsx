import { Avatar, Flex, Link, Text, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { makeRequest } from '../../axios';
import fetchAvatar from '../../utils/fetchAvatar';

function SuggestedHeader({ currentUser }) {
  const [imgAvatar, setImgAvatar] = useState();
  const toast = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    fetchAvatar(currentUser.avatar, setImgAvatar);
  }, [currentUser.avatar]);

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const data = await makeRequest.post('/logout');

      if (data.status === 200) {
        toast({
          title: 'Logout successfully!',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'bottom'
        });

        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        navigate('/auth');
      }
    } catch (e) {
      toast({
        title: 'Failed to logout',
        description: e?.response?.data?.message || e.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      });
    }
  };

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
        // to="/auth"
        fontSize={14}
        fontWeight={'medium'}
        color={'blue.400'}
        cursor={'pointer'}
        style={{ textDecoration: 'none' }}
        onClick={handleLogout}>
        Log out
      </Link>
    </Flex>
  );
}

export default SuggestedHeader;
