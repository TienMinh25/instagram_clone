import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { makeRequest } from "../../axios";

function Signup() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    fullname: "",
    username: "",
  });

  const navigate = useNavigate();

  const [err, setErr] = useState(null);

  const registerClick = async (e) => {
    e.preventDefault();

    try {
      if (
        inputs.username.trim() !== "" &&
        inputs.email.trim() !== "" &&
        inputs.password.trim() !== "" &&
        inputs.fullname.trim() !== ""
      ) {
        const response = await makeRequest.post(
          "/register",
          {
            username: inputs.username,
            email: inputs.email,
            password: inputs.password,
            fullname: inputs.fullname,
          },
          {
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              "Content-Type": "application/json; charset=UTF-8",
            },
            withCredentials: true,
          }
        );

        // data tra ve tu server co trong response.data

        // set cookie
        document.cookie = response.headers["set-cookie"];

        setErr(null);
        navigate("/");
      } else throw new Error("Vui lòng nhập đầy đủ dữ liệu!");
    } catch (err) {
      if (err.response?.data) setErr(err.response.data.message);
      else if (err.request) {
        console.log(err.request);
      } else setErr(err.message);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
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
        placeholder="Username"
        type="text"
        fontSize={"14"}
        value={inputs.username}
        size={"sm"}
        onChange={(e) => {
          setInputs((prev) => ({ ...prev, username: e.target.value }));
        }}
      />
      <Input
        placeholder="Fullname"
        type="text"
        fontSize={"14"}
        value={inputs.fullname}
        size={"sm"}
        onChange={(e) => {
          setInputs((prev) => ({ ...prev, fullname: e.target.value }));
        }}
      />
      <InputGroup>
        <Input
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          fontSize={"14"}
          value={inputs.password}
          size={"sm"}
          onChange={(e) => {
            setInputs((prev) => ({ ...prev, password: e.target.value }));
          }}
        />
        <InputRightElement h="full">
          <Button
            variant={"ghost"}
            size="sm"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>

      <Button
        w={"full"}
        colorScheme="blue"
        size={"sm"}
        fontSize={14}
        onClick={registerClick}
      >
        Sign up
      </Button>
      {err && err}
    </>
  );
}

export default Signup;
