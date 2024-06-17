import { Container, Flex, Box, Text, Button } from '@chakra-ui/react';
import ChatBar from '../../components/Chat/ChatBar';
import ChatHeader from '../../components/Chat/ChatHeader';
import ChatConversation from '../../components/Chat/ChatConversation';
import ChatFooter from '../../components/Chat/ChatFooter';
import React, { useState } from 'react';
import ModalFindUser from '../../components/Chat/ModalFindUser';

const ChatPage = () => {
  const [activeUser, setActiveUser] = useState(null); // State to store the active user
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal

  // Function to handle user click in ChatBar
  const handleUserClick = (user) => {
    setActiveUser(user); // Update the active user
  };

  // Function to open the modal
  const openModalFindUser = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModalFindUser = () => {
    setIsModalOpen(false);
  };

  return (
    <Container maxW="100%" p={0} height="100vh">
      <Flex direction="row" height="100%">
        <Flex
          w="28%"
          h="100%"
          flexDirection="column"
          borderRight="0.5px solid #262626"
        >
          <ChatBar onUserClick={handleUserClick} /> {/* Pass handleUserClick to ChatBar */}
        </Flex>
        {activeUser ? (
          <Flex
            direction="column"
            w="72%"
            h="100%"
          >
            <Box position="sticky" top={0} zIndex={1}>
              <ChatHeader activeUser={activeUser} />
            </Box>
            <Box flex="1" overflowY="auto">
              <ChatConversation activeUser={activeUser} /> {/* Pass activeUser to ChatConversation */}
            </Box>
            <Box position="sticky" bottom={0} zIndex={1} h="70px" mb="2" padding={4}>
              <ChatFooter />
            </Box>
          </Flex>
        ) : (
          <Flex w="72%" h="100%" justifyContent="center" alignItems="center">
            <Flex direction="column" justifyContent="center" alignItems="center">
              <svg aria-label="" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="100" role="img" viewBox="0 0 96 96" width="100"><title></title><path d="M48 0C21.532 0 0 21.533 0 48s21.532 48 48 48 48-21.532 48-48S74.468 0 48 0Zm0 94C22.636 94 2 73.364 2 48S22.636 2 48 2s46 20.636 46 46-20.636 46-46 46Zm12.227-53.284-7.257 5.507c-.49.37-1.166.375-1.661.005l-5.373-4.031a3.453 3.453 0 0 0-4.989.921l-6.756 10.718c-.653 1.027.615 2.189 1.582 1.453l7.257-5.507a1.382 1.382 0 0 1 1.661-.005l5.373 4.031a3.453 3.453 0 0 0 4.989-.92l6.756-10.719c.653-1.027-.615-2.189-1.582-1.453ZM48 25c-12.958 0-23 9.492-23 22.31 0 6.706 2.749 12.5 7.224 16.503.375.338.602.806.62 1.31l.125 4.091a1.845 1.845 0 0 0 2.582 1.629l4.563-2.013a1.844 1.844 0 0 1 1.227-.093c2.096.579 4.331.884 6.659.884 12.958 0 23-9.491 23-22.31S60.958 25 48 25Zm0 42.621c-2.114 0-4.175-.273-6.133-.813a3.834 3.834 0 0 0-2.56.192l-4.346 1.917-.118-3.867a3.833 3.833 0 0 0-1.286-2.727C29.33 58.54 27 53.209 27 47.31 27 35.73 36.028 27 48 27s21 8.73 21 20.31-9.028 20.31-21 20.31Z"></path></svg>
              <Text fontSize={20} mt={2}>Your messages</Text>
              <Text fontSize={16} mt={2} color="#a2a2a2">Send a message to start a chat.</Text>
              <Button mt={4} fontSize={16} colorScheme='blue' onClick={openModalFindUser}>Send message</Button>
            </Flex>
          </Flex>
        )}
      </Flex>
      <ModalFindUser isOpen={isModalOpen} onClose={closeModalFindUser} />
    </Container>
  );
};

export default ChatPage;
