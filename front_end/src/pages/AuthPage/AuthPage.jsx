import { Flex, Container, Box, Image, VStack } from '@chakra-ui/react';
import authImg from '/auth.png';
import AuthForm from '../../components/AuthForm/AuthForm';
import playStore from '/playstore.png';
import microsoftImg from '/microsoft.png';

const AuthPage = () => {
  return (
    <Flex minH={'100vh'} justifyContent={'center'} alignItems={'center'} px={4}>
      <Container maxW={'container.md'} padding={0}>
        <Flex justifyContent={'center'} alignItems={'center'} gap={10}>
          {/* Left hand-side */}
          <Box display={{ base: 'none', md: 'block' }}>
            <Image src={authImg} h={650} alt="Phone img" />
          </Box>

          {/* Right hand-side */}
          <VStack spacing={4} align={'stretch'}>
            <AuthForm />
            <Box textAlign={'center'}>Get the app.</Box>
            <Flex gap={5} justifyContent={'center'}>
              <Image src={playStore} h={10} alt="Play store logo" />
              <Image src={microsoftImg} h={10} alt="Play store logo" />
            </Flex>
          </VStack>
        </Flex>
      </Container>
    </Flex>
  );
};

export default AuthPage;
