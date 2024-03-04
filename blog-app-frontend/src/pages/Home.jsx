import React, { useEffect } from 'react'
import Base from '../components/Base'
import NewsFeed from '../components/NewsFeed'
import { Col, Container, Row } from 'reactstrap'
import CategorySideMenu from '../components/CategorySideMenu'

const Home = () => {

    useEffect(() => {


        //load from server
    })
    return (

        <Base>
            <Container className='mt-3'>

                <Row>
                    <Col md={2}>
                        <CategorySideMenu />
                    </Col>
                    <Col md={9}>
                        <NewsFeed />
                    </Col>
                </Row>
            </Container>

        </Base>

    )
}

export default Home