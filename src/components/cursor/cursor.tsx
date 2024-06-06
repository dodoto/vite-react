import { useEffect, useRef, FC, PropsWithChildren, cloneElement } from "react";
import { Box, ChakraComponent } from "@chakra-ui/react";



export const CursorTarget: ChakraComponent<"div", {}> = ({ children, ...props }) => {
  return (
    <Box className="cursor-target" h="fit-content" w="fit-content" color="#fff" {...props}>
      {children}
    </Box>
  );
};

export const Cursor = () => {
  const innerCursorRef = useRef<HTMLDivElement>(null);
  const outterCursorRef = useRef<HTMLDivElement>(null);
  // const isHovering = useRef(false);

  useEffect(() => {
    const innerCursor = innerCursorRef.current!;
    const outterCursor = outterCursorRef.current!;
    const halfInnerCursorWidth = innerCursor.offsetWidth / 2;
    const halfOutterCursorWidth = outterCursor.offsetWidth / 2;
    let isHovering = false;

    const handleMouseover = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains("cursor-target")) {
        isHovering = true;

        const rect = target.getBoundingClientRect();
        const style = window.getComputedStyle(target);

        outterCursor.style.width = `${rect.width + 20}px`;
        outterCursor.style.height = `${rect.height + 20}px`;
        outterCursor.style.borderRadius = `${style.borderRadius}`;
        outterCursor.style.transform = `translate(${rect.left - 10}px, ${rect.top - 10
          }px)`;
      }
    };

    const handleMouseout = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains("cursor-target")) {
        isHovering = false;

        outterCursor.style.width = "42px";
        outterCursor.style.height = "42px";
        outterCursor.style.borderRadius = "50%";
      }
    };

    const handleMousemove = (event: MouseEvent) => {
      window.requestAnimationFrame(() => {
        innerCursor.style.transform = `translate(${event.clientX - halfInnerCursorWidth}px, ${event.clientY - halfInnerCursorWidth}px)`;

        if (!isHovering) {
          outterCursor.style.transform = `translate(${event.clientX - halfOutterCursorWidth}px, ${event.clientY - halfOutterCursorWidth}px)`;
        }
      });
    };

    

    window.addEventListener("mouseover", handleMouseover);
    window.addEventListener("mouseout", handleMouseout);
    window.document.body.addEventListener("mousemove", handleMousemove);

    return () => {
      window.removeEventListener("mouseover", handleMouseover);
      window.removeEventListener("mouseout", handleMouseout);
      window.document.body.removeEventListener("mousemove", handleMousemove);
    };
  }, []);

  return (
    <>
      <Box ref={outterCursorRef}
        pos="fixed"
        top="0"
        left="0"
        w="42px"
        h="42px"
        background="#999"
        borderRadius="50%"
        zIndex={1}
        mixBlendMode="exclusion"
        pointerEvents="none"
        transition=".15s ease-out"
      />
      <Box ref={innerCursorRef}
        pos="fixed"
        top="0"
        left="0"
        w="12px"
        h="12px"
        background="#4caf50"
        borderRadius="50%"
        zIndex={1}
        mixBlendMode="exclusion"
        pointerEvents="none"
      />
    </>
  );
};

export const CursorDemo = () => {
  return (
    <Box h="100vh" display="flex" flexDirection="column" alignItems="center" cursor="none" overflow="hidden" p="40px" gap="20px">
      <CursorTarget borderRadius="5px">
        <Box
          padding="20px"
          w="400px"
          fontSize="24px"
          lineHeight={1.5}
          textAlign="center"
          background="#42b983"
          borderWidth="3px"
          borderColor="#333"
          
          pointerEvents="none"
        >
          this is cursor target 1
        </Box>
      </CursorTarget>
      <CursorTarget>
        <Box
          padding="20px"
          w="400px"
          fontSize="24px"
          lineHeight={1.5}
          textAlign="center"
          background="#ff8c00"
          borderWidth="3px"
          borderColor="#333"
          pointerEvents="none"
        >
          this is cursor target 2
        </Box>
      </CursorTarget>
      <CursorTarget borderRadius="50%">
        <Box
          padding="20px"
          w="240px"
          h="240px"
          borderRadius="50%"
          textAlign="center"
          background="#673ab7"
          pointerEvents="none"
          lineHeight="200px"
        >
          this is cursor target 3
        </Box>
      </CursorTarget>
      <Cursor />
    </Box>
  );
};