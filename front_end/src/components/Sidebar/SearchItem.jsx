import { Avatar, Box, Flex, Text, useColorMode } from '@chakra-ui/react';
import fetchAvatar from '../../utils/fetchAvatar';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchItem({
  searchItem,
  setShowSidebarContent,
  setIsClicked,
  isSearchClick,
  setSearchRecents,
  setSearchQuery
}) {
  const { colorMode } = useColorMode();
  const [imgAvatar, setImgAvatar] = useState();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (isSearchClick) {
      setSearchRecents((prevSearchRecents) => {
        const lengthOfSearchRecents = prevSearchRecents.length;
        let checkExistsInRecents = false;
        for (let i = 0; i < lengthOfSearchRecents; i++) {
          if (prevSearchRecents[i].id === searchItem.id) {
            checkExistsInRecents = true;
            break;
          }
        }

        if (checkExistsInRecents) {
          return prevSearchRecents;
        }

        return [...prevSearchRecents, searchItem];
      });
    }
    setSearchQuery('');
    setIsClicked(false);
    setShowSidebarContent(false);
    navigate(`/${searchItem.name_tag}`, {
      state: { userId: searchItem.id, isOwnerProfile: false }
    });
  };

  useEffect(() => {
    fetchAvatar(searchItem.avatar, setImgAvatar);
  }, [searchItem.avatar]);

  return (
    <Flex
      w={'100%'}
      py={1}
      px={6}
      onClick={handleProfileClick}
      cursor="pointer"
      alignItems={'center'}
      _hover={{
        bg: colorMode === 'light' ? 'rgb(242,242,242)' : 'rgb(26, 26, 26)'
      }}
      gap={3}>
      <Avatar src={imgAvatar} name={searchItem.name_tag} size="md" />
      <Flex flexDir={'column'} alignItems={'center'} gap={1} w={'100%'}>
        <Box w={'100%'}>
          <Text
            fontSize={14}
            fontWeight={700}
            isTruncated
            maxW="100%"
            color={colorMode === 'light' ? 'black' : 'rgb(245, 245, 245)'}>
            {searchItem.name_tag}
          </Text>
        </Box>
        <Box w={'100%'}>
          <Text
            fontSize={14}
            fontWeight={500}
            isTruncated
            maxW="100%"
            color={colorMode === 'light' ? 'rgb(115,115,115)' : 'rgb(168,168,168)'}>
            {searchItem.username} • {searchItem.followerCount} followers
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
}

export default SearchItem;
