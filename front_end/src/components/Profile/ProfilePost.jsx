import {
  GridItem,
  Flex,
  Text,
  Image,
  useDisclosure,
  Box,
  Avatar,
  Divider,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useColorMode,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import Comment from "../Comment/Comment";
import PostFooter from "../FeedPosts/PostFooter.jsx";

function ProfilePost({ img }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  return (
    <>
      <GridItem
        cursor={"pointer"}
        borderRadius={4}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"whiteAlpha.300"}
        position={"relative"}
        aspectRatio={1 / 1}
        onClick={onOpen}
      >
        {/* Modal hover for post*/}
        <Flex
          opacity={0}
          _hover={{ opacity: 1 }}
          position={"absolute"}
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="blackAlpha.700"
          transition={"all 0.3s ease"}
          zIndex={1}
          justifyContent={"center"}
        >
          <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
            <Flex>
              <AiFillHeart size={20} color="white" fill="white" />
              <Text fontWeight={"bold"} ml={2} color={"white"}>
                7
              </Text>
            </Flex>
            <Flex>
              <FaComment size={20} color={"white"} fill="white" />
              <Text fontWeight={"bold"} ml={2} color={"white"}>
                8
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Image
          src={img}
          alt="profile post"
          w={"100%"}
          h={"100%"}
          objectFit={"cover"}
        />
      </GridItem>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
        size={{ base: "3xl", md: "6xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bg={colorMode === "dark" ? "black" : "white"} pb={5}>
            <Flex gap="4" w={{ base: "90%", sm: "70%", md: "full" }} mx="auto">
              <Flex
                borderRadius={4}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"whiteAlpha.300"}
                flex={1.5}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image src={img} alt="profile post" />
              </Flex>
              <Flex
                flex={1}
                flexDirection={"column"}
                px={10}
                display={{ base: "none", md: "flex" }}
              >
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                  <Flex alignItems={"center"} gap={4}>
                    {/* sau nay thay bang avatar cua nguoi dang bai */}
                    <Avatar
                      src="/profilepic.png"
                      size={"sm"}
                      name="Tien Minh"
                    />
                    <Text fontWeight={"bold"} fontSize={12}>
                      {/* sau nay thay bang username cua ng dung */}
                      Tien Minh
                    </Text>
                  </Flex>

                  <Box
                    _hover={{
                      bg:
                        colorMode === "dark"
                          ? "whiteAlpha.300"
                          : "rgba(0, 0, 0, .05)",
                      color: "red.600",
                    }}
                    borderRadius={4}
                    p={1}
                  >
                    <MdDelete size={20} cursor="pointer" />
                  </Box>
                </Flex>
                <Divider my={4} bg={"gray.500"} />

                <VStack
                  w="full"
                  alignItems={"start"}
                  maxH="400px"
                  overflowY={"auto"}
                  css={{
                    "&::-webkit-scrollbar": {
                      width: "0px",
                      background: "transparent",
                    },
                  }}
                >
                  {/* sau nay se lay comment ra */}
                  <Comment
                    createdAt="1d ago"
                    username="tien minh"
                    profilePic="/profilepic.png"
                    text={"Dummy images from unplash"}
                  />

                  <Comment
                    createdAt="12h ago"
                    username="quyen"
                    profilePic={"https://bit.ly/dan-abramov"}
                    text={"Nice picture"}
                  />

                  <Comment
                    createdAt="3h ago"
                    username="jenky"
                    profilePic={"https://bit.ly/kent-c-dodds"}
                    text={"Good clone dude!"}
                  />

                  <Comment
                    createdAt="3h ago"
                    username="jenky"
                    profilePic={"https://bit.ly/kent-c-dodds"}
                    text={"Good clone dude!"}
                  />
                  <Comment
                    createdAt="3h ago"
                    username="jenky"
                    profilePic={"https://bit.ly/kent-c-dodds"}
                    text={"Good clone dude!"}
                  />
                  <Comment
                    createdAt="3h ago"
                    username="jenky"
                    profilePic={"https://bit.ly/kent-c-dodds"}
                    text={"Good clone dude!"}
                  />
                  <Comment
                    createdAt="3h ago"
                    username="jenky"
                    profilePic={"https://bit.ly/kent-c-dodds"}
                    text={"Good clone dude!"}
                  />
                  <Comment
                    createdAt="3h ago"
                    username="jenky"
                    profilePic={"https://bit.ly/kent-c-dodds"}
                    text={"Good clone dude!"}
                  />
                  <Comment
                    createdAt="3h ago"
                    username="jenky"
                    profilePic={"https://bit.ly/kent-c-dodds"}
                    text={"Good clone dude!"}
                  />
                </VStack>

                <Divider my={4} bg={"gray.800"} />

                <PostFooter isProfilePage={true} />
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProfilePost;
