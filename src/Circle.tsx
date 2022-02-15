import styled from "styled-components";

interface playerShape {
  age: number,
  name: string;
}

const sayHello = (playerObj: playerShape) => `Hello ${playerObj.name} you are ${playerObj.age} years old.`;
sayHello({ age: 5, name: "hoi" });


interface ContainerProps {
  bgColor: string;
}

const Container = styled.div<ContainerProps>`
  width:200px;
  height:200px;
  background-color: ${props => props.bgColor};
  border-radius: 50%;
`;

interface CircleProps {
  bgColor: string;
}

function Circle({ bgColor }: CircleProps) {
  return <Container bgColor={bgColor} />
}

export default Circle;