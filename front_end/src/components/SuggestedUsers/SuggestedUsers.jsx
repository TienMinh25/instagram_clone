import {
  VStack,
  Flex,
  Text,
  Box,
  Link,
  useToast,
  Skeleton,
  Button,
  useColorMode
} from '@chakra-ui/react';
import SuggestedHeader from './SuggestedHeader';
import SuggestedUser from './SuggestedUser';
import { useEffect, useState } from 'react';
import { makeRequest } from '../../axios';

function SuggestedUsers() {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const { colorMode } = useColorMode();

  const fetchSuggestedUsers = async () => {
    try {
      const res = await makeRequest.get(`/follower?userId=${currentUser.id}`);
      const { data } = res.data;
      setSuggestedUsers((prevSuggestedUsers) => [...prevSuggestedUsers, ...data]);
      setIsLoading(false);
    } catch (error) {
      toast({
        title: 'Cannot load suggested users',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      });
      // Hiển thị thông báo lỗi nếu có
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestedUsers();
  }, []);

  return (
    <VStack py={8} px={6} gap={4}>
      <SuggestedHeader currentUser={currentUser} />
      <Flex alignItems={'center'} justifyContent={'space-between'} w="full">
        <Text fontSize={12} fontWeight={'bold'} color={'gray.500'}>
          Suggested for you
        </Text>
        <Text fontSize={12} fontWeight={'bold'} _hover={{ color: 'gray.400' }} cursor={'pointer'}>
          See All
        </Text>
      </Flex>

      {isLoading ? (
        <>
          {[0, 1, 2, 3, 4].map(() => {
            <Flex justifyContent={'space-between'} alignItems={'center'} w="full">
              <Flex alignItems={'center'} gap={2}>
                <Skeleton height="10" width="10" borderRadius="full" />
                <VStack spacing={2} alignItems={'flex-start'}>
                  <Skeleton height="4" width="40" />
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
                isDisabled>
                Loading...
              </Button>
            </Flex>;
          })}
        </>
      ) : (
        <>
          {suggestedUsers.map((suggestedUser) => {
            return (
              <SuggestedUser
                currentUser={currentUser}
                targetId={suggestedUser.id}
                key={suggestedUser.id}
                name={suggestedUser.name_tag}
                avatar={suggestedUser.avatar}
              />
            );
          })}
        </>
      )}

      <Box fontSize={12} color={'gray.500'} mt={5} alignSelf={'start'}>
        © 2024 Built By{' '}
        <Link
          href="https://www.facebook.com/profile.php?id=100005211045138"
          target="_blank"
          color="blue.500"
          fontSize={14}>
          Tiến Minh
        </Link>
      </Box>
    </VStack>
  );
}

export default SuggestedUsers;
