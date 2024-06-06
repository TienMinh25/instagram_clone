import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from '@chakra-ui/icons';
import { Box, Container, IconButton, Input } from '@chakra-ui/react';
import { LuSend, LuHeart } from "react-icons/lu";
import Stories from 'react-insta-stories';
import React from 'react';

const ShowStoriesComponent = ({ storyData, initialIndex, onClose }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = React.useState(initialIndex || 0);

  const onNextStory = () => {
    setCurrentStoryIndex(prevIndex => (prevIndex + 1) % storyData.length);
  };

  const onPreviousStory = () => {
    setCurrentStoryIndex(prevIndex => (prevIndex - 1 + storyData.length) % storyData.length);
  };

  const onAllStoriesEndHandler = () => {
  };

  const currentStory = storyData[currentStoryIndex];

  const storyContent = {
    width: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
    margin: 'auto',
  };

  return (
    <Box width="100%" height="100vh" position="relative" bg="rgba(0, 0, 0, 0.8)" display="flex">
      <IconButton
        icon={<CloseIcon />}
        onClick={onClose}
        position="absolute"
        top={2}
        right={2}
        zIndex={10}
        color="white"
        bg="transparent"
        _hover={{ bg: "transparent" }}
        _active={{ bg: "transparent" }}
        _focus={{ boxShadow: "none" }}
      />

      <Box margin="auto" position="relative">
        <IconButton
          icon={<ChevronLeftIcon />}
          fontSize={32}
          onClick={onPreviousStory}
          position="absolute"
          top="50%"
          left="-100px"
          transform="translateY(-50%)"
          zIndex={10}
          color="black"
          bg="#ccc"
          borderRadius="full"
        />
        <Stories
          stories={[currentStory]}
          storyStyles={storyContent}
          defaultInterval={3000}
          style={{
            display: 'flex',
            justifyContent: 'center',
            background: 'red',
            cursor: 'pointer',
          }}
          loop={false}
          keyboardNavigation={true}
          currentIndex={() => {}}
          isPaused={() => {}}
          onStoryStart={() => {}}
          onStoryEnd={() => {}}
          onAllStoriesEnd={onAllStoriesEndHandler}
        />
        <IconButton
          icon={<ChevronRightIcon />}
          onClick={onNextStory}
          fontSize={32}
          borderRadius="full"
          position="absolute"
          top="50%"
          right="-100px"
          transform="translateY(-50%)"
          zIndex={10}
          color="black"
          bg="#ccc"
        />
        <Container display="flex" mt="-60px">
          <Input placeholder="Reply to..." borderRadius="full" border="#ccc 2px solid" />
          <IconButton
            icon={<LuHeart fontSize="24px" />}
            bg="transparent"
            _hover={{ bg: "transparent", color: "gray" }}
            _active={{ bg: "transparent" }}
            _focus={{ boxShadow: "none" }}
            zIndex={10}
          />
          <IconButton
            icon={<LuSend fontSize="24px" />}
            bg="transparent"
            _hover={{ bg: "transparent" }}
            _active={{ bg: "transparent" }}
            _focus={{ boxShadow: "none" }}
            zIndex={10}
          />
        </Container>
      </Box>
    </Box>
  );
};

export default ShowStoriesComponent;
