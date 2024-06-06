import { Container, Box, Image, Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import Avatar1 from "../../assets/avatar-1.jpg";
import "./preset-clip-path.css";
import { ChevronDownIcon } from "@chakra-ui/icons";

const MASK_SHAPES = [
  "square",
  "triangle",
  "trapezoid",
  "parallelogram",
  "rhombus",
  "pentagon",
  "hexagon",
  "heptagon",
  "octagon",
  "nonagon",
  "decagon",
  "bevel",
  "rabbet",
  "frame",
  "circle",
  "star",
] as const;

type ShapeSelectProps = {
  onSelect: (index: number) => void;
};

const ShapeSelect = ({ onSelect }: ShapeSelectProps) => {
  const [shapeIndex, setShapeIndex] = useState(0);

  const handleSelct = (index: number) => {
    setShapeIndex(index);
    onSelect(index);
  };

  return (
    <Box my="1.5">
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          {MASK_SHAPES[shapeIndex]}
        </MenuButton>
        <MenuList>
          {
            MASK_SHAPES.map((shape, index) => (
              <MenuItem key={shape} onClick={() => handleSelct(index)}>{shape}</MenuItem>
            ))
          }
        </MenuList>
      </Menu>
    </Box>
  );


};

const FingerPrint = () => {
  const [offset, setOffset] = useState(179.1510009765625);
  const ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = ref.current!;
    const length = path.getTotalLength();
    // console.log(length); // 179.1510009765625
    const dest = 120;

    let tmp = 179.1510009765625;
    const step = 0.5;
    const loop = () => {
      setOffset(p => p - step);
      tmp -= step;
      if (tmp > dest) {
        requestAnimationFrame(loop);
      }
    };
    loop();
  }, []);

  return (
    <Box w="200px" h="200px">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path strokeDashoffset={offset} strokeDasharray="179.1510009765625" fill="none" stroke="rgb(20, 156, 250)" ref={ref} d="M17.0003 13V14C17.0003 16.7696 16.3364 19.445 15.0853 21.8455L14.8585 22.2663L13.1116 21.2924C14.2716 19.2115 14.9211 16.8817 14.9935 14.4559L15.0003 14V13H17.0003ZM11.0003 10H13.0003V14L12.9948 14.3787C12.9153 17.1495 11.9645 19.7731 10.3038 21.928L10.073 22.2189L8.52406 20.9536C10.0408 19.0969 10.9145 16.8017 10.9943 14.3663L11.0003 14V10ZM12.0003 6C14.7617 6 17.0003 8.23858 17.0003 11H15.0003C15.0003 9.34315 13.6571 8 12.0003 8C10.3434 8 9.00025 9.34315 9.00025 11V14C9.00025 16.2354 8.1806 18.3444 6.72928 19.9768L6.51767 20.2067L5.06955 18.8273C6.23328 17.6056 6.92099 16.0118 6.99381 14.3027L7.00025 14V11C7.00025 8.23858 9.23883 6 12.0003 6ZM12.0003 2C16.9708 2 21.0003 6.02944 21.0003 11V14C21.0003 15.6979 20.7985 17.3699 20.4035 18.9903L20.2647 19.5285L18.3349 19.0032C18.726 17.5662 18.9475 16.0808 18.9919 14.5684L19.0003 14V11C19.0003 7.13401 15.8662 4 12.0003 4C10.4279 4 8.97663 4.51841 7.80805 5.39364L6.38308 3.96769C7.92267 2.73631 9.87547 2 12.0003 2ZM4.96794 5.38282L6.39389 6.8078C5.5635 7.91652 5.0543 9.27971 5.00431 10.7593L4.99961 10.999L5.00378 13C5.00378 14.1195 4.73991 15.2026 4.24263 16.1772L4.08648 16.4663L2.34961 15.4747C2.72889 14.8103 2.95077 14.0681 2.99539 13.2924L3.00378 13L3.00361 11C3.00025 8.87522 3.73656 6.92242 4.96794 5.38282Z"></path>
      </svg>
    </Box>
  );
};

const BOX_SIZE = 400;
const MIN_SIZE = 100;
const MAX_SIZE = 300;

