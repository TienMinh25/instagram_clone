import { Flex, Box, Text, useColorMode } from "@chakra-ui/react";
import { BsGrid3X3, BsBookmark } from "react-icons/bs";
import { PiUserRectangleLight } from "react-icons/pi";

function ProfileTabs() {
  let { colorMode } = useColorMode();

  // Khi thay tabs thi nen dung useEffect de lay tung tab lien quan va hien thi, o day chua xu li logic do
  return (
    <Flex
      w="full"
      justifyContent={"center"}
      gap={{ base: 4, sm: 10 }}
      textTransform={"uppercase"}
      fontWeight={"bold"}
    >
      <Flex
        borderTop={colorMode === "dark" ? "1px solid white" : "1px solid black"}
        alignItems={"center"}
        p={3}
        gap={1}
        cursor={"pointer"}
      >
        <Box fontSize={"20"} mr={2}>
          <BsGrid3X3 />
        </Box>
        <Text fontSize={12} display={{ base: "none", sm: "block" }}>
          Posts
        </Text>
      </Flex>

      <Flex alignItems={"center"} p={3} gap={1} cursor={"pointer"}>
        <Box fontSize={"20"} mr={2}>
          <BsBookmark />
        </Box>
        <Text fontSize={12} display={{ base: "none", sm: "block" }}>
          saved
        </Text>
      </Flex>

      <Flex alignItems={"center"} p={3} gap={1} cursor={"pointer"}>
        <Box fontSize={"20"} mr={2}>
          <PiUserRectangleLight size={30} />
        </Box>
        <Text fontSize={12} display={{ base: "none", sm: "block" }}>
          Tagged
        </Text>
      </Flex>
    </Flex>
  );
}

export default ProfileTabs;
