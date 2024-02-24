import { VStack, Avatar, Text } from "@chakra-ui/react";

function Story({ avatar, name }) {
  return (
    <VStack spacing={1} maxW={"55px"}>
      <Avatar src={avatar} name={name} size={"lg"} showBorder={true} />

      <Text fontSize={12} fontWeight={"medium"} isTruncated maxW="65px">
        {name}
      </Text>
    </VStack>
  );
}

export default Story;
