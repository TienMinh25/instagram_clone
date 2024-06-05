import {
  Avatar,
  Box,
  Flex,
  FormControl,
  Input,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text,
  Tooltip,
  useColorMode,
  useDisclosure
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoMdSearch } from 'react-icons/io';

function Search({ isSelected, onClick }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const searchRef = useRef();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Add search logic here, for example making a request to an API to get search results.
    // Example:
    // const results = await searchUsers(searchRef.current.value);
    const results = []; // Replace with actual search results
    setSearchResults(results);
    setIsLoading(false);
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
          p={2}
          w={{ base: 10, md: 'full' }}
          justifyContent={{ base: 'center', md: 'flex-start' }}
          onClick={() => {
            onOpen();
            onClick();
          }}>
          {isSelected ? <FaSearch size={25} /> : <IoMdSearch size={28} />}
          <Box display={{ base: 'none', md: 'block' }} fontWeight={isSelected ? '800' : '500'}>
            Search
          </Box>
        </Flex>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
        <ModalOverlay />
        <ModalContent
          bg={colorMode === 'dark' ? 'black' : 'white'}
          border={'1px solid gray'}
          maxW={'400px'}>
          <ModalCloseButton />
          <ModalBody pb={6} pt={4}>
            <FormControl as="form" onSubmit={handleSearchUser} mb={4}>
              <Input
                placeholder="Search"
                ref={searchRef}
                onChange={handleSearchUser}
                autoFocus
                borderRadius="md"
                variant="filled"
                _focus={{
                  borderColor: 'blue.500'
                }}
              />
            </FormControl>
            {isLoading ? (
              <Flex justify="center" mt={4}>
                <Spinner />
              </Flex>
            ) : (
              <List spacing={3}>
                {searchResults.map((result) => (
                  <ListItem
                    key={result.id}
                    display="flex"
                    alignItems="center"
                    p={2}
                    _hover={{ bg: colorMode === 'dark' ? 'gray.700' : 'gray.200' }}
                    borderRadius="md"
                    cursor="pointer">
                    <Avatar size="sm" src={result.avatar} name={result.username} mr={3} />
                    <Box>
                      <Text fontWeight="bold">{result.username}</Text>
                      <Text fontSize="sm" color="gray.500">
                        {result.fullName}
                      </Text>
                    </Box>
                  </ListItem>
                ))}
              </List>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Search;
