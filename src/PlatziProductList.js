import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Modal,
  Row,
  Image,
} from "react-bootstrap";
import { RootProductServer } from "./config/RootApi";
import SpinnerComponent from "./components/SpinnerComponent";
import { useParams } from "react-router-dom";
import { FiShoppingCart, FiMinus } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";

const PlatziProductList = () => {
  const { catid } = useParams();
  //console.log('catid-', catid)
  const [resCategoryProdicts, setResCategoryProdicts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [query, setQuery] = useState("");
  const [viewModal, setViewModal] = useState(false);
  const [singleProduct, setSingleProduct] = useState();
  const [quantityValue, setQuantityValue] = useState(1);
  const [allSelectedProduct, setAllSelectedProduct] = useState([]);

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
  const selectedProduct = (data) => {
    //console.log("data-", data);
    setViewModal(true);
    setSingleProduct(data);
  };
  const quantityPlus = () => {
    setQuantityValue(quantityValue + 1);
  };
  const quantityMinus = () => {
    if (quantityValue !== 1) {
      setQuantityValue(quantityValue - 1);
    }
  };
  const addToCartProduct = (item) => {
     //if (allSelectedProduct.indexOf(item)) return;
     if (allSelectedProduct.indexOf(item) !== -1) return
     setAllSelectedProduct([...allSelectedProduct, item]);
    console.log('click')
  };
  useEffect(() => {
    getAllCatProducts();
  }, []);
  console.log("allSelectedProduct-", allSelectedProduct);
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
                      onClick={() => selectedProduct(item)}
                    />
                    <Card.Body>
                      <Card.Title className="h6">{item.title}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        Price - ${item.price}
                      </Card.Subtitle>
                      <Button
                        variant="primary"
                        onClick={() => addToCartProduct(item)}
                        disabled={allSelectedProduct.some(
                          (ele) => ele.id === item.id
                        )}
                      >
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

      <Modal
        centered
        size="lg"
        show={viewModal}
        onHide={() => setViewModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>{singleProduct?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="align-items-center">
            <Col md={6}>
              <Image src={singleProduct?.images[0]} thumbnail />
            </Col>
            <Col md={6}>
              <small>{singleProduct?.category?.name}</small>
              <h5 className="text-dark">{singleProduct?.title}</h5>
              {/* <p>{singleProduct.description}</p> */}
              <span>
                Price - <strong>${singleProduct?.price}</strong>
              </span>
              <div className="d-flex mb-3 align-items-center">
                <span>Quantity </span>
                <Button variant="default" onClick={() => quantityMinus()}>
                  <FiMinus />
                </Button>
                <div className="quantity_box">{quantityValue}</div>
                <Button variant="default" onClick={() => quantityPlus()}>
                  <FaPlus />
                </Button>
              </div>
              <Button variant="primary" onClick={() => addToCartProduct(singleProduct)}
                        disabled={allSelectedProduct.some(
                          (ele) => ele.id === singleProduct.id
                        )}>
                <FiShoppingCart /> Add to Cart
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PlatziProductList;
