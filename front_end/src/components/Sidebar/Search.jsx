import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useColorMode,
  Flex,
  Tooltip,
  Box,
  ModalHeader
} from '@chakra-ui/react';
import { IoMdSearch } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';

function Search({ isSelected, onClick }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();

  // const handleSearchUser = (e) => {
  //   e.preventDefault();
  //   getUserProfile(searchRef.current.value);
  // };

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
          <Box display={{ base: 'none', md: 'block' }} fontWeight={isSelected ? '700' : '400'}>
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
          <ModalHeader>Search user</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {/* <form onSubmit={handleSearchUser}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input placeholder="asaprogrammer" ref={searchRef} />
              </FormControl>

              <Flex w={'full'} justifyContent={'flex-end'}>
                <Button type="submit" ml={'auto'} size={'sm'} my={4} isLoading={isLoading}>
                  Search
                </Button>
              </Flex>
            </form>
            {user && <SuggestedUser user={user} setUser={setUser} />} */}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Search;
