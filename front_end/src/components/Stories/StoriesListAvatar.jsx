import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Container,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  SkeletonCircle,
  useToast,
  useColorMode
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { makeRequest } from '../../axios';
import fetchAvatar from '../../utils/fetchAvatar';
import ImageEditor from './ImageEditor';
import ShowStoriesComponent from './ShowStoriesComponent';
import Story from './Story';
import ToolsEditor from './ToolsEditor';

function StoriesListAvatar() {
  const scrollRef = useRef();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isShowAddStoryForm, setShowAddStoryForm] = useState(false);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [canvas, setCanvas] = useState(null);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isStoryModalOpen, setStoryModalOpen] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [imgAvatar, setImgAvatar] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [stories, setStories] = useState([]);
  const toast = useToast();
  const [hasMore, setHasMore] = useState(true);
  const {colorMode} = useColorMode();

  const fetchStories = async (pageNumber) => {
    try {
      const res = await makeRequest.get(`/story?page=${pageNumber}&limit=20`);
      const { data, meta } = res.data;
      if (!meta.hasNextPage) {
        setHasMore(false);
        setStories((prevPosts) => [...prevPosts, ...data]);
      } else {
        setStories((prevPosts) => [...prevPosts, ...data]);
      }
      setIsLoading(false);
    } catch (error) {
      toast({
        title: 'Cannot load story',
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

  // const handleAddStory = async (event) => {
  //   event.preventDefault();

  //   try {
  //     let postForm = new FormData();

  //     postForm.append('description', description);
  //     postForm.append('type', 'post');
  //     for (let i = 0; i < selectedImageFiles.length; i++) {
  //       postForm.append('multiple-files', selectedImageFiles[i]);
  //     }

  //     await makeRequest.post(`/posts?user_id=${currentUser.id}`, postForm, {
  //       headers: { 'Content-Type': 'multipart/form-data' }
  //     });

  //     resetForm();
  //     onClose();
  //     toast({
  //       title: 'Create post successfully',
  //       status: 'success',
  //       duration: 5000,
  //       isClosable: true,
  //       position: 'bottom'
  //     });
  //   } catch (e) {
  //     toast({
  //       title: 'Failed to create post',
  //       description: e?.response?.data?.message || e.message,
  //       status: 'error',
  //       duration: 5000,
  //       isClosable: true,
  //       position: 'bottom'
  //     });
  //   }
  // };

  useEffect(() => {
    fetchStories(page);
  }, [page]);

  const checkScrollPosition = () => {
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -150, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 150, behavior: 'smooth' });
  };

  useEffect(() => {
    checkScrollPosition();
    scrollRef.current.addEventListener('scroll', checkScrollPosition);
    // return () => scrollRef.current.removeEventListener('scroll', checkScrollPosition);
  }, []);

  useEffect(() => {
    fetchAvatar(currentUser.avatar, setImgAvatar);
  }, [currentUser.avatar]);

  const showForm = () => {
    setShowAddStoryForm(true);
  };

  const handleCloseEditor = () => {
    setShowAddStoryForm(false);
  };

  const closeForm = () => {
    setConfirmModalOpen(true);
  };

  const handleConfirmModalClose = () => {
    setConfirmModalOpen(false);
  };

  const handleStoryClick = (story) => {
    setSelectedStory(story);
    setStoryModalOpen(true);
  };

  const handleImageSelected = () => {
    setIsImageSelected(true);
  };

  const handleCloseStoryModal = () => {
    setStoryModalOpen(false);
    setSelectedStory(null);
  };

  return (
    <Container minW="70%" px={0} position="relative" p={1}>
      {isLoading &&
        [0, 1, 2, 3, 4, 5, 6, 7, 8].map((_, idx) => (
          <Flex gap={2} key={idx}>
            <SkeletonCircle size="15" />
          </Flex>
        ))}

      {!isLoading && canScrollLeft && (
        <IconButton
          icon={<ChevronLeftIcon />}
          position="absolute"
          left={0}
          top="50%"
          transform="translateY(-50%)"
          zIndex={3}
          onClick={scrollLeft}
          aria-label="Scroll Left"
          fontSize="14"
          borderRadius="full"
          background="#aaa"
        />
      )}
      {!isLoading && (
        <Flex
          ref={scrollRef}
          alignItems={'flex-start'}
          gap={8}
          overflowX={'auto'}
          css={{
            '&::-webkit-scrollbar': {
              height: '0px',
              background: 'transparent'
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent'
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'transparent'
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: 'transparent'
            },
            position: 'relative'
          }}
          px={3}>
          <Story
            avatar={imgAvatar}
            name={currentUser.username}
            showAddIcon={true}
            onClick={showForm}
          />
          {stories
            .filter((story) => {
              return story.User.id !== currentUser.id;
            })
            .map((story, index) => (
              <Story
                key={index}
                avatar={story.User.avatar}
                name={story.User.name_tag}
                onClick={() => handleStoryClick(story)}
              />
            ))}
        </Flex>
      )}

      {!isLoading && canScrollRight && (
        <IconButton
          icon={<ChevronRightIcon />}
          position="absolute"
          right={0}
          top="50%"
          transform="translateY(-50%)"
          zIndex={3}
          onClick={scrollRight}
          aria-label="Scroll Right"
          fontSize="14"
          borderRadius="full"
          background="#aaa"
        />
      )}
      <Modal isOpen={isShowAddStoryForm} onClose={closeForm} size="full">
        <ModalOverlay />
        <ModalContent
          bg={colorMode === 'dark' ? 'black' : 'white'}>
          <ModalCloseButton />
          <ModalBody display="flex" alignItems="center" justifyContent="center">
            <Box display="flex" height="680px">
              <ImageEditor
                setCanvas={setCanvas}
                onImageSelected={handleImageSelected}
                triggerConfirmModal={isConfirmModalOpen}
                onConfirmModalClose={handleConfirmModalClose}
                onCancel={handleCloseEditor}
              />
              {isImageSelected && <ToolsEditor canvas={canvas} />}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={isStoryModalOpen} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalBody
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="rgba(0,0,0,0.8)">
            {selectedStory && (
              <ShowStoriesComponent story={selectedStory} onClose={handleCloseStoryModal} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
}

export default StoriesListAvatar;
