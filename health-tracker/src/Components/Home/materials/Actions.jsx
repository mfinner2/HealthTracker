import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import ActivityButton from "./ActivityLog";


const ActionButtons = () => {
  const [actData, setActData] = useState(null);

	const handleSaveAct = (data) => {
		setActData(data);
	}

  return (
    <Container className="d-flex flex-column gap-2 mt-3">
      <ActivityButton actData={actData} onSave={handleSaveAct}/>
      <Button variant="outline-primary btn-lg" className="d-flex align-items-center">
		<Icon.EmojiSmileFill className="me-4"/> Mood
      </Button>
      <Button variant="outline-primary btn-lg" className="d-flex align-items-center">
		<Icon.Tablet className="me-4"/> Add a Symptom
      </Button>
    </Container>
  );
};

export default ActionButtons;
