import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import CardBody from 'react-bootstrap/esm/CardBody';
import * as Icon from 'react-bootstrap-icons';

export default function SleepCard(){
  return (
    <Card className= "p-1 shadow-sm rounded"> 
    <div className="bg-transparent shadow-md rounded-lg p-4">
      <Card.Title>Sleep <Icon.MoonFill /></Card.Title>
      <Card.Body>
        <p>In Bed <Badge bg="dark">10:20 pm</Badge></p>
        <p>Awake <Badge bg="secondary">7:30 am</Badge></p>
        <p>Total Time: <Badge bg="success">8 hr 30 mins</Badge></p>
      </Card.Body>
    </div>
    </Card>
  );
}