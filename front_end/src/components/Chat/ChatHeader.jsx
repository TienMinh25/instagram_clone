import { Avatar, Box, Flex, Text, useColorMode } from '@chakra-ui/react';
import React from 'react';

export default function ChatHeader({ activeUser }) {
  const { colorMode } = useColorMode();

  return (
    <Flex
      padding={4}
      pl={8}
      w="100%"
      alignItems={'center'}
      borderBottom="1px solid #262626"
    >
      <Avatar
        src={activeUser.avatar}
        name={activeUser.username}
        size="md"
        cursor="pointer"
      />
      <Box ml={3}>
        <Text
          cursor="pointer"
          fontWeight="700"
          fontSize={16}
          color={colorMode === 'dark' ? '#fff' : '#000'}
        >
          {activeUser.username}
        </Text>
      </Box>
    </Flex>
  );
}
