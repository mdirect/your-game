import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Trash } from "lucide-react";

function EditForm({
  skeletUpd,
  setSkeletUpd,
  onUpdate,
  setShowEditForm,
  onDelete,
}) {
  const submitHandler = (event) => {
    event.preventDefault();
    onUpdate(skeletUpd.id, skeletUpd);
    setShowEditForm(false);
  };

  return (
    <>
      <br />
      <Form onSubmit={submitHandler}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Наименование
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              value={skeletUpd.name}
              onChange={(ev) =>
                setSkeletUpd({ ...skeletUpd, name: ev.target.value })
              }
              placeholder="Наименование"
              name="name"
              autoFocus
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Описание
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              value={skeletUpd.description}
              onChange={(ev) =>
                setSkeletUpd({ ...skeletUpd, description: ev.target.value })
              }
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
            <Form.Select
              aria-label="Статус"
              value={skeletUpd.status}
              onChange={(ev) =>
                setSkeletUpd({ ...skeletUpd, status: ev.target.value })
              }
              name="status"
            >
              <option value="false">Не сделано</option>
              <option value="true">Сделано</option>
            </Form.Select>
          </Col>
          <Col sm="6"></Col>
        </Form.Group>
        <Row>
          <Col></Col>
          <Col sm={4}>
            <button
              className="button_edit_form"
              onClick={() => setShowEditForm((prev) => !prev)}
            >
              Скрыть
            </button>
            <button
              className="button_edit_form"
              variant="primary"
              type="submit"
            >
              Отправить
            </button>
            <button className="button_delete" onClick={onDelete}>
              <Trash />
            </button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default EditForm;
