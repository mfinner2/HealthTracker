import React from "react";
import { Button, Container } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

const ActionButtons = () => {
  return (
    <Container className="d-flex flex-column gap-2 mt-3">
      <Button variant="outline-secondary" className="d-flex align-items-center">
        <Icon.HeartFill className="me-4"/> Activity
      </Button>
      <Button variant="outline-secondary" className="d-flex align-items-center">
		<Icon.EmojiSmileFill className="me-4"/> Mood
      </Button>
      <Button variant="outline-secondary" className="d-flex align-items-center">
		<Icon.Tablet className="me-4"/> Add a Symptom
      </Button>
    </Container>
  );
};

export default ActionButtons;
