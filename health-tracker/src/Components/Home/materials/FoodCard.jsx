import Badge from "react-bootstrap/esm/Badge";
import Card from 'react-bootstrap/Card';
import * as Icon from 'react-bootstrap-icons';
import { Col, Container, Modal, Row } from "react-bootstrap";

import FoodForm from "./FoodForm";
import { useState } from "react";

export default function FoodCard({ foodData, onSave }){
  const [showForm, setShowForm] = useState(false);

  return (
    <>
    <Card className="p-0 shadow-sm rounded">
    <Container className="shadow-md rounded-lg p-3">
      <Row>
        <Col xs={6}>
          <Card.Title>Meals </Card.Title>
        </Col>
      <Col xs={{ span: 1, offset: 2 }}>
        <button className="btn btn-outline-primary btn-sm" onClick={() => setShowForm(true)}>
          <Icon.PlusCircle size={24}/>
        </button>
        </Col>
      </Row>
      <Row>    
        <Col>Breakfast:</Col>
        <Col><Badge bg="primary">recorded</Badge></Col>
      </Row>
      <Row>
        <Col>Lunch:</Col>
        <Col><Badge bg="primary">recorded</Badge></Col>      </Row>
      <Row>
        <Col>Dinner:</Col>
        <Col><Badge bg="secondary">not recorded</Badge></Col>      </Row>
      <Row>
        <Col>Snacks:</Col>
        <Col><Badge bg="secondary">not recorded</Badge></Col>        </Row>
    </Container>
    </Card>

    <Modal show={showForm} onHide={() => setShowForm(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Log Meals</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FoodForm onSave={(data) => {onSave(data); setShowForm(false); }} />
      </Modal.Body>
    </Modal>
    </>
  );
}