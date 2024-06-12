import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { Box, useColorMode, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react';
import DragNdrop from './DragNDrop';

const ImageEditor = ({ setCanvas, onImageSelected, triggerConfirmModal, onConfirmModalClose, onCancel }) => {
  const canvasRef = useRef(null);
  const canvas = useRef(null);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const { colorMode } = useColorMode();

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

  const handleFilesSelected = (selectedFiles) => {
    setFiles(selectedFiles);
    selectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (f) => {
        const data = f.target.result;
        fabric.Image.fromURL(data, (img) => {
          addImageToCanvas(img);
          onImageSelected();
        }, { crossOrigin: 'anonymous' });
      };
      reader.readAsDataURL(file);
    });
  };

  const addImageToCanvas = (img) => {
    const maxWidth = 360;
    const maxHeight = 640;
    let scaleX = maxWidth / img.width;
    let scaleY = maxHeight / img.height;

    if (scaleX < scaleY) {
      scaleY = scaleX;
    } else {
      scaleX = scaleY;
    }

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

    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'canvas-image.png';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setConfirmationModalOpen(false);
  };

  const handleCancel = () => {
    setConfirmationModalOpen(false);
  };

  return (
    <Box>
      <Box
        ref={canvasRef}
        position="relative"
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
        {files.length === 0 && <DragNdrop onFilesSelected={handleFilesSelected} />}
      </Box>

      <Modal isOpen={isConfirmationModalOpen} onClose={handleCancel}>
        <ModalOverlay />
        <ModalContent
          bg={colorMode === 'dark' ? '#262626' : 'white'}>
          <ModalHeader textAlign="center">Discard your story</ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign="center">
            Are you sure you want to close the editor?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleContinueEditing}>
              Continue Editing
            </Button>
            <Button colorScheme="green" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button colorScheme="red" onClick={onCancel}>
              Discard
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ImageEditor;
