import { Box, Button, Text, Input, Image, IconButton } from '@chakra-ui/react';
import { useState, useRef } from 'react';
import { CloseIcon, AttachmentIcon } from '@chakra-ui/icons';

function AddStoryForm({ closeForm }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [storyContent, setStoryContent] = useState('');
    const inputRef = useRef();

    const handleClick = () => {
        inputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    const handleSubmit = () => {
        // Reset nội dung của story và file sau khi gửi
        setStoryContent('');
        setSelectedFile(null);
        setPreviewImage(null);
        // Đóng form sau khi gửi
        closeForm();
    };

    return (
        <Box w="640px" m="auto" bg="#fff" p="4" borderRadius="lg" boxShadow="lg" position="relative">
            <IconButton
                icon={<CloseIcon />}
                aria-label="Close"
                position="absolute"
                top="1"
                right="1"
                onClick={closeForm}
                style={{ color: "black" }}
            />
            <Text fontSize={15} fontWeight={'medium'} align="center" isTruncated color="#000">
                Add your story
            </Text>
            <Box className='main-content__story' display="flex" justifyContent="space-between" height="480px" width="100%">
                <Box bgColor="#ccc" border="#ddd 1px solid" borderRadius="3px" width="75%" mt="4" height="400px" display="flex" justifyContent="center" padding="4px">
                    {previewImage && (
                        <Image src={previewImage} height="100%" alt="Preview Image" objectFit="cover" />
                    )}
                </Box>
                <Box className='main-editor' height="100%" width="10%">
                    <Box right="0" display="flex" flexDirection="column" justifyContent="space-between" height="100%">
                        <Input
                            type="file"
                            ref={inputRef}
                            onChange={handleFileChange}
                            display="none"
                        />
                        <IconButton
                            icon={<AttachmentIcon />}
                            onClick={handleClick}
                            colorScheme="teal"
                            aria-label="Upload file"
                            mb="4"
                        />
                        <Button colorScheme="blue" onClick={handleSubmit}>
                            Post
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default AddStoryForm;
