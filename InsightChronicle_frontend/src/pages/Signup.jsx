import React, { useEffect, useState } from 'react'
import Base from '../components/Base'
import { Card, CardBody, CardHeader, Input, Container, FormGroup, Label, Button, Row, CardColumns, Col, FormFeedback } from 'reactstrap'
import { Form } from 'reactstrap'
import { signUp } from '../Services/User_service'

import { toast } from 'react-toastify'
const Signup = () => {


    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        about: '',
    })

    const [error, setError] = useState({
        errors: {},
        isError: false
    })
    useEffect(() => {

    }, [data])
    //handle chanhe

    const handleChange = (event, property) => {


        //dyanmic setting value
        setData({ ...data, [property]: event.target.value })

    }

    //reset form
    const resetData = () => {
        setData({
            name: "",
            email: "",
            password: "",
            about: "",
        })
    }

    //submit form
    const submitForm = (event) => {
        event.preventDefault();

        // if (error.isError) {
        //     toast.error("Form data is invalid, correct all detais")
        //     setError({ ...error, isError: false })
        //     return
        // }
        console.log(data);
        //data validate


        //call server to api
        signUp(data).then((resp) => {
            console.log(resp);
            console.log("succces log");
            toast.success("user is registered succesfuly")
            setData({
                name: "",
                email: "",
                password: "",
                about: ""

            })
        }).catch((error) => {
            console.log(error);
            console.log("error log");

            toast.error("somethinng went wrong")
            //handel error 
            setError({
                errors: error,
                isError: true
            })
        })
    }

    return (

        <Base>
            <Container>
                <Row className='mt-4'>
                    {/* {JSON.stringify(data)} */}
                    <Col sm={{ size: 6, offset: 3 }}>
                        <Card color='dark' inverse>
                            <CardHeader>
                                <h3>Fill Information to register  </h3>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={submitForm}>

                                    {/* {  name feild} */}

                                    <FormGroup>
                                        <Label htmlFor="name">Enter Name</Label>
                                        <Input type='text' placeholder='Enter here' id='name'
                                            onChange={(e) => handleChange(e, 'name')}
                                            value={data.name}
                                            invalid={error.errors?.response?.data?.name ? true : false}></Input>

                                        <FormFeedback>
                                            {error.errors?.response?.data?.name}
                                        </FormFeedback>
                                    </FormGroup>



                                    <FormGroup>
                                        <Label htmlFor="email">Enter Email</Label>
                                        <Input type='email' placeholder='Enter here' id='email'
                                            onChange={(e) => handleChange(e, 'email')}
                                            value={data.email}
                                            invalid={error.errors?.response?.data?.email ? true : false}></Input>


                                        <FormFeedback>
                                            {error.errors?.response?.data?.email}
                                        </FormFeedback>
                                    </FormGroup>



                                    <FormGroup>
                                        <Label htmlFor="passwrod">Enter Password</Label>
                                        <Input type='password' placeholder='Enter here' id='password'
                                            onChange={(e) => handleChange(e, 'password')}
                                            value={data.password}
                                            invalid={error.errors?.response?.data?.email ? true : false}></Input>

                                        <FormFeedback>
                                            {error.errors?.response?.data?.password}
                                        </FormFeedback>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label htmlFor="about">
                                            Enter About
                                        </Label>
                                        <Input
                                            id="about"
                                            name="text"
                                            type="textarea"
                                            style={{ height: "250px" }}
                                            onChange={(e) => handleChange(e, 'about')}
                                            value={data.about}
                                        />
                                    </FormGroup>
                                    <Container className='text-center'>
                                        <Button outline color='light'>Register</Button>
                                        <Button color='secondary' className='ms-2' type='reset'
                                            onClick={resetData}>Reset</Button>
                                    </Container>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

            </Container>
        </Base>
    )
}

export default Signup