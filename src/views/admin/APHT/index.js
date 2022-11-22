import React from "react";
import MasterFormApht from "components/APHT/MasterForm";
import { Container, Row, Col } from "reactstrap";

export default function stepperIndexApht() {
  return (
    <Container className="mx-auto">
      <Row>
        <Col className="pt-8 mx-auto lg:w-8/12">
          <MasterFormApht className='h-full'/>
        </Col>
      </Row>
    </Container>
  );
}