import { useState, useEffect } from "react";
import { Card, Container, Row, Col, Button, Modal, ListGroup, Badge } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import { getGeneralEntriesByDate, saveGeneralEntry } from "../../../../Common/Services/generalLogService";
import GeneralLogForm from "./GeneralLogForm";

export default function GeneralTrackerCard({ selectedDate }) {
	const [entries, setEntries] = useState([]);
	const [showForm, setShowForm] = useState(false);

	useEffect(() => {
		const fetchEntries = async () => {
			const logs = await getGeneralEntriesByDate(selectedDate);
			setEntries(logs);
		};
		fetchEntries();
	}, [selectedDate]);

	const handleSave = async (formData) => {
		await saveGeneralEntry(formData, selectedDate);
		const updated = await getGeneralEntriesByDate(selectedDate);
		setEntries(updated);
		setShowForm(false);
	};
	
	return (
		<Card className="p-0 shadow-sm rounded mt-3">
			<Container className="p-3">
				<Row className="mb-2 align-items-center">
					<Col><h5>Health Notes</h5></Col>
					<Col xs="auto">
						<Button variant="outline-primary" size="sm" onClick={() => setShowForm(true)}>
							<Icon.Plus size={18} className="me-1" /> 
							Add Entry
						</Button>
					</Col>
				</Row>

				{entries.length === 0 ? (
					<p className="text-muted">No entries logged yet today.</p>
				) : (
					<ListGroup>
						{entries.map((entry) => (
							<ListGroup.Item key={entry.id}>
								<strong>{entry.category.toUpperCase()}</strong>: {entry.value}
								{entry.severity !== undefined && (
									<Badge bg="warning" className="ms-2">Severity: {entry.severity}</Badge>
								)}
								{entry.notes && <div className="text-muted small">{entry.notes}</div>}
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Container>

			<Modal show={showForm} onHide={() => setShowForm(false)}>
				<Modal.Header closeButton>
					<Modal.Title>New Log Entry</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<GeneralLogForm onSave={handleSave} />
				</Modal.Body>
			</Modal>
		</Card>
	);
}
