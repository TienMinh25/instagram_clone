import { Box, Link, Tooltip, useColorMode } from '@chakra-ui/react';
import { AiFillHome } from 'react-icons/ai';
import { Link as RouterLink } from 'react-router-dom';

const Home = () => {
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
        justifyContent={{ base: 'center', md: 'flex-start' }}>
        <AiFillHome size={25} />
        <Box display={{ base: 'none', md: 'block' }}>Home</Box>
      </Link>
    </Tooltip>
  );
};

export default Home;
