import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// import component cards
import Calendar from "./materials/Calendar.jsx";
import SleepCard from "./materials/SleepCard.jsx";
import FoodCard from "./materials/FoodCard.jsx";
import ActionButtons from './materials/Actions.jsx';


export default function DataPage() {
	return (
		<Container fluid="xs">
			<Row>
				<Calendar />
			</Row>
			<Row>
				<Col><h2>Actions Today</h2></Col>
			</Row>
			<Row>
				<Col><SleepCard /></Col>
				<Col><FoodCard /></Col>
			</Row>
      <ActionButtons />
		</Container>
	);
}
