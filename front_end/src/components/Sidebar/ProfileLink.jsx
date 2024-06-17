import { Avatar, Box, Link, Tooltip, useColorMode } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import fetchAvatar from '../../utils/fetchAvatar.js';

const ProfileLink = ({ onClick, isCollapsed, setIsSidebarCollapsed, setShowSidebarContent }) => {
  const { colorMode } = useColorMode();
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [imgAvatar, setImgAvatar] = useState();

  useEffect(() => {
    fetchAvatar(currentUser.avatar, setImgAvatar);
  }, [currentUser.avatar]);

  return (
    <Tooltip
      hasArrow
      label={'Profile'}
      placement="right"
      ml={1}
      openDelay={500}
      display={{ base: 'block', md: 'none' }}>
      <Link
        display={'flex'}
        to={`/${currentUser.name_tag}`}
        as={RouterLink}
        alignItems={'center'}
        gap={4}
        onClick={() => {
          onClick();
          setIsSidebarCollapsed(false);
          setShowSidebarContent(false);
        }}
        _hover={{
          bg: colorMode === 'dark' ? 'whiteAlpha.400' : 'rgba(0, 0, 0, .05)'
        }}
        borderRadius={6}
        p={2}
        w={{ base: 10, md: 'full' }}
        justifyContent={isCollapsed ? 'center' : { base: 'center', md: 'flex-start' }}>
        <Avatar size={'sm'} src={imgAvatar} />
        {!isCollapsed && <Box display={{ base: 'none', md: 'block' }}>Profile</Box>}
      </Link>
    </Tooltip>
  );
};

export default ProfileLink;
