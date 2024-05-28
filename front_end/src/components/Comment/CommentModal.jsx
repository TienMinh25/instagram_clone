import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Image,
  Box,
  Flex,
  Text,
  Button,
  useColorMode
} from '@chakra-ui/react';

const CommentModal = ({ isOpen, onClose, postImage, comments }) => {
  const { colorMode } = useColorMode();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Comments</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex>
            <Box flex="1" maxW="50%">
              <Image src={postImage} alt="Post" />
            </Box>
            <Box flex="1" maxW="50%" pl={4} overflowY="scroll" maxH="500px">
              {comments.map((comment) => (
                <Box key={comment.id} mb={4} borderBottom="1px solid gray" pb={2}>
                  <Text fontWeight="bold">{comment.User.name_tag}</Text>
                  <Text>{comment.content}</Text>
                </Box>
              ))}
            </Box>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CommentModal;
