import { Excalidraw } from "@excalidraw/excalidraw";
import { Box } from "@chakra-ui/react";

export const ExcalidrawIntegration = () => {
  return (
    <Box h="100vh">
      <Excalidraw langCode="zh-CN"/>
    </Box>
  );
};