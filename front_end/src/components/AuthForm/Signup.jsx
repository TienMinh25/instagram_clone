import { Input, InputGroup, InputRightElement, Button, Alert, AlertIcon } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/userContext.jsx';

function Signup() {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    username: ''
  });

  const [err, setErr] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const { register } = useContext(UserContext);

  return (
    <>
      <Input
        placeholder="Email"
        type="email"
        fontSize={'14'}
        value={inputs.email}
        size={'sm'}
        onChange={(e) => {
          setInputs((prev) => ({ ...prev, email: e.target.value }));
        }}
      />
      <Input
        placeholder="Username"
        type="text"
        fontSize={'14'}
        value={inputs.username}
        size={'sm'}
        onChange={(e) => {
          setInputs((prev) => ({ ...prev, username: e.target.value }));
        }}
      />
      <InputGroup>
        <Input
          placeholder="Password"
          type={showPassword ? 'text' : 'password'}
          fontSize={'14'}
          value={inputs.password}
          size={'sm'}
          onChange={(e) => {
            setInputs((prev) => ({ ...prev, password: e.target.value }));
          }}
        />
        <InputRightElement h="full">
          <Button variant={'ghost'} size="sm" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>

      <Button
        w={'full'}
        colorScheme="blue"
        size={'sm'}
        fontSize={14}
        onClick={(e) => register(inputs, setErr, e)}
      >
        Sign up
      </Button>
      {err && (
        <Alert status="error" fontSize={13} p={2} borderRadius={4}>
          <AlertIcon fontSize={12} />
          {err}
        </Alert>
      )}
    </>
  );
}

export default Signup;
