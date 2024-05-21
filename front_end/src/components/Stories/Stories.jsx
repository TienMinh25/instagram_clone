import { Box, Container, Flex, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import Story from './Story';
import { useRef, useState, useEffect } from 'react';
import AddStoryForm from './AddStoryForm';
import React from 'react';

function Stories() {
  const scrollRef = useRef();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isShowAddStoryForm, setShowAddStoryForm] = useState(false);
  const checkScrollPosition = () => {
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -150, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 150, behavior: 'smooth' });
  };

  useEffect(() => {
    checkScrollPosition();
    scrollRef.current.addEventListener('scroll', checkScrollPosition);
    return () => scrollRef.current.removeEventListener('scroll', checkScrollPosition);
  }, []);

  // show form add story
  const showForm = () => {
    setShowAddStoryForm(true);
  };
  const closeForm = () => {
    setShowAddStoryForm(false);
  };

  return (
    <Container maxW="70%" px={0} position="relative" p={1}>
      {canScrollLeft && (
        <IconButton
          icon={<ChevronLeftIcon />}
          position="absolute"
          left={0}
          top="50%"
          transform="translateY(-50%)"
          zIndex={3}
          onClick={scrollLeft}
          aria-label="Scroll Left"
          fontSize="14"
          borderRadius="full"
          background="#aaa"
        />
      )}
      <Flex
        ref={scrollRef}
        alignItems={'flex-start'}
        gap={8}
        overflowX={'auto'}
        css={{
          '&::-webkit-scrollbar': {
            height: '0px',
            background: 'transparent',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: 'transparent',
          },
          position: 'relative'
        }}
        px={3}
      >
        <Story avatar="" name="Your story" showAddIcon={true} onClick={showForm} />
        <Story avatar="/img1.png" name="Sarah" />
        <Story avatar="/img2.png" name="John Doe" />
        <Story avatar="/img3.png" name="Jame Harden" />
        <Story avatar="/img4.png" name="Tom John" />
        <Story avatar="/img2.png" name="Jane" />
        <Story avatar="/img3.png" name="xsmTradingForex" />
        <Story avatar="/img4.png" name="BabyTell" />
        <Story avatar="/img4.png" name="Lay" />
      </Flex>
      {canScrollRight && (
        <IconButton
          icon={<ChevronRightIcon />}
          position="absolute"
          right={0}
          top="50%"
          transform="translateY(-50%)"
          zIndex={3}
          onClick={scrollRight}
          aria-label="Scroll Right"
          fontSize="14"
          borderRadius="full"
          background="#aaa"

        />
      )}
      {isShowAddStoryForm && (
        <Box position="absolute" margin='auto' zIndex={10}>
          <AddStoryForm closeForm={closeForm} />
        </Box>
      )}
    </Container>
  );
}

export default Stories;
