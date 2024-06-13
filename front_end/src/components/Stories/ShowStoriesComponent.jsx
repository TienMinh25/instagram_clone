import { CloseIcon } from '@chakra-ui/icons';
import { Box, Container, IconButton, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { LuHeart, LuSend } from 'react-icons/lu';
import Stories from 'react-insta-stories';
import fetchAvatar from '../../utils/fetchAvatar';
import formatTimeAgo from '../../utils/formatTimeAgo';

const ShowStoriesComponent = ({ story, onClose }) => {
  let imgStories = [];
  let stories = [];
  const [imgAvatar, setImgAvatar] = useState();
  const headerStory = {
    heading: story.User.name_tag,
    profileImage: imgAvatar
  };

  useEffect(() => {
    fetchAvatar(story.User.avatar, setImgAvatar);
  }, [story.User.avatar]);

  story.media.forEach((eachMedia) => {
    eachMedia.path.split('$||$').forEach((mediaPath) => {
      const pathAccess = mediaPath.split('/');
      let newPathFile = '';

      for (let i = 3; i < pathAccess.length; i++) {
        if (i == pathAccess.length - 1) {
          newPathFile += pathAccess[i];
        } else {
          newPathFile += pathAccess[i] + '/';
        }
      }

      imgStories.push({ path: newPathFile, createdAt: eachMedia.createdAt });
    });
  });

  imgStories.map((imgStory) => {
    const urlStory = `http://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/${imgStory.path}`;
    const timerShowUp = formatTimeAgo(imgStory.createdAt);
    stories.push({
      url: urlStory,
      type: 'image',
      header: { ...headerStory, subheading: timerShowUp },
      duration: 6000
    });
  });

  const onAllStoriesEndHandler = () => {
    onClose();
  };

  const storyContent = {
    width: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
    margin: 'auto'
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
        _hover={{ bg: 'transparent' }} // Optional: To ensure the background remains transparent on hover
        _active={{ bg: 'transparent' }} // Optional: To ensure the background remains transparent on active
        _focus={{ boxShadow: 'none' }} // Optional: To remove the focus outline
      />
      <Box margin="auto">
        <Stories
          stories={stories}
          storyStyles={storyContent}
          defaultInterval={3000}
          style={{
            display: 'flex',
            justifyContent: 'center',
            background: 'red',
            cursor: 'pointer'
          }}
          loop={false}
          keyboardNavigation={true}
          currentIndex={() => {}}
          isPaused={() => {}}
          onStoryStart={() => {}}
          onStoryEnd={() => {}}
          onAllStoriesEnd={onAllStoriesEndHandler} //close the story
        />
        <Container display="flex" mt="-60px">
          <Input placeholder="Reply to.." borderRadius="full" border="#ccc 2px solid" />
          <IconButton
            icon={<LuHeart fontSize="24px" color='white' />}
            bg="transparent"
            _hover={{ bg: 'transparent', color: 'gray' }}
            _active={{ bg: 'transparent' }} 
            _focus={{ boxShadow: 'none' }} 
          />
          <IconButton
            icon={<LuSend fontSize="24px" color='white'/>}
            bg="transparent"
            _hover={{ bg: 'transparent' }} 
            _active={{ bg: 'transparent' }} 
            _focus={{ boxShadow: 'none' }} 
          />
        </Container>
      </Box>
    </Box>
  );
};

export default ShowStoriesComponent;
