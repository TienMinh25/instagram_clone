import { Box, Flex, Link, Tooltip, useColorMode } from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import { FaRegHeart } from 'react-icons/fa6';

const Notifications = ({
  isSelected,
  onClick,
  isCollapsed,
  setIsSidebarCollapsed,
  setShowSidebarContent
}) => {
  const { colorMode } = useColorMode();

  return (
    <Tooltip
      hasArrow
      label={'Notifications'}
      placement="right"
      ml={1}
      openDelay={500}
      display={{ base: 'block', md: 'none' }}>
      <Link
        display={'flex'}
        alignItems={'center'}
        gap={4}
        _hover={{
          bg: colorMode === 'dark' ? 'whiteAlpha.400' : 'rgba(0, 0, 0, .05)'
        }}
        borderRadius={6}
        to={`/`}
        as={RouterLink}
        onClick={() => {
          onClick();
          setIsSidebarCollapsed(false);
          setShowSidebarContent(false);
        }}
        p={2}
        w={{ base: 10, md: 'full' }}
        justifyContent={{ base: 'center', md: 'flex-start' }}>
        {isSelected ? <FaHeart size={25} /> : <FaRegHeart size={25} />}
        {!isCollapsed && (
          <Box display={{ base: 'none', md: 'block' }} fontWeight={isSelected ? '800' : '500'}>
            Notifications
          </Box>
        )}
      </Link>
    </Tooltip>
  );
};

export default Notifications;
