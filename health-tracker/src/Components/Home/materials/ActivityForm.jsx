import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function ActivityForm({ onSave }) {
	const [desc, setDesc] = useState('');
	const [duration, setDuration] = useState('');


	const handleSubmit = (e) => {
		e.preventDefault();
		const actData = {
			desc,
			duration,
		};
		onSave(actData);
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group controlId="formDesc">
				<Form.Label>Activity Description:</Form.Label>
				<Form.Control type="text" value={desc} onChange={(e) => setDesc(e.target.value)} />
			</Form.Group>			
			<Form.Group controlId="formDur">
				<Form.Label>Activity Duration:</Form.Label>
				<Form.Control type="text" value={duration} onChange={(e) => setDuration(e.target.value)} />
			</Form.Group>

			<Button variant="primary" type="submit" className="mt-2">Save</Button>
		</Form>
	)
}