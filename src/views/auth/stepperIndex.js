import React from "react";
import MasterForm from "components/Stepper/MasterForm";
import { Container, Row, Col } from "reactstrap";

export default function stepperIndex() {
  return (
    <Container className="mx-auto mb-4 h-screen">
      <Row>
        <Col className="pt-12 w-900-d mx-auto mt-12">
          <MasterForm className="h-full w-800-d mb-4" />
        </Col>
      </Row>
    </Container>
  );
}
