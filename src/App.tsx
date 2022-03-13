import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";

const Wrapper = styled.div`
	display: flex;
	max-width:480px;
	width:100%;
	margin:0 auto;
	justify-content: center;
	align-items: center;
	height:100vh;
`;

const Boards = styled.div`
	display:grid;
	grid-template-columns: repeat(3, 1fr);
	width:100%;
`;

const Board = styled.div`
	padding: 20px 10px;
	background-color:${props => props.theme.boardColor};
	border-radius: 10px;
	min-height:200px;
`;

const Card = styled.div`
	padding:5px 10px;
	border-radius: 5px;
	margin-bottom: 5px;
	background-color:${props => props.theme.cardColor};
`


function App() {
	const [toDos, setToDos] = useRecoilState(toDoState);
	const onDragEnd = ({ destination, source }: DropResult) => {
		const prevToDo = toDos[source.index];
		const newToDos = (toDos.splice(0, source?.index)).splice(destination?.index, 0, prevToDo)
	}
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Wrapper>
				<Boards>
					<Droppable droppableId="one">
						{(arg) => (
							<Board ref={arg.innerRef} {...arg.droppableProps}>
								{toDos.map((todo, i) => (<Draggable key={todo} draggableId={todo} index={i}>
									{(arg) => (
										<Card ref={arg.innerRef} {...arg.dragHandleProps}{...arg.draggableProps}>
											{todo}
										</Card>
									)}
								</Draggable>))}
								{arg.placeholder}
							</Board>
						)}
					</Droppable>
				</Boards>
			</Wrapper>
		</DragDropContext>);
}

export default App;