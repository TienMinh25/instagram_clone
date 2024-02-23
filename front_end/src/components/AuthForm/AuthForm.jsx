import {
  Box,
  VStack,
  Image,
  Input,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoIns from "/logo.png";
import logoGoogle from "/google.png";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleAuth = () => {
    // nen thay bang la hien thi xuong ben duoi cho nguoi dung
    if (!inputs.email || !inputs.password) {
      alert("Please fill all the fields");
      return;
    }

    // check logic dang nhap thanh cong moi duoc chuyen vao homepage
    navigate("/");
  };

  return (
    <>
      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <VStack spacing={4}>
          <Image src={logoIns} h={24} cursor={"pointer"} alt="Instagram" />
          <Input
            placeholder="Email"
            type="email"
            fontSize={"14"}
            value={inputs.email}
            onChange={(e) => {
              setInputs((prev) => ({ ...prev, email: e.target.value }));
            }}
          />
          <Input
            placeholder="Password"
            type="password"
            fontSize={"14"}
            value={inputs.password}
            onChange={(e) => {
              setInputs((prev) => ({ ...prev, password: e.target.value }));
            }}
          />
          {!isLogin ? (
            <Input
              placeholder="Confirm Password"
              type="password"
              fontSize={"14"}
              value={inputs.confirmPassword}
              onChange={(e) => {
                setInputs((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }));
              }}
            />
          ) : null}

          <Button
            w={"full"}
            colorScheme="blue"
            size={"sm"}
            fontSize={14}
            onClick={handleAuth}
          >
            {isLogin ? "Log in" : "Sign up"}
          </Button>

          {/* ----------- OR ----------- */}
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            my={4}
            gap={1}
            w={"full"}
          >
            <Box flex={2} h={"1px"} bg={"gray.400"} />
            <Text mx={1} color={"white"}>
              OR
            </Text>
            <Box flex={2} h={"1px"} bg={"gray.400"} />
          </Flex>

          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            cursor={"pointer"}
          >
            <Image src={logoGoogle} w={5} alt="Google logo" />
            <Text mx={2} color={"blue.500"}>
              Log in with Google
            </Text>
          </Flex>
        </VStack>
      </Box>

      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <Flex alignItems={"center"} justifyContent={"center"}>
          <Box mx={2} fontSize={14}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </Box>
          <Box
            onClick={() => setIsLogin(!isLogin)}
            color={"blue.500"}
            cursor={"pointer"}
          >
            {isLogin ? "Sign up" : "Log in"}
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export default AuthForm;
