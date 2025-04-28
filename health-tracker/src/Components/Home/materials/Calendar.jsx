// calendar selection for data page
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

function getStartOfWeek(date) {
	const day = date.getDay(); // 0(su) - 6(sa)
	const diff = date.getDate() - day + (day === 0 ? -6 : 1);
	return new Date(date.setDate(diff));
}


const Calendar = ({ value, onChange }) => {
	const [weekDates, setWeekDates] = useState([]);

	useEffect(() => {
		const startOfWeek = getStartOfWeek(new Date());
		const days = [];

		for (let i = 0; i < 7; i++) {
			const day = new Date(startOfWeek);
			day.setDate(startOfWeek.getDate() + i);
			days.push(day);
		}
		setWeekDates(days);
	}, []);

	const isSameDate = (d1, d2) =>
		d1.getFullYear() === d2.getFullYear() &&
		d1.getMonth() === d2.getMonth() &&
		d1.getDate() === d2.getDate();
	

	const daynames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

	return (
		<Container className="text-center py-2">
			<Row>
				{weekDates.map((date, index) => (
					<Col key={index} onClick={() => onChange(date)}>
						<div className={`p-2 rounded ${isSameDate(value, date) ? "bg-secondary text-white" : ""}`} style={{ cursor: "pointer"}}>
							<div>{daynames[index]}</div>
							<div>{date.getDate()}</div>
						</div>
					</Col>
				))}
			</Row>
		</Container>
	);
};

export default Calendar;