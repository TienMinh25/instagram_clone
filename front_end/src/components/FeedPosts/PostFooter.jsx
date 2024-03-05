import {
  Flex,
  Box,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { useState } from "react";

import {
  CommentLogo,
  NotificationsLogo,
  UnlikeLogo,
} from "../../assets/constants.jsx";

function PostFooter({ username, isProfilePage }) {
  const { colorMode } = useColorMode();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(1000);
  const handleLike = () => {
    // sau nay o day se goi axios len server de update like or unlike
    if (liked) {
      // update unlike for server and UI
      setLiked(false);
      setLikes((prev) => prev - 1);
    } else {
      setLiked(true);
      setLikes((prev) => prev + 1);
    }
  };

  return (
    <Box mb={10} mt="auto">
      <Flex alignItems={"center"} gap={4} w="full" pt={0} mb={2} mt={"4"}>
        <Box onClick={handleLike} cursor={"pointer"} fontSize={18}>
          {!liked ? (
            <NotificationsLogo colorMode={colorMode} />
          ) : (
            <UnlikeLogo />
          )}
        </Box>

        <Box cursor={"pointer"} fontSize={18}>
          <CommentLogo colorMode={colorMode} />
        </Box>
      </Flex>
      <Text fontWeight={600} fontSize={"sm"}>
        {likes} likes
      </Text>
      {!isProfilePage && (
        <>
          <Text fontSize={"sm"} fontWeight={700}>
            {/* thay the bang ten cac nguoi dung comment, nguoi dung comment moi nhat */}
            {username}{" "}
            <Text as="span" fontWeight={400}>
              Feeling good
            </Text>
          </Text>
          <Text fontSize={"sm"} color={"gray"}>
            {/* Lay view tu db ra de hien thi */}
            View all 1,000 comments
          </Text>
        </>
      )}

      <Flex
        alignItems={"center"}
        gap={2}
        justifyContent={"space-between"}
        w="full"
      >
        <InputGroup>
          <Input
            variant={"flushed"}
            placeholder="Add a comment..."
            fontSize={14}
          />
          <InputRightElement>
            <Button
              fontSize={14}
              color={"blue.500"}
              fontWeight={600}
              cursor={"pointer"}
              _hover={{
                color: "white",
              }}
              bg="transparent"
            >
              Post
            </Button>
          </InputRightElement>
        </InputGroup>
      </Flex>
    </Box>
  );
}

export default PostFooter;
