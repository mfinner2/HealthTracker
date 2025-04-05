import { Row, Container, Col, Card, CardBody, CardText, Button, Form } from "react-bootstrap";
import { logOutUser } from "../../../Common/Services/authService";
import * as Icon from "react-bootstrap-icons";
import Parse from "../../../Common/Services/parseConfig";
import { useEffect, useState } from "react";

const Profile = ({ onLogout }) => {
    const [userData, setUserData] = useState({});
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
      const currentUser = Parse.User.current();
      if (currentUser) {
        setUserData({
          name: currentUser.get("username"),
          email: currentUser.get("email"),
				  dob: currentUser.get("dob"),
				  height: currentUser.get("height"),
				  weight: currentUser.get("weight"),
        });
      }
    }, []);

    const handleLogout = async () => {
      await logOutUser();
      onLogout?.();
    };

    const handleSaveProfile = async (e) => {
      e.preventDefault();

      try {
        const currentUser = Parse.User.current();

        currentUser.set("username", userData.name);
        currentUser.set("dob", userData.dob);
        currentUser.set("height", userData.height);
        currentUser.set("weight", userData.weight);

        await currentUser.save();
        setEditMode(false);
      } catch (err) {
        console.error("Failed to save user data:", err.message);
      }
    };

  
    return (
      <Container className="py-5 h-100 d-flex justify-content-center align-items-start">
        <Card
          className="shadow-lg rounded-4 border-0 position-relative"
          style={{ width: "100%", maxWidth: "500px", backgroundColor: "#fff" }}
        >
          <CardBody className="p-4">
            <Button variant="outline-secondary"
              size="sm"
              className="position-absolute top-0 end-0 mt-3 me-3"
              onClick={() => setEditMode(!editMode)}
              title={editMode ? "Cancel Edit" : "Edit Profile"}
            >
              <Icon.PencilSquare size={16} />
            </Button>

            <div className="mb-4">
              <h4 className="fw-bold mb-1">{userData.name || "Your Profile"}</h4>
              <div className="text-muted small">Profile Information</div>
            </div>

            {editMode ? (
              <Form onSubmit={handleSaveProfile}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={userData.name || ""}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    value={userData.dob || ""}
                    onChange={(e) => setUserData({ ...userData, dob: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Height</Form.Label>
                  <Form.Control
                    type="text"
                    value={userData.height || ""}
                    onChange={(e) => setUserData({ ...userData, height: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Weight</Form.Label>
                  <Form.Control
                    type="text"
                    value={userData.weight || ""}
                    onChange={(e) => setUserData({ ...userData, weight: e.target.value })}
                  />
                </Form.Group>
                <div className="d-flex justify-content-between mt-3">
                  <Button variant="primary" type="submit">Save</Button>
                  <Button variant="outline-danger" onClick={handleLogout}>Log Out</Button>
                </div>
              </Form>
            ) : (
              <>
                <h6>Information</h6>
                <hr />
                <Row>
                  <Col><strong>Email:</strong> {userData.email}</Col>
                  <Col><strong>Date of Birth:</strong> {userData.dob}</Col>
                </Row>
                <br />
                <h6>Data</h6>
                <hr />
                <Row>
                  <Col><strong>Height:</strong> {userData.height}</Col>
                  <Col><strong>Weight:</strong> {userData.weight}</Col>
                </Row>
                <div className="d-flex justify-content-end mt-4">
                  <Button variant="outline-danger" onClick={handleLogout}>Log Out</Button>
                </div>
              </>
            )}
          </CardBody>
        </Card>

      </Container>
    );
};
  
  export default Profile;
  