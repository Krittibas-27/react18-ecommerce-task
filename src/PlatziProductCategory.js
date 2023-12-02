import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { RootProductServer } from "./config/RootApi";
import SpinnerComponent from "./components/SpinnerComponent";
import { useNavigate } from "react-router-dom";

const PlatziProductCategory = () => {
  const navigate = useNavigate();
  const [serverAllProdicts, setServerAllProdicts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [query, setQuery] = useState("");

  const getAllProducts = () => {
    setIsLoading(true);
    RootProductServer.get(`/api/v1/categories`)
      .then((res) => {
        //console.log("Res-", res);
        if (res.status === 200) {
          setIsLoading(false);
          setServerAllProdicts(res.data.reverse());
          setIsError(false);
        }
      })
      .catch((err) => {
        setIsError(false);
        setIsLoading(false);
      });
  };
  const searchProduct = (item) => {
    return item.filter((data) => {
      return data.name.toLowerCase().includes(query);
    });
  };
  const resetSearch = () => {
    setQuery("");
  };
  const selectedCategory = (data) => {
    console.log("data-", data);
    navigate(`categories/${data.id}/products`,{
        state: {relatedProduct:data}
    })
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="my-4">
      <Container>
        <h1 className="text-center">ProductCategoryList</h1>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Form>
              <InputGroup className="m-3">
                <Form.Control
                  placeholder="Search Product"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Button variant="primary" onClick={() => resetSearch()}>
                  Reset
                </Button>
              </InputGroup>
            </Form>
          </Col>
        </Row>
        <Row>
          {isLoading ? (
            <SpinnerComponent />
          ) : isError ? (
            <h3>Product Not Found</h3>
          ) : (
            searchProduct(serverAllProdicts).map((item) => {
              return (
                <Col md={4} className="my-4" key={item.id}>
                  <Card>
                    <Card.Img
                      className="card_img"
                      variant="top"
                      src={item.image}
                      onClick={() => selectedCategory(item)}
                    />
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      {/* <Button variant="primary">
                        <FiShoppingCart /> Add to Cart
                      </Button> */}
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          )}
        </Row>
      </Container>
    </div>
  );
};

export default PlatziProductCategory;
