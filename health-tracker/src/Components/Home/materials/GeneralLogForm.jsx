import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function GeneralLogForm({ onSave }){
	const [category, setCategory] = useState("mood");
	const [value, setValue] = useState("");
	const [severity, setSeverity] = useState("");
	const [notes, setNotes] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		const logData = {
			category,
			value,
			severity: severity ? parseInt(severity) : undefined,
			notes: notes.trim() !== "" ? notes : undefined,
		};

		onSave(logData);
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group className="mb-3">
				<Form.Label>Category</Form.Label>
				<Form.Select value={category} onChange={(e) => {
					setCategory(e.target.value);
					setValue("");
					setSeverity("");
					setNotes("");
				}}>
					<option value="mood">Mood</option>
					<option value="activity">Activity</option>
					<option value="symptom">Symptom</option>
				</Form.Select>
			</Form.Group>

			{category === "mood" && (
				<Form.Group className="mb-3">
					<Form.Label>Mood Level (1–10)</Form.Label>
					<Form.Range min={1} max={10} value={value || 5} onChange={(e) => setValue(e.target.value)} />
					<div className="text-center small text-muted">You selected: {value || 5}</div>
				</Form.Group>
			)}
						
			{category === "activity" && (
				<Form.Group className="mb-3">
					<Form.Label>Activity Name</Form.Label>
					<Form.Control 
						type="text" 
						placeholder="e.g. Walking, Gym, Yoga"
						value={value} 
						onChange={(e) => setValue(e.target.value)} 
						required
					/>
				</Form.Group>
			)}

			{category === "symptom" && (
				<>
					<Form.Group className="mb-3">
						<Form.Label>Symptom Name</Form.Label>
						<Form.Control
							type="text"
							placeholder="e.g. Headache, Nausea"
							value={value}
							onChange={(e) => setValue(e.target.value)}
							required
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Severity (1–10)</Form.Label>
						<Form.Select value={severity} onChange={(e) => setSeverity(e.target.value)} required>
							<option value="">Select severity</option>
							{Array.from({ length: 10 }, (_, i) => (
								<option key={i + 1} value={i + 1}>{i + 1}</option>
							))}
						</Form.Select>
					</Form.Group>
				</>
			)}

			<Form.Group className="mb-3">
				<Form.Label>Notes (optional)</Form.Label>
				<Form.Control 
					as="textarea" 
					rows={2}
					placeholder="Add any extra details..."
					value={notes}
					onChange={(e) => setNotes(e.target.value)}
				/>
			</Form.Group>

			<Button type="submit" variant="primary" className="w-100">Save Entry</Button>

		</Form>
	);
}