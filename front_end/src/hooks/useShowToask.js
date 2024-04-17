import { useToast } from "@chakra-ui/react";

const useShowToask = () => {
  const toast = useToast();
  const showToast = (title, description = null, status) => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 3000,
      isClosable: true,
    });
  };
  return showToast;
};

export default useShowToask;
