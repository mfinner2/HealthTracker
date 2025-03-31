import Badge from "react-bootstrap/esm/Badge";
import Card from 'react-bootstrap/Card';


export default function FoodCard(){
  return (
    <Card className="p-1 shadow-sm rounded">
      <Card.Title>
        Meals <button className="btn btn-outline-secondary btn-sm">+</button>
      </Card.Title>
      <Card.Body>
          <p className="mt-2"><strong>Breakfast:</strong> <Badge bg="success">recorded</Badge></p>
          <p><strong>Lunch:</strong> <Badge bg="success">recorded</Badge></p>
          <p><strong>Dinner</strong> <Badge bg="warning">not recorded</Badge></p>
          <p><strong>Snacks</strong> <Badge bg="warning">not recorded</Badge></p>
      </Card.Body>
    </Card>
  );
}