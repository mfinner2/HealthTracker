import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import { saveSleepEntry, getLatestSleepEntry } from './materials/sleepService.jsx';
import { saveFoodEntry, getLatestFoodEntry } from './materials/foodService.jsx';

// import component cards
import Calendar from "./materials/Calendar.jsx";
import SleepCard from "./materials/SleepCard.jsx";
import FoodCard from "./materials/FoodCard.jsx";
import ActionButtons from './materials/Actions.jsx';


export default function DataPage() {
	const [sleepData, setSleepData] = useState(null);
	const [foodData, setFoodData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const latestSleep = await getLatestSleepEntry();
			const latestFood = await getLatestFoodEntry();
			setSleepData(latestSleep);
			setFoodData(latestFood);
		};
		fetchData();
	}, []);
	


	const handleSaveSleep = async (data) => {
		await saveSleepEntry(data);
		const latest = await getLatestSleepEntry();
		setSleepData(latest);
	};
	

	const handleSaveFood = async (data) => {
		await saveFoodEntry(data);
		const latest = await getLatestFoodEntry();
		setFoodData(latest);
	};

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
};
