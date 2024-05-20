import { Box, Flex, Tooltip, useColorMode } from '@chakra-ui/react';
import { NotificationsLogo } from '../../assets/constants';

const Notifications = () => {
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
        p={2}
        w={{ base: 10, md: 'full' }}
        justifyContent={{ base: 'center', md: 'flex-start' }}>
        <NotificationsLogo colorMode={colorMode} />
        <Box display={{ base: 'none', md: 'block' }}>Notifications</Box>
      </Flex>
    </Tooltip>
  );
};

export default Notifications;
