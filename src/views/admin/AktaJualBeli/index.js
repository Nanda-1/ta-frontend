import React from "react";
import MasterFormAjb from "components/AJB/MasterForm";
import { Container, Row, Col } from "reactstrap";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

export default function StepperIndexAjb() {
  let step = Cookies.get("step");

  let { id } = useParams();

  return (
    <Container className="mx-auto">
      <Row>
        <Col
          className={`pt-8 mx-auto ${
            step === "dokumen" ? "lg:w-12/12" : "lg:w-8/12"
          }`}
        >
          <MasterFormAjb className="h-full" id={id} />
        </Col>
      </Row>
    </Container>
  );
}
