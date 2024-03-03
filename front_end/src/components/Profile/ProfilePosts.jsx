import { Grid, GridItem, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import ProfilePost from "./ProfilePost";

function ProfilePosts() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <Grid
      templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
      gap={1}
      columnGap={1}
    >
      {isLoading && (
        <GridItem
          colSpan={3}
          minH={150}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Spinner color="white.500" size={"xl"} alignItems={"center"} />
        </GridItem>
      )}

      {!isLoading && (
        <>
          <ProfilePost img="/img1.png" />
          <ProfilePost img="/img2.png" />
          <ProfilePost img="/img3.png" />
          <ProfilePost img="/img4.png" />
          <ProfilePost img="/img1.png" />
          <ProfilePost img="/img2.png" />
        </>
      )}
    </Grid>
  );
}

export default ProfilePosts;
