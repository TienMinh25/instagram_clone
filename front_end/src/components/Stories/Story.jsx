import { useState, useEffect } from 'react';
import { VStack, Avatar, Text, Box, useColorMode } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import fetchAvatar from '../../utils/fetchAvatar';

function Story({ avatar, name, showAddIcon, onClick, isCreate }) {
  const { colorMode } = useColorMode();
  const [isClicked, setIsClicked] = useState(false);
  const [imgAvatar, setImgAvatar] = useState();

  useEffect(() => {
    fetchAvatar(avatar, setImgAvatar);
  }, [avatar]);

  const handleClick = () => {
    setIsClicked(!isClicked);
    if (onClick) {
      onClick();
    }
  };

  return (
    <VStack spacing={1} maxW={'55px'} cursor={'pointer'} onClick={handleClick}>
      <Box position="relative" width="fit-content" height="fit-content">
        {!isCreate && (
          <Box
            position="absolute"
            top="0"
            left="0"
            borderRadius="full"
            bgGradient="linear(to-tr, #f99f00, #f953c6, #8a63d2)"
            width="100%"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            style={{
              transition: 'transform 1s',
              transform: isClicked ? 'rotate(-360deg)' : 'rotate(0deg)'
            }}
            zIndex={1}></Box>
        )}

        <Avatar
          src={imgAvatar}
          name={name}
          size={'lg'}
          // showBorder={true}
          margin="2.5px"
          borderColor={colorMode === 'light' ? 'white' : 'black'}
          borderWidth={'2px'}
          // fallbackSrc="https://via.placeholder.com/150"
          position="relative"
          zIndex={2}
        />
        {showAddIcon && (
          <Box
            position="absolute"
            bottom="0"
            right="1"
            bg="blue.500"
            borderRadius="full"
            p={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="md"
            zIndex={3}>
            <AddIcon boxSize={3} color="white" />
          </Box>
        )}
      </Box>
      <Text fontSize={12} fontWeight={'medium'} isTruncated maxW="65px">
        {name}
      </Text>
    </VStack>
  );
}

export default Story;
