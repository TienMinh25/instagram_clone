import { VStack, Avatar, Text, Box, useColorMode } from "@chakra-ui/react";

function Story({ avatar, name }) {
  const { colorMode } = useColorMode();

  return (
    <VStack spacing={1} maxW={"55px"} cursor={"pointer"}>
      <Box
        borderRadius="full"
        overflow="hidden"
        bgGradient="linear(to-tr, #f99f00, #f953c6, #8a63d2)"
        boxShadow="md"
        p={0.5}
      >
        <Avatar
          src={avatar}
          name={name}
          size={"lg"}
          showBorder={true}
          borderColor={colorMode === "light" ? "white" : "black"}
          borderWidth={"2px"}
        />
      </Box>

      <Text fontSize={12} fontWeight={"medium"} isTruncated maxW="65px">
        {name}
      </Text>
    </VStack>
  );
}

export default Story;
