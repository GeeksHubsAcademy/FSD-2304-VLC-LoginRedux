import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Login.css";
import { loginUser } from "../../services/apiCalls";
import { useDispatch } from "react-redux";
import { login } from "../userSlice";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const inputHandler = ({ target }) => {
    let { name, value } = target;
    setUser((prevState) => ({
        ...prevState,
        [name] : value
    }))
  };

  const submitHandler = (e, body) => {
    e.preventDefault()
    loginUser(body)
    .then(res => {
        let decoded = jwtDecode(res)
        dispatch(
            login({
                token: res,
                name: decoded.name,
                role: decoded.rol
            })
        )
        navigate("/")
    })
  }

  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col
            xs={10}
            md={6}
          >
            <Form>
              <Form.Group
                className="mb-3"
                controlId="formBasicEmail"
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  onChange={(e)=>{inputHandler(e)}}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="formBasicPassword"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e)=>{inputHandler(e)}}

                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                onClick={(e)=>{submitHandler(e, user)}}
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
