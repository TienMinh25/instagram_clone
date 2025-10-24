import { Box, Flex, Link, Tooltip, useColorMode, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { BiLogOut } from 'react-icons/bi';
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { InstagramLogo, InstagramMobileLogo } from '../../assets/constants';
import SidebarItems from './SidebarItems';
import { makeRequest } from '../../axios';

function Sidebar({ isCollapsed, setIsSidebarCollapsed }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState('');
  const [showSidebarContent, setShowSidebarContent] = useState(false);
  const handleLogout = async (e) => {
      e.preventDefault();
  
      try {
        const data = await makeRequest.post('/logout');
  
        if (data.status === 200) {
          toast({
            title: 'Logout successfully!',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'bottom'
          });
  
          localStorage.removeItem('user');
          localStorage.removeItem('access_token');
          navigate('/auth');
        }
      } catch (e) {
        toast({
          title: 'Failed to logout',
          description: e?.response?.data?.message || e.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom'
        });
      }
    };
  const [searchQuery, setSearchQuery] = useState('');
  const [isClicked, setIsClicked] = useState(false);

  return (
    <Box
      height={'100vh'}
      borderRight={'1px solid'}
      borderColor={colorMode === 'dark' ? 'whiteAlpha.300' : 'rgba(0,0,0,0.2)'}
      py={8}
      position={'sticky'}
      className={`sidebar ${isCollapsed ? 'collapsed' : 'expanded'}`}
      zIndex={1000}
      top={0}
      left={0}
      px={4}>
      <Flex direction={'column'} gap={10} w="full" height={'full'}>
        {isCollapsed ? (
          <Tooltip
            hasArrow
            label={'Home'}
            placement="right"
            ml={1}
            openDelay={500}
            display={{ base: 'block', md: 'none' }}>
            <Link
              to={'/'}
              as={RouterLink}
              onClick={() => {
                setSelectedItem('');
                setShowSidebarContent(false);
                setIsSidebarCollapsed(false);
                setIsClicked(false);
                setSearchQuery('');
              }}
              alignItems={'center'}
              display="flex"
              padding={'8px'}
              cursor={'pointer'}
              borderRadius={6}
              minW={'40px'}
              minH={'40px'}
              _hover={{
                bg: colorMode === 'dark' ? 'whiteAlpha.400' : 'rgba(0, 0, 0, .05)'
              }}
              w={{ base: '10px' }}>
              <InstagramMobileLogo colorMode={colorMode} />
            </Link>
          </Tooltip>
        ) : (
          <>
            <Tooltip
              hasArrow
              label={'Home'}
              placement="right"
              ml={1}
              openDelay={500}
              display={{ base: 'block', md: 'none' }}>
              <Link
                to={'/'}
                as={RouterLink}
                onClick={() => {
                  setSelectedItem('');
                  setShowSidebarContent(false);
                  setIsSidebarCollapsed(false);
                  setIsClicked(false);
                  setSearchQuery('');
                }}
                display={isCollapsed ? 'flex' : { base: 'none', md: 'block' }}
                cursor={'pointer'}>
                <InstagramLogo colorMode={colorMode} />
              </Link>
            </Tooltip>
            <Tooltip
              hasArrow
              label={'Home'}
              placement="right"
              ml={1}
              openDelay={500}
              display={{ base: 'block', md: 'none' }}>
              <Link
                to={'/'}
                as={RouterLink}
                onClick={() => {
                  setSelectedItem('');
                  setShowSidebarContent(false);
                  setIsSidebarCollapsed(false);
                  setIsClicked(false);
                  setSearchQuery('');
                }}
                alignItems={'center'}
                display={{ base: 'flex', md: 'none' }}
                padding={'8px'}
                cursor={'pointer'}
                borderRadius={6}
                minW={'40px'}
                minH={'40px'}
                _hover={{
                  bg: colorMode === 'dark' ? 'whiteAlpha.400' : 'rgba(0, 0, 0, .05)'
                }}
                w={{ base: '10px' }}>
                <InstagramMobileLogo colorMode={colorMode} />
              </Link>
            </Tooltip>
          </>
        )}

        <Flex
          direction={'column'}
          gap={5}
          cursor={'pointer'}
          justifyContent={'center'}
          alignItems={'center'}>
          <SidebarItems
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
            setIsClicked={setIsClicked}
            isClicked={isClicked}
            showSidebarContent={showSidebarContent}
            setShowSidebarContent={setShowSidebarContent}
            isCollapsed={isCollapsed}
            setSelectedItem={setSelectedItem}
            selectedItem={selectedItem}
            setIsSidebarCollapsed={setIsSidebarCollapsed}
          />
        </Flex>
        <Flex
          ml={1}
          direction={'column'}
          gap={2}
          mt="auto"
          justifyContent={'center'}
          alignItems={'center'}>
          <Flex
            direction={'row'}
            gap={5}
            cursor={'pointer'}
            _hover={{ bg: colorMode === 'dark' ? 'whiteAlpha.400' : 'rgba(0, 0, 0, .05)' }}
            p={2}
            borderRadius={6}
            onClick={toggleColorMode}>
            {colorMode === 'dark' ? (
              <MdOutlineLightMode size={'20px'} />
            ) : (
              <MdDarkMode size={'20px'} />
            )}
            {!isCollapsed && <Box display={{ base: 'none', md: 'block' }}>Switch appearance</Box>}
          </Flex>
          <Tooltip
            label={'Logout'}
            hasArrow
            placement="right"
            openDelay={500}
            display={{ base: 'block', md: 'none' }}>
            <Flex
              onClick={handleLogout}
              alignItems={'center'}
              gap={4}
              _hover={{ bg: colorMode === 'dark' ? 'whiteAlpha.400' : 'rgba(0, 0, 0, .05)' }}
              borderRadius={6}
              p={2}
              w={{ base: 10, md: 'full' }}
              justifyContent={{ base: 'center', md: 'flex-start' }}
              cursor={'pointer'}>
              <BiLogOut size={'20px'} />
              {!isCollapsed && <Box display={{ base: 'none', md: 'block' }}>Log out</Box>}
            </Flex>
          </Tooltip>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Sidebar;
