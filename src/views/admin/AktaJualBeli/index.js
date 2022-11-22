import React from "react";
import MasterFormAjb from "components/AJB/MasterForm";
import { Container, Row, Col } from "reactstrap";

export default function stepperIndexAjb() {
  return (
    <Container className="mx-auto">
      <Row>
        <Col className="pt-8 mx-auto lg:w-8/12">
          <MasterFormAjb className='h-full'/>
        </Col>
      </Row>
    </Container>
  );
}