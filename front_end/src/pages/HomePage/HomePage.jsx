import { Container, Flex, Box } from '@chakra-ui/react';
import FeedPosts from '../../components/FeedPosts/FeedPosts';
import SuggestedUsers from '../../components/SuggestedUsers/SuggestedUsers';
import StoriesListAvatar from '../../components/Stories/StoriesListAvatar';

const HomePage = () => {
  return (
    <Container maxW={'container.lg'}>
      <Flex gap={20} py={10}>
        <Flex minW={'68%'} direction={'column'}>
          {/* Sau nay se them tin o tren bai, thi se ket hop voi box feed posts */}
          <StoriesListAvatar mt={20}/>
          <Box w={'100%'}>
            <FeedPosts />
          </Box>
        </Flex>     
        <Box mr={20} display={{ base: 'none', lg: 'block' }} minW={'350px'}>
          <SuggestedUsers />
        </Box>
      </Flex>
    </Container>
  );
};

export default HomePage;
