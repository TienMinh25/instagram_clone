import { Avatar, AvatarGroup, Button, Flex, Skeleton, Text, VStack, useColorMode } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { makeRequest } from '../../axios';
import fetchAvatar from '../../utils/fetchAvatar';

function ProfileHeader({ userId, isOwnerProfile }) {
  const [imgAvatar, setImgAvatar] = useState();
  const [profileData, setProfileData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const {colorMode} = useColorMode();

  useEffect(() => {
    const fetchProfileData = async () => {
      setIsLoading(true);
      try {
        const response = await makeRequest.get(`/users/${userId}`);
        console.log(response);
        setProfileData(response.data);
        fetchAvatar(response.data.user.avatar, setImgAvatar);
      } catch (error) {
        console.error('Error fetching profile data', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <Flex gap={{ base: 4, sm: 10 }} py={10} direction={{ base: 'column', sm: 'row' }}>
      {isLoading ? (
        <>
          <AvatarGroup
            size={{ base: 'xl', md: '2xl' }}
            justifySelf={'center'}
            alignSelf={'flex-start'}
            mx="auto"
            css={{
              fontSize: '50px'
            }}>
            <Skeleton w="100%" h="100%">
              <Avatar />
            </Skeleton>
          </AvatarGroup>

          <VStack alignItems={'start'} gap={2} mx={'auto'} flex={1}>
            <Flex
              gap={4}
              direction={{ base: 'column', sm: 'row' }}
              justifyContent={{ base: 'center', sm: 'flex-start' }}
              alignItems={'center'}
              w={'full'}>
              <Skeleton height="20px" w="100px" />
              <Flex gap={4} alignItems={'center'} justifyContent={'center'}>
                <Button
                  bg={'white'}
                  color={'black'}
                  _hover={{ bg: 'whiteAlpha.700' }}
                  size={{ base: 'xs', md: 'sm' }}
                  isLoading
                  loadingText="Edit Profile"
                />
              </Flex>
            </Flex>
            <Flex alignItems={'center'} gap={{ base: 4, sm: 10 }} my={3}>
              <Skeleton height="20px" w="80px" />
              <Skeleton height="20px" w="100px" />
              <Skeleton height="20px" w="100px" />
            </Flex>
            <Flex alignItems={'flex-start'} direction={'column'}>
              <Skeleton height="20px" w="150px" />
              <Skeleton height="20px" w="200px" />
            </Flex>
          </VStack>
        </>
      ) : (
        <>
          <AvatarGroup
            size={{ base: 'xl', md: '2xl' }}
            justifySelf={'center'}
            alignSelf={'flex-start'}
            mx="auto"
            css={{
              fontSize: '50px'
            }}>
            <Avatar
              src={imgAvatar}
              name={profileData.user.username}
              alt={`${profileData.user.username} logo`}
            />
          </AvatarGroup>

          <VStack alignItems={'start'} gap={2} mx={'auto'} flex={1}>
            <Flex
              gap={4}
              direction={{ base: 'column', sm: 'row' }}
              justifyContent={{ base: 'center', sm: 'flex-start' }}
              alignItems={'center'}
              w={'full'}>
              <Text fontSize={{ base: 'sm', md: 'lg' }}>{profileData.user.name_tag}</Text>
              {isOwnerProfile && (
                <Flex gap={4} alignItems={'center'} justifyContent={'center'}>
                  <Button
                    bg={colorMode === 'dark' ? 'rgb(54,54,54)' : 'rgb(239, 239, 239)'}
                    color={colorMode === 'dark' ? 'white' : 'black'}
                    _hover={{ bg: colorMode === 'dark' ? 'rgb(38, 38, 38)' : 'rgb(219, 219, 219)' }}
                    size={{ base: 'xs', md: 'sm' }}>
                    Edit Profile
                  </Button>
                </Flex>
              )}
            </Flex>
            {/* Get user tu db ra de set vao day */}
            <Flex alignItems={'center'} gap={{ base: 4, sm: 10 }} my={3}>
              <Text fontSize={{ base: 'xs', md: 'sm' }}>
                <Text as="span" mr={1} fontWeight={'bold'}>
                  {profileData.postCount}
                </Text>
                posts
              </Text>
              <Text fontSize={{ base: 'xs', md: 'sm' }}>
                <Text as="span" mr={1} fontWeight={'bold'}>
                  {profileData.followerCount}
                </Text>
                followers
              </Text>
              <Text fontSize={{ base: 'xs', md: 'sm' }}>
                <Text as="span" mr={1} fontWeight={'bold'}>
                  {profileData.followingCount}
                </Text>
                following
              </Text>
            </Flex>
            <Flex alignItems={'flex-start'} direction={'column'}>
              <Text fontSize={'sm'} fontWeight={'bold'}>
                {profileData.user.username}
              </Text>
              {/* Bio for profile */}
              <Text fontSize={'sm'}>{profileData.user.intro}</Text>
            </Flex>
          </VStack>
        </>
      )}
    </Flex>
  );
}

export default ProfileHeader;
