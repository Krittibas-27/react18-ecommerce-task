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
import { useParams } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";

const PlatziProductList = () => {
  const {catid} = useParams();
  //console.log('catid-', catid)
  const navigate = useNavigate();
  const [resCategoryProdicts, setResCategoryProdicts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [query, setQuery] = useState("");

  const getAllCatProducts = () => {
    setIsLoading(true);
    RootProductServer.get(`/api/v1/categories/${catid}/products`)
      .then((res) => {
        //console.log("Res-", res);
        if (res.status === 200) {
          setIsLoading(false);
          setResCategoryProdicts(res.data.reverse());
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
      return data.title.toLowerCase().includes(query);
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
    getAllCatProducts();
  }, []);
  console.log('resCategoryProdicts-',resCategoryProdicts)
  return (
    <div className="my-4">
      <Container>
        <h1 className="text-center">Products</h1>
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
            searchProduct(resCategoryProdicts).map((item) => {
              return (
                <Col lg={3} md={6} className="my-4" key={item.id}>
                  <Card>
                    <Card.Img
                      className="card_img2"
                      variant="top"
                      src={item.images[0]}   
                    />
                    <Card.Body>
                      <Card.Title className="h6">{item.title}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">Price - ${item.price}</Card.Subtitle>
                      <Button variant="primary">
                        <FiShoppingCart /> Add to Cart
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          )}
        </Row>
      </Container>
    </div>
  )
  
};

export default PlatziProductList;
