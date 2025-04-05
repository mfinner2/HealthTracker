import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import { saveSleepEntry, getSleepEntryByDate } from '../../../Common/Services/sleepService.jsx';
import { saveFoodEntry, getFoodEntryByDate } from '../../../Common/Services/foodService.jsx';

// import component cards
import Calendar from "./materials/Calendar.jsx";
import SleepCard from "./materials/SleepCard.jsx";
import FoodCard from "./materials/FoodCard.jsx";
import ActionButtons from './materials/Actions.jsx';


export default function DataPage() {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [sleepData, setSleepData] = useState(null);
	const [foodData, setFoodData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const latestSleep = await getSleepEntryByDate(selectedDate);
			const latestFood = await getFoodEntryByDate(selectedDate);
			setSleepData(latestSleep);
			setFoodData(latestFood);
		};
		fetchData();
	}, [selectedDate]);
	


	const handleSaveSleep = async (data) => {
		await saveSleepEntry(data, selectedDate);
		const latest = await getSleepEntryByDate(selectedDate);
		setSleepData(latest);
	};
	

	const handleSaveFood = async (data) => {
		await saveFoodEntry(data);
		const latest = await getFoodEntryByDate(date);
		setFoodData(latest);
	};

	return (
		<Container fluid="xs">
			<Row>
				<Calendar value={selectedDate} onChange={setSelectedDate}/>
			</Row>
			<Row>
				<Col><h2>Actions Today</h2></Col>
			</Row>
			<Row>
				<Col><SleepCard sleepData={sleepData} onSave={handleSaveSleep} selectedDate={selectedDate} /></Col>
				<Col><FoodCard foodData={foodData} onSave={handleSaveFood} selectedDate={selectedDate} /></Col>
			</Row>
      <ActionButtons />
		</Container>
	);
};
