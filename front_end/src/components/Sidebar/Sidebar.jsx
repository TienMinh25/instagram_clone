import {
  Box,
  Flex,
  Link,
  Avatar,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";

import {
  InstagramLogo,
  InstagramMobileLogo,
  SearchLogo,
  NotificationsLogo,
  CreatePostLogo,
} from "../../assets/constants.jsx";

import useLogout from "../../hooks/useLogout.js";

function Sidebar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { handleLogout } = useLogout();
  const sidebarItems = [
    {
      icon: <AiFillHome size={25} />,
      text: "Home",
      link: "/",
    },
    {
      icon: <SearchLogo colorMode={colorMode} />,
      text: "Search",
    },
    {
      icon: <NotificationsLogo colorMode={colorMode} />,
      text: "Notifications",
    },
    {
      icon: <CreatePostLogo colorMode={colorMode} />,
      text: "Create",
    },
    {
      icon: <Avatar size={"sm"} name="Burak Orkmez" src="/profilepic.png" />,
      text: "Profile",
      // thay bang link cua du lieu duoc fetch
      link: "/asaprogrammer",
    },
  ];
  return (
    <Box
      height={"100vh"}
      borderRight={"1px solid"}
      borderColor={colorMode === "dark" ? "whiteAlpha.300" : "rgba(0,0,0,0.2)"}
      py={8}
      position={"sticky"}
      top={0}
      left={0}
      px={{ base: "2", md: 4 }}
    >
      <Flex direction={"column"} gap={10} w="full" height={"full"}>
        <Link
          to={"/"}
          as={RouterLink}
          pl={2}
          display={{ base: "none", md: "block" }}
          cursor={"pointer"}
        >
          <InstagramLogo colorMode={colorMode} />
        </Link>
        <Link
          to={"/"}
          as={RouterLink}
          pl={2}
          display={{ base: "block", md: "none" }}
          cursor={"pointer"}
          borderRadius={6}
          _hover={{
            bg: "whiteAlpha.200",
          }}
          w={{ base: "10" }}
        >
          <InstagramMobileLogo colorMode={colorMode} />
        </Link>
        <Flex direction={"column"} gap={5} cursor={"pointer"}>
          {sidebarItems.map((item, index) => (
            <Tooltip
              label={item.text}
              hasArrow
              placement="right"
              key={index}
              ml={1}
              openDelay={500}
              display={{ base: "block", md: "none" }}
            >
              <Link
                display={"flex"}
                to={item.link || null}
                as={RouterLink}
                alignItems={"center"}
                gap={4}
                _hover={{
                  bg:
                    colorMode === "dark"
                      ? "whiteAlpha.400"
                      : "rgba(0, 0, 0, .05)",
                }}
                borderRadius={6}
                p={2}
                w={{ base: 10, md: "full" }}
                justifyContent={{ base: "center", md: "flex-start" }}
              >
                {item.icon}
                <Box display={{ base: "none", md: "block" }}>{item.text}</Box>
              </Link>
            </Tooltip>
          ))}
        </Flex>

        <Flex ml={1} direction={"column"} gap={2} mt="auto">
          {colorMode === "dark" ? (
            <Flex
              direction={"row"}
              gap={5}
              cursor={"pointer"}
              _hover={{
                bg: "whiteAlpha.400",
              }}
              p={2}
              borderRadius={6}
              onClick={toggleColorMode}
            >
              <MdOutlineLightMode size={"20px"} />
              <Box display={{ base: "none", md: "block" }}>
                Switch appearance
              </Box>
            </Flex>
          ) : (
            <Flex
              direction={"row"}
              gap={5}
              cursor={"pointer"}
              _hover={{ bg: "rgba(0, 0, 0, .05)" }}
              p={2}
              borderRadius={6}
              onClick={toggleColorMode}
            >
              <MdDarkMode size={"20px"} />
              <Box display={{ base: "none", md: "block" }}>
                Switch appearance
              </Box>
            </Flex>
          )}
          <Tooltip
            label={"Logout"}
            hasArrow
            placement="right"
            openDelay={500}
            display={{ base: "block", md: "none" }}
          >
            {/* LOG OUT */}
            {/* Can xoa authCookie trong cookie storage o day */}
            <Flex
              onClick={handleLogout}
              alignItems={"center"}
              gap={4}
              _hover={{
                bg:
                  colorMode === "dark"
                    ? "whiteAlpha.400"
                    : "rgba(0, 0, 0, .05)",
              }}
              borderRadius={6}
              p={2}
              w={{ base: 10, md: "full" }}
              justifyContent={{ base: "center", md: "flex-start" }}
            >
              <BiLogOut />
              <Box display={{ base: "none", md: "block" }}>Log out</Box>
            </Flex>
          </Tooltip>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Sidebar;
