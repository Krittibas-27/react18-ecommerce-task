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
  Table,
} from "react-bootstrap";
import { RootProductServer } from "./config/RootApi";
import SpinnerComponent from "./components/SpinnerComponent";
import { useParams } from "react-router-dom";
import { FiShoppingCart, FiMinus } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import NavberTop from "./components/NavberTop";
import { TiDelete } from "react-icons/ti";

const PlatziProductList = () => {
  const { catid } = useParams();
  //console.log('catid-', catid)
  const [resCategoryProdicts, setResCategoryProdicts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [query, setQuery] = useState("");
  const [viewModal, setViewModal] = useState(false);
  const [singleProduct, setSingleProduct] = useState();
  const [allSelectedProduct, setAllSelectedProduct] = useState([]);
  const [cartModal, setCartModal] = useState(false);

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
    setSingleProduct({ ...data, quantity: 0 });
  };
  const AddProduct = (num) => {
    setSingleProduct({ ...singleProduct, quantity: num + 1 });
  };
  const quantityPlus = () => {
    //setSingleProduct(singleProduct.quantity+1);
    setSingleProduct({
      ...singleProduct,
      quantity: singleProduct.quantity + 1,
    });
  };
  const quantityMinus = () => {
    // if (quantityValue === 0) {
    //   setQuantityValue(0);

    //   console.log('click')
    // }else{
    //   setQuantityValue(quantityValue - 1);
    //   console.log('end')
    // }
    if (singleProduct.quantity > 0) {
      setSingleProduct({
        ...singleProduct,
        quantity: singleProduct.quantity - 1,
      });
    }
  };
  const addToCartProduct = (item) => {
    if (allSelectedProduct.indexOf(item) !== -1) return;
    setAllSelectedProduct([...allSelectedProduct, item]);
    setTimeout(() => {
      setViewModal(false);
    }, 1000);
  };
  const ViewCartList = () => {
    setCartModal(true);
  };
  const cartQuantityMinus=()=>{
    
  }
  const cartQuantityPlus=(data)=>{
    setAllSelectedProduct(
      [...allSelectedProduct,{
       ...data, quantity: data.quantity+1
    }])
  }
  const deleteCartItem=(data)=>{
    setAllSelectedProduct(allSelectedProduct.filter((item)=>item.id !== data.id))
  }
  useEffect(() => {
    getAllCatProducts();
  }, []);
  //console.log("allSelectedProduct-", allSelectedProduct);
  return (
    <>
      <NavberTop
        title="PlatziProductList"
        allSelectedProduct={allSelectedProduct}
        ViewCartList={ViewCartList}
      />
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
                        {/* <Button
                        variant="primary"
                        onClick={() => addToCartProduct(item)}
                        disabled={allSelectedProduct.some(
                          (ele) => ele.id === item.id
                        )}
                      >
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
                  <span className="mr-2">Quantity </span> &nbsp;
                  {singleProduct?.quantity === 0 ? (
                    <Button
                      size="sm"
                      variant="success"
                      onClick={() => AddProduct(singleProduct.quantity)}
                    >
                      Add Product
                    </Button>
                  ) : (
                    <>
                      <Button variant="default" onClick={() => quantityMinus()}>
                        <FiMinus />
                      </Button>
                      <div className="quantity_box">
                        {singleProduct?.quantity}
                      </div>
                      <Button variant="default" onClick={() => quantityPlus()}>
                        <FaPlus />
                      </Button>
                    </>
                  )}
                </div>
                {singleProduct?.quantity > 0 ? (
                  <Button
                    variant="primary"
                    onClick={() => addToCartProduct(singleProduct)}
                  >
                    <FiShoppingCart /> Add to Cart
                  </Button>
                ) : null}
              </Col>
            </Row>
          </Modal.Body>
        </Modal>

        <Modal show={cartModal} onHide={() => setCartModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Cart</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Product Name</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                      {allSelectedProduct.length === 0
              ? "Cart is Empty"
              : allSelectedProduct.map((item) => {
                  return (
                    <tr key={item.id}>
                          <td>
                            {
                              <Image
                                src={item.images[0]}
                                thumbnail
                                style={{ width: "90px" }}
                              />
                            }
                          </td>
                          <td>{item.title}</td>
                          <td>
                            <div className="d-flex mb-3 align-items-center">
                              <Button
                                variant="default"
                                onClick={() => cartQuantityMinus(item)}
                              >
                                <FiMinus />
                              </Button>
                              <div className="quantity_box">
                                {item.quantity}
                              </div>
                              <Button
                                variant="default"
                                onClick={() => cartQuantityPlus(item)}
                              >
                                <FaPlus />
                              </Button>
                            </div>
                          </td>
                          <td>{item.price}</td>
                          <td><TiDelete size={30} className="text-danger" onClick={()=>deleteCartItem(item)}/></td>
                        </tr>
                  );
                })}
                      </tbody>
                    </Table>
            
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default PlatziProductList;
