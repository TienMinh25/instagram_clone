import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useColorMode,
  Flex,
  Box,
  Tooltip,
  Button,
  Image,
  ModalHeader,
  Text,
  Input,
  IconButton,
  Textarea,
  AlertDialog,
  AlertDialogOverlay,
  Avatar,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
  useToast
} from '@chakra-ui/react';
import { CreatePostLogo } from '../../assets/constants';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useRef, useEffect, useState } from 'react';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import fetchAvatar from '../../utils/fetchAvatar.js';
import { makeRequest } from '../../axios';

function CreatePost({ isCollapsed }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const toast = useToast();
  const [selectedImageFiles, setSelectedImageFiles] = useState([]);
  const [selectedImageUrls, setSelectedImageUrls] = useState([]);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [description, setDescription] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [imgAvatar, setImgAvatar] = useState();

  useEffect(() => {
    fetchAvatar(currentUser.avatar, setImgAvatar);
  }, [currentUser.avatar]);

  const cancelRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let postForm = new FormData();

      postForm.append('description', description);
      postForm.append('type', 'post');
      for (let i = 0; i < selectedImageFiles.length; i++) {
        postForm.append('multiple-files', selectedImageFiles[i]);
      }

      await makeRequest.post(`/posts?user_id=${currentUser.id}`, postForm, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      resetForm();
      onClose();
      toast({
        title: 'Create post successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      });
    } catch (e) {
      toast({
        title: 'Failed to create post',
        description: e?.response?.data?.message || e.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      });
    }
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    const imageFiles = [];
    const imageUrls = [];
    for (let i = 0; i < files.length; i++) {
      imageFiles.push(files[i]);
      imageUrls.push(URL.createObjectURL(files[i]));
    }
    setSelectedImageFiles(imageFiles);
    setSelectedImageUrls(imageUrls);
    setIsFileSelected(true);
  };

  const handleBack = () => {
    setIsFileSelected(false);
    setSelectedImageFiles([]);
    setSelectedImageUrls([]);
  };

  const handleClose = () => {
    if (isFileSelected || description) {
      setIsAlertOpen(true);
    } else {
      resetForm();
      onClose();
    }
  };

  const handleConfirmClose = () => {
    resetForm();
    setIsAlertOpen(false);
    onClose();
  };

  const resetForm = () => {
    setIsFileSelected(false);
    setSelectedImageFiles([]);
    setSelectedImageUrls([]);
    setDescription('');
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedImageUrls.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + selectedImageUrls.length) % selectedImageUrls.length
    );
  };

  return (
    <>
      <Tooltip
        hasArrow
        label={'Create'}
        placement="right"
        ml={1}
        openDelay={500}
        display={{ base: 'block', md: 'none' }}>
        <Flex
          alignItems={'center'}
          gap={4}
          _hover={{
            bg: colorMode === 'dark' ? 'whiteAlpha.400' : 'rgba(0, 0, 0, .05)'
          }}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: 'full' }}
          justifyContent={{ base: 'center', md: 'flex-start' }}
          onClick={onOpen}>
          <CreatePostLogo colorMode={colorMode} />
          {!isCollapsed && <Box display={{ base: 'none', md: 'block' }}>Create</Box>}
        </Flex>
      </Tooltip>

      <Modal
        isOpen={isOpen}
        onClose={() => handleClose()}
        isCentered={true}
        size={{ base: '2xl', md: '2xl' }}
        borderRadius={6}
        overflow={'hidden'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            position={'relative'}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            textAlign={'center'}
            borderBottom={
              colorMode === 'dark' ? '1px solid rgb(54,54,54)' : '1px solid rgb(219,219,219)'
            }
            bg={colorMode === 'dark' ? 'rgba(38, 38, 38, 1)' : 'white'}
            borderTopRadius={6}>
            {isFileSelected && (
              <Box onClick={handleBack} cursor={'pointer'}>
                <FaArrowLeftLong />
              </Box>
            )}
            <Box
              color={colorMode === 'dark' ? 'white' : 'black'}
              fontSize={16}
              fontWeight={700}
              textAlign={'center'}
              flex={1}>
              Create new post
            </Box>
            {isFileSelected && (
              <Box
                cursor={'pointer'}
                onClick={handleSubmit}
                bg={'transparent'}
                color={'rgba(0,149,246,1)'}
                fontSize={14}
                fontWeight={700}>
                Share
              </Box>
            )}
          </ModalHeader>
          <ModalBody
            borderTopRadius={0}
            pb={5}
            bg={colorMode === 'dark' ? 'rgba(38, 38, 38, 1)' : 'white'}
            borderBottomLeftRadius={6}
            borderBottomRightRadius={6}
            padding={0}>
            {!isFileSelected ? (
              <Flex
                gap="4"
                w={{ base: '70%', sm: '50%', md: '80%' }}
                mx="auto"
                justifyContent={'center'}
                alignItems={'center'}
                minHeight={'500px'}
                flexDirection={'column'}>
                <Image src="hint_select_image.png" alt="Ảnh mô tả chọn ảnh" width={'260px'} />
                <Text fontSize={20} fontWeight={400}>
                  Drag photos and videos here
                </Text>
                <Input
                  type="file"
                  name="multiple-files"
                  multiple
                  onChange={handleFileChange}
                  display="none"
                  id="file-input"
                />
                <Button
                  as="label"
                  htmlFor="file-input"
                  cursor={'pointer'}
                  bg={'rgba(0, 149, 246, 1)'}
                  _hover={{
                    bg: 'rgba(24,119,242,1)'
                  }}
                  color={'white'}
                  fontSize={14}>
                  Select from computer
                </Button>
              </Flex>
            ) : (
              <Flex
                direction={{ base: 'column', md: 'row' }}
                alignItems="flex-start"
                gap={0}
                padding={0}>
                <Flex
                  direction="column"
                  flex={0.6}
                  alignItems="center"
                  position="relative"
                  p={0}
                  w={'100%'}
                  h={'100%'}
                  aspectRatio={'1/1'}
                  borderBottomLeftRadius={'6px'}
                  borderRight={
                    colorMode === 'dark' ? '1px solid rgb(54,54,54)' : '1px solid rgb(219,219,219)'
                  }>
                  <Box
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundImage: `url(${selectedImageUrls[currentImageIndex]})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                  {selectedImageUrls.length > 1 && (
                    <>
                      <IconButton
                        icon={
                          <MdOutlineKeyboardArrowLeft
                            color={
                              colorMode === 'dark'
                                ? 'rgba(255, 255, 255, 0.3)'
                                : 'rgba(0, 0, 0, 0.3)'
                            }
                            size={'md'}
                          />
                        }
                        position="absolute"
                        left={2}
                        top="50%"
                        transform="translateY(-50%)"
                        onClick={handlePrevImage}
                        aria-label="Previous image"
                        size="sm"
                        bg="transparent"
                        _hover={{
                          bg:
                            colorMode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'
                        }}
                        borderRadius="full"
                        color={colorMode === 'dark' ? 'white' : 'black'}
                      />
                      <IconButton
                        icon={
                          <MdOutlineKeyboardArrowRight
                            color={
                              colorMode === 'dark'
                                ? 'rgba(255, 255, 255, 0.3)'
                                : 'rgba(0, 0, 0, 0.3)'
                            }
                            size={'md'}
                          />
                        }
                        position="absolute"
                        right={2}
                        top="50%"
                        transform="translateY(-50%)"
                        onClick={handleNextImage}
                        aria-label="Next image"
                        size="sm"
                        bg="transparent"
                        _hover={{
                          bg:
                            colorMode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'
                        }}
                        borderRadius="full"
                        color={colorMode === 'dark' ? 'white' : 'black'}
                      />
                    </>
                  )}
                  {selectedImageUrls.length > 1 && (
                    <Flex position="absolute" bottom={2} justifyContent="center" w="full">
                      {selectedImageUrls.map((_, index) => (
                        <Box
                          key={index}
                          w={2}
                          h={2}
                          borderRadius="full"
                          bg={index === currentImageIndex ? 'blue.500' : 'gray.300'}
                          mx={1}
                        />
                      ))}
                    </Flex>
                  )}
                </Flex>
                <Flex direction="column" flex={0.4}>
                  <Flex
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    w="full"
                    pl={2}
                    pr={2}
                    pt={3}
                    pb={3}>
                    <Flex alignItems={'center'} gap={2}>
                      <Avatar name="as tienminh" size={'sm'} src={imgAvatar} />
                      <Text fontSize={14} fontWeight={'bold'} color={'rgb(219, 219, 219)'}>
                        {currentUser.name_tag}
                      </Text>
                    </Flex>
                  </Flex>
                  <Textarea
                    placeholder="Write a caption..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    resize="none"
                    outline={'none'}
                    borderRadius="none"
                    color={colorMode === 'dark' ? 'white' : 'black'}
                    rows={6}
                    flex={1}
                    borderColor={'transparent'}
                    _focus={{ borderColor: 'transparent', boxShadow: 'none' }}
                    _hover={{ borderColor: 'transparent' }}
                  />
                  {/* {progress > 0 && (
                    <Progress value={progress} size="xs" colorScheme="green" mt={4} w="100%" />
                  )} */}
                </Flex>
              </Flex>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      <AlertDialog
        isCentered={true}
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsAlertOpen(false)}>
        <AlertDialogOverlay>
          <AlertDialogContent borderRadius={12} overflow={'hidden'}>
            <AlertDialogHeader bg={colorMode === 'dark' ? 'rgb(38, 38, 38)' : 'white'}>
              <Flex
                paddingTop={3}
                paddingBottom={3}
                flexDirection={'column'}
                gap={1}
                justifyContent={'center'}
                alignItems={'center'}>
                <Text fontSize={20} fontWeight={500}>
                  Discard post?
                </Text>
                <Text
                  fontSize={14}
                  fontWeight={400}
                  color={colorMode === 'dark' ? 'rgb(168, 168, 168)' : 'rgba(115,115,115,1)'}>
                  If you leave, your edits won't be saved.
                </Text>
              </Flex>
            </AlertDialogHeader>
            <AlertDialogBody padding={0} bg={colorMode === 'dark' ? 'rgb(38, 38, 38)' : 'white'}>
              <Flex flexDirection={'column'}>
                <Button
                  bg={'transparent'}
                  color={'rgba(237, 73, 86, 1)'}
                  fontWeight={700}
                  fontSize={15}
                  borderRadius={0}
                  paddingTop={6}
                  outline={'none'}
                  paddingBottom={6}
                  onClick={handleConfirmClose}
                  borderTop={
                    colorMode === 'dark'
                      ? '1px solid rgb(54, 54, 54)'
                      : '1px solid rgb(219, 219, 219)'
                  }
                  borderBottom={
                    colorMode === 'dark'
                      ? '1px solid rgb(54, 54, 54)'
                      : '1px solid rgb(219, 219, 219)'
                  }
                  width={'100%'}>
                  Discard
                </Button>
                <Button
                  bg={'transparent'}
                  ref={cancelRef}
                  paddingTop={6}
                  fontSize={15}
                  outline={0}
                  paddingBottom={6}
                  onClick={() => setIsAlertOpen(false)}
                  width={'100%'}>
                  Cancel
                </Button>
              </Flex>
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default CreatePost;