export const ImageMask = () => {
  const [pos, setPos] = useState({ top: 100, right: 100, bottom: 100, left: 100 });
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [dragState, setDragState] = useState<"on" | "off">("off");
  const [resizeState, setResizeState] = useState<"top-left" | "top-right" | "bottom-right" | "bottom-left">();
  const [shapeIndex, setShapeIndex] = useState(0);
  const drag = useRef({ beginTransX: 0, beginTransY: 0, startX: 0, startY: 0 });
  const resize = useRef({ beginX: 0, beginY: 0, startX: 0, startY: 0 });

  const cursor = dragState === "on" ? "grabbing" : "grab";

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setDragState("on");
    Object.assign(drag.current, {
      beginTransX: translate.x,
      beginTransY: translate.y,
      startX: e.clientX,
      startY: e.clientY,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {

    if (dragState === "on") {
      const x = drag.current.beginTransX + e.clientX - drag.current.startX;
      const y = drag.current.beginTransY + e.clientY - drag.current.startY;
      setTranslate({
        x: Math.max(Math.min(x, pos.right), -pos.left),
        y: Math.max(Math.min(y, pos.bottom), -pos.top),
      });
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    e.preventDefault();
    setDragState("off");
  };

  const handleResizeStart = (event: React.MouseEvent, type: typeof resizeState) => {
    event.stopPropagation();
    setResizeState(type);
    switch (type) {
      case "top-left":
        resize.current.beginX = pos.left;
        resize.current.beginY = pos.top;
        break;
      case "top-right":
        resize.current.beginX = pos.right;
        resize.current.beginY = pos.top;
        break;
      case "bottom-right":
        resize.current.beginX = pos.right;
        resize.current.beginY = pos.bottom;
        break;  
      default:
        resize.current.beginX = pos.left;
        resize.current.beginY = pos.bottom;
        break;
    }
    resize.current.startX = event.clientX;
    resize.current.startY = event.clientY;
  };

  const handleTopLeftResize = (event: React.MouseEvent) => {
    if (resizeState === "top-left") {
      console.log(resize.current.beginX + event.clientX - resize.current.startX, resize.current.beginY + event.clientY - resize.current.startY);
      setPos(p => ({
        ...p,
        left: resize.current.beginX + event.clientX - resize.current.startX, 
        top: resize.current.beginY + event.clientY - resize.current.startY,
      })); 
    }
  };

  const handleTopRightResize = (event: React.MouseEvent) => {
    if (resizeState === "top-right") {
      setPos(p => ({
        ...p,
        left: resize.current.beginX + event.clientX - resize.current.startX, 
        top: resize.current.beginY + event.clientY - resize.current.startY,
      })); 
    }
  };

  const handleBottomLeftResize = (event: React.MouseEvent) => {
    if (resizeState === "bottom-left") {
      setPos(p => ({
        ...p,
        left: resize.current.beginX + event.clientX - resize.current.startX, 
        top: resize.current.beginY + event.clientY - resize.current.startY,
      })); 
    }
  };

  const handleBottomRightResize = (event: React.MouseEvent) => {
    if (resizeState === "bottom-right") {
      setPos(p => ({
        ...p,
        left: resize.current.beginX + event.clientX - resize.current.startX, 
        top: resize.current.beginY + event.clientY - resize.current.startY,
      })); 
    }
  };

  const handleResizeEnd = (event: React.MouseEvent) => {
    event.preventDefault();
    setResizeState(undefined);
  };

  return (
    <Container>
      <ShapeSelect onSelect={setShapeIndex} />
      <Box w="400px" h="400px" pos="relative">
        <Image src={Avatar1} w="full" draggable="false"/>
        <Box bg="rgba(0, 0, 0, 0.35)" pos="absolute" inset="0" />
        <Box
          pos="absolute"
          top={`${pos.top}px`}
          right={`${pos.right}px`}
          bottom={`${pos.bottom}px`}
          left={`${pos.left}px`}
          transform={`translate(${translate.x}px, ${translate.y}px)`}
          border="2px solid #149CFA"
          cursor={cursor}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}>
          <Box
            className={shapeIndex === 0 ? "" : `${MASK_SHAPES[shapeIndex].slice(0, 3)}`}
            pos="absolute"
            inset={0}
            userSelect="none"
            overflow="hidden">
            <Box
              pos="absolute"
              top="0"
              left="0"
              w="400px"
              h="400px"
              transform={`translate(-${pos.left + translate.x}px, -${(pos.top + translate.y)}px)`}>
              <Image src={Avatar1} w="full" draggable="false" />
            </Box>
          </Box>
          <Box
            pos="absolute"
            top="-6px"
            left="-6px"
            w="12px"
            h="12px"
            borderRadius="full"
            backgroundColor="#149CFA"
            cursor="nwse-resize"
            onMouseDown={e => handleResizeStart(e, "top-left")}
            onMouseMove={handleTopLeftResize}
            onMouseUp={handleResizeEnd}
            onMouseLeave={handleResizeEnd}
          />
          <Box
            pos="absolute"
            top="-6px"
            right="-6px"
            w="12px"
            h="12px"
            borderRadius="full"
            backgroundColor="#149CFA"
            cursor="nesw-resize"
            onMouseDown={e => handleResizeStart(e, "top-right")}
            onMouseLeave={handleResizeEnd}
          />
          <Box
            pos="absolute"
            bottom="-6px"
            right="-6px"
            w="12px"
            h="12px"
            borderRadius="full"
            backgroundColor="#149CFA"
            cursor="nwse-resize"
            onMouseDown={e => handleResizeStart(e, "bottom-right")}
            onMouseLeave={handleResizeEnd}
          />
          <Box
            pos="absolute"
            bottom="-6px"
            left="-6px"
            w="12px"
            h="12px"
            borderRadius="full"
            backgroundColor="#149CFA"
            cursor="nesw-resize"
            onMouseDown={e => handleResizeStart(e, "bottom-left")}
            onMouseLeave={handleResizeEnd}
          />
        </Box>
      </Box>
      <FingerPrint />
    </Container>
  );
}