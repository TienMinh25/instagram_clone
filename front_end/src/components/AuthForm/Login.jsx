import { Input, Button, InputGroup, InputRightElement, Alert, AlertIcon } from '@chakra-ui/react';
import { useState, useContext } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import { UserContext } from '../../context/userContext.jsx';

export const Login = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });

  const { login } = useContext(UserContext);
  const [err, setErr] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

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
      <InputGroup>
        <Input
          placeholder="Password"
          type={showPassword ? 'text' : 'password'}
          fontSize={'14'}
          size={'sm'}
          value={inputs.password}
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
        onClick={(e) => login(inputs, setErr, e)}
      >
        Log in
      </Button>
      {err && (
        <Alert status="error" fontSize={13} p={2} borderRadius={4}>
          <AlertIcon fontSize={12} />
          {err}
        </Alert>
      )}
    </>
  );
};
