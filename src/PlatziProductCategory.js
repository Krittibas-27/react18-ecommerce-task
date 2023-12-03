import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Modal,Image
} from "react-bootstrap";
import { RootProductServer } from "./config/RootApi";
import SpinnerComponent from "./components/SpinnerComponent";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { MdImageSearch } from "react-icons/md";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const PlatziProductCategory = () => {
  const navigate = useNavigate();
  const [serverAllProdicts, setServerAllProdicts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [query, setQuery] = useState("");
  const [showModal, setShowModal]=useState(false)
  const [categoryDetails, setCategoryDetails]=useState({})

  const getAllProducts = () => {
    setIsLoading(true);
    RootProductServer.get(`/api/v1/categories`)
      .then((res) => {
        //console.log("Res-", res);
        if (res.status === 200) {
          setIsLoading(false);
          setServerAllProdicts(res.data);
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
    navigate(`categories/${data.id}/products`, {
      state: { relatedProduct: data },
    });
  };
  const showCategoryDetails=(ele)=>{
    setShowModal(true)
    setCategoryDetails(ele)
    //console.log('ele', ele)
  }
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
                <Col lg={4} md={6} className="my-4" key={item.id}>
                  <Card>
                    <Card.Img
                      className="card_img"
                      variant="top"
                      src={item.image}
                    />
                    <Card.Body>
                      <div className="d-flex flex-row justify-content-between align-items-center">
                        <Card.Title
                          role="button"
                          onClick={() => selectedCategory(item)}
                        >
                          {item.name}
                        </Card.Title>
                        <div className="align-items-center">
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id="button-tooltip-2">
                                Category Details
                              </Tooltip>
                            }
                          >
                            <Button variant="light" onClick={()=>showCategoryDetails(item)}>
                              <IoEyeOutline size={20} />
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id="button-tooltip-2">
                                Show Products
                              </Tooltip>
                            }
                          >
                            <Button className="mx-2" variant="light" onClick={() => selectedCategory(item)}>
                              <MdImageSearch size={20} />
                            </Button>
                          </OverlayTrigger>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          )}
        </Row>
      </Container>

      <Modal show={showModal} onHide={()=>setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{categoryDetails.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Image src={categoryDetails?.image} thumbnail />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PlatziProductCategory;
