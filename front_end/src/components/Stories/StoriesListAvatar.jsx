import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Container,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  SkeletonCircle,
  useColorMode,
  useToast
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { makeRequest } from '../../axios';
import ImageEditor from './ImageEditor';
import ShowStoriesComponent from './ShowStoriesComponent';
import Story from './Story';
import ToolsEditor from './ToolsEditor';

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function dataURLtoFile(dataURL, filename) {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

function StoriesListAvatar() {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const toast = useToast();
  const scrollRef = useRef();
  const { colorMode } = useColorMode();

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isShowAddStoryForm, setShowAddStoryForm] = useState(false);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [canvas, setCanvas] = useState(null);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isStoryModalOpen, setStoryModalOpen] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);

  const [page, setPage] = useState(2);
  const [stories, setStories] = useState(new Map());
  const [hasMore, setHasMore] = useState(true);
  const [fetchingMore, setFetchingMore] = useState(false);

  const fetchMoreStories = async () => {
    if (fetchingMore) return;

    setFetchingMore(true);

    try {
      const res = await makeRequest.get(`/story?page=${page}&limit=8`);
      const { data, meta } = res.data;

      data.forEach((story) => {
        if (stories.has(story.userId)) {
          setStories(
            (prevStories) =>
              new Map([...prevStories, [story.userId, [...stories.get(story.userId), story]]])
          );
        } else {
          setStories((prevStories) => new Map([...prevStories, [story.userId, [story]]]));
        }
      });
      setHasMore(meta.hasNextPage);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      toast({
        title: 'Cannot load story',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      });
      setHasMore(false);
    } finally {
      setFetchingMore(false);
    }
  };

  const handleAddStory = async () => {
    if (canvas) {
      const image = canvas.toDataURL('image/png');
      const file = dataURLtoFile(image, generateRandomString(6));

      const formData = new FormData();
      formData.append('story', file);
      formData.append('type', 'story');
      try {
        await makeRequest.post(`/story?userId=${currentUser.id}`, formData);
        toast({
          title: 'Create new story',
          description: 'Add story sucessfully',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'bottom'
        });
        setShowAddStoryForm(false);
      } catch (error) {
        toast({
          title: 'Cannot add new story',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom'
        });
      }
    }
  };

  useEffect(() => {
    const getData = async () => {
      setInitialLoading(true);
      try {
        const res = await makeRequest.get(`/story?page=${1}&limit=8`);

        const { data, meta } = res.data;

        const newStories = new Map();
        data.forEach((story) => {
          if (newStories.has(story.userId)) {
            newStories.get(story.userId).push(story);
          } else {
            newStories.set(story.userId, [story]);
          }
        });

        setStories(newStories);
        setHasMore(meta.hasNextPage);
      } catch (error) {
        setHasMore(false);
      } finally {
        setInitialLoading(false);
      }
    };

    getData();
  }, []);

  const handleScroll = (e) => {
    const { scrollLeft, scrollWidth, clientWidth } = e.target;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth);

    if (scrollLeft + clientWidth >= scrollWidth - 20 && hasMore) {
      fetchMoreStories();
    }
  };

  const scrollLeftClick = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRightClick = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

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
    <Container minW="100%" px={0} position="relative" p={1} margin={0}>
      {initialLoading &&
        [0, 1, 2, 3, 4, 5, 6, 7, 8].map((_, idx) => (
          <Flex gap={2} key={idx}>
            <SkeletonCircle size="15" />
          </Flex>
        ))}

      {!initialLoading && canScrollLeft && (
        <IconButton
          icon={<ChevronLeftIcon />}
          position="absolute"
          left={0}
          top="50%"
          transform="translateY(-50%)"
          zIndex={3}
          onClick={scrollLeftClick}
          aria-label="Scroll Left"
          fontSize="14"
          borderRadius="full"
          background="#aaa"
        />
      )}
      {!initialLoading && (
        <Flex
          ref={scrollRef}
          onScroll={handleScroll}
          alignItems={'flex-start'}
          gap={8}
          overflow={'auto'}
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
            avatar={currentUser.avatar}
            isCreate={true}
            name={currentUser.name_tag}
            showAddIcon={true}
            onClick={showForm}
          />
          {Array.from(stories.values()).map((userStories, index) => {
            let newStory;
            let media = [];

            userStories.forEach((storyOfUser) => {
              media.push({
                createdAt: storyOfUser.createdAt,
                path: storyOfUser.media
              });
            });

            newStory = {
              userId: userStories[0]?.userId,
              media: media,
              description: userStories[0]?.description,
              type: userStories[0]?.type,
              User: {
                id: userStories[0]?.User?.id,
                username: userStories[0]?.User?.username,
                name_tag: userStories[0]?.User?.name_tag,
                mobile: userStories[0]?.User?.mobile,
                email: userStories[0]?.User?.email,
                lastLogin: userStories[0]?.User?.lastLogin,
                intro: userStories[0]?.User?.intro,
                avatar: userStories[0]?.User?.avatar,
                createdAt: userStories[0]?.User?.createdAt,
                updatedAt: userStories[0]?.User?.updatedAt
              }
            };

            return (
              <Story
                key={index}
                isCreate={false}
                avatar={newStory.User.avatar}
                name={newStory.User.username}
                onClick={() => handleStoryClick(newStory)}
              />
            );
          })}
        </Flex>
      )}

      {!initialLoading && canScrollRight && (
        <IconButton
          icon={<ChevronRightIcon fontSize={20} />}
          position="absolute"
          right={0}
          top="50%"
          transform="translateY(-50%)"
          zIndex={3}
          onClick={scrollRightClick}
          aria-label="Scroll Right"
          fontSize="10px"
          borderRadius="full"
          background="#aaa"
        />
      )}
      <Modal isOpen={isShowAddStoryForm} onClose={closeForm} size="full">
        <ModalOverlay />
        <ModalContent bg={colorMode === 'dark' ? 'black' : 'white'}>
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
              {isImageSelected && (
                <Button
                  mr={3}
                  onClick={handleAddStory}
                  aria-label="Save Image"
                  position="absolute"
                  top={2}
                  right={10}
                  zIndex={10}
                  colorScheme="teal">
                  Post
                </Button>
              )}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={isStoryModalOpen} onClose={handleCloseStoryModal} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalBody
            padding={0}
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
