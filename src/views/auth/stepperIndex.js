import React from "react";
import MasterForm from "components/Stepper/MasterForm";
import { Container, Row, Col } from "reactstrap";

export default function stepperIndex() {
  return (
    <Container className="mx-auto mb-4">
      <Row>
        <Col className="pt-8 w-800-d mx-auto">
          <MasterForm className="h-full w-800-d mb-4" />
        </Col>
      </Row>
    </Container>
  );
}
