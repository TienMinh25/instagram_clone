import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { Box, IconButton, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react';
import { AttachmentIcon } from '@chakra-ui/icons';

const ImageEditor = ({ setCanvas, onImageSelected, triggerConfirmModal, onConfirmModalClose, onCancel }) => {
  const inputRef = useRef();
  const canvasRef = useRef(null);
  const canvas = useRef(null);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);

  useEffect(() => {
    const initCanvas = () => {
      const c = new fabric.Canvas('canvas', {
        height: 640,
        width: 360,
      });
      setCanvas(c);
      canvas.current = c;
    };
    initCanvas();
  }, [setCanvas]);

  useEffect(() => {
    if (triggerConfirmModal) {
      setConfirmationModalOpen(true);
      onConfirmModalClose();
    }
  }, [triggerConfirmModal, onConfirmModalClose]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (f) => {
      const data = f.target.result;
      // Add crossOrigin when loading image
      fabric.Image.fromURL(data, (img) => {
        addImageToCanvas(img);
        onImageSelected();
      }, { crossOrigin: 'anonymous' });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onload = (f) => {
      const data = f.target.result;
      // Add crossOrigin when loading image
      fabric.Image.fromURL(data, (img) => {
        addImageToCanvas(img);
        onImageSelected();
      }, { crossOrigin: 'anonymous' });
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const addImageToCanvas = (img) => {
    let scaleX = 1;
    let scaleY = 1;
    const maxWidth = 360;
    const maxHeight = 640;

    // Calculate scaling ratios for the image
    if (img.width > maxWidth || img.height > maxHeight) {
      scaleX = maxWidth / img.width;
      scaleY = maxHeight / img.height;
    }

    // Calculate positions to center the image
    const left = (maxWidth - img.width * scaleX) / 2;
    const top = (maxHeight - img.height * scaleY) / 2;

    img.set({
      left: left,
      top: top,
      scaleX: scaleX,
      scaleY: scaleY,
      selectable: true,
    });

    canvas.current.add(img);
    img.sendToBack();
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleClose = () => {
    setConfirmationModalOpen(true);
  };

  const handleContinueEditing = () => {
    setConfirmationModalOpen(false);
  };

  const handleSave = () => {
    const dataURL = canvas.current.toDataURL({
      format: 'png',
      quality: 0.8,
    });

    // Create a link element
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'canvas-image.png';

    // Append to the document body
    document.body.appendChild(link);

    // Programmatically trigger a click on the link to download the image
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);

    console.log('Saved Image Data URL:', dataURL);
    setConfirmationModalOpen(false);
  };

  const handleCancel = () => {
    setConfirmationModalOpen(false);
  };

  return (
    <Box>
      <Box>
        <Input type="file" ref={inputRef} onChange={handleFileChange} display="none" />
        <IconButton
          icon={<AttachmentIcon />}
          onClick={handleClick}
          colorScheme="teal"
          aria-label="Upload file"
        />
      </Box>
      <Box
        ref={canvasRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        bgColor="#f0f0f0"
        border="1px solid #ccc"
        borderRadius="3px"
        mt="4"
        height="660px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        padding="4px"
        overflow="hidden"
      >
        <canvas id="canvas" />
      </Box>


      <Modal isOpen={isConfirmationModalOpen} onClose={handleCancel}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Action</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to close the editor?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleContinueEditing}>
              Tiếp tục chỉnh sửa
            </Button>
            <Button colorScheme="green" mr={3} onClick={handleSave}>
              Lưu lại
            </Button>
            <Button colorScheme="red" onClick={onCancel}>
              Hủy
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ImageEditor;
