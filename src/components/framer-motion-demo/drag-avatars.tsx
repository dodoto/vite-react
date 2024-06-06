import { chakra } from "@chakra-ui/react";
import { motion, MotionValue, useMotionValue, useSpring } from "framer-motion";
import Avatar from "../squircle-avatar/squircle-avatar";

import avatar from "../../assets/avatar.jpg";
import avatar1 from "../../assets/avatar-1.jpg";
import avatar2 from "../../assets/avatar-2.jpg";
import avatar3 from "../../assets/avatar-3.jpg";
import avatar4 from "../../assets/avatar-4.jpg";

const avatarList = [avatar, avatar1, avatar2, avatar3, avatar4];

const ChakraMotionDiv = chakra(motion.div);

const SpringConfig = { stiffness: 600, damping: 30 };

const useAvatarMotionValues = (avatarList: string[]) => {
  const values: { x: MotionValue<number>, y: MotionValue<number>, url: string }[] = [];
  avatarList.forEach((avatar, index) => {
    if (index === 0) {
      values.push({ url: avatar, x: useMotionValue(0), y: useMotionValue(0) });
    } else {
      values.unshift({ url: avatar, x: useSpring(values[0].x, SpringConfig), y: useSpring(values[0].y, SpringConfig) });
    }
  });
  return values;
}

const CONSTRAINT_HEIGHT = window.innerHeight / 2; 
const CONSTRAINT_WIDTH = window.innerWidth / 2;
const MAX_CONSTRAINT = 250;

const constraints = {
  top: Math.max(-MAX_CONSTRAINT, -CONSTRAINT_HEIGHT),
  right: Math.min(MAX_CONSTRAINT, CONSTRAINT_WIDTH),
  bottom: Math.min(MAX_CONSTRAINT, CONSTRAINT_HEIGHT),
  left: Math.max(-MAX_CONSTRAINT, -CONSTRAINT_WIDTH),
};

export const DragAvatars = () => {
  const values = useAvatarMotionValues(avatarList);
  
  return (
    <>
      {values.map((item, index) => (
        <ChakraMotionDiv
          pos="fixed"
          top="50%"
          left="50%"
          transform="translateX(-50%) translateY(-50%)"
          key={item.url}
          drag={index === values.length - 1}
          style={{ x: item.x, y: item.y }}
          dragConstraints={constraints}
        >
          <Avatar url={item.url} size={80} key={index}/>
        </ChakraMotionDiv>
      ))}
    </>
  );
};