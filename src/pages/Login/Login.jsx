import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Login.css";
import { loginUser } from "../../services/apiCalls";
import { useDispatch } from "react-redux";
import { login } from "../userSlice";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { inputHandler } from "../../services/useful";
import { InputText } from "../../common/InputText/InputText";


export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [token, setToken] = useState("");
  const [userError, setUserError] = useState({
    credentials: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e, body) => {
    e.preventDefault();
    loginUser(body)
      .then((res) => {
        setToken(res);
      })
      .catch((error) => {
        console.log(error)
        setUserError({ credentials: error.response.data.message });
      });
  };

  useEffect(() => {
    if (token) {
      let decoded = jwtDecode(token);
      dispatch(
        login({
          token: token,
          name: decoded.name,
          role: decoded.roleId,
        })
      );
      navigate("/");
    }
  }, [token]);

  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col xs={10} md={6}>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <InputText
                type={"email"}
                design={userError.emailError ? (
                  "errorInput"
                ) : (
                  ""
                )}
                placeholder={"Enter email"}
                name={"email"}
                state={setUser}
                errorState={setUserError}
                />
                {/* <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  onChange={(e) => {
                    inputHandler(e, setUser);
                  }}
                /> */}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <InputText
                type={"password"}
                design={userError.passwordError ? (
                  "errorInput"
                ) : ("")}
                placeholder={"Enter your password"}
                name={"password"}
                state={setUser}
                errorState={setUserError}
                />
              </Form.Group>
              {userError?.credentials ? (
                <div>{userError.credentials}</div>
              ) : (
                <div></div>
              )}
              <Button
                variant="primary"
                type="submit"
                onClick={(e) => {
                  submitHandler(e, user);
                }}
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
