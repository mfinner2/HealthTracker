import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import ActivityForm from "./ActivityForm";

const ActivityButton = ({actData, onSave}) => {
	const [showForm, setShowForm] = useState(false);


	return (
		<>
			<Button variant="outline-primary btn-lg" className="d-flex align-items-center" onClick={() => setShowForm(true)}>
				<Icon.HeartFill className="me-4"/> Activity
			</Button>
			<Modal show={showForm} onHide={() => setShowForm(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Log Activity</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ActivityForm onSave={(data) => { onSave(data); setShowForm(false); }} />
				</Modal.Body>
			</Modal>
		</>
	)
};

export default ActivityButton;