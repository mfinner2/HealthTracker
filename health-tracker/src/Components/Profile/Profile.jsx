import { Row, Container, Col, Card, CardBody, CardText, Button } from "react-bootstrap";
import { logOutUser } from "../../../Common/Services/authService";
import * as Icon from "react-bootstrap-icons";

const Profile = ({ onLogout }) => {
  const user = {name: "Test User", email: "example@email.com", dob: "01-01-1970", 
    height:"5 ft 10 in", weight:"180 lbs"};

    const handleLogout = async () => {
      await logOutUser();
      onLogout?.();
    };
  
    return (
      <Container className="py-5 h-100">
        <Row>
          <Col lg="6" className="mb-4 mb-lg-0">
            <Card className="mb-3">
              <Row className="g-0">
                <Col md="4" className="gradient-custom text-center">
                <Card.Title>{user.name}</Card.Title>
                <Icon.PencilSquare />
                </Col>
                <Col md="8">
                  <CardBody className="p-4">
                    <h6>Information</h6>
                    <hr className="mt-0 mb-2" />
                    <Row className="pt-1">
                      <Col size="6" className="mb-1">
                        <h6>Email</h6>
                        <CardText className="text-muted">{user.email}</CardText>
                      </Col>                      
                      <Col size="6" className="mb-1">
                        <h6>Date of Birth</h6>
                        <CardText className="text-muted">{user.dob}</CardText>
                      </Col>
                    </Row>
                    <br />
                    <h6>Data</h6>
                    <hr className="mt-0 mb-2" />
                    <Row className="pt-1">
                      <Col size="6" className="mb-1">
                        <h6>Height</h6>
                        <CardText className="text-muted">{user.height}</CardText>
                      </Col>                      
                      <Col size="6" className="mb-1">
                        <h6>Weight</h6>
                        <CardText className="text-muted">{user.weight}</CardText>
                      </Col>
                    </Row>
                    <div className="d-flex justify-content-end mt-4">
                      <Button variant="outline-danger" onClick={handleLogout}>Log Out</Button>
                    </div>
                  </CardBody>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };
  
  export default Profile;
  