# React + Typecript 
##  `styled-component`
### 1. 설치 
```bash
npm i styled-components
```
```js
  const Container = styled.div`
    display:flex;
    justify-content:center;
    align-item:center;
  `;
```
- extension: vscode-styled-components

### 2. extend, props styled-components
- props
```js
  const Box = styled.div`
    backgroundColor:${props=>props.bgColor}
    width:100px;
    height:100px;
  `
```

- extend
```js
  const Circle = styled(Box)`
    border-radius:50px;
  `
```
다른 컴포넌트의 스타일을 그대로 사용하면서 확장시키는 기능

### 3. 'As' and Attrs
- As
```js
  const Btn = styled.button`
    background-color:tomato;
  `
```
```html
  <Btn/> /* button tag */
  <Btn as="a"/> /* a tag */
```
  Btn의 스타일을 그대로 사용 하되 html의 다른 태그로 사용하고 싶은 경우 `as`사용

- Attrs
```js
  const Input = styled.input.attrs({required:true, type:"number"})`
    background-color:teal;
  `
```
```html
  <Input required type="number" />
```
html태그의 속성을 생성하면서 설정하게 만들어 주는 기능


### 4. Animation and PseudoSelectors
- animation
```js
import { keyframes } from 'styled-components';

const rotateAnimation = keyframes`
  0%{
    transfrom:rotate(0deg);
    border-radius:0px;
  }
  50%{
    border-radius:100px;
  }
  100%{
    transfrom:rotate(360deg);
    border-radius:0px;
  }
`
const Box = styled.div`
width:200px;
  height:200px;
  display:flex;
  justify-content:center;
  align-items:center;
  animation:${rotateAnimation} 1s linear;
`
```
keyframes를 통해 애니메이션 생성 가능

- PseudoSelectors
```html
  <Box>
    <span>😀</span>
  </Box>
```
```js
const Box = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  animation:${rotateAnimation} 1s linear;
  span{
    font-size:36px;
    &:hover{
      font-size:40px;
    }
  }
`
```
컴포넌트 안에서 하위 요소의 스타일도 지정 가능

### 5. PseudoSelectors II

```js
  const Emoji = styled.span`
    font-size:36px;
  `;
  const Box = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  animation:${rotateAnimation} 1s linear;
  ${Emoji}{
    &:hover{
      font-size:40px;
    }
  }
`
```

styled-component 이름을 선택하여 하위 컴포넌트 스타일 관리 가능

### 6. theme
- index.js
```js
import {ThemeProvider} from "styled-components";

const darkTheme = {
  textColor: "whitesmoke",
  backgroundColor: "#111"
}
const lightTheme = {
  textColor: "#111",
  backgroundColor: "whitesmoke"
}

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

- App.js
```js
const Wrapper = styled.div`
  background-color:${props=>props.theme.backgroundColor}
`

const Title = styled.h1`
  color:${props=>props.theme.textColor}
`
```
ThemeProvider를 통해 전역 색상을 관리하기 용이하다.
다크모드/라이트 모드, 테마를 만들때 편하다.

##  `TypeScript`

- javascript를 기반으로 한 언어, javascript의 모든 기능은 제공하면서 추가적인 기능 제공.
- 언어가 작동하기 전에 타입을 확인해줌(strongly typed)
- 장점 : javascript는 명시적인 설명 유형, 데이터에 대 한 설명을 제공하지 못하지만, typescript는 가능.

```js
const plus = (a,b) => a+b;
plus(1,"a");
// result : 1a
```

```ts
const plus = (a:number, b:number) => a+b;
plus(1,"a");
// TypeError!
```

## `React + Typescript`

### 1. 설치
```bash
npx create-react-app my-app --template typescript

or

npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```
### Typing the props
- 컴포넌트의 타입을 정해주기
```tsx
// App.tsx
function App() {
  return (
    <div>
      <Circle bgColor="teal" />
      <Circle bgColor="tomato" />
    </div>
  );
}

// Circle.tsx
interface ContainerProps{
  bgColor: string;
}
const Container = styled.div<ContainerProps>``;

interface CircleProps{
  bgColor: string;
}
function Circle({bgColor}: CircleProps){
  return <Container bgColor={bgColor}/>;
}
```
> interface: 객체모양을 타입스크립트에게 설명해주는 타입스크립트 개념

1. 컴포넌트 자기 자신과 props를 interface를 사용하여 보호