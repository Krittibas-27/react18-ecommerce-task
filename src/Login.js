import React, { useState } from 'react'
import { Card, Col, Container, Row, Form, FloatingLabel, Button } from 'react-bootstrap'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useForm } from "react-hook-form"
import { RootBaseServer } from './config/RootApi';
import { toast } from "react-toastify";


const Login = () => {
    const [showPass, setShowPass] = useState(false);
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm({
        mode: "all"
    });

    const clickHandler = () => {
        setShowPass((prev) => !prev);
    }
    const onSubmit = (data) => {
        // const newData = {
        //     employeename: data.username,
        //     email: data.useremail,
        //     password: data.password,
        //     id: Date.now()
        // }
        const newData = {
            "user": {
            "username": data.username,
            "email": data.useremail,
            "password": data.password
            }
        }
        RootBaseServer.post("/api/users", newData).then((res) => {
            //console.log('res-',res)
            if (res.status === 201) {
                localStorage.setItem("userData", JSON.stringify(res.data.user))
                toast.success("Login successful!", {
                    position: toast.POSITION.TOP_RIGHT
                })
                reset()
                //navigate("/product/category")
                window.location.reload()
            }
        }).catch((err) => console.log('err-', err))
    }
    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Card body className='p-4 card_position'>
                        <h2 className='mb-4 text-center'>User Login</h2>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <FloatingLabel className="mb-3" label="Name">
                                <Form.Control type="text" placeholder="Name" isInvalid={!!errors.username} {...register("username", { required: "Name is require", minLength: { value: 3, message: "Minimum 3 characters required" } })} error={errors.username?.message} />
                                {errors.username?.message && <small className='text-danger'>{errors.username?.message}</small>}
                            </FloatingLabel>
                            <FloatingLabel className="mb-3" label="Email">
                                <Form.Control type="email" placeholder="Email" isInvalid={!!errors.useremail} {...register("useremail", {
                                    required: "Email is require", pattern: { value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: "Email is not vaild" }})} error={errors.useremail?.message} />
                                {errors.useremail?.message && <small className='text-danger'>{errors.useremail?.message}</small>}
                            </FloatingLabel>
                            <FloatingLabel className="mb-3" label="Password" >
                                <Form.Control type={showPass ? "text" : "password"} isInvalid={!!errors.password} placeholder="Password"  {...register("password", { required: "Password is require", pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, message: "Password at least 6 character" } })} error={errors.password?.message} />
                                {showPass ? <FaRegEye className='eye' onClick={clickHandler} /> : <FaRegEyeSlash className='eye_close' onClick={clickHandler} />}
                                {errors.password?.message && <small className='text-danger'>{errors.password?.message}</small>}
                            </FloatingLabel>
                            <Button
                                type="submit"
                                className="mt-4 mx-2"
                                variant="primary"
                            >
                                User Login
                            </Button>
                            <Button type="button" className="mt-4 mx-2" variant="secondary" onClick={() => reset()}>
                                Reset
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Login