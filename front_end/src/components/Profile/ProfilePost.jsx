import { Flex, GridItem, Image, Text, useDisclosure, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';
import { makeRequest } from '../../axios.js';
import handlePathFile from '../../utils/handlePathFile';
import ProfilePostModal from './ProfilePostModal.jsx';

function ProfilePost({
  media,
  likeCount,
  commentCount,
  description,
  postId,
  currentUser,
  setPosts
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [imgMediaList, setImgMediaList] = useState([]);

  const handleDelete = async () => {
    try {
      await makeRequest.delete(`/posts/${postId}?userId=${currentUser.id}`);
      toast({
        title: 'Delete post!',
        description: 'Delete post successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      });
      setPosts((prevPosts) => prevPosts.filter((prevPost) => prevPost.id !== postId));
    } catch (error) {
      toast({
        title: 'Cannot delete this post',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      });
    } finally {
      onClose();
    }
  };

  useEffect(() => {
    if (media && media.length > 0) {
      handlePathFile(media, setImgMediaList);
    }
  }, [media]);

  return (
    <>
      <GridItem
        cursor={'pointer'}
        borderRadius={4}
        overflow={'hidden'}
        border={'1px solid'}
        borderColor={'whiteAlpha.300'}
        position={'relative'}
        aspectRatio={1 / 1}
        onClick={onOpen}>
        {/* Modal hover for post*/}
        <Flex
          opacity={0}
          _hover={{ opacity: 1 }}
          position={'absolute'}
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="blackAlpha.700"
          transition={'all 0.3s ease'}
          zIndex={1}
          justifyContent={'center'}>
          <Flex alignItems={'center'} justifyContent={'center'} gap={50}>
            <Flex>
              <AiFillHeart size={20} color="white" fill="white" />
              <Text fontWeight={'bold'} ml={2} color={'white'}>
                {likeCount}
              </Text>
            </Flex>
            <Flex>
              <FaComment size={20} color={'white'} fill="white" />
              <Text fontWeight={'bold'} ml={2} color={'white'}>
                {commentCount}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Image
          src={`http://localhost:5001/${imgMediaList[0]}`}
          alt={description}
          w={'100%'}
          h={'100%'}
          objectFit={'cover'}
        />
      </GridItem>

      {isOpen && (
        <ProfilePostModal
          onDelete={handleDelete}
          postId={postId}
          isOpen={isOpen}
          onClose={onClose}
          imgMediaList={imgMediaList}
        />
      )}
    </>
  );
}

export default ProfilePost;
