import { CloseIcon } from '@chakra-ui/icons';
import { Box, Button, Container, IconButton, Input } from '@chakra-ui/react';
import { color } from 'framer-motion';
import { LuSend, LuHeart } from "react-icons/lu";
import Stories from 'react-insta-stories';

const ShowStoriesComponent = ({ story, onClose }) => {
  // const [stories, setStories] = React.useState(story);
  const stories = [story, story];

  const onAllStoriesEndHandler = () => {
    onClose();
  }

  const storyContent = {
    width: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
    margin: 'auto',
  }

  return (
    <Box width="100%" height="96vh" position="relative" bg="rgba(0, 0, 0, 0.8)" display="flex">
      <IconButton
        icon={<CloseIcon />}
        onClick={onClose}
        position="absolute" top={2} right={2} zIndex={10} color="white"
        bg="transparent"
        _hover={{ bg: "transparent" }}  // Optional: To ensure the background remains transparent on hover
        _active={{ bg: "transparent" }} // Optional: To ensure the background remains transparent on active
        _focus={{ boxShadow: "none" }}  // Optional: To remove the focus outline
      />
      <Box margin="auto">
        <Stories
          stories={stories}
          storyStyles={storyContent}
          defaultInterval={3000}
          style={{
            display: 'flex', justifyContent: "center", background: "red",
            cursor: 'pointer'
          }}
          loop={false}
          keyboardNavigation={true}
          currentIndex={() => { }}
          isPaused={() => { }}
          onStoryStart={() => { }}
          onStoryEnd={() => { }}
          onAllStoriesEnd={onAllStoriesEndHandler} //close the story
        />
        <Container display="flex" mt="-60px">
          <Input placeholder='Reply to..' borderRadius="full" border="#ccc 2px solid"/>
          <IconButton
            icon={<LuHeart fontSize="24px"/>}
            bg="transparent"
            _hover={{ bg: "transparent", color:"gray" }}  // Optional: To ensure the background remains transparent on hover
            _active={{ bg: "transparent" }} // Optional: To ensure the background remains transparent on active
            _focus={{ boxShadow: "none" }}  // Optional: To remove the focus outline
          />
          <IconButton
            icon={<LuSend fontSize="24px"/>}
            bg="transparent"
            _hover={{ bg: "transparent" }}  // Optional: To ensure the background remains transparent on hover
            _active={{ bg: "transparent" }} // Optional: To ensure the background remains transparent on active
            _focus={{ boxShadow: "none" }}  // Optional: To remove the focus outline
          />
        </Container>
      </Box>
    </Box>
  );
}

export default ShowStoriesComponent;
