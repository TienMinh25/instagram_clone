import { Container, Flex } from "@chakra-ui/react";
import Story from "./Story";

function Stories() {
  return (
    <Container>
      <Flex
        alignItems={"flex-start"}
        gap={8}
        overflow={"scroll"}
        css={{
          "&::-webkit-scrollbar": {
            width: "0px",
            background: "transparent",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "transparent",
          },
        }}
        px={3}
      >
        <Story avatar="/img1.png" name="Sarah" />
        <Story avatar="/img2.png" name="John Doe" />
        <Story avatar="/img3.png" name="Jame Harden" />
        <Story avatar="/img4.png" name="Tom John" />
        <Story avatar="/img2.png" name="Jane" />
        <Story avatar="/img3.png" name="xsmTradingForex" />
        <Story avatar="/img4.png" name="BabyTell" />
        <Story avatar="/img4.png" name="Lay" />
      </Flex>
    </Container>
  );
}

export default Stories;
