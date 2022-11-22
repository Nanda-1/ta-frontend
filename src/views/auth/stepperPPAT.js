import React from "react";
import MasterForm from "components/Stepper/PPAT/MasterForm";
import { Container, Row, Col } from "reactstrap";

export default function stepperIndex() {
  return (
    <Container className="mx-auto mb-4">
      <Row>
        <Col className="pt-8 w-900-d mx-auto mt-4">
          <MasterForm className="h-full w-900-d mb-4" />
        </Col>
      </Row>
    </Container>
  );
}
