# nomad-corders

## react-masterclass

## `styled-component`

### 1. 설치

```bash
npm i styled-components
```

```
Extension: vscode-styled-components
```

```js
  const 변수명 = styled.(원하는 태그명)`
    css 스타일 지정
  `
```

- 예시

```js
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-item: center;
`;
```

### 2. extend, props styled-components

- props

```jsx
const Box = styled.div`
    backgroundColor:${(props) => props.bgColor}
    width:100px;
    height:100px;
  `;
function App() {
  return (
    <Container>
      <Box bgColor="green" />
      <Box bgColor="yellow" />
    </Container>
  );
}
```

- extend
  - 다른 컴포넌트의 스타일을 사용하면서 다른 속성들을 추가시킬수 있음

```js
// 위 Box 컴포넌트의 속성들을 모두 가지고 있음
const Circle = styled(Box)`
  border-radius: 50px;
`;
```

### 3. 'As' and Attrs

- As
  - 컴포넌트의 태그를 바꾸고 싶지만 스타일은 바꾸고 싶지 않을때 사용하는 기능

```jsx
  const Btn = styled.button`
    background-color:tomato;
  `
  function App(){
    return(
      <Btn /> // === <button></button>
      <Btn as="a"/> // === <a></a>
  )
  }
```

- Attrs
  - html태그의 attrs을 styled-components를 생성할 때 설정하게 만들어 주는 기능

```js
const Input = styled.input.attrs({ required: true, type: "number" })`
  background-color: teal;
`;
```

```html
<input required type="number" />
```

### 4. Animation and StateSelecotr

- animation

```js
import { keyframes } from "styled-components";

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
`;
const Box = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotateAnimation} 1s linear;
`;
```

keyframes를 통해 애니메이션 생성 가능

- StateSelector

```html
<Box>
  <span>😀</span>
</Box>
```

```js
const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotateAnimation} 1s linear;
  span {
    font-size: 36px;
    &:hover {
      font-size: 40px;
    }
  }
`;
```

컴포넌트 안에서 하위 요소의 스타일도 지정 가능

### 5. State Selector II

- 태그명에 의존하지 않고 컴포넌트 명으로 하위 요소 관리 가능

```js
const Emoji = styled.span`
  font-size: 36px;
`;
const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotateAnimation} 1s linear;
  ${Emoji}:hover {
    font-size: 40px;
  }
`;
```

### 6. theme

- dark모드같은 기능을 구현하기 좋음

```js
// index.js
import { ThemeProvider } from "styled-components";

