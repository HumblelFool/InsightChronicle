import React, { useEffect, useState } from 'react'
import Base from '../components/Base'
import { useParams } from 'react-router-dom'
import { Col, Row } from 'reactstrap'
import CategorySideMenu from '../components/CategorySideMenu'
import { loadPostCategoryWise } from '../Services/Post_service'
import { toast } from 'react-toastify'
import Post from '../components/Post'

const Categories = () => {

    const [post, setPost] = useState([])

    const { CategoryId } = useParams()
    useEffect(() => {
        loadPostCategoryWise(CategoryId).then(data => {
            setPost([...data])
        }).catch(error => {
            toast.error("error in loading post")
        })
    }, [CategoryId])

    return (
        <Base>
            <Container className='mt-3'>

                <Row>
                    <Col md={2}>
                        <CategorySideMenu />
                    </Col>
                    <Col md={9}>
                        {
                            post && post.map((post, index) => {
                                return (
                                    <Post key={index} post={post} />
                                )
                            })
                        }
                        {post.length <= 0 ? <h1>no Post in this category</h1> : " "}
                    </Col>
                </Row>
            </Container>
        </Base>
    )
}

export default Categories