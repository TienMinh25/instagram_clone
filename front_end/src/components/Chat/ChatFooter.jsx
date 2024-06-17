import { Flex, Input, InputGroup, InputLeftElement, InputRightElement, Text, useColorMode } from '@chakra-ui/react';
import { useState } from 'react';
import { FaSmile, FaMicrophone, FaImage, FaRegHeart } from 'react-icons/fa';
import Picker from 'emoji-picker-react'; // Make sure to import Picker from 'emoji-picker-react'

const ChatFooter = () => {
    const [inputValue, setInputValue] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const { colorMode } = useColorMode();

    const handleEmojiClick = (emojiObject) => {
        console.log(emojiObject);
        setInputValue(prevInput => prevInput + emojiObject.emoji);
        setShowPicker(false);
    };

    return (
        <Flex width="100%" position="relative">
            <InputGroup size="sm">
                <InputLeftElement display="flex" alignItems="center" h="100%" ml={2}>
                    <FaSmile onClick={() => setShowPicker(prev => !prev)} fontSize={20} cursor="pointer" />
                </InputLeftElement>
                <Input
                    placeholder="Message.."
                    borderRadius="40px"
                    size="md"
                    p={6}
                    fontSize={16}
                    pl={12}
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                />
                <InputRightElement w={'8rem'} alignItems="center" h="100%" display="flex" fontSize={20} mr={4}>
                    {inputValue.trim().length > 0 ? (
                        <Text mr={-16} cursor="pointer" fontSize={14} fontWeight="600" color={'#0484e5'} _hover={{ color: colorMode === "dark"? "#fff" : "#00376b" }}>Send</Text>
                    ) : (
                        <Flex justifyContent="space-between" width="100%">
                            <FaMicrophone cursor="pointer" />
                            <FaImage cursor="pointer" />
                            <FaRegHeart cursor="pointer" />
                        </Flex>
                    )}
                </InputRightElement>
            </InputGroup>

            {showPicker && (
                <Picker
                    onEmojiClick={(emojiObject) => handleEmojiClick(emojiObject)}
                    disableAutoFocus={true}
                    native
                    style={{ position: 'absolute', bottom: '60px', left: '20px', zIndex: 10 }}
                />
            )}
        </Flex>
    );
};

export default ChatFooter;
