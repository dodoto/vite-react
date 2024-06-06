import { Outlet, useNavigate } from "react-router-dom";
import { IconButton, Box } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";


export const Layout = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box pos="fixed" right="4" top="50%" zIndex={99} transform="translateY(-50%)">
        <IconButton icon={<CloseIcon />} aria-label="close" onClick={() => navigate(-1)}/>
      </Box>
      <Outlet/>
    </>
  );
};