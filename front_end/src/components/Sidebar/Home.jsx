import { Box, Link, Tooltip, useColorMode } from '@chakra-ui/react';
import { AiFillHome } from 'react-icons/ai';
import { MdOutlineHome } from 'react-icons/md';
import { Link as RouterLink } from 'react-router-dom';

const Home = ({
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
      label={'Home'}
      placement="right"
      ml={1}
      openDelay={500}
      display={{ base: 'block', md: 'none' }}>
      <Link
        display={'flex'}
        to={'/'}
        as={RouterLink}
        alignItems={'center'}
        gap={4}
        _hover={{
          bg: colorMode === 'dark' ? 'whiteAlpha.400' : 'rgba(0, 0, 0, .05)'
        }}
        borderRadius={6}
        p={2}
        w={{ base: 10, md: 'full' }}
        onClick={() => {
          onClick();
          setIsSidebarCollapsed(false);
          setShowSidebarContent(false);
        }}
        justifyContent={{ base: 'center', md: 'flex-start' }}>
        {isSelected ? <AiFillHome size={25} /> : <MdOutlineHome size={25} />}
        {!isCollapsed && (
          <Box display={{ base: 'none', md: 'block' }} fontWeight={isSelected ? '800' : '500'}>
            Home
          </Box>
        )}
      </Link>
    </Tooltip>
  );
};

export default Home;
