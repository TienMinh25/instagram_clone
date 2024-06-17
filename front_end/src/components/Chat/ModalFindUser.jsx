import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  useColorMode,
  Flex,
  Text,
  Box,
} from '@chakra-ui/react';

const ModalFindUser = ({ isOpen, onClose }) => {
  const { colorMode } = useColorMode();

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size="md">
      <ModalOverlay />
      <ModalContent bg={colorMode === 'dark' ? "#262626" : "white"} p={0} maxW="600px">
        <ModalHeader textAlign={'center'} borderBottom="1px solid #363636" >New message</ModalHeader>
        <ModalHeader textAlign={'center'} borderBottom="1px solid #363636" p={2} pl={6}>
        <Flex direction={'row'} alignItems="center" width="100%">
            <Text>To: </Text>
            <Input
            fontSize={16}
              placeholder="Search for a user..."
              border="none"
              _focus={{ border: "none", boxShadow: "none" }}
              _hover={{ border: "none" }}
              _active={{ border: "none" }}
            />
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box maxH="300px" minH="300px" overflowY="auto">
            <Text >abc</Text>
            <Text>abc</Text>
            <Text>abc</Text>
            <Text>abc</Text>
            <Text>abc</Text>
            <Text>abc</Text>
            <Text>abc</Text>
            <Text>abc</Text>
            <Text>abc</Text>
            <Text>abc</Text>
            <Text>abc</Text>
            <Text>abc</Text>
            <Text>abc</Text>
            <Text>abc</Text>
            <Text>abc</Text>
            <Text>abc</Text>
            <Text>abc</Text>
            <Text>abc</Text>
            <Text>abc</Text>
            <Text>abc</Text>
            <Text>abc</Text>
            <Text>abc</Text>
          </Box>
          {/* Add more inputs or a list of users here */}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' size="md" width="100%" p={6}>Chat</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalFindUser;
