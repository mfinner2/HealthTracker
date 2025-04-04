// calendar selection for data page
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

const Calendar = () => {
	const [selectedDate, setSelectedDate] = useState(4);

	// get from database
	const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
	const dates = [1, 2, 3, 4, 5, 6, 7];

	return (
		<Container className="text-center py-2">
			<Row>
				{days.map((day, index) => (
					<Col key={index} onClick={() => setSelectedDate(dates[index])}>
						<div className={`p-0 rounded ${selectedDate === dates[index] ? "bg-secondary text-white" : ""}`}>
							<div>{day}</div>
							<div>{dates[index]}</div>
						</div>
					</Col>
				))}
			</Row>
		</Container>
	);
};

export default Calendar;