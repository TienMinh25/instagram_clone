import { Box, Link, Tooltip, useColorMode } from '@chakra-ui/react';
import { TbMessageCircle2, TbMessageCircle2Filled } from 'react-icons/tb';
import { Link as RouterLink } from 'react-router-dom';

const Messages = ({ isSelected, onClick, isCollapsed }) => {
  const { colorMode } = useColorMode();

  return (
    <Tooltip
      hasArrow
      label={'Messages'}
      placement="right"
      ml={1}
      openDelay={500}
      display={{ base: 'block', md: 'none' }}>
      <Link
        display={'flex'}
        to={`/chat`}
        as={RouterLink}
        alignItems={'center'}
        gap={4}
        onClick={onClick}
        _hover={{
          bg: colorMode === 'dark' ? 'whiteAlpha.400' : 'rgba(0, 0, 0, .05)'
        }}
        borderRadius={6}
        p={2}
        w={{ base: 10, md: 'full' }}
        justifyContent={{ base: 'center', md: 'flex-start' }}>
        {isSelected ? <TbMessageCircle2Filled size={25} /> : <TbMessageCircle2 size={25} />}
        {!isCollapsed && (
          <Box display={{ base: 'none', md: 'block' }} fontWeight={isSelected ? '800' : '500'}>
            Messages
          </Box>
        )}
      </Link>
    </Tooltip>
  );
};

export default Messages;