const darkTheme = {
  textColor: "whitesmoke",
  backgroundColor: "#111",
};
const lightTheme = {
  textColor: "#111",
  backgroundColor: "whitesmoke",
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

```js
// App.js
const Wrapper = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
`;

const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
`;
```

ThemeProvider를 통해 전역 색상을 관리하기 용이하다.
다크모드/라이트 모드, 테마를 만들때 편하다.

# 1 단원

# `TypeScript`

- javascript를 기반으로 한 웹 프로그래밍 언어, javascript의 모든 기능은 제공하면서 추가적인 기능 제공.
  (다른 프로그래밍 언어지만 큰 갭은 아님 )
- strongly typed : 코드가 실행되기 "전"에 type을 확인해줌. "[propTypes는 코드가 실행되고 브라우저로 알려줌]

```js
const plus = (a, b) => a + b;
plus(1, "a");
// result : 1a
```

```ts
const plus = (a: number, b: number) => a + b;
plus(1, "a");
// TypeError!
```

- 브라우저는 typescript를 이해하지 못함 그래서 typescript가 자동으로 컴파일 해서 javascript에 알려줌
- javascript는 명시적인 설명 유형, 데이터에 대 한 설명을 제공하지 못하지만, typescript는 가능.

## React + Typescript

### 설치

```bash
npx create-react-app@latest my-app --template typescript
```

### `Typing the props`

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

interface CircleProps {
  bgColor: string;
}

interface ContainerProps {
  bgColor: string;
}
const Container = styled.div<ContainerProps>``;

function Circle({ bgColor }: CircleProps) {
  return <Container bgColor={bgColor} />;
}
// App.tsx에서 Circle.tsx 그리고 Circle 내의 Container컴포넌트까지에 프랍스를 전달하는 코드
```

> interface: 객체모양을 타입스크립트에게 설명해주는 타입스크립트 개념

- 컴포넌트 자기 자신과 props를 interface를 사용하여 보호

### `Optional Props and Default Props`

- Optional Props
  - props를 옵션으로 만들어줌(필수 or 선택)

```tsx
interface CircleProps {
  bgColor: string;
  borderColor?: string; // ===  borderColor: string | undefined;
}
```

- Default Props
  - props 기본 값 설정해주기

```html
<Container borderColor={borderColor ?? "black"}> // borderColor를 필수로 받아야
하는 상황에서 값을 undefined로 설정해도 기본값을 설정하는 방법
```

```tsx
function Circle({ bgColor, borderColor, text = "default text" });
// text라는 값을 옵션으로 받아도 기본값을 인자에서 설정해주고 싶을 때 위처럼 사용(ES6 Javascript 구문)
```

### `useState의 Type`

- Typescript가 초기값을 가지고 타입을 자동으로 추론

```ts
const [counter, setCounter] = useState(1); //data type : number
setCounter("2"); // error!
setCounter(true); // error!
```

- 두가지 자료형 타입을 사용해야 할 경우

```ts
const [value, setValue] = useState<number | string>(1);
setValue(2); // no error
setValue("hello"); // no error
```

### `Form의 Type`

- Form의 이벤트 타입 선언

```ts
const onChange = (event: React.FormEvent<HTMLInputElement>) => {
  setValue(e.currentTarget.value);
};
```

[폼 이벤트 타입 참고링크](https://reactjs.org/docs/events.html)

- ES6 문법

```ts
// 둘은 동일한 의미
const {
  currentTarget: { value },
} = event;

const value = event.currentTarget.value;
// 여러 개를 가져 올때 유용함
const {
  currentTarget: { value, tagName, width, id },
} = event;

const value = event.currentTarget.value;
const tagName = event.currentTarget.value;
const width = event.currentTarget.value;
const id = event.currentTarget.value;
```

### `theme`

- styled.d.ts
  - styled-components에 선언된 타입 파일
- 확장시켜서 사용하고 싶으므로 아래의 파일을 생성

```ts
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    btnColor: string;
  }
}
```

> declare : 변수, 상수, 함수 또는 클래스가 어딘가에 이미 선언되어 있음을 알린다.

> d.ts: 구현부가 아닌 선언부만을 작성하는 용도의 파일을 의미

[참고링크](https://it-eldorado.tistory.com/127)

# 2단원

## `crypto tracker app`

- Setup
  - create-react-app --template typescript
  - react-query
  - react-router-dom@5.3.0 -> 2022.04.15 react-router-dom Switch가 동작하지 않아 6.3.0 사용
  - styled-components
- Api
  - 코인전체 : https://api.coinpaprika.com/v1/coins
  - ~~코인아이콘 : https://cryptoicon-api.vercel.app/api/icon/{코인심볼}~~ api server down
  - 코인아이콘 : https://cryptocurrencyliveprices.com/img/${coin.id}.png
  - 코인정보 : https://api.coinpaprika.com/v1/coins/{코인이름}
  - 코인가격 : https://api.coinpaprika.com/v1/tickers/{코인이름}
- etc
  - Font : fonts.google.com - Source Sans Pro 300 400
  - Color : flatuicolors.com/palette/gb

```
"Router 경로"
/ -> Allcoin
/:id -> /btc -> Coin Detail
/btc/information
/btc/chart
```

### React-Fragment

- 부모 컴포넌트 없이 자식들끼리 있는 컴포넌트를 내보내주는 유령 컴포넌트

```html
<></> === <React.Fragment></React.Fragment>
```

### React-query

[ReactQuery 링크](https://react-query.tanstack.com/)

```bash
npm i react-query
```

- react 어플리케이션에서 서버 state를 fetching,caching,synchronizing,updating 할 수 있도록 도와주는 라이브러리
- global state를 건드리지 않고 react 어플리케이션에서 데이터를 가져오고 캐시하고, 업데이트 한다.
- 첫번째 인자 : 유니크 키, 두번째 인자 : fetcher 함수, 세번째 인자(옵션) : refetchInterval 실시간갱신주기 등

```bash
 const {로딩,데이터} = useQuery(유니크키값,fetch함수)
```

- 다양하게 받아오기

```js
const { isLoading: infoLoading, data: infoData } = useQuery(
  String(["info", coinId]),
  () => fetchCoinInfo(String(coinId))
);
const { isLoading: tickersLoading, data: tickersData } = useQuery(
  String(["tickers", coinId]),
  () => fetchCoinTickers(String(coinId))
);
```

### Behind the scene

- 화면 이동할 때 데이터를 보낸다는 것은 parameter를 통해 url에게 데이터를 요청하여 정보를 얻는다. 이러한 방식이 있는 반면, Link 컴포넌트를 통해 state를 사용하는 것이다. 항상 api 요청으로만 미리 보여주는 것이 아닌 홈 화면에서 받아왔던 작은 정보들을 미리 데이터로 출력한다.

```tsx
//5.3.x 방식
<Link
  to={{
    pathname: `/${coin.id}`,
    state: { name: coin.name },
  }}
