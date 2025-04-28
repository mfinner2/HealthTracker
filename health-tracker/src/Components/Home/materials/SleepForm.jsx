import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function SleepForm({ onSave, selectedDate, defaultData = {} }) {

	const [bedtime, setBedtime] = useState('');
	const [wakeTime, setWakeTime] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		const sleepData = {
			bedtime, 
			wakeTime,
			totalSleep: calculateSleep(bedtime, wakeTime),	
		};
		onSave(sleepData);
	};

	const calculateSleep = (bed, wake) => {
		if (!bed || !wake || !selectedDate) return '';
		const bedtimeDate = new Date(`${selectedDate.toISOString().split('T')[0]}T${bed}`);
		const wakeDate = new Date(`${selectedDate.toISOString().split('T')[0]}T${wake}`);

		if (wakeDate <= bedtimeDate){
			wakeDate.setDate(wakeDate.getDate() + 1);
		}

		const diff = (wakeDate - bedtimeDate) / (1000 * 60 * 60);
		return `${Math.floor(diff)} hr ${Math.round((diff % 1) * 60)} min`;
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group>
				<Form.Label>Bedtime</Form.Label>
				<Form.Control type="time" value={bedtime} onChange={(e) => setBedtime(e.target.value)} />
			</Form.Group>
			<Form.Group>
				<Form.Label>Wake Time</Form.Label>
				<Form.Control type="time" value={wakeTime} onChange={(e) => setWakeTime(e.target.value)} />
			</Form.Group>
			<Button variant="primary" type="submit" className="mt-2">Save</Button>
		</Form>
	)
}