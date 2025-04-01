import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function FoodForm({ onSave }) {
	const [breakfast, setBreakfast] = useState('');
	const [lunch, setLunch] = useState('');
	const [dinner, setDinner] = useState('');
	const [snacks, setSnacks] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		const foodData = {
			breakfast, 
			lunch,
			dinner,
			snacks
		};
		onSave(foodData);
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group controlId="formBreakfast">
				<Form.Label>Breakfast</Form.Label>
				<Form.Control type="text" value={breakfast} onChange={(e) => setBreakfast(e.target.value)} />
			</Form.Group>
			<Form.Group controlId="formLunch">
				<Form.Label>Lunch</Form.Label>
				<Form.Control type="text" value={lunch} onChange={(e) => setLunch(e.target.value)} />
			</Form.Group>
			<Form.Group controlId="formDinner">
				<Form.Label>Dinner</Form.Label>
				<Form.Control type="text" value={dinner} onChange={(e) => setDinner(e.target.value)} />
			</Form.Group>
			<Form.Group controlId="formSnacks">
				<Form.Label>Snacks</Form.Label>
				<Form.Control type="text" value={snacks} onChange={(e) => setSnacks(e.target.value)} />
			</Form.Group>

			<Button variant="primary" type="submit" className="mt-2">Save</Button>
		</Form>
	)
}