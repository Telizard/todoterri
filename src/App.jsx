import React, { useEffect, useState } from "react";
import { Container, Button, Card, Modal, Form } from "react-bootstrap";

import { add } from "./redux/todo/slice";
import { useDispatch, useSelector } from "react-redux";

function FormModal(props) {
  const { mode = "create", onHide, show, onSubmit } = props;
  const [formValues, setFormValues] = useState({
    title: null,
    description: null,
  });

  const resetForm = () => setFormValues({ title: null, description: null });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <Modal show={show} onHide={() => onHide()} onExit={() => resetForm()}>
      <Modal.Header closeButton>
        <Modal.Title>{mode === "create" ? "Add New Todo" : "Update Todo"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div className="mb-3">
            <Form.Label htmlFor="description">Title</Form.Label>
            <Form.Control as="textarea" name="title" id="title" type="text" onChange={(e) => setFormValues({ ...formValues, title: e.target.value })} />
          </div>
          <div className="mb-3">
            <Form.Label htmlFor="description">Description</Form.Label>
            <Form.Control as="textarea" name="description" id="description" type="text" onChange={(e) => setFormValues({ ...formValues, description: e.target.value })} />
          </div>
          <div>
            <Button type="submit" variant="primary">
              Save
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
function Todo() {
  const { todos } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  const [openModalAddForm, setOpenModalAddForm] = useState(false);

  const handleSubmitAddTodo = (formValues) => {
    dispatch(add(formValues));
  };

  return (
    <Container className="py-3">
      <FormModal mode="create" show={openModalAddForm} onHide={() => setOpenModalAddForm(false)} onSubmit={handleSubmitAddTodo} />
      <div className="d-flex justify-content-between align-items-center">
        <h1>Todo App</h1>
        <Button type="button" onClick={() => setOpenModalAddForm(true)}>
          Add new
        </Button>
      </div>
      <div className="py-5">
        {todos && todos.length > 0 ? (
          <>
            {todos.map((item) => (
              <Card key={item.createdAt}>
                <Card.Header>
                  <Card.Title>Title</Card.Title>
                </Card.Header>
                <Card.Body>
                  <p>Description</p>
                </Card.Body>
                <Card.Footer>
                  <div className="d-flex justify-content-end align-items-center">
                    <Button type="button" variant="success" className="d-block" size="sm" style={{ marginRight: ".3rem" }}>
                      Edit
                    </Button>
                    <Button type="button" variant="danger" className="d-block" size="sm">
                      Remove
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            ))}
          </>
        ) : (
          <div>
            <p>{`Todo is empty. Let's create one !`}</p>
          </div>
        )}
      </div>
    </Container>
  );
}

export default Todo;