>
// 6을 넘는 버전부터는
<Link
  to={`/${coin.id}`}
  state={{ name : coin.name}}
  >
</Link>
```

- 이 방식의 경우 정보를 얻는 `화면을 거쳐가지않고 바로 이동하다면` 에러가 발생한다.

```tsx
<Title>{state?.name || "Loading..."}</Title>
// 이러한 경우 ||로 에러대신 출력할 말을 위와 같이 적어주도록 하자.
```

### `React Helmet`

- npm i react-helmet
- 어떤 것을 render하든 문서의 head로 가게 만들어주는 컴포넌트

### `Tips`

- 전역에 css 적용시키기
  - createGlobalStyle을 사용하면 렌더링 될 때, 이 컴포넌트는 전역 스코프에 스타일을 돌려줌.

```ts
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
// 전역에 적용할 CSS
`;
```

- ()()

  - 즉시 실행되는 함수. ex) (()=>console.log('hi'))();

- api request

```ts
const response = await fetch("apiUrl");
const json = await response.json();
// 위와 동일
const response = await(fetch("apiUrl")).json();
```

- Data Types

```js
Object.keys(data).join(); //객체 키값
Object.values(data)
  .map((v) => typeof v)
  .join(); // 객체 자료형
```

- VScode shortcut
  > Shift+Alt(Option)+i : 선택한 문자열 가장 우측 끝으로 포커싱

> Ctrl(Command)+Shift+오른쪽 화살표: 현재 선택한 문자열을 기준으로 우측 끝까지 선택

