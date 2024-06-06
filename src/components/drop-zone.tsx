import { Box, Container, Text } from '@chakra-ui/react';
import {useRef, useState, DragEventHandler, useCallback, useEffect} from 'react';

export const useDrop = (dropCallback?: (dataTransfer: DataTransfer) => void) => {
  const [isDragEnter, setIsDragEnter] = useState(false);
  const targetNode = useRef<any>(null);

  const handleDragEnter: DragEventHandler = (evt) => {
    if (targetNode.current === null) {
      setIsDragEnter(true);
    }
    targetNode.current = evt.target;
  };

  const handleDragOver: DragEventHandler = (evt) => {
    evt.preventDefault();
  };

  const handleDrop: DragEventHandler = (evt) => {
    evt.preventDefault();
    setIsDragEnter(false);
    targetNode.current = null;
    dropCallback?.(evt.dataTransfer);
  };

  const handleDragLeave: DragEventHandler = (evt) => {
    if (targetNode.current === evt.target) {
      setIsDragEnter(false);
      targetNode.current = null;
    }
  };

  return {
    isDragEnter,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
};

export const DropZone = () => {
  const [files, setFiles] = useState<File[]>([]);

  const drop = useCallback((dataTransfer: DataTransfer) => {
    console.log(dataTransfer);
    if (dataTransfer.files.length) {
      setFiles(p => p.concat(Array.from(dataTransfer.files)).reduce((arr: File[], cur) => {
        const existFile = arr.find(item => item.name === cur.name && item.type === cur.type);
        if (!existFile) {
          arr.push(cur);
        }
        return arr;
      }, []));
    }
  }, []);

  const {
    isDragEnter,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  } = useDrop(drop);
  
  useEffect(() => {
    console.log(files);
  }, [files]);

  return (
    <Container h="100vh" display="flex" justifyContent="center" alignItems="center">
      <Box p="10" bg="gray.100" borderRadius="lg">
        <Box 
          p="20" 
          h="full" 
          bg="gray.200" 
          borderRadius="lg"
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}>
            <Text as="p" textAlign="center" w="10ch">
              { 
                isDragEnter ? 
                  "Drop Here" :
                  `"There is ${files.length} file on Drop Zone"`  
              }
            </Text>
        </Box>
      </Box>
    </Container>
  );
};