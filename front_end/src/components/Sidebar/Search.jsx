import {
  Avatar,
  Box,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
  Tooltip,
  VStack,
  useColorMode
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaRegCircleXmark } from 'react-icons/fa6';
import { IoMdSearch } from 'react-icons/io';
import { makeRequest } from '../../axios';
import SearchItem from './SearchItem';

function Search({
  isSelected,
  isCollapsed,
  setIsSidebarCollapsed,
  selectedItem,
  setShowSidebarContent,
  showSidebarContent,
  isClicked,
  setIsClicked,
  searchQuery,
  setSearchQuery
}) {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const { colorMode } = useColorMode();
  const [searchResults, setSearchResults] = useState([]);
  const [searchRecents, setSearchRecents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(0);

  useEffect(() => {
    const handleCloseOnEsc = (event) => {
      if (event.keyCode === 27) {
        setIsClicked(false);
        setShowSidebarContent(false);
        if (selectedItem !== 'messages') {
          setIsSidebarCollapsed(false);
        }
        setSearchQuery('');
        setSearchResults([]);
      }
    };

    document.addEventListener('keydown', handleCloseOnEsc);
    return () => {
      document.removeEventListener('keydown', handleCloseOnEsc);
    };
  }, [setShowSidebarContent, setIsSidebarCollapsed, selectedItem, setIsClicked]);

  useEffect(() => {
    if (searchQuery === '') {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const fetchSearchResults = async (query) => {
    setIsLoading(true);
    try {
      if (query !== '') {
        const { data } = await makeRequest.post('/users/search', {
          search: query,
          userId: currentUser.id
        });
        setSearchResults(data);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchInputChange = (e) => {
    const inputText = e.target.value;
    setSearchQuery(inputText);
    clearTimeout(typingTimeout);

    setTypingTimeout(
      setTimeout(async () => {
        await fetchSearchResults(inputText);
      }, 100)
    );
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <>
      <Tooltip
        hasArrow
        label={'Search'}
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
          border={isClicked ? '1px solid rgb(219,219,219)' : null}
          py={isCollapsed ? 1 : 2}
          px={2}
          w={{ base: 10, md: 'full' }}
          justifyContent={{ base: 'center', md: 'flex-start' }}
          onClick={() => {
            setIsClicked(true);
            setIsSidebarCollapsed(true);
            setShowSidebarContent(true);
          }}>
          {isSelected ? <FaSearch size={25} /> : <IoMdSearch size={30} />}
          {!isCollapsed && (
            <Box display={{ base: 'none', md: 'block' }} fontWeight={isSelected ? '800' : '500'}>
              Search
            </Box>
          )}
        </Flex>
      </Tooltip>
      {showSidebarContent && (
        <Flex
          cursor={'default'}
          className={`sidebar-search ${showSidebarContent ? 'visible' : ''}`}
          h="100vh"
          position="absolute"
          borderTopRightRadius={20}
          borderBottomRightRadius={20}
          overflow={'hidden'}
          left="101%"
          top="0"
          w={{ base: 'none' }}
          boxShadow={
            colorMode === 'dark'
              ? '8px 0 15px -5px rgba(0, 0, 0, 0.3)'
              : '8px 0 15px -5px rgba(0, 0, 0, 0.3)'
          }
          borderRight={
            colorMode === 'dark' ? '1px solid rgb(38, 38, 38)' : '1px solid rgb(219, 219, 219)'
          }
          minW={{ base: 'none', md: '400px' }}>
          <Flex w="100%" h="100%" bg={colorMode === 'dark' ? 'black' : 'white'} flexDir={'column'}>
            <Flex flexDir={'column'} gap={2} p={4} py={3}>
              <Text fontSize={24} fontWeight={700} px={3}>
                Search
              </Text>
              <InputGroup outline={'none'} marginBottom={3} marginTop={8}>
                <Input
                  type="text"
                  placeholder="Search"
                  outline={'none'}
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  variant="filled"
                  bg={colorMode === 'dark' ? 'gray.700' : 'gray.100'}
                  _placeholder={{ color: colorMode === 'dark' ? 'gray.400' : 'gray.600' }}
                />
                <InputRightElement cursor={'pointer'} onClick={handleClearSearch}>
                  <FaRegCircleXmark color="gray.300" />
                </InputRightElement>
              </InputGroup>
            </Flex>
            <VStack flex={1}>
              {isLoading ? (
                <Spinner />
              ) : searchQuery === '' ? (
                <>
                  <Flex
                    py={4}
                    px={4}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    width={'100%'}
                    borderTop={
                      colorMode === 'dark'
                        ? '1px solid rgb(38, 38, 38)'
                        : '1px solid rgb(219, 219, 219)'
                    }>
                    <Text fontWeight={600} fontSize={15} px={3}>
                      Recent
                    </Text>
                    <Text
                      px={3}
                      cursor={'pointer'}
                      fontWeight={800}
                      fontSize={14}
                      color={'rgb(0,149,246)'}
                      onClick={() => setSearchRecents([])}>
                      Clear all
                    </Text>
                  </Flex>
                  <VStack spacing={2} mt={2} overflowY={'auto'} w={'100%'} maxHeight={'80vh'}>
                    {searchRecents.map((result, index) => (
                      <SearchItem
                        key={index}
                        searchItem={result}
                        setShowSidebarContent={setShowSidebarContent}
                        setIsClicked={setIsClicked}
                        isSearchClick={false}
                        setSearchRecents={setSearchRecents}
                        setSearchQuery={setSearchQuery}
                      />
                    ))}
                  </VStack>
                </>
              ) : (
                <>
                  <VStack spacing={3} py={3} overflowY={'auto'} w={'100%'} maxHeight={'80vh'}>
                    {searchResults.map((result, index) => (
                      <SearchItem
                        key={index}
                        searchItem={result}
                        setShowSidebarContent={setShowSidebarContent}
                        setIsClicked={setIsClicked}
                        isSearchClick={true}
                        setSearchRecents={setSearchRecents}
                        setSearchQuery={setSearchQuery}
                      />
                    ))}
                  </VStack>
                </>
              )}
            </VStack>
          </Flex>
        </Flex>
      )}
    </>
  );
}

export default Search;
