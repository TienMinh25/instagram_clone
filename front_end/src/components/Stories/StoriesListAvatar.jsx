import {
  Box,
  Container,
  Flex,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import Story from './Story';
import { useRef, useState, useEffect } from 'react';
import ShowStoriesComponent from './ShowStoriesComponent';
import React from 'react';
import ImageEditor from './ImageEditor';
import ToolsEditor from './ToolsEditor';

const storyData = [
  { avatar: '/img1.png', name: 'Sarah', url: 'https://i.imgur.com/QpUEcfi.jpg', type: 'image' },
  { avatar: '/img2.png', name: 'John Doe', url: 'https://i.imgur.com/in5Jr1h.jpg', type: 'image' },
  { avatar: '/img3.png', name: 'James Harden', url: 'https://i.imgur.com/Zo5Kpnd.mp4', type: 'video' },
  { avatar: '/img4.png', name: 'Tom John', url: 'https://i.imgur.com/LBRXhIq.jpg', type: 'image' },
  { avatar: '/img2.png', name: 'Jane', url: 'https://i.imgur.com/ARMxyC4.png', type: 'image' },
  { avatar: '/img3.png', name: 'xsmTradingForex', url: 'https://i.imgur.com/Zo5Kpnd.mp4', type: 'video' },
  { avatar: '/img4.png', name: 'BabyTell', url: 'https://i.imgur.com/LBRXhIq.jpg', type: 'image' },
  { avatar: '/img4.png', name: 'Lay', url: 'https://i.imgur.com/ARMxyC4.png', type: 'image' },
];

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
    return () => scrollRef.current.removeEventListener('scroll', checkScrollPosition);
  }, []);

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
    <Container maxW="70%" px={0} position="relative" p={1}>
      {canScrollLeft && (
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
      <Flex
        ref={scrollRef}
        alignItems={'flex-start'}
        gap={8}
        overflowX={'auto'}
        css={{
          '&::-webkit-scrollbar': {
            height: '0px',
            background: 'transparent',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: 'transparent',
          },
          position: 'relative',
        }}
        px={3}
      >
        <Story avatar="" name="Your story" showAddIcon={true} onClick={showForm} />
        {storyData.map((story, index) => (
          <Story
            key={index}
            avatar={story.avatar}
            name={story.name}
            onClick={() => handleStoryClick(story)}
          />
        ))}
      </Flex>
      {canScrollRight && (
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
        <ModalContent>
          <ModalCloseButton />
          <ModalBody display="flex" alignItems="center" justifyContent="center">
            <Box display="flex" height="680px">
              <ImageEditor setCanvas={setCanvas} onImageSelected={handleImageSelected} triggerConfirmModal={isConfirmModalOpen} onConfirmModalClose={handleConfirmModalClose} onCancel={handleCloseEditor} />
              {isImageSelected && <ToolsEditor canvas={canvas} />}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={isStoryModalOpen}size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalBody display="flex" alignItems="center" justifyContent="center" bg="rgba(0,0,0,0.8)">
            {selectedStory && <ShowStoriesComponent story={selectedStory} onClose={handleCloseStoryModal} />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
}

export default StoriesListAvatar;