[JSON 데이터 -> 타입스크립트 타입 사이트](https://app.quicktype.io/?l=ts)

- nested route(중첩된 라우트)
  - 웹안에서 탭을 많이 사용할 경우, 스크린 안에 많은 섹션이 나뉘어진 곳에서도 유용한 라우트

[CSS Grid](https://studiomeal.com/archives/533)

- ~~useRouteMath @5.3.x~~
  - 현재 url과 일치하는지 알려주는 훅

```js
const priceMatch = useRouteMatch("/:coinId/price");
```

- 아래는 priceMatch의 값

```bash
isExact: true
params: {coinId: 'eth-ethereum'}
path: "/:coinId/price"
url: "/eth-ethereum/price"
```

- useMatch

- Apex-Chart Library
  [ApexChart 링크](https://apexcharts.com/)
- npm install --save react-apexcharts apexcharts
- 간단한 사용 예시

```tsx
<ApexChart
  type="line"
  series={[
    {
      name: "hello",
      data: [1, 2, 3, 4, 5, 6],
    },
    {
      name: "sales",
      data: [15, 18, 3, 4, 5, 6],
    },
  ]}
  options={{
    chart: {
      height: 500,
      width: 500,
    },
  }}
/>
```

- value.toFixed(3) : 소숫점 3자리까지 남김

## `State management`

- npm i recoil
- recoil : reactjs에서 사용할 수 있는 state management library이다.
- global state : 어플리케이션 전체에서 공유되는 state ( ex. 로그인 접속유무 state )
- state management를 사용하면 좋은 이유 : 컴포넌트를 지나오는 단계별로 props로 변수나, 함수를 일일이 보내야하지만 이걸 사용한다면 쉽게 어디서나 호출하고 관리할 수 있다.
- atom : 상태의 일부분, 어떤 컴포넌트에서나 읽고 쓸 수 있다.
- useRecoilValue : 주어진 Reocil 상태의 값을 리턴한다.
- useSetRecoilState : 쓰기 가능한 Recoil 상태의 값을 업데이트하기 위한 setter 함수를 리턴한다.
- useRecoilState : 위 두가지를 배열로 받음, ex) const [value,setValueFn]

  - setValueFn( prev => changed something)

- selector : 파생된 상태(derived state)의 일부를 나타낸다. state를 입력 받아서 그걸 변형해 반환하는 순수함수를 거쳐 반환된 값을 말한다. 정확히 모르겠음 뭔말인지 atom의 output을 변형시키는 도구
  - state의 본질을 변경하는게 아닌 output만 변형시키는 도구
  - vuex getter,setter 느낌
  - get : state를 받아와서 본래의 atom값을 바꾸지 않고, 조건에 따른 값으로 출력가능
  - set : state를 set하는 것을 도와주는 속성, atom의 값을 수정하는 것을 도와줌
    - set함수는 원래의 state가 어떤 것이든 그걸로 수정하게 도와줌.
    - set을 호출하여 사용하는 방법 , const [get 속성에서 반환한 값, set 속성에서 부르는 함수] = useRecoilSelector(selector)

```ts
const selector = atoms({
  key:uniqueKey,
  get:({get}) => {
    const state = get(atomState)
    return state * 2
  }
  set:({set}, newValue) => {
    const changedValue = newValue * 2;
    set(atomState, changedValue);
  }
})
```

## `React Hook Form`

- react에서 Form을 작업하기에 가장 좋은 방법
- npm i react-hook-form
- const {register, watch, handleSubmit, formState, setError } = useForm();

  - register : input요소의 name, onBlur, onChange, html요소의 attrs도 미리 설정 가능
    {...name,
    {
    required : true,
    pattern: regExp,
    validate : (value) => boolean
    }
    }

    - 1. 기존에 html에서 attrs를 설정한다면 브라우저 콘솔창에서 수정하고 조작이 가능하여 보안성이 없었음.
    - 2. js로 form에서 받는 변수를 일일이 길이 제한 조건문이나 수동으로 제한을 넣는 코드를 짬.
    - 3. react-hook-form에서는 js에서 html의 attrs를 사용했을때 브라우저 콘솔창에서도 확인할수 없지만 그대로 동작됨 (보안, 코드복잡성x)
    - 4. 기존 html 코드에서 attrs로 설정한 경우, 브라우저에서 말풍선 알림과 함께 에러가 뜨지만, react-hook-form은 에러난 곳의 element로 focus만 됨. 하지만 formState.errors로 추적 가능.(보완)

  - watch : form의 모든 값 변화 주시
  - handleSubmit : 폼의 onSubmit 이벤트 함수로, 데이터가 유효할 경우 작동하는 onValid(필수) 함수와 유효하지 않을 경우 onInvalid(옵션) 함수 두가지 인자를 받는다.(폼의 다른 element들의 validation을 모두 마친후에 유효한 데이터인지, 유효하지 않은지 마지막에 작동한다.)
  - formState : 폼의 상태, 에러 등을 객체로 받아온다.
    - errors
      - type , message를 받아오는데 type은 알아서 작성되고, message는 타입에 따라 message 혹은 { value : value, message: message }를 담아서 element에 보내면 된다. ( 처음 제출하고 난 이후부터 값이 바뀔때 마다 실시간 갱신)
  - setError : 특정한 에러를 발생하게 만들어준다.
  - setValue : 말그대로의 의미

- interface를 설정할때 그 안의 속성 한가지만 사용하고 싶으면, 변수 : 인터페이스명["속성명"] 을 사용하면 된다.

## `Trello Clone`

- drag and drops app site
- npm i react-beautiful-dnd
- DragDropContext : onDragEnd = {fn}
  - Droppable : 어떠한 것을 드롭할 수 있는 영역 droppableId = ''
  - Draggable : 우리가 드래그 할수 있는 영역 draggableId='' index={0}
    - dragHandleProps : 드래그 할수있는 영역
    - draggableProps : 드래그 되어지는 영역
- splice

## `Framer Motion`

- animation library
- npm i framer-motion
- <motion.html엘리먼트>
- styled-componets에 적용할 경우 : const 변수명 = styled(motion.div)``;

- properties. ex)

```js
  // 애니메이션 시작할 때 설정
  initial : {
    scale :0
  }
  // 애니메이션 상태 변화 설정
  transition : {
    type : "spring" | "tween" // spring은 현실의 물리현상이 들어간(?) 애니메이션, tween은 선형적인 애니메이션
    mass : number, // 물체 무게
    damping : number // 반동, 0에 가까울수록 반동이 적어짐 ,0은 무기한진동
    stiffness : number // 경직성
    duration : number,
    delay : 5
  }
  // 애니메이션 상태 변화
  animate : {
    borderRadius : "100px"
  }
```

- variant
  - component code를 깔끔하게 해줌 (복잡성x, 가독성)

```tsx
const myVars = {
  start: {
    scale: 0,
  },
  end: {
    scale: 1,
    rotateZ: 360,
    transition: {
      type: "spring", // 물리법칙을 시뮬레이트하는 타입 힘, 탄력성, 경직도
      damping: 2 // 저항
      stiffness: 2 // 경직
      mass : 5 // 무게
      bounce : 0.25 // 탄력
      delay: 2,
      delayChildren: 0.5, // 말그대로 자식 컴포넌트 애니메이션의 딜레이
      staggerChildren: 0.5, // 자식컴포넌트의 순차적 애니메이션 딜레이
    },
  },
};

function App() {
  return (
    <>
      <Wrapper>
        <Box variants={myVars} initial="start" animate="end" />
      </Wrapper>
    </>
  );
}
```

hook
regexp
recoil
redux
둘의차이
export
import
enum
type
제네릭, 다운캐스팅 - () <>
mutation,
actions, setter, getter

recoil - 전역 변수 관리
react-query - api 받아온 데이터 관리(?)
