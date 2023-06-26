import React, { useEffect, useState } from "react";
import "./Characters.css";
import { getAllCharacters } from "../../services/apiCalls";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { saveId } from "./charSlice";
import { useNavigate } from "react-router-dom";

export const Characters = () => {
  const [chars, setChars] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0)
  const [lastPage, setLastPage] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getAllCharacters(page).then((res) => {
      setPages(res.info.pages)
      if (page == res.info.pages) {
        setLastPage(true);
      } else if(lastPage) {
        setLastPage(false)
      }
      setChars(res.results);
    });
  }, [page]);

  const detailHandler = (charId) => {
    dispatch(saveId({ id: charId }));
    navigate("/detail");
  };
  return (
    <>
      <Container>
        <Row>
          {chars.map((char) => {
            return (
              <Col key={char.id} xs={11} s={6} md={4} lg={3} xl={2}>
                <Card>
                  <Card.Img variant="top" src={char.image} />
                  <Card.Body>
                    <Card.Title>{char.name}</Card.Title>
                    <Card.Text>{char.location.name}</Card.Text>
                    <Button
                      variant="success"
                      onClick={() => detailHandler(char.id)}
                    >
                      Detail
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
        <Row className="justify-content-center">
          {page > 1 ? (
            <>
              <Col xs={11} md={2}>
                <Button className="w-100" onClick={() => setPage(1)}>
                  FIRST PAGE
                </Button>
              </Col>
              <Col xs={11} md={3}>
                <Button className="w-100" onClick={() => setPage(page - 1)}>
                  PREVIOUS PAGE
                </Button>
              </Col>
            </>
          ) : (
            <div></div>
          )}
          {!lastPage ? (
            <>
              <Col xs={11} md={3}>
                <Button className="w-100" onClick={() => setPage(page + 1)}>
                  NEXT PAGE
                </Button>
              </Col>
              <Col xs={11} md={2}>
                <Button className="w-100" onClick={() => setPage(pages)}>
                  LAST PAGE
                </Button>
              </Col>
            </>
          ) : (
            <div></div>
          )}
        </Row>
      </Container>
    </>
  );
};
