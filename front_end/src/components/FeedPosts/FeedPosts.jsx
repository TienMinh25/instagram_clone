import {
  Box,
  Container,
  Flex,
  Skeleton,
  SkeletonCircle,
  Spinner,
  VStack,
  useToast
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { makeRequest } from '../../axios';
import FeedPost from './FeedPost';

const FeedPosts = () => {
  const [initialLoading, setInitialLoading] = useState(false);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const toast = useToast();
  const [page, setPage] = useState(2);
  const [posts, setPosts] = useState([]);

  const fetchMorePosts = useCallback(async () => {
    if (fetchingMore) return;

    setFetchingMore(true);

    try {
      const res = await makeRequest.get(`/posts?page=${page}&limit=4`);
      const { data, meta } = res.data;
      setHasMore(meta.hasNextPage);
      setPosts((prevPosts) => [...prevPosts, ...data]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      toast({
        title: 'Cannot load posts',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      });
      setHasMore(false);
      // Hiển thị thông báo lỗi nếu có
    } finally {
      setFetchingMore(false);
    }
  }, [page, fetchingMore, toast]);

  useEffect(() => {
    const getData = async () => {
      setInitialLoading(true);
      try {
        const response = await makeRequest.get(`/posts?page=1&limit=4`);
        setPosts(response.data.data);
        setHasMore(response.data.meta.hasNextPage);
        setPage(2);
      } catch (e) {
        console.log(e);
        setHasMore(false);
      } finally {
        setInitialLoading(false);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 100 && hasMore) {
        fetchMorePosts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fetchMorePosts, hasMore]);

  return (
    <Container maxW={'container.sm'} py={10} px={2}>
      {initialLoading &&
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

      {!initialLoading && (
        <>
          {posts.map((post) => {
            return (
              <FeedPost
                setPosts={setPosts}
                key={post.id}
                targetId={post.User.id}
                postId={post.id}
                timerAgo={post.createdAt}
                media={post.media}
                description={post.description}
                username={post.User.name_tag}
                avatar={post.User.avatar}
              />
            );
          })}
        </>
      )}

      {fetchingMore && (
        <Flex justifyContent="center" my={4}>
          <Spinner size="lg" />
        </Flex>
      )}
    </Container>
  );
};

export default FeedPosts;
