import { Box, Image } from "@chakra-ui/react";

import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";

const FeedPost = ({ img, username, avatar }) => {
  return (
    <>
      <PostHeader username={username} avatar={avatar} />
      <Box my={2} borderRadius={4} overflow={"hidden"}>
        {/* sua khi get tu backend */}
        <Image src={img} alt={username} />
      </Box>
      <PostFooter username={username} />
    </>
  );
};

export default FeedPost;
