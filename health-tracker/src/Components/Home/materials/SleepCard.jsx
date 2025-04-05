
import CardBody from 'react-bootstrap/esm/CardBody';
import * as Icon from 'react-bootstrap-icons';
import { Row, Col, Card, Badge, Container, Button, Modal } from 'react-bootstrap';
import SleepForm from './SleepForm';
import { useState } from 'react';

export default function SleepCard({ sleepData, onSave , selectedDate}){
  const [showForm, setShowForm] = useState(false);
  
  return (
    <>
    <Card className= "p-0 shadow-sm rounded"> 
    <Container className="shadow-md rounded-lg p-3">
      {sleepData ? (
        <>
        <Row >
        <Col xs={5}>
          <Card.Title>Sleep </Card.Title>
        </Col>
     <Col xs={{ span: 1, offset: 5 }} className="text-end">
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={() => setShowForm(true)}
          title="Edit Sleep Entry"
          style={{ border: 'none', background: 'none', padding: 0 }}
        >
          <Icon.PencilSquare size={20} />
        </Button>
      </Col>
      </Row>
      <Row>
        <Col> In Bed </Col>
        <Col><Badge bg="dark">{sleepData.bedtime}</Badge></Col>
      </Row>
      <Row>
          <Col>Awake </Col>
          <Col><Badge bg="secondary">{sleepData.wakeTime}</Badge></Col>
      </Row>
      <Row>
          <Col>Total Time </Col>
          <Col><Badge bg="primary">{sleepData.totalSleep}</Badge></Col>
      </Row>
    </>
    ) : (
      <>
      <Row>
        <Col>
          <Card.Title>Log Sleep</Card.Title>
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <Button variant="primary" className="mt-2" onClick={() => setShowForm(true)}>
          <Icon.Plus size={20} />
        </Button>
      </Row>
      </>

    )}
    </Container>
    </Card>
    <Modal show={showForm} onHide={() => setShowForm(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Log Sleep</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SleepForm onSave={(data) => { onSave(data); setShowForm(false); }} selectedDate={selectedDate} />
      </Modal.Body>
    </Modal>
    </>
  );
}