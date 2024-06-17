import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import ModalFindUser from './ModalFindUser';
import ModalSwitchUser from './ModalSwitchUser';

export default function ChatBarHeader() {
  const [isFindUserModalOpen, setIsFindUserModalOpen] = useState(false);
  const [isSwitchUserModalOpen, setIsSwitchUserModalOpen] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem('user'));

  const openModalFindUser = () => {
    setIsFindUserModalOpen(true);
  };

  const closeModalFindUser = () => {
    setIsFindUserModalOpen(false);
  };

  const openModalSwitchUser = () => {
    setIsSwitchUserModalOpen(true);
  };

  const closeModalSwitchUser = () => {
    setIsSwitchUserModalOpen(false);
  };

  return (
    <Flex width={"100%"} justifyContent="space-between" alignItems={'center'}>
      <Flex cursor={'pointer'}  ml={-2} flexDirection={'row'} alignItems={'center'} onClick={openModalSwitchUser}>
        <Text fontSize={18} fontWeight="bold" mr={2}>{currentUser.username}</Text>
        <IoIosArrowDown fontSize={20} />
      </Flex>
      <Flex cursor="pointer" onClick={openModalFindUser}>
        <svg aria-label="New message" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
          <title>New message</title>
          <path d="M12.202 3.203H5.25a3 3 0 0 0-3 3V18.75a3 3 0 0 0 3 3h12.547a3 3 0 0 0 3-3v-6.952" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
          <path d="M10.002 17.226H6.774v-3.228L18.607 2.165a1.417 1.417 0 0 1 2.004 0l1.224 1.225a1.417 1.417 0 0 1 0 2.004Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
          <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.848" x2="20.076" y1="3.924" y2="7.153"></line>
        </svg>
      </Flex>
      <ModalFindUser isOpen={isFindUserModalOpen} onClose={closeModalFindUser} />
      <ModalSwitchUser isOpen={isSwitchUserModalOpen} onClose={closeModalSwitchUser} />
    </Flex>
  );
}
