import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { RootEcomDummyAPI } from './config/RootApi'
import SpinnerComponent from './components/SpinnerComponent'
import { FiShoppingCart } from "react-icons/fi";
import NavberTop from './components/NavberTop';

const ProductCategoryList = () => {
    const [serverAllProdicts, setServerAllProdicts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [query, setQuery]=useState("")

    const getAllProducts = () => {
        setIsLoading(true)
        RootEcomDummyAPI.get(`/products`).then((res) => {
            console.log('Res-', res.data)
            if (res.status === 200) {
                setIsLoading(false)
                setServerAllProdicts(res.data.products.reverse())
                setIsError(false)
            }
        }).catch((err) => {
            setIsError(false)
            setIsLoading(false)
        })
    }
    const searchProduct=(item)=>{
      return  item.filter((data)=>{
            return data.title.toLowerCase().includes(query) || data.category.toLowerCase().includes(query)
        })
    }
    const resetSearch=()=>{
        setQuery("")
    }
    useEffect(() => {
        getAllProducts()
    }, [])
    
    //console.log('serverAllProdicts-', serverAllProdicts)
    return (
        <>
        <NavberTop/>
        <div className="my-4">
            <Container>
                <h1 className='text-center'>ProductCategoryList</h1>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form>
                            <InputGroup className="m-3">
                                <Form.Control placeholder="Search Product" type="text" value={query} onChange={(e)=>setQuery(e.target.value)}  />
                                <Button variant="primary" onClick={()=>resetSearch()}>Reset</Button>
                            </InputGroup>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    {
                        isLoading ?
                            <SpinnerComponent /> :
                            isError ?
                                <h3>Product Not Found</h3> :

                                searchProduct(serverAllProdicts).map((item) => {
                                    return (
                                        <Col md={4} className='my-4' key={item.id}>
                                            <Card>
                                                <Card.Img className='card_img' variant="top" src={item.thumbnail} />
                                                <Card.Body>
                                                    <Card.Title>{item.title}</Card.Title>
                                                    Rating - <small>{item.rating}
                                                    {/* <div className="star">
                                                        <div className='rating'  style={{width: `${Math.floor(item.rating / 5*50)}%`}}>
                                                        {
                                                            [...Array(5)].map((_,i)=>{
                                                                return <FaStar key={i} size={15} rating={item.rating} />
                                                            })
                                                        }
                                                        </div>
                                                    </div> */}
                                                    
                                                    </small>
                                                    <Card.Text>  Price : ${item.price} </Card.Text>
                                                    <Card.Text>  Description : ${item.description.substring(0, 30)}... </Card.Text>
                                                    <Card.Text>Category : {item.category}</Card.Text>
                                                    <Button variant="primary"><FiShoppingCart /> Add to Cart</Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    )
                                })

                    }
                </Row>
            </Container>
        </div>
</>
    )
}

export default ProductCategoryList