import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function SleepForm({ onSave }) {
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
		if (!bed || !wake) return '';
		const bedTime = new Date(`2023-01-01T${bed}`);
		const wakeTime = new Date(`2023-01-02T${wake}`);
		const diff = (wakeTime - bedTime) / (1000 * 60 * 60);
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