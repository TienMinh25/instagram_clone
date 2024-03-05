import { Input, Button } from "@chakra-ui/react";
import { useState } from "react";

export const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  return (
    <>
      <Input
        placeholder="Email"
        type="email"
        fontSize={"14"}
        value={inputs.email}
        size={"sm"}
        onChange={(e) => {
          setInputs((prev) => ({ ...prev, email: e.target.value }));
        }}
      />
      <Input
        placeholder="Password"
        type="password"
        fontSize={"14"}
        size={"sm"}
        value={inputs.password}
        onChange={(e) => {
          setInputs((prev) => ({ ...prev, password: e.target.value }));
        }}
      />

      <Button w={"full"} colorScheme="blue" size={"sm"} fontSize={14}>
        Log in
      </Button>
    </>
  );
};
