import { CSSProperties, memo, FC, useRef, cloneElement, useState, useEffect } from "react";
import { Box, IconButton, Text, FormControl, FormHelperText } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";

type ModalProps = {
  type?: "blur" | "default";
  modalColor?: CSSProperties['backgroundColor'];
  children: JSX.Element;
  onClose?: () => void;
  onOutsideClick?: () => void;
};

export const ModalContainer: FC<Pick<ModalProps, "children" | "onClose">> = memo(({ children, onClose }) => {
  return (
    <div className={styles["modal-content-container"]}>
      { cloneElement(children, { onClose }) }
    </div>
  );
});


export const Modal: FC<ModalProps> = memo(({ type = "default", modalColor, children, onClose, onOutsideClick }) => {
  const modal = useRef<HTMLDivElement>(null);

  const close = () => {
    modal.current!.classList.add(styles["modal-remove"]);
    setTimeout(() => {
      onClose && onClose();
    }, 300);
  };

  useEffect(() => {
    document.body.classList.add("modal-open");

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);

  return (
    createPortal(
      <div 
        ref={modal}
        onClick={onOutsideClick}
        className={styles[`${type}-modal`]} 
        style={{ backgroundColor: modalColor }}>
          {/* <ModalContainer children={children} onClose={close} /> */}
          {children}
      </div>,
      document.body,
    )

  );
});

export const Dialog: FC<Pick<ModalProps, 'onClose'>> = ({ onClose }) => {
  return (
    <Box h="full" mt="24">
      <Box p="6" display="flex" gap="6" flexDirection="column" w="100vh" maxW="500px" bg="white" rounded="lg" shadow="lg" border="1px" borderColor="gray.300">
        <IconButton alignSelf="end" bg="transparent" aria-label="Close" icon={<CloseIcon color="gray.400"/>} onClick={onClose} />
        <Box>
          <Text>dialog</Text>
        </Box>
      </Box>
    </Box>
  );
};


export const NDialog: FC<Pick<ModalProps, 'onClose'>> = ({ onClose }) => {
  const [L, setL] = useState(0);
  const [C, setC] = useState(0);
  const [H, setH] = useState(0);

  const style: CSSProperties = {
    backgroundColor: `oklch(${L}% ${C / 100} ${H})`,
  };

  return (
    <Box h="full" mt="24">
      <Box p="6" display="flex" gap="6" flexDirection="column" w="100vh" maxW="500px" bg="white" rounded="lg" shadow="md">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Text as="h3">OKLCH</Text>
          <IconButton bg="transparent" aria-label="Close" icon={<CloseIcon />} onClick={onClose} />
        </Box>
        <Box>
          <FormControl>
            <FormHelperText>L: {L}%</FormHelperText>
            <input type="range" max="100" min="0" value={L} onChange={(e) => setL(parseInt(e.target.value))}/>
          </FormControl>
          <FormControl>
            <FormHelperText>C: {C / 100}</FormHelperText>
            <input type="range" max="100" min="0" value={C} onChange={(e) => setC(parseInt(e.target.value))}/>            
          </FormControl>
          <FormControl>
            <FormHelperText>H: {H}</FormHelperText>
            <input type="range" max="360" min="0" value={H} onChange={(e) => setH(parseInt(e.target.value))}/>            
          </FormControl>
        </Box>
        <Box style={style} w="48" h="48"></Box>
      </Box>
    </Box>
  );
};


