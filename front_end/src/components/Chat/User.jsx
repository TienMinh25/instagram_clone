import { Avatar, Box, Flex, Text, useColorMode } from '@chakra-ui/react';
import React from 'react';

export default function User({ user, isActive, onClick }) {
  const { colorMode } = useColorMode();

  return (
    <Flex
      cursor={'pointer'}
      padding={4}
      pl={8}
      w="100%"
      bg={isActive ? (colorMode === 'dark' ? '#1a1a1a' : '#e6e6e6') : 'transparent'}
      onClick={onClick}
      alignItems={'center'}
      _hover={!isActive && { backgroundColor: colorMode === 'dark' ? '#121212' : '#fafafa' }}
    >
      <Avatar
        src={user.avatar}
        name={user.username}
        size="md"
        cursor="pointer"
      />
      <Box ml={4} flex="1">
        <Text fontWeight="500" fontSize={14} color={colorMode === 'dark' ? '#fff' : '#000'}>
          {user.username}
        </Text>
        <Flex fontSize={12} color="#a2a2a2" alignItems="center">
          <Text isTruncated  maxW="200px">
            {/* {user.latestMessage} */}
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum asperiores aut provident, iste eius, nam fugit sint quas ipsam dolores quasi minus saepe rem veritatis facilis minima alias totam nisi molestias est eos? Quos quod quae aspernatur maxime consectetur possimus vitae veritatis! Deserunt earum molestias temporibus quod id, laudantium voluptatem saepe ex quibusdam itaque nisi amet? Vitae repellat earum id voluptatum voluptates tempora necessitatibus consequatur aut libero fuga minima officia eveniet, vero repellendus eligendi itaque molestias porro veniam ducimus. Praesentium laboriosam cumque totam officia repellendus quae, voluptate ad delectus esse corrupti ab facere iure odio! Non ab recusandae aut reprehenderit.
          </Text>
          <Text ml={2} flexShrink={0}>
            •  2h
            {/* {user.time} */}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
}
