import { Box, Flex, Text, useColorMode } from '@chakra-ui/react';
import { BsGrid3X3 } from 'react-icons/bs';
import { PiUserRectangleLight } from 'react-icons/pi';
import { RxVideo } from 'react-icons/rx';
import { useState } from 'react';

function ProfileTabs({ onTabChange }) {
  let { colorMode } = useColorMode();
  const [activeTab, setActiveTab] = useState('posts');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  // Khi thay tabs thi nen dung useEffect de lay tung tab lien quan va hien thi, o day chua xu li logic do
  return (
    <Flex
      w="full"
      justifyContent={'center'}
      gap={{ base: 4, sm: 10 }}
      textTransform={'uppercase'}
      fontWeight={'bold'}>
      <Flex
        minW={103}
        borderTop={
          activeTab === 'posts'
            ? colorMode === 'dark'
              ? '1px solid white'
              : '1px solid black'
            : 'none'
        }
        alignItems={'center'}
        p={3}
        gap={1}
        cursor={'pointer'}
        onClick={() => handleTabClick('posts')}>
        <Box fontSize={'16'} mr={2}>
          <BsGrid3X3 size={14} />
        </Box>
        <Text fontSize={12} display={{ base: 'none', sm: 'block' }}>
          Posts
        </Text>
      </Flex>

      <Flex
        minW={103}
        borderTop={
          activeTab === 'reels'
            ? colorMode === 'dark'
              ? '1px solid white'
              : '1px solid black'
            : 'none'
        }
        alignItems={'center'}
        p={3}
        gap={1}
        cursor={'pointer'}
        onClick={() => handleTabClick('reels')}>
        <Box fontSize={'16'} mr={2}>
          <RxVideo size={16} />
        </Box>
        <Text fontSize={12} display={{ base: 'none', sm: 'block' }}>
          reels
        </Text>
      </Flex>

      <Flex
        minW={103}
        borderTop={
          activeTab === 'tagged'
            ? colorMode === 'dark'
              ? '1px solid white'
              : '1px solid black'
            : 'none'
        }
        alignItems={'center'}
        p={3}
        gap={1}
        cursor={'pointer'}
        onClick={() => handleTabClick('tagged')}>
        <Box fontSize={'16'} mr={2}>
          <PiUserRectangleLight size={16} />
        </Box>
        <Text fontSize={12} display={{ base: 'none', sm: 'block' }}>
          Tagged
        </Text>
      </Flex>
    </Flex>
  );
}

export default ProfileTabs;
