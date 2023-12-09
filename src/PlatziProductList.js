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
import moment from "moment";
import SingleProViewModal from "./components/platzimodal/SingleProViewModal";

const PlatziProductList = () => {
  const { catid } = useParams();
  const [resCategoryProducts, setResCategoryProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [query, setQuery] = useState("");
  const [viewModal, setViewModal] = useState(false);
  const [singleProduct, setSingleProduct] = useState(null);
  const [newQuantity, setNewQuantity]= useState()
  const [allSelectedProduct, setAllSelectedProduct] = useState([]);
  const [cartModal, setCartModal] = useState(false);

  const getAllCatProducts = () => {
    setIsLoading(true);
    RootProductServer.get(`/api/v1/categories/${catid}/products`)
      .then((res) => {
        if (res.status === 200) {
          setIsLoading(false);
          const newManageProduct = res.data.map((product)=>({
            ...product,
            productQuantity:0, 
          }))
          //console.log('newManageProduct=>',newManageProduct)
          setResCategoryProducts(newManageProduct);
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
    setViewModal(true);
    setSingleProduct(data);
  };
  const quantityPlus=(pValue)=>{
    const NewProductList = resCategoryProducts.map((pItem)=>{
      if(pItem.id ===pValue.id){
        setNewQuantity(pValue.productQuantity++)
        return {...pItem, productQuantity: pItem.productQuantity}
      }
      return pItem
    })
    return NewProductList
  }
  const quantityMinus=(proValue)=>{
    const NewProductDecr= resCategoryProducts.map((allProduct)=>{
      if(allProduct.id ===proValue.id){
        if(proValue.productQuantity >0){
          setNewQuantity(proValue.productQuantity--)
        }
        if(proValue.productQuantity===0){
          setAllSelectedProduct(
            allSelectedProduct.filter((item) => item.id !== allProduct.id)
          );
        }
       
        return {...allProduct, productQuantity: allProduct.productQuantity}
      }
      return allProduct
    })
    return NewProductDecr
  }
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
  const deleteCartItem = (data) => {
    setAllSelectedProduct(
      allSelectedProduct.filter((item) => item.id !== data.id)
    );
  };
const deleteAllCartProduct=()=>{
  setAllSelectedProduct([])
  setTimeout(() => {
    setCartModal(false);
  }, 1000);
}
  useEffect(() => {
    getAllCatProducts();
  }, []);

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
              searchProduct(resCategoryProducts).map((item) => {
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
                        <Card.Subtitle className="mb-2 proDate">
                        {moment(item.updatedAt).format('MMM Do YYYY, h:mm:ss a')}
                        </Card.Subtitle>
                        <p></p>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })
            )}
          </Row>
          <SingleProViewModal viewModal={viewModal} setViewModal={setViewModal} singleProduct={singleProduct} quantityMinus={quantityMinus} quantityPlus={quantityPlus} addToCartProduct={addToCartProduct} />

          <Modal size="lg" show={cartModal} onHide={() => setCartModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Cart - <Button size="sm" variant="danger" onClick={() => deleteAllCartProduct()}>Remove All</Button> 
             </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Image</th>
                  <th> Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allSelectedProduct.length === 0
                  ? <h5 className="mt-4 text-center text-danger">Cart is Empty</h5>
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
                            
                            <Button variant="default"  onClick={() => quantityMinus(item)}>
                              <FiMinus />
                            </Button>
                            <div className="quantity_box">
                              {item.productQuantity}
                            </div>
                            <Button variant="default" onClick={() => quantityPlus(item)}>
                              <FaPlus />
                            </Button>
                          </div>
                          </td>
                          <td>
                          {`$${item.price * item.productQuantity}`}
                          </td>
                          <td>
                            <TiDelete
                              size={30}
                              className="text-danger"
                              onClick={() => deleteCartItem(item)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                    <td colSpan={3} className="text-right"><strong>Total</strong></td>
                    <td colSpan={2}>
                      ${allSelectedProduct.reduce((total, item)=>total+(item.price*item.productQuantity),0)}
                    </td>
                </tr>
              </tbody>
            </Table>
          </Modal.Body>
        </Modal>

        </Container>


      </div>
    </>
  );
};

export default PlatziProductList;
