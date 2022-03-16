import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const AddNetworkModal = ({ networkToAdd, setnetworkToAdd }) => {
  return (
    <Modal
      show={!!networkToAdd}
      style={{ opacity: 1 }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={false}
      fade={false}
    >
      <Modal.Header closeButton onClick={()=> setnetworkToAdd(false)}>
        <Modal.Title id="contained-modal-title-vcenter">
          {"Conect to: "+networkToAdd.ssid}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setnetworkToAdd(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNetworkModal;
