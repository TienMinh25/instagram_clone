import {
  Flex,
  AvatarGroup,
  Avatar,
  VStack,
  Text,
  Button,
} from "@chakra-ui/react";

function ProfileHeader() {
  return (
    <Flex
      gap={{ base: 4, sm: 10 }}
      py={10}
      direction={{ base: "column", sm: "row" }}
    >
      <AvatarGroup
        size={{ base: "xl", md: "2xl" }}
        justifySelf={"center"}
        alignSelf={"flex-start"}
        mx="auto"
        css={{
          fontSize: "50px",
        }}
      >
        <Avatar src="/profilepic.png" name="Tien Minh" alt="Tien minh logo" />
      </AvatarGroup>

      <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
        <Flex
          gap={4}
          direction={{ base: "column", sm: "row" }}
          justifyContent={{ base: "center", sm: "flex-start" }}
          alignItems={"center"}
          w={"full"}
        >
          <Text fontSize={{ base: "sm", md: "lg" }}>
            {/* Ten nguoi dung o day, co the truyen prop vao */}
            zero night
          </Text>
          <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
            <Button
              bg={"white"}
              color={"black"}
              _hover={{ bg: "whiteAlpha.700" }}
              size={{ base: "xs", md: "sm" }}
            >
              Edit Profile
            </Button>
          </Flex>
        </Flex>
        {/* Get user tu db ra de set vao day */}
        <Flex alignItems={"center"} gap={{ base: 4, sm: 10 }} my={3}>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as="span" mr={1} fontWeight={"bold"}>
              4
            </Text>
            posts
          </Text>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as="span" mr={1} fontWeight={"bold"}>
              149
            </Text>
            followers
          </Text>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as="span" mr={1} fontWeight={"bold"}>
              175
            </Text>
            following
          </Text>
        </Flex>
        <Flex alignItems={"flex-start"} direction={"column"}>
          <Text fontSize={"sm"} fontWeight={"bold"}>
            Tiến Minh
          </Text>
          {/* Bio for profile */}
          <Text fontSize={"sm"}>Nothing is impossible!</Text>
        </Flex>
      </VStack>
    </Flex>
  );
}

export default ProfileHeader;
