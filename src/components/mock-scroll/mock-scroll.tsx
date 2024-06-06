import { FC, useState, useRef, useEffect, useCallback, MouseEventHandler, MouseEvent, WheelEventHandler } from "react";
import { Box } from '@chakra-ui/react';

const ScrollBarSize = 8;
const ScrollDist = 200;

export const MockScroll: FC = () => {
  const [xScrollInnerBarWidth, setXScrollInnerBarWidth] = useState(0);
  const [yScrollInnerBarHeight, setYScrollInnerBarHeight] = useState(0);
  const [overflowDirLock, setOverflowDirLock] = useState({ x: false, y: false});
  const [scrollDir, setScrollDir] = useState<'x' | 'y' | undefined>();

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const xScrollBarRef = useRef<HTMLDivElement>(null);
  const yScrollBarRef = useRef<HTMLDivElement>(null);

  const scrollState = useRef({
    dir: undefined,     // x y undefined
    isMouseDown: false,
    startPosX: 0,
    startPosY: 0,
    moveX: 0,
    moveY: 0,
    startTranslateX: 0,
    startTranslateY: 0,
    scrollX: 0,
    scrollY: 0,
  });

  const isWheel = useRef(false);

  const scrollBound = useRef({
    x: 0,
    y: 0,
  });

  const updateScrollBarSize = useCallback(() => {
    const container = containerRef.current!;
    const content = contentRef.current!;

    const { clientWidth: containerWidth, clientHeight: containerHeight } = container;
    const { clientWidth: contentWidth, clientHeight: contentHeight } = content;
  
    const xScrollBarWidth = containerWidth;
    const yScrollBarHeight = containerHeight;
  
    const xScrollInnerBarWidth = xScrollBarWidth * Math.min(1, containerWidth / contentWidth);
    const yScrollInnerBarHeight = yScrollBarHeight * Math.min(1, containerHeight / contentHeight);

    scrollBound.current = {
      x: xScrollBarWidth - xScrollInnerBarWidth,
      y: yScrollBarHeight - yScrollInnerBarHeight,
    }

    setXScrollInnerBarWidth(xScrollInnerBarWidth);
    setYScrollInnerBarHeight(yScrollInnerBarHeight);
    setOverflowDirLock({ x: contentWidth > containerWidth, y: contentHeight > containerHeight });

    // 缩小时修复滚动条位置
    scrollState.current.isMouseDown = true;
    handleMouseMove({ clientX: 0, clientY: 0 } as MouseEvent);
    scrollState.current.isMouseDown = false;
  }, [])

  const handleMouseDown = (dir: 'x' | 'y', { clientX, clientY }: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    Object.assign(scrollState.current, {
      dir,
      isMouseDown: true,
      startPosX: clientX,
      startPosY: clientY,
    })
    setScrollDir(dir);
  }

  const handleClick = (dir: 'x' | 'y', { clientX, clientY }: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    if (dir === 'x') {
      const { x } = yScrollBarRef.current!.getBoundingClientRect();
      const moveX = x > clientX ? -ScrollDist : ScrollDist;
      const scrollX = Math.max(0, Math.min(moveX + scrollState.current.scrollX, scrollBound.current.x));
      Object.assign(scrollState.current, { moveX, scrollX })
      Object.assign(xScrollBarRef.current!.style, {
        transform: `translateX(${scrollX}px)`,         
      })
      const translateX =  scrollX / scrollBound.current.x * (contentRef.current!.clientWidth - containerRef.current!.clientWidth);
      Object.assign(contentRef.current!.style, {
        transform: `translate(${-translateX}px, ${-scrollState.current.scrollY}px)`,
      })
    } else {
      const { y } = yScrollBarRef.current!.getBoundingClientRect();
      const moveY = y > clientY ? -ScrollDist : ScrollDist;
      const scrollY = Math.max(0, Math.min(moveY + scrollState.current.scrollY, scrollBound.current.y));
      Object.assign(scrollState.current, { moveY, scrollY })
      Object.assign(yScrollBarRef.current!.style, {
        transform: `translateY(${scrollY}px)`,
      })
      const translateY = scrollY / scrollBound.current.y * (contentRef.current!.clientHeight - containerRef.current!.clientHeight);
      Object.assign(contentRef.current!.style, {
        transform: `translate(${-scrollState.current.scrollX }px, ${-translateY}px)`,
      })
    }
    // trigger scroll
    handleMouseUp()
  }

  const handleMouseMove: MouseEventHandler = (event) => {
    if (scrollState.current.isMouseDown) {
      const { clientX, clientY } = event;
      event.preventDefault?.();
      if (scrollState.current.dir === 'x') {
        const moveX = clientX - scrollState.current.startPosX;
        const scrollX = Math.max(0, Math.min(moveX + scrollState.current.startTranslateX, scrollBound.current.x));
        Object.assign(scrollState.current, { moveX, scrollX })
        Object.assign(xScrollBarRef.current!.style, {
          transform: `translateX(${scrollX}px)`,         
        })
        const translateX =  scrollX / scrollBound.current.x * (contentRef.current!.clientWidth - containerRef.current!.clientWidth);
        Object.assign(contentRef.current!.style, {
          transform: `translate(${-translateX}px, ${-scrollState.current.scrollY}px)`,
        })
      } else if (scrollState.current.dir === 'y') {
        const moveY = clientY - scrollState.current.startPosY;
        const scrollY = Math.max(0, Math.min(moveY + scrollState.current.startTranslateY, scrollBound.current.y));
        Object.assign(scrollState.current, { moveY, scrollY })
        Object.assign(yScrollBarRef.current!.style, {
          transform: `translateY(${scrollY}px)`,
        })
        const translateY = scrollY / scrollBound.current.y * (contentRef.current!.clientHeight - containerRef.current!.clientHeight);
        Object.assign(contentRef.current!.style, {
          transform: `translate(${-scrollState.current.scrollX }px, ${-translateY}px)`,
        })
      }
      // trigger scroll
    }
  }

  const handleMouseUp = () => {
    Object.assign(scrollState.current, {
      dir: undefined,
      isMouseDown: false,
      startTranslateX: scrollState.current.scrollX,
      startTranslateY: scrollState.current.scrollY,
    })
    setScrollDir(undefined);
  }

  const handleWheel: WheelEventHandler = ({ deltaY }) => {
    if (!isWheel.current) {
      isWheel.current = true;
      setScrollDir('y')
      const moveY = deltaY < 0 ? -ScrollDist : ScrollDist;
      const scrollY = Math.max(0, Math.min(moveY + scrollState.current.scrollY, scrollBound.current.y));
      Object.assign(scrollState.current, { moveY, scrollY })
      Object.assign(yScrollBarRef.current!.style, {
        transform: `translateY(${scrollY}px)`,
        transition: `transform ${0.3}s ease-in-out`,
      })
      const translateY = scrollY / scrollBound.current.y * (contentRef.current!.clientHeight - containerRef.current!.clientHeight);
      Object.assign(contentRef.current!.style, {
        transform: `translate(${-scrollState.current.scrollX }px, ${-translateY}px)`,
        transition: `transform ${0.3}s ease-in-out`,
      })
      // trigger scroll
      setTimeout(() => {
        handleMouseUp();
        Object.assign(yScrollBarRef.current!.style, {
          transition: 'none',
        })
        Object.assign(contentRef.current!.style, {
          transition: 'none',
        })
        setScrollDir(undefined);
        // trigger scroll
        isWheel.current = false;
      }, 300)
    }

  }

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove as any);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mousemove', handleMouseMove as any);
    };
  }, [])


  useEffect(() => {
    updateScrollBarSize();
    window.addEventListener('resize', updateScrollBarSize);
    return () => window.removeEventListener('resize', updateScrollBarSize);
  }, [])

  return (
    // container
    <Box h="500px" w="50vw" pos="relative" overflow="hidden" ref={containerRef} onWheel={handleWheel}>
      {/* content */}
      <Box ref={contentRef}>
        
        <Box h="100vh" bg="blue.300">
          mock scroll
        </Box>
        <br /><br /><br /><br />
        <Box h="100vh" bg="green.300" borderBottomWidth={1}>
        overflow content
        </Box>
      </Box>

      {/* x-scroll-bar */}
      {
        overflowDirLock.x &&
        <Box 
        pos="absolute" 
        left="0" 
        bottom="0" 
        right="0"
        height={`${ScrollBarSize}px`}
        bg="gray.200" 
        opacity={scrollDir === 'x' ? 1 : 0}
        _hover={{ opacity: '1' }}
        onClick={(event) => handleClick('x', event)}>
          <Box 
            onClick={(event) => event.stopPropagation()}
            ref={xScrollBarRef}
            bg="gray.400" 
            h="full" 
            style={{ width: `${xScrollInnerBarWidth}px` }}
            onMouseDown={(event) => handleMouseDown('x', event)}></Box>
        </Box>
      }

      {/* y-scroll-bar */}
      {
        overflowDirLock.y &&
        <Box 
        pos="absolute" 
        top="0" 
        right="0" 
        bottom="0"
        width={`${ScrollBarSize}px`} 
        // bg="gray.200" 
        // opacity={scrollDir === 'y' ? '1' : '0'}
        _hover={{ opacity: '1' }}
        transitionDuration="0.3s"
        onClick={(event) => handleClick('y', event)}>
          <Box 
            onClick={(event) => event.stopPropagation()}
            ref={yScrollBarRef}
            bg="gray.400" 
            borderRadius="full"
            style={{ height: `${yScrollInnerBarHeight}px` }}
            onMouseDown={(event) => handleMouseDown('y', event)}></Box>
        </Box>
      }
    </Box>
  )
}