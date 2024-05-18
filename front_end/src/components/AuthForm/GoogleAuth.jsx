import { Flex, Image, Text } from '@chakra-ui/react';

import logoGoogle from '/google.png';
import { makeRequest } from '../../axios';
import { useContext, useEffect, useRef } from 'react';
import { UserContext } from '../../context/userContext';

const GoogleAuth = ({ prefix }) => {
  const { authenGoogle } = useContext(UserContext);
  const currentRef = useRef(window.location.href);
  const param = 'code';

  const getAuthorizationUrl = async () => {
    try {
      // fetch API to get url from backend
      const { data } = await makeRequest.get('/oauth/url');
      window.location.href = data.url;
    } catch (e) {
      alert(JSON.stringify(e));
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const codeParam = searchParams.get(param);

    (async () => {
      await authenGoogle(currentRef, param, codeParam);
    })();
  }, [currentRef]);

  return (
    <>
        <Flex
          alignItems={'center'}
          justifyContent={'center'}
          cursor={'pointer'}
          onClick={() => getAuthorizationUrl()}
        >
          <Image src={logoGoogle} w={5} alt="Google logo" />
          <Text mx={2} color={'blue.500'}>
            {prefix} with Google
          </Text>
        </Flex>
    </>
  );
};

export default GoogleAuth;
