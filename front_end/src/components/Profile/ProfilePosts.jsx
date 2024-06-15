import {
  CircularProgress,
  Flex,
  Grid,
  GridItem,
  Text,
  useColorMode,
  useToast
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BsCameraReels } from 'react-icons/bs';
import { FiCamera } from 'react-icons/fi';
import { TbPhotoSquareRounded } from 'react-icons/tb';
import { makeRequest } from '../../axios';
import ProfilePost from './ProfilePost';

function ProfilePosts({ activeTab, userId, isOwnerProfile }) {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const toast = useToast();
  const { colorMode } = useColorMode();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (activeTab === 'reels' || activeTab === 'tagged') {
        setPosts([]);
      } else {
        // doan nay can sua lai logic, vi co the la click vao page cua nguoi khac chu kp cua minh
        const response = await makeRequest.get(`/posts/users/${userId}`);
        const { data } = response.data;
        setPosts((prevPosts) => [...prevPosts, ...data]);
      }
    } catch (error) {
      toast({
        title: `Cannot load ${activeTab} of user`,
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  return (
    <Grid templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }} gap={1} columnGap={1}>
      {isLoading && (
        <GridItem
          colSpan={3}
          minH={150}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}>
          <CircularProgress color="blue.400" alignItems={'center'} isIndeterminate />
        </GridItem>
      )}

      {!isLoading && activeTab === 'posts' && (
        <>
          {posts.length === 0 ? (
            <>
              {isOwnerProfile ? (
                <GridItem colSpan={3} marginTop={36}>
                  <Flex
                    gap={4}
                    direction={'column'}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}>
                    <FiCamera size={70} />
                    <Flex justifyContent="center" alignItems="center" gap={1} direction={'column'}>
                      <Text
                        fontWeight={700}
                        fontSize={26}
                        color={colorMode === 'dark' ? 'white' : 'black'}>
                        Shared Posts
                      </Text>
                      <Text
                        fontWeight={400}
                        fontSize={16}
                        color={colorMode === 'dark' ? 'white' : 'black'}
                        textAlign="center">
                        When you share photos, they will appear on your profile.
                      </Text>
                    </Flex>
                  </Flex>
                </GridItem>
              ) : (
                <GridItem colSpan={3} marginTop={36}>
                  <Flex
                    gap={4}
                    direction={'column'}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}>
                    <FiCamera size={70} />
                    <Flex justifyContent="center" alignItems="center" gap={1} direction={'column'}>
                      <Text
                        fontWeight={700}
                        fontSize={26}
                        color={colorMode === 'dark' ? 'white' : 'black'}>
                        Shared Posts
                      </Text>
                      <Text
                        fontWeight={400}
                        fontSize={16}
                        color={colorMode === 'dark' ? 'white' : 'black'}
                        textAlign="center">
                        No photos
                      </Text>
                    </Flex>
                  </Flex>
                </GridItem>
              )}
            </>
          ) : (
            <>
              {posts.map((post) => (
                <ProfilePost
                  setPosts={setPosts}
                  currentUser={currentUser}
                  key={post.id}
                  postId={post.id}
                  description={post.description}
                  media={post.media}
                  likeCount={post.likeCount}
                  commentCount={post.commentCount}
                />
              ))}
            </>
          )}
        </>
      )}

      {!isLoading && activeTab === 'reels' && (
        <>
          {isOwnerProfile ? (
            <GridItem colSpan={3} marginTop={36}>
              <Flex
                gap={4}
                direction={'column'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}>
                <BsCameraReels size={70} />
                <Flex justifyContent="center" alignItems="center" gap={1} direction={'column'}>
                  <Text
                    fontWeight={700}
                    fontSize={26}
                    color={colorMode === 'dark' ? 'white' : 'black'}>
                    Reels
                  </Text>
                  <Text
                    fontWeight={400}
                    fontSize={16}
                    color={colorMode === 'dark' ? 'white' : 'black'}
                    textAlign="center">
                    When you have reels, they'll appear here
                  </Text>
                </Flex>
              </Flex>
            </GridItem>
          ) : (
            <GridItem colSpan={3} marginTop={36}>
              <Flex
                gap={4}
                direction={'column'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}>
                <BsCameraReels size={70} />
                <Flex justifyContent="center" alignItems="center" gap={1} direction={'column'}>
                  <Text
                    fontWeight={700}
                    fontSize={26}
                    color={colorMode === 'dark' ? 'white' : 'black'}>
                    Reels
                  </Text>
                  <Text
                    fontWeight={400}
                    fontSize={16}
                    color={colorMode === 'dark' ? 'white' : 'black'}
                    textAlign="center">
                    No reels
                  </Text>
                </Flex>
              </Flex>
            </GridItem>
          )}
        </>
      )}

      {!isLoading && activeTab === 'tagged' && (
        <>
          {isOwnerProfile ? (
            <GridItem colSpan={3} marginTop={36}>
              <Flex
                gap={4}
                direction={'column'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}>
                <TbPhotoSquareRounded size={70} />
                <Flex justifyContent="center" alignItems="center" gap={1} direction={'column'}>
                  <Text
                    fontWeight={700}
                    fontSize={26}
                    color={colorMode === 'dark' ? 'white' : 'black'}>
                    Photos of you
                  </Text>
                  <Text
                    fontWeight={400}
                    fontSize={16}
                    color={colorMode === 'dark' ? 'white' : 'black'}
                    textAlign="center">
                    When people tag you in photos, they'll appear here.
                  </Text>
                </Flex>
              </Flex>
            </GridItem>
          ) : (
            <GridItem colSpan={3} marginTop={36}>
              <Flex
                gap={4}
                direction={'column'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}>
                <TbPhotoSquareRounded size={70} />
                <Flex justifyContent="center" alignItems="center" gap={1} direction={'column'}>
                  <Text
                    fontWeight={700}
                    fontSize={26}
                    color={colorMode === 'dark' ? 'white' : 'black'}>
                    Photos
                  </Text>
                  <Text
                    fontWeight={400}
                    fontSize={16}
                    color={colorMode === 'dark' ? 'white' : 'black'}
                    textAlign="center">
                    No tagged
                  </Text>
                </Flex>
              </Flex>
            </GridItem>
          )}
        </>
      )}
    </Grid>
  );
}

export default ProfilePosts;
