import {
  Container,
  VStack,
  Flex,
  SkeletonCircle,
  Skeleton,
  Box,
  useToast,
  Text,
  useColorMode
} from '@chakra-ui/react';
import { useEffect, useState, useRef, useCallback } from 'react';
import FeedPost from './FeedPost';
import { makeRequest } from '../../axios';

const FeedPosts = () => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const { colorMode } = useColorMode();
  const toast = useToast();
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async (pageNumber) => {
    try {
      const res = await makeRequest.get(`/posts?page=${pageNumber}&limit=4`);
      const { data, meta } = res.data;
      if (!meta.hasNextPage) {
        setHasMore(false);
        setPosts((prevPosts) => [...prevPosts, ...data]);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...data]);
      }
      setIsLoading(false);
    } catch (error) {
      toast({
        title: 'Cannot load posts',
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
    fetchPosts(page);
  }, [page]);

  const lastPostElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  return (
    <Container maxW={'container.sm'} py={10} px={2}>
      {isLoading &&
        [0, 1, 2, 3].map((_, idx) => (
          <VStack key={idx} gap={4} alignItems={'flex-start'} mb={10}>
            <Flex gap={2}>
              <SkeletonCircle size="10" />
              <VStack gap={2} alignItems={'flex-start'}>
                <Skeleton height={'10px'} w="200px" />
                <Skeleton height={'10px'} w="200px" />
              </VStack>
            </Flex>
            <Skeleton w="full">
              <Box h="500px">contents wrapped</Box>
            </Skeleton>
          </VStack>
        ))}

      {!isLoading && (
        <>
          {posts.map((post) => {
            return (
              <FeedPost
                key={post.id}
                postId={post.id}
                timerAgo={post.createdAt}
                isOwner={post.userId === currentUser.id}
                media={post.media}
                description={post.description}
                username={post.User.name_tag}
                avatar={post.User.avatar}
                // ref={posts.length === index + 1 ? lastPostElementRef : null}
              />
            );
          })}
        </>
      )}

      {!hasMore && !isLoading && (
        <Box mt={4} textAlign="center">
          <Text color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}>No more posts to show</Text>
        </Box>
      )}
    </Container>
  );
};

export default FeedPosts;
