import React, { useEffect, useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    useColorMode,
    Flex,
    Text,
    Avatar,
    Box,
} from '@chakra-ui/react';

import { FaCircleCheck } from "react-icons/fa6";
import fetchAvatar from '../../utils/fetchAvatar';

const ModalSwitchUser = ({ isOpen, onClose }) => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const { colorMode } = useColorMode();
    const [imgAvatar, setImgAvatar] = useState();

    useEffect(() => {
        fetchAvatar(currentUser.avatar, setImgAvatar);
    }, [currentUser.avatar]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
            <ModalOverlay />
            <ModalContent bg={colorMode === 'dark' ? "#262626" : "white"} p={0} maxW="400px">
                <ModalHeader textAlign={'center'} p={2} fontSize={16} borderBottom="1px solid #363636" >Switch accounts</ModalHeader>
                <ModalCloseButton />
                <ModalBody borderBottom="1px solid #363636" minH={150}>
                    {/* Add user switching functionality here */}
                    <Flex alignItems={'center'}>
                        <Flex
                            padding={4}
                            w="100%"
                            alignItems={'center'}   
                        >
                            <Avatar
                                src={imgAvatar}
                                name={currentUser.username}
                                size="md"
                                cursor="pointer"
                            />
                            <Box ml={3}>
                                <Text
                                    cursor="pointer"
                                    fontWeight="700"
                                    fontSize={16}
                                    color={colorMode === 'dark' ? '#fff' : '#000'}
                                >
                                    {currentUser.username}
                                </Text>
                            </Box>
                        </Flex>
                        <Flex>
                            <FaCircleCheck fontSize={24} />
                        </Flex>
                    </Flex>
                </ModalBody>
                <ModalFooter p={4}>
                    <Text fontWeight="600" color="#0095f6" _hover={{ color: "#fff" }} fontSize={14} width="100%" textAlign={'center'} cursor="pointer" onClick={onClose}>Log into an Existing Account</Text>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ModalSwitchUser;
