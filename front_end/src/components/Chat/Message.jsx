import { Avatar, Box, Flex, Text, useColorMode } from '@chakra-ui/react'
import React from 'react'

export default function Message({ text, sender, position, showSender, avatar }) {
    const { colorMode } = useColorMode();

    return (
        <Flex justifyContent={position === 'right' ? 'flex-end' : 'flex-start'} mb={4} pl={showSender ? 0 : 12} alignItems="flex-end">
            {showSender && position === 'left' && (
                <Box mr={2} ml={2} mb={2}>
                    <Avatar
                        src={avatar}
                        name={sender}
                        size="sm"
                        cursor="pointer"
                    />
                </Box>
            )}
            <Box
                bg={colorMode === 'dark' ? (position === 'right' ? '#3797f0' : '#262626') : (position === 'right' ? '#3797f0' : '#efefef')}
                color={colorMode === 'dark' ? 'white' : (position === 'right' ? '#fff' : '#000')}
                p={3}
                borderRadius="30"
                maxWidth="70%"
                textAlign={position === 'right' ? 'right' : 'left'}
                whiteSpace="pre-wrap" // Allows for line breaks within the text
                wordBreak="break-word" // Ensures long words break and wrap correctly
            >
                <Text fontSize={14}>{text}</Text>
            </Box>
        </Flex>
    );
}
