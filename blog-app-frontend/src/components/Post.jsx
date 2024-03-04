import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardText, Col, Row } from 'reactstrap'
import { getCurrentUserDeatil, isLoggedIn } from '../auth'

const Post = ({ post = { title: "this is default title", content: "this is default post Content" } }
) => {


    const [user, setUser] = useState({})
    const [login, setLogin] = useState(false)
    useEffect(() => {
        setUser(getCurrentUserDeatil())
        setLogin(isLoggedIn())
    }, [])
    return (
        <Card className='border-0 shadow-sm mt-3'>
            <CardBody>
                <h1>{post.title}</h1>
                <CardText>
                    <p>{post.content}</p>
                </CardText>
                <div>
                    <Link className='btn secondary' to={'/posts/+post.postId'}>Read More</Link>
                    {

                    }
                </div>
            </CardBody>

        </Card>
    )
}

export default Post