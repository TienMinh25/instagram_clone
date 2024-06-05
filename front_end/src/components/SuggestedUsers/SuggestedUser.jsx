import { Flex, Button, Avatar, VStack, Box, useToast, useColorMode } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import fetchAvatar from '../../utils/fetchAvatar';
import { makeRequest } from '../../axios';
import { useNavigate } from 'react-router-dom';

function SuggestedUser({ name, avatar, currentUser, targetId }) {
  const [isFollowed, setIsFollowed] = useState(false);
  const [imgAvatar, setImgAvatar] = useState();
  const toast = useToast();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  const handleFollowToggle = async () => {
    try {
      if (isFollowed) {
        await makeRequest.delete(`/follower?userId=${currentUser.id}&targetId=${targetId}`);
      } else {
        await makeRequest.post('/follower', {
          userId: currentUser.id,
          targetId
        });
      }
      setIsFollowed(!isFollowed);
    } catch (error) {
      toast({
        title: isFollowed ? 'Failed to unfollow' : 'Failed to follow',
        description: error?.response?.data?.message || error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      });
    }
  };

  useEffect(() => {
    fetchAvatar(avatar, setImgAvatar);
  }, [avatar]);

  const handleProfileClick = () => {
    navigate(`/${name}`, { state: { userId: targetId, isOwnerProfile: false } });
  };

  return (
    <Flex justifyContent={'space-between'} alignItems={'center'} w="full">
      <Flex alignItems={'center'} gap={2} onClick={handleProfileClick} cursor={'pointer'}>
        <Avatar src={imgAvatar} name={name} size={'md'} />
        <VStack spacing={2} alignItems={'flex-start'}>
          <Box fontSize={12} fontWeight={'bold'}>
            {name}
          </Box>
        </VStack>
      </Flex>
      <Button
        fontSize={13}
        bg="transparent"
        p={0}
        h="max-content"
        fontWeight={'medium'}
        color={'blue.400'}
        cursor={'pointer'}
        _hover={{
          color: colorMode === 'dark' ? 'white' : 'black'
        }}
        onClick={handleFollowToggle}>
        {isFollowed ? 'Unfollow' : 'Follow'}
      </Button>
    </Flex>
  );
}

export default SuggestedUser;
