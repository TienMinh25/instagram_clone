import { Flex, Image, Text } from "@chakra-ui/react";

import logoGoogle from "/google.png";

const GoogleAuth = () => {
  return (
    <Flex alignItems={"center"} justifyContent={"center"} cursor={"pointer"}>
      <Image src={logoGoogle} w={5} alt="Google logo" />
      <Text mx={2} color={"blue.500"}>
        Log in with Google
      </Text>
    </Flex>
  );
};

export default GoogleAuth;
