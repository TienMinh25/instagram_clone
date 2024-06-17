import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import User from './User';

export default function ChatList({ onUserClick }) { // Nhận hàm onUserClick từ props
  const [activeUserId, setActiveUserId] = useState(null); // State để lưu id của user đang active

  // Hàm xử lý khi click vào user
  const handleUserClick = (user) => {
    setActiveUserId(user.id); // Cập nhật id của user đang active khi click
    onUserClick(user); // Gọi hàm onUserClick với user đã click
  };

  // Mock data users
  const users = [
    { id: 1, avatar: 'avatar1.jpg', username: 'User 1' },
    { id: 2, avatar: 'avatar2.jpg', username: 'User 2' },
    { id: 3, avatar: 'avatar3.jpg', username: 'User 3' },
    { id: 4, avatar: 'avatar1.jpg', username: 'User 4' },
    { id: 5, avatar: 'avatar2.jpg', username: 'User 5' },
    { id: 6, avatar: 'avatar3.jpg', username: 'User 6' },
    { id: 7, avatar: 'avatar1.jpg', username: 'User 7' },
    { id: 8, avatar: 'avatar2.jpg', username: 'User 8' },
    { id: 9, avatar: 'avatar3.jpg', username: 'User 9' },
  ];

  return (
    <Box w="100%" h="100%" > {/* Thêm overflowY="auto" để tạo scroll */}
      <Flex mr={8} ml={8} mb={4} direction={'row'} justifyContent={"space-between"}>
        <Text fontSize={18} fontWeight={700}>Messages</Text>
        <Text cursor="pointer" fontSize={16} color="#a2a2a2" fontWeight={700}>Requests</Text>
      </Flex>
      <VStack spacing={0} align="stretch" overflowY="auto" maxHeight={"549px"}> {/* Align="stretch" để các phần tử con căn chỉnh theo chiều dọc */}
        {users.map(user => (
          <User
            key={user.id}
            user={user}
            isActive={activeUserId === user.id}
            onClick={() => handleUserClick(user)} // Gọi handleUserClick khi user được click
          />
        ))}
      </VStack>
    </Box>
  );
}
