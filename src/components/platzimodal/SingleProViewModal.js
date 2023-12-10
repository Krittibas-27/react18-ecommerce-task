import React from 'react'
import { Col, Modal, Row, Image, Button } from 'react-bootstrap'
import { FiShoppingCart, FiMinus } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";

const SingleProViewModal = ({viewModal,singleProduct,addProduct, setViewModal,quantityMinus,quantityPlus, addToCartProduct}) => {
  return (
    <Modal show={viewModal} onHide={() => setViewModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row className="align-items-center">
              <Col md={6}>
                <Image src={singleProduct?.images[0]} thumbnail />
              </Col>
              <Col md={6}>
                <small>{singleProduct?.category?.name}</small>
                <h5 className="text-dark">{singleProduct?.title}</h5>
                <span> Price - <strong>${singleProduct?.price}</strong> </span><br/>
                {
                  singleProduct?.productQuantity === 0 ?
                    <Button size="sm" variant="primary" onClick={() => addProduct(singleProduct)} >
                      Add Product
                    </Button>
                    : 
                    <>
                      <div className="d-flex mb-3 align-items-center">
                      <span className="mr-2">Quantity </span> &nbsp;
                      <Button variant="default"  onClick={() => quantityMinus(singleProduct)}>
                        <FiMinus />
                      </Button>
                      <div className="quantity_box">
                        {singleProduct?.productQuantity}
                      </div>
                      <Button variant="default" onClick={() => quantityPlus(singleProduct)}>
                        <FaPlus />
                      </Button>
                    </div>
                    </>
                }
                
                {singleProduct?.productQuantity > 0 ? (
                  <Button  variant="primary"
                  onClick={() => addToCartProduct(singleProduct)} 
                  >
                    <FiShoppingCart /> Add to Cart
                  </Button>
                ) : null}
              </Col>
              </Row>
            </Modal.Body>
          </Modal>
  )
}

export default SingleProViewModal