import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';

// import component cards
import Calendar from "./materials/Calendar.jsx";
import SleepCard from "./materials/SleepCard.jsx";
import FoodCard from "./materials/FoodCard.jsx";
import ActionButtons from './materials/Actions.jsx';


export default function DataPage() {
	const [sleepData, setSleepData] = useState(null);
	const [foodData, setFoodData] = useState(null);

	const handleSaveSleep = (data) => {
		setSleepData(data);
	};
	const handleSaveFood = (data) => {
		setFoodData(data);
	}

	return (
		<Container fluid="xs">
			<Row>
				<Calendar />
			</Row>
			<Row>
				<Col><h2>Actions Today</h2></Col>
			</Row>
			<Row>
				<Col><SleepCard sleepData={sleepData} onSave={handleSaveSleep}/></Col>
				<Col><FoodCard foodData={foodData} onSave={handleSaveFood}/></Col>
			</Row>
      <ActionButtons />
		</Container>
	);
}
