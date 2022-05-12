import styled from "styled-components";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #9fc088, #e8c07d);
  flex-direction: column;
`;
const Box = styled(motion.div)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  top: 100px;
  width: 500px;
  height: 200px;
  border-radius: 20px;
  background-color: white;
`;
const myVar: Variants = {
  entry: (isBack: boolean) => ({
    x: isBack ? -500 : 500,
    opacity: 0,
    scale: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotateX: 360,
    transition: {
      duration: 1,
    },
  },
  exit: (isBack: boolean) => ({
    x: isBack ? 500 : -500,
    opacity: 0,
    scale: 0,
    rotateX: 360,
    transition: {
      duration: 1,
    },
  }),
};

function App() {
  const [visible, setVisible] = useState(1);
  const [back, setBack] = useState(false);
  const nextPg = () => {
    setBack(false);
    setVisible((prev) => (prev === 10 ? 10 : prev + 1));
  };
  const prevPg = () => {
    setBack(true);
    setVisible((prev) => (prev === 1 ? 11 : prev - 1));
  };
  return (
    <Wrapper>
      <AnimatePresence custom={back}>
        <Box
          custom={back}
          variants={myVar}
          initial="entry"
          animate="center"
          exit="exit"
          key={visible}
        >
          {visible}
        </Box>
      </AnimatePresence>
      <button onClick={prevPg}>prev</button>
      <button onClick={nextPg}>next</button>
    </Wrapper>
  );
}

export default App;
