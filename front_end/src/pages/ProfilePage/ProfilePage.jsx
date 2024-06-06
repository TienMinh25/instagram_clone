import { Container, Flex } from '@chakra-ui/react';
import { useColorMode } from '@chakra-ui/react';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import ProfileTabs from '../../components/Profile/ProfileTabs';
import ProfilePosts from '../../components/Profile/ProfilePosts';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

function ProfilePage() {
  let { colorMode } = useColorMode();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('posts');
  const newUserId = location?.state?.userId || JSON.parse(localStorage.getItem('user')).id;
  let isOwnerProfile;

  if (typeof location?.state?.isOwnerProfile === 'boolean') {
    isOwnerProfile = location?.state?.isOwnerProfile;
  } else {
    isOwnerProfile = true;
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <Container maxW="container.lg" py={5}>
      <Flex py={10} px={4} pl={{ base: 4, md: 10 }} w="full" mx={'auto'} flexDirection={'column'}>
        <ProfileHeader userId={newUserId} isOwnerProfile={isOwnerProfile} />
      </Flex>
      <Flex
        px={{ base: 2, sm: 4 }}
        maxW={'full'}
        mx={'auto'}
        borderTop={'1px solid'}
        borderColor={colorMode == 'dark' ? 'whiteAlpha.300' : 'blackAlpha.300'}
        direction={'column'}>
        <ProfileTabs onTabChange={handleTabChange}/>
        <ProfilePosts activeTab={activeTab} userId={newUserId} isOwnerProfile={isOwnerProfile}/>
      </Flex>
    </Container>
  );
}

export default ProfilePage;
