import { useLoaderData, defer, Await } from "react-router-dom";
import { Suspense, useRef, useEffect, useState, useImperativeHandle, forwardRef } from "react";
import { Container, Box, VStack, Spinner, Text, Link, Heading, chakra } from "@chakra-ui/react";
import Balancer from "react-wrap-balancer";
import confetti from "canvas-confetti";
import SquircleAvatar from "../components/squircle-avatar/squircle-avatar";
import avatar from "../assets/avatar.jpg";
import { Modal } from "../components/modal/modal";

const ChakcraCanvas = chakra("canvas");

export const homeLoader = () => {
  return defer({
    data: new Promise(resolve => setTimeout(resolve, 5000, 1)),
  });
}

const HomeFallback = () => {
  return (
    <VStack>
      <Spinner />
    </VStack>
  );
};

type SharedAvatarRef = { hidde: () => void };

const SharedSquircleAvatar = forwardRef<SharedAvatarRef>((_props, ref) => {
  const [y, setY] = useState(0);

  useEffect(() => {
    setY(200);
  }, []);

  useImperativeHandle(ref, () => ({
    hidde: () => {
      setY(0);
    },
  }), []);

  return (
    <Box 
      transition="all" 
      transitionDuration="0.25s" 
      pos="fixed" 
      w="100px" 
      h="100px" 
      top="8" 
      right="0" 
      left="0" 
      margin="auto" 
      zIndex="2"
      transform={`translateY(${y}px)`}>
      <SquircleAvatar url={avatar} size={100} />
    </Box>
  );
});

interface SuspenseWrapperProps<T = unknown> {
  fallback: React.ReactNode;
  data: Promise<T>;
  errorElement: React.ReactNode;
  renderContent: (data: T) => React.ReactNode;
}

const SuspenseWrapper = ({ fallback, data, errorElement, renderContent }: SuspenseWrapperProps<number>) => {
  return (
    <Suspense fallback={fallback}>
      <Await resolve={data} errorElement={errorElement}>
        {(data: number) => (
          renderContent(data)
        )}
      </Await>
    </Suspense>
  );
};

export const Home = ({ demos }: { demos: { path: string, title: string }[] }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const sharedAvatarRef = useRef<SharedAvatarRef>(null);
  const { data } = useLoaderData() as { data: Promise<number> };
  const [visible, setVisible] = useState(false);
  const close = () => {
    sharedAvatarRef.current!.hidde();
    setTimeout(() => {
      setVisible(false);
    }, 250);
  };

  useEffect(() => {
    const confe = confetti.create(canvasRef.current!, {
      resize: true,
      useWorker: true,
    });

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    (function frame() {
      // const timeLef = animationEnd - Date.now()
      // const ticks = Math.max(200, 500 * (timeLef / duration))

      confe({
        particleCount: 1,
        startVelocity: 0,
        // ticks,
        origin: {
          x: Math.random(),
          y: 0,
        },
        colors: ['#aaaaaa', '#666666'],
        shapes: ['circle', 'square', 'star'],
        gravity: randomInRange(0.6, 1),
        scalar: randomInRange(0.4, 1),
        drift: randomInRange(-0.4, 0.4),
      })

      requestAnimationFrame(frame)
    })()

    return () => {
      confe.reset()
    };

  }, []);

  return (
    <>
      <Container pb="32px">
        <ChakcraCanvas pos="fixed" inset="0" w="full" h="full" pointerEvents="none" ref={canvasRef} />
        <VStack py="8" gap="4">
          <Box cursor="pointer" onClick={() => setVisible(true)} ref={avatarRef} opacity={visible ? 0 : 1}>
            <SquircleAvatar url={avatar} size={100} />
          </Box>
          <Balancer>
            <Heading fontSize="xl" fontWeight="semibold">this is a site for try some node modules by react</Heading>
          </Balancer>
        </VStack>
        <SuspenseWrapper
          fallback={<HomeFallback />}
          data={data}
          errorElement={<h1>load failed</h1>}
          renderContent={(data) => (
            <VStack>
              <Text>home, loader 的返回值是 {data}</Text>
            </VStack>
          )}
        />
        <VStack>
          {demos.map(({ path, title }, index) => (
            <Link
              key={path}
              href={`demo/${path}`}
              textDecoration="underline"
              alignSelf="start"
              fontWeight="semibold">{index + 1}. {title}</Link>
          ))}
        </VStack>
      </Container>
      {
        visible &&
        <>
          <Modal type="blur" onOutsideClick={close}>
            <SharedSquircleAvatar ref={sharedAvatarRef}/>
          </Modal>
          
        </>
      }
    </>
  );
};