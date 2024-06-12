import { Avatar, AvatarGroup, Button, Flex, Skeleton, Text, VStack, useColorMode, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, Textarea, useDisclosure, Center, Box, ModalFooter, } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaCamera } from 'react-icons/fa';

import { makeRequest } from '../../axios';
import fetchAvatar from '../../utils/fetchAvatar';

function ProfileHeader({ userId, isOwnerProfile }) {
  const [imgAvatar, setImgAvatar] = useState();
  const [profileData, setProfileData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { colorMode } = useColorMode();

  // State for the edit modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nameTag, setNameTag] = useState('');
  const [bio, setBio] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      setIsLoading(true);
      try {
        const response = await makeRequest.get(`/users/${userId}`);
        console.log(response);
        setProfileData(response.data);
        fetchAvatar(response.data.user.avatar, setImgAvatar);
        // Set initial values for the modal
        setNameTag(response.data.user.name_tag);
        setBio(response.data.user.intro);
      } catch (error) {
        console.error('Error fetching profile data', error);
      } finally {
        setIsLoading(false);
      }
    };


    fetchProfileData();
  }, []);

  const handleEditProfile = async () => {
    try {
      const formData = new FormData();
      formData.append('name_tag', nameTag);
      formData.append('intro', bio);
      if (avatarFile) {
        formData.append('avatar', avatarFile, avatarFile.name);
      }
      const response = await makeRequest.put(`/users/${userId}`, formData);
      setProfileData(response.data);
      fetchAvatar(response.data.user.avatar, setImgAvatar);
      onClose();
    } catch (error) {
      console.error('Error updating profile', error);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      // Create a preview URL for the selected avatar
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target.result);
        // Call the function to update the avatar immediately
        updateAvatarPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      // Reset to default avatar if no file is selected
      setAvatarPreview(imgAvatar);
    }
  };

  const updateAvatarPreview = (newAvatarUrl) => {
    setImgAvatar(newAvatarUrl); // Update the imgAvatar state
    setAvatarPreview(newAvatarUrl); // Update the avatarPreview state
  };


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
                    size={{ base: 'xs', md: 'sm' }}
                    onClick={onOpen}>
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
          {/* Edit Profile Modal */}
          <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered>
            <ModalOverlay />
            <ModalContent
              bg={colorMode === 'dark' ? '#262626' : 'white'}>
              <ModalCloseButton />
              <ModalBody>
                <Flex alignItems="center" justifyContent="center" mb={4} mt={4}>
                  <Flex
                    position="relative"
                  >
                    <AvatarGroup
                      size={{ base: 'xl', md: '2xl' }}
                      justifySelf={'center'}
                      alignSelf={'flex-start'}
                      mx="auto"
                      css={{
                        fontSize: '50px'
                      }}
                      onClick={() => document.getElementById('avatarInput').click()}
                      cursor={'pointer'}
                      _hover={{ boxShadow: 'md', borderRadius: '50%', backgroundColor: 'green' }}>
                      <Avatar
                        src={imgAvatar}
                        name={profileData.user.username}
                        alt={`${profileData.user.username} logo`}
                      />
                    </AvatarGroup>

                    {/* Hidden Input for Avatar Upload */}
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      display="none"
                      id="avatarInput"
                    />

                    {/* Camera Icon on Hover */}
                    <FaCamera
                      position="absolute"
                      top="50%"
                      left="50%"
                      transform="translate(-50%, -50%)"
                      cursor="pointer"
                      onClick={() => document.getElementById('avatarInput').click()}
                      fontSize="2xl"
                      color="gray.500"
                    />
                  </Flex>
                </Flex>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    value={nameTag}
                    onChange={(e) => setNameTag(e.target.value)}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Bio</FormLabel>
                  <Textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    css={{
                      resize: "none"
                    }}
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button justifyContent="end" mt={6} colorScheme="blue" onClick={handleEditProfile}>
                  Save Changes
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>

      )}
    </Flex>
  );
}

export default ProfileHeader;
