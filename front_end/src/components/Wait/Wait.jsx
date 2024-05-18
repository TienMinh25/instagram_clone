import { Box, Flex, Image, useColorMode } from '@chakra-ui/react';

function Wait() {
  const { colorMode } = useColorMode();

  return (
    <Flex justifyContent={'center'} alignItems={'center'} height={"100vh"} bg={'white'} position={"relative"}>
      <Image boxSize="60px" objectFit="cover" src="./wait_logo.jpg" />
      <Flex gap={1} flexDir={"column"} position={"absolute"} top={'88vh'}>
        <Box color={colorMode === 'dark' ? 'white.300' : 'gray.400'} fontWeight={600} textAlign={"center"}>
          from
        </Box>
        <Box textAlign={"center"}>
          <Image objectFit={"cover"} src='./text_wait.jpeg'/>
        </Box>
      </Flex>
    </Flex>
  );
}

export default Wait;
