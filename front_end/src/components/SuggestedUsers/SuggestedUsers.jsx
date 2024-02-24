import { VStack, Flex, Text, Box, Link } from "@chakra-ui/react";
import SuggestedHeader from "./SuggestedHeader";
import SuggestedUser from "./SuggestedUser";

function SuggestedUsers() {
  return (
    <VStack py={8} px={6} gap={4}>
      <SuggestedHeader />
      <Flex alignItems={"center"} justifyContent={"space-between"} w="full">
        <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
          Suggested for you
        </Text>
        <Text
          fontSize={12}
          fontWeight={"bold"}
          _hover={{ color: "gray.400" }}
          cursor={"pointer"}
        >
          See All
        </Text>
      </Flex>

      <SuggestedUser name="Dan Mark" followers={1392} avatar="/img1.png" />
      <SuggestedUser name="John Doe" followers={1000} avatar="/img2.png" />
      <SuggestedUser name="Tom Hunder" followers={2003} avatar="/img3.png" />

      <Box fontSize={12} color={"gray.500"} mt={5} alignSelf={"start"}>
        © 2024 Built By{" "}
        <Link
          href="https://www.facebook.com/profile.php?id=100005211045138"
          target="_blank"
          color="blue.500"
          fontSize={14}
        >
          Tiến Minh
        </Link>
      </Box>
    </VStack>
  );
}

export default SuggestedUsers;
