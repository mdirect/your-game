import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function AddForm({ submitHandler }) {
  return (
    <>
      <Form onSubmit={submitHandler}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Наименование
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" placeholder="Наименование" name="name" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Описание
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Описание"
              name="description"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Статус
          </Form.Label>
          <Col sm="4">
            <Form.Select aria-label="Статус" name="status">
              <option value="false">Не сделано</option>
              <option value="true">Сделано</option>
            </Form.Select>
          </Col>
          <Col sm="6"></Col>
        </Form.Group>
        <Button variant="primary" type="submit">
          Добавить
        </Button>
      </Form>
    </>
  );
}

export default AddForm;
