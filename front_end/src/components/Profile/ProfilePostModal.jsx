import {
  Avatar,
  Box,
  Divider,
  Flex,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Spinner,
  Text,
  VStack,
  useColorMode,
  useToast
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { MdDelete, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { makeRequest } from '../../axios.js';
import fetchAvatar from '../../utils/fetchAvatar.js';
import Comments from '../Comment/Comments.jsx';
import PostFooter from '../FeedPosts/PostFooter.jsx';

function ProfilePostModal({ isOpen, onClose, imgMediaList, postId }) {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const { colorMode } = useColorMode();
  const [imgAvatar, setImgAvatar] = useState();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [metaComments, setMetaComments] = useState();
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchInfoAboutPosts = async () => {
      setIsLoading(true);
      try {
        const [detailPost, detailComment] = await Promise.all([
          makeRequest.get(`/posts/${postId}`),
          makeRequest.get(`/comments?postId=${postId}&page=1&take=${6}`)
        ]);
        const detailInfoPost = detailPost.data.data;
        const detailInfoComment = detailComment.data.data;
        const detailMetaComment = detailComment.data.meta;
        setPosts(detailInfoPost);
        setComments(detailInfoComment);
        setMetaComments(detailMetaComment);
        fetchAvatar(detailInfoPost.User.avatar, setImgAvatar);
      } catch (e) {
        toast({
          title: 'Failed to load post',
          description: e?.response?.data?.message || e.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchInfoAboutPosts();
  }, [postId, toast]);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imgMediaList.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + imgMediaList.length) % imgMediaList.length
    );
  };

  const fetchMoreComments = useCallback(async () => {
    if (loadingMore || !metaComments || page >= metaComments.pageCount) return;
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const response = await makeRequest.get(
        `/comments?postId=${postId}&page=${nextPage}&take=${6}`
      );
      const moreComments = response.data.data;
      setComments((prevComments) => [...prevComments, ...moreComments]);
      setMetaComments(response.data.meta);
      setPage(nextPage);
    } catch (e) {
      toast({
        title: 'Failed to load more comments',
        description: e?.response?.data?.message || e.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      });
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, metaComments, page, postId, toast]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={{ base: '3xl', md: '6xl' }}>
      <ModalOverlay />
      <ModalContent >
        <ModalCloseButton />
        <ModalBody bg={colorMode === 'dark' ? 'black' : 'white'} pb={5} borderRadius={6}>
          <Flex gap="4" w={{ base: '90%', sm: '70%', md: 'full' }} mx="auto">
            <Flex
              borderRadius={4}
              overflow={'hidden'}
              // border={'1px solid'}
              // borderColor={'whiteAlpha.300'}
              flex={1.5}
              justifyContent={'center'}
              aspectRatio={'1/1'}
              alignItems={'center'}>
              {isLoading ? (
                <Skeleton height="100%" width="100%" />
              ) : (
                <>
                  {imgMediaList.length !== 0 && (
                    <Image
                      src={`http://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/${imgMediaList[currentImageIndex]}`}
                      objectFit="cover"
                      position={'center'}
                    />
                  )}
                  {imgMediaList.length > 1 && (
                    <>
                      <IconButton
                        icon={
                          <MdOutlineKeyboardArrowLeft
                            color={
                              colorMode === 'dark'
                                ? 'rgba(255, 255, 255, 0.3)'
                                : 'rgba(0, 0, 0, 0.3)'
                            }
                            size={'md'}
                          />
                        }
                        position="absolute"
                        left={'0%'}
                        top="50%"
                        transform="translateY(-50%)"
                        onClick={handlePrevImage}
                        aria-label="Previous image"
                        size="sm"
                        bg="transparent"
                        _hover={{
                          bg:
                            colorMode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'
                        }}
                        borderRadius="full"
                        color={colorMode === 'dark' ? 'white' : 'black'}
                      />
                      <IconButton
                        icon={
                          <MdOutlineKeyboardArrowRight
                            color={
                              colorMode === 'dark'
                                ? 'rgba(255, 255, 255, 0.3)'
                                : 'rgba(0, 0, 0, 0.3)'
                            }
                            size={'md'}
                          />
                        }
                        position="absolute"
                        right="43%"
                        top="50%"
                        transform="translateY(-50%)"
                        onClick={handleNextImage}
                        aria-label="Next image"
                        size="sm"
                        bg="transparent"
                        _hover={{
                          bg:
                            colorMode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'
                        }}
                        borderRadius="full"
                        color={colorMode === 'dark' ? 'white' : 'black'}
                      />
                    </>
                  )}
                  {imgMediaList.length > 1 && (
                    <Flex position="absolute" bottom={2} justifyContent="center" w="full">
                      {imgMediaList.map((_, index) => (
                        <Box
                          key={index}
                          w={2}
                          h={2}
                          borderRadius="full"
                          bg={index === currentImageIndex ? 'blue.500' : 'gray.300'}
                          mx={1}
                        />
                      ))}
                    </Flex>
                  )}
                </>
              )}
            </Flex>

            <Flex flex={1} flexDirection={'column'} px={10} display={{ base: 'none', md: 'flex' }}>
              {isLoading ? (
                <>
                  <Flex justifyContent={'space-between'} alignItems={'center'}>
                    <Flex alignItems={'center'} gap={4}>
                      <SkeletonCircle size="10" />
                      <Skeleton height="20px" width="100px" />
                    </Flex>

                    <Box
                      _hover={{
                        bg: colorMode === 'dark' ? 'whiteAlpha.300' : 'rgba(0, 0, 0, .05)',
                        color: 'red.600'
                      }}
                      borderRadius={4}
                      p={1}>
                      <Skeleton height="20px" width="20px" />
                    </Box>
                  </Flex>
                  <Divider my={4} bg={'gray.500'} />
                  <VStack
                    w="full"
                    alignItems={'start'}
                    maxH="400px"
                    overflowY={'auto'}
                    overflowX={'visible'}
                    css={{
                      '&::-webkit-scrollbar': {
                        width: '0px',
                        background: 'transparent'
                      }
                    }}>
                    <SkeletonText noOfLines={4} spacing="4" />
                  </VStack>
                  <Divider my={4} bg={'gray.800'} />
                  <Skeleton height="40px" width="100%" />
                </>
              ) : (
                <>
                  <Flex justifyContent={'space-between'} alignItems={'center'}>
                    <Flex alignItems={'center'} gap={4}>
                      <Avatar src={imgAvatar} size={'sm'} name={posts.User.username} />
                      <Text fontWeight={'bold'} fontSize={12}>
                        {posts.User.name_tag}
                      </Text>
                    </Flex>

                    {currentUser.id === posts.User.id ? (
                      <Box
                        _hover={{
                          bg: colorMode === 'dark' ? 'whiteAlpha.300' : 'rgba(0, 0, 0, .05)',
                          color: 'red.600'
                        }}
                        borderRadius={4}
                        p={1}>
                        <MdDelete size={20} cursor="pointer" />
                      </Box>
                    ) : null}
                  </Flex>
                  <Divider my={4} bg={'gray.500'} />

                  <VStack
                  position={'relative'}
                    w="full"
                    alignItems={'start'}
                    maxH="400px"
                    minH="400px"
                    overflowY={'auto'}
                    css={{
                      '&::-webkit-scrollbar': {
                        width: '0px',
                        background: 'transparent'
                      }
                    }}>
                    <Comments comments={comments}/>
                    {metaComments?.hasNextPage && (
                      <>
                        {loadingMore ? (
                          <Spinner size={'30px'} />
                        ) : (
                          <Flex
                            justifyContent={'center'}
                            alignItems={'center'}
                            w={'100%'}
                            onClick={fetchMoreComments}
                            cursor={'pointer'}>
                            <AiOutlinePlusCircle size={'30px'} />
                          </Flex>
                        )}
                      </>
                    )}
                  </VStack>

                  <Divider my={4} bg={'gray.800'} />

                  <PostFooter
                    isProfilePage={true}
                    postId={postId}
                    isOpen={isOpen}
                    onClose={onClose}
                    imgMediaList={imgMediaList}
                  />
                </>
              )}
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ProfilePostModal;
