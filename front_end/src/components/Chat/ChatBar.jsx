import React from 'react';
import { Flex } from '@chakra-ui/react';
import ChatBarHeader from './ChatBarHeader';
import ChatList from './ChatList';

export default function ChatBar({ onUserClick }) { // Nhận hàm onUserClick từ props
  return (
    <Flex direction={'column'} maxWidth={"600px"}>
      <Flex m={10}>
        <ChatBarHeader/>
      </Flex>
      <Flex>
        <ChatList onUserClick={onUserClick} /> {/* Truyền hàm onUserClick vào ChatList */}
      </Flex>
    </Flex>
  )
}
