import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { hourSelector, minutesState } from "./atoms";

function App() {
	const [minutes, setMinutes] = useRecoilState(minutesState);
	const [hours, setHours] = useRecoilState(hourSelector);
	const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
		setMinutes(+event.currentTarget.value);
	}
	const onHoursChange = (event: React.FormEvent<HTMLInputElement>) => {
		setHours(+event.currentTarget.value);
	}
	return <>
		<input onChange={onMinutesChange} value={minutes} type="number" placeholder="minutes" />
		<input onChange={onHoursChange} value={hours} type="number" placeholder="hours" />
	</>
}
export default App;