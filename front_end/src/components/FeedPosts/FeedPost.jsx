import { Flex, Text, Box, useColorMode, IconButton, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import fetchAvatar from '../../utils/fetchAvatar';
import handlePathFile from '../../utils/handlePathFile';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';

import PostHeader from './PostHeader';
import PostFooter from './PostFooter';

const FeedPost = ({ media, username, avatar, description, isOwner, timerAgo, postId }) => {
  const [imgAvatar, setImgAvatar] = useState();
  const [imgMediaList, setImgMediaList] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { colorMode } = useColorMode();

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imgMediaList.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + imgMediaList.length) % imgMediaList.length
    );
  };

  useEffect(() => {
    fetchAvatar(avatar, setImgAvatar);
    if (media && media.length > 0) {
      handlePathFile(media, setImgMediaList);
    }
  }, [avatar, media]);

  return (
    <>
      <PostHeader username={username} avatar={imgAvatar} isOwner={isOwner} timerAgo={timerAgo} />
      <Flex my={2} borderRadius={4} overflow={'hidden'} flexDirection={'column'}>
        <Text flex={0.5}>{description}</Text>
        <Flex
          direction="column"
          alignItems="center"
          justifyContent={'center'}
          position="relative"
          p={0}
          w={'100%'}
          aspectRatio={'1/1'}
          borderBottomLeftRadius={'6px'}>
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
                    color={colorMode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'}
                    size={'md'}
                  />
                }
                position="absolute"
                left={2}
                top="50%"
                transform="translateY(-50%)"
                onClick={handlePrevImage}
                aria-label="Previous image"
                size="sm"
                bg="transparent"
                _hover={{
                  bg: colorMode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'
                }}
                borderRadius="full"
                color={colorMode === 'dark' ? 'white' : 'black'}
              />
              <IconButton
                icon={
                  <MdOutlineKeyboardArrowRight
                    color={colorMode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'}
                    size={'md'}
                  />
                }
                position="absolute"
                right={2}
                top="50%"
                transform="translateY(-50%)"
                onClick={handleNextImage}
                aria-label="Next image"
                size="sm"
                bg="transparent"
                _hover={{
                  bg: colorMode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'
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
        </Flex>
      </Flex>
      <PostFooter username={username} postId={postId} />
    </>
  );
};

export default FeedPost;
