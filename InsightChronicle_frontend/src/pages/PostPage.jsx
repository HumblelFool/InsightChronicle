import React, { useEffect, useState } from 'react'
import Base from '../components/Base'
import { Link, useParams } from 'react-router-dom'
import { Button, Card, CardBody, CardText, Col, Container, Input, Row } from 'reactstrap'
import { createComment, loadPost } from '../Services/Post_service'
import { BASE_URL } from '../Services/Helper'
import { toast } from "react-toastify"
import { isLoggedIn } from '../auth'
const PostPage = () => {

    const { postId } = useParams()
    const [post, setPost] = useState(null)
    const [comment, setComment] = useState({
        content: ''
    })
    useEffect(() => {

        //load post of postId
        loadPost(postId).then(data => {
            setPost(data)
        }).catch(error => {
            console.log(error);
        })

    }, [])


    const printDate = (number) => {
        return new Date(number).toLocaleString()
    }


    const submitPost = () => {

        if (isLoggedIn()) {
            toast.error("Need to logiin first")
        }

        if (comment.content.trim === '') {
            return
        }
        createComment(comment, post.postId).then(data => {
            toast.success("comment added")
            setPost({
                ...post,
                comments: [...post.comments, data.data]
            })
            setComment({
                content: ''
            })
        }).catch(error => {

        })
    }
    return (

        <Base>

            <Container className='mt-4'>
                <Link to='/'>Home</Link> /{post && (<Link to="">{post.title}</Link>)}

                <Row>
                    <Col md={{ size: 12 }}>
                        <Card className='mt-4'>
                            {
                                (post) && (
                                    <CardBody>
                                        <CardText> Posted by <b>{pst.user.name}</b>  on <b>{printDate(post.addedAt)}</b>

                                        </CardText>
                                        <CardText>
                                            <span className='text-muted'>{post.categoryTitle}</span>
                                        </CardText>
                                        <div className="divider" style={{
                                            width: '100%',
                                            height: '1px',
                                            background: '#e2e2e2'
                                        }}></div>
                                        <CardText className='mt-3'><h3>{[post.title]}</h3></CardText>
                                        <div className='mt-4 image-container  shadow img-rounded-5' style={{ maxwidth: " 50%" }}>
                                            <img className='img-fluid '
                                                src={BASE_URL + '/post/image/' + post.imageName} />
                                        </div>
                                        <CardText className='mt-5' dangerouslySetInnerHTML={{ __html: post.content }}>

                                        </CardText>
                                    </CardBody>
                                )
                            }
                        </Card>
                    </Col>
                </Row>
                <Row className='my-4'>
                    <Col md={{
                        size: 9,
                        offset: 1
                    }}>
                        <h3>Comment({post ? post.comments.length : 0})</h3>
                        {post.comments && post.comments.map((c, index) => (
                            <Card key={index} className='mt-2'>
                                <CardBody>
                                    {c.content}
                                </CardBody>
                            </Card>

                        ))}
                        <Card className='mt-4'>
                            <CardBody>
                                <Input
                                    onChange={(event) => setComment({ content: event.target.value })}
                                    type='textarea'
                                    placeholder='enter here'></Input>
                                <Button
                                    onClick={submitPost}
                                    className='mt-2' color='primary'>Submit</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Base>

    )
}

export default PostPage
