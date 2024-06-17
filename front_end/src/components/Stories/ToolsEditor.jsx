import { CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  useColorMode
} from '@chakra-ui/react';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { Grid } from '@giphy/react-components';
import Picker from 'emoji-picker-react';
import { fabric } from 'fabric';
import { useEffect, useState } from 'react';
import { CgColorPicker } from 'react-icons/cg';
import { CiFaceSmile } from 'react-icons/ci';
import { PiGifLight } from 'react-icons/pi';

const giphyFetch = new GiphyFetch('42TiVNTZnnYiLDyXT446W7eFreyCOJQQ');

const ToolsEditor = ({ canvas }) => {
  const [textColor, setTextColor] = useState('#ffffff');
  const [selectedFont, setSelectedFont] = useState('Arial');
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedFontIndex, setSelectedFontIndex] = useState(0);
  const [brushSize, setBrushSize] = useState(5);
  const { colorMode } = useColorMode();

  const popularFonts = [
    'Arial',
    'Helvetica',
    'Times New Roman',
    'Courier New',
    'Verdana',
    'Georgia',
    'Palatino',
    'Garamond',
    'Bookman',
    'Comic Sans MS',
    'Trebuchet MS',
    'Arial Black',
    'Impact',
    'Lucida Sans Unicode',
    'Tahoma'
  ];

  useEffect(() => {
    if (canvas) {
      canvas.isDrawingMode = isDrawing;
      if (isDrawing) {
        canvas.freeDrawingBrush.color = textColor;
        canvas.freeDrawingBrush.width = brushSize;
      }
    }
  }, [isDrawing, canvas, textColor, brushSize]);

  const handleAddText = () => {
    const text = new fabric.IText('Type your text', {
      left: 50,
      top: 100,
      fill: textColor,
      fontSize: 20,
      fontFamily: selectedFont,
      selectable: true,
      editingBorderColor: 'blue',
      borderColor: 'blue',
      cornerColor: 'blue'
    });
    canvas.add(text);
    text.bringToFront();
    canvas.setActiveObject(text);
    text.enterEditing();
  };

  const handleColorChange = (e) => {
    setTextColor(e.target.value);
  };

  const handleTextChange = (e) => {
    setTextColor(e.target.value);
  };

  const handleFontChange = () => {
    const nextFontIndex = (selectedFontIndex + 1) % popularFonts.length;
    setSelectedFontIndex(nextFontIndex);
    setSelectedFont(popularFonts[nextFontIndex]);
  };

  const handleDelete = () => {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.remove(activeObject);
    }
  };

  const fetchGifs = (offset) => giphyFetch.trending({ offset, limit: 10 });

  const handleGifSelect = (gif) => {
    fabric.Image.fromURL(
      gif.images.original.url,
      (img) => {
        img.set({
          left: 50,
          top: 50,
          scaleX: 0.5,
          scaleY: 0.5,
          selectable: true
        });
        canvas.add(img);
        img.bringToFront();
      },
      { crossOrigin: 'anonymous' }
    );
    setShowGifPicker(false);
  };

  const onEmojiClick = (emojiObject) => {
    console.log(emojiObject)
    const emojiImage = new Image();
    emojiImage.src = emojiObject.imageUrl;
    emojiImage.onload = () => {
      const fabricImage = new fabric.Image(
        emojiImage,
        {
          left: 50,
          top: 50,
          width: emojiObject.size,
          height: emojiObject.size,
          selectable: true,
          scaleX: 0.5,
          scaleY: 0.5
        },
        { crossOrigin: 'anonymous' }
      );
      canvas.add(fabricImage);
      setShowEmojiPicker(false);
    };
  };

  return (
    <Box
      height="100%"
      width="160px"
      ml="4"
      justifyContent="space-between"
      marginTop="10px"
      position="relative">
      <Box
        display="flex"
        alignItems="center"
        boxShadow="2xl"
        bg={colorMode === 'dark' ? 'rgba(0, 0, 0, .05)' : 'whiteAlpha.400'}
        borderRadius="md"
        mb="6">
        <IconButton
          icon={<DeleteIcon />}
          aria-label="Delete"
          onClick={handleDelete}
          colorScheme="red"
          bg="#ddd"
          _hover={{ bg: 'transparent', color: '#ccc' }}
          _active={{ bg: 'transparent' }}
          _focus={{ boxShadow: 'none' }}
          fontSize="24"
          m="2"
          ml="4"
        />
        <Text color={colorMode === 'dark' ? 'white' : 'black'}>Delete</Text>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        boxShadow="2xl"
        bg={colorMode === 'dark' ? 'rgba(0, 0, 0, .05)' : 'whiteAlpha.400'}
        borderRadius="md"
        mb="6">
        <IconButton
          color="black"
          icon={<PiGifLight />}
          colorScheme="facebook"
          _hover={{ bg: 'blue.500' }}
          onClick={() => setShowGifPicker(!showGifPicker)}
          fontSize="30px"
          m="2"
          ml="4"
        />
        <Text color={colorMode === 'dark' ? 'white' : 'black'}>Add GIF</Text>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        boxShadow="2xl"
        bg={colorMode === 'dark' ? 'rgba(0, 0, 0, .05)' : 'whiteAlpha.400'}
        borderRadius="md"
        mb="6">
        <IconButton
          color="red"
          icon={<CiFaceSmile />}
          colorScheme="orange"
          _hover={{ bg: 'black', color: '#fff' }}
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          fontSize="30px"
          m="2"
          ml="4"
        />
        <Text color={colorMode === 'dark' ? 'white' : 'black'}>Add icons</Text>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        boxShadow="2xl"
        bg={colorMode === 'dark' ? 'rgba(0, 0, 0, .05)' : 'whiteAlpha.400'}
        borderRadius="md"
        mb="6">
        <IconButton
          icon={<EditIcon />}
          colorScheme={isDrawing ? 'green' : 'gray'}
          onClick={() => setIsDrawing(!isDrawing)}
          aria-label="Toggle drawing mode"
          bg="green.300"
          _hover={{ bg: 'green.500' }}
          m="2"
          ml="4"
        />
        <Text color={colorMode === 'dark' ? 'white' : 'black'}>Draw</Text>
      </Box>
      <Box boxShadow="xl" display="grid" padding="2" borderRadius="2xl">
        <Text mb="2" color="white">
          Brush Size
        </Text>
        <Slider
          aria-label="brush-size-slider"
          value={brushSize}
          min={1}
          max={50}
          onChange={(val) => setBrushSize(val)}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb boxSize={6} />
        </Slider>
      </Box>
      <Box boxShadow="xl" display="grid" padding="2" borderRadius="2xl" mt={5}>
        <Button
          onClick={handleFontChange}
          mb="4"
          fontFamily={selectedFont}
          color="white"
          fontSize="48"
          p="10">
          {' '}
          Abc
        </Button>
        <Box>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<CgColorPicker color="gray" fontSize="24px" />}
            />
            <Input type="color" value={textColor} onChange={handleColorChange} />
          </InputGroup>
          <InputGroup>
            <InputLeftElement pointerEvents="none" />
            <Input
              type="text"
              value={textColor}
              onChange={handleTextChange}
              placeholder="Text color"
              focusBorderColor="black"
              fontSize="20"
              paddingLeft="3"
              marginTop="2"
              textAlign="center"
              _focus={{ border: '#ccc' }}
            />
          </InputGroup>
          <Button colorScheme="gray" color="gray" onClick={handleAddText} mt="3" width="100%">
            Add Text
          </Button>
        </Box>
      </Box>

      <Box position="absolute" top="0" left="-100">
        {showGifPicker && (
          <Box bg="white" p="4" pt="8" borderRadius="md" overflow="auto" maxHeight="80vh">
            <Grid
              key="gifs"
              width={600}
              columns={3}
              gutter={6}
              fetchGifs={fetchGifs}
              onGifClick={(gif, e) => {
                e.preventDefault();
                handleGifSelect(gif);
              }}
            />
            <IconButton
              icon={<CloseIcon />}
              position="absolute"
              top="-1"
              right="3"
              colorScheme="red"
              onClick={() => setShowGifPicker(false)}
              bg="transparent"
              _hover={{ bg: 'transparent' }} // Optional: To ensure the background remains transparent on hover
              _active={{ bg: 'transparent' }} // Optional: To ensure the background remains transparent on active
              _focus={{ boxShadow: 'none' }} // Optional: To remove the focus outline
            />
          </Box>
        )}
        {showEmojiPicker && (
          <Box pt="8" bg="white" borderRadius="lg" boxShadow="2xl" position="relative">
            <Picker onEmojiClick={(emojiObject) => onEmojiClick(emojiObject)} />
            <IconButton
              icon={<CloseIcon />}
              position="absolute"
              top="0"
              right="0"
              colorScheme="red"
              onClick={() => setShowEmojiPicker(false)}
              bg="transparent"
              _hover={{ bg: 'transparent' }} // Optional: To ensure the background remains transparent on hover
              _active={{ bg: 'transparent' }} // Optional: To ensure the background remains transparent on active
              _focus={{ boxShadow: 'none' }} // Optional: To remove the focus outline
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ToolsEditor;
