import React, { useState } from 'react'
import Base from '../components/Base'
import { Button, Card, CardBody, CardHeader, Col, Container, FormGroup, Input, Label, Row } from 'reactstrap'
import { Form } from 'reactstrap'
import { toast } from 'react-toastify'
import { loginUser } from '../Services/User_service'
import { doLogin, doLogout } from '../auth'
import { useNavigate } from 'react-router-dom'
const Loging = () => {


    const navigate = useNavigate()
    const [loginDetails, setLoginDetails] = useState({
        username: '',
        password: ''
    })

    const handelChange = (event, field) => {
        let actualValue = event.target.value
        setLoginDetails({
            ...loginDetails,
            [field]: actualValue
        })
    }
    const handelReset = () => {
        setLoginDetails({
            username: "",
            password: ""
        })
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log(loginDetails);

        //validation

        if (loginDetails.username.trim() == '') {
            toast.error("username is required")
        }
        if (loginDetails.password.trim() == '') {
            toast.error("password is required")
        }

        //submit to server
        loginUser(loginDetails).then((data) => {


            //saving the data to local storeage
            doLogin(data, () => {
                console.log("logn detailsiis save to local storeage");
                //redirect to user dashboard page
                navigate("/user/dashboard")
            })
            console.log("user Login");

        }).catch((error => {
            console.log("seomething went wrong");
            toast.error("seomething went wrong")
        }))


    }



    return (

        <Base>
            <Container>
                <Row className='mt-4'>
                    {/* {JSON.stringify(data)} */}
                    <Col sm={{ size: 6, offset: 3 }}>
                        <Card color='dark' inverse>
                            <CardHeader>
                                <h3>Enter details to login</h3>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={handleFormSubmit}>
                                    <FormGroup>
                                        <Label htmlFor="email">Enter Email</Label>
                                        <Input type='email' placeholder='Enter here' id='email'
                                            value={loginDetails.username}
                                            onChange={(event) => handelChange(event, 'username')} ></Input>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label htmlFor="passwrod">Enter Password</Label>
                                        <Input type='password' placeholder='Enter here' id='password'
                                            value={loginDetails.password}
                                            onChange={(event) => handelChange(event, 'password')}></Input>
                                    </FormGroup>

                                    <Container className='text-center'>
                                        <Button outline color='light'>Login</Button>
                                        <Button color='secondary' className='ms-2' type='reset' onClick={handelReset}>Reset</Button>
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

export default Loging