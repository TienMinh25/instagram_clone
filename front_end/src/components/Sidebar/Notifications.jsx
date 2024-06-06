import { Box, Flex, Tooltip, useColorMode } from '@chakra-ui/react';
import { NotificationsLogo } from '../../assets/constants';
import { FaRegHeart } from 'react-icons/fa6';
import { FaHeart } from 'react-icons/fa';

const Notifications = ({ isSelected, onClick }) => {
  const { colorMode } = useColorMode();

  return (
    <Tooltip
      hasArrow
      label={'Notifications'}
      placement="right"
      ml={1}
      openDelay={500}
      display={{ base: 'block', md: 'none' }}>
      <Flex
        alignItems={'center'}
        gap={4}
        _hover={{
          bg: colorMode === 'dark' ? 'whiteAlpha.400' : 'rgba(0, 0, 0, .05)'
        }}
        borderRadius={6}
        onClick={onClick}
        p={2}
        w={{ base: 10, md: 'full' }}
        justifyContent={{ base: 'center', md: 'flex-start' }}>
        {isSelected ? (
          <FaHeart size={25} colorMode={colorMode} />
        ) : (
          <FaRegHeart size={25} colorMode={colorMode} />
        )}
        <Box display={{ base: 'none', md: 'block' }} fontWeight={isSelected ? '700' : '400'}>
          Notifications
        </Box>
      </Flex>
    </Tooltip>
  );
};

export default Notifications;
