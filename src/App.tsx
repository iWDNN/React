import styled from "styled-components";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
const Wrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 30px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

function App() {
  const x = useMotionValue(0); // useTransform 으로 사용할 축이 되는 값
  const rotateZ = useTransform(x, [-1000, 1000], [-360, 360]);
  const gradient = useTransform(
    x,
    [-1000, 0, 1000],
    [
      "linear-gradient(135deg,#222831,#393E46)",
      "linear-gradient(135deg,#417D7A,#EDE6DB)",
      "linear-gradient(135deg,#F9ED69,#F08A5D)",
    ]
  );
  useEffect(() => {
    rotateZ.onChange(() => console.log(rotateZ.get()));
  }, [rotateZ]);
  return (
    <Wrapper style={{ background: gradient }}>
      <Box style={{ x, rotateZ }} drag="x" dragSnapToOrigin />
    </Wrapper>
  );
}

export default App;
