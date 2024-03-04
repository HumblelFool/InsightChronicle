import React, { useEffect, useRef, useState } from 'react'
import { Button, Container, Form } from 'reactstrap'
import { Card, CardBody, CardHeader, FormGroup, Input, Label } from 'reactstrap'
import { loadAllCategories } from '../Services/Category_service'
import JoditEditor from 'jodit-react'
import { toast } from 'react-toastify'
import { getCurrentUserDeatil } from '../auth'

const AddPost = () => {

    const [user, setuser] = useState(undefined)

    //jodit editor
    const editor = useRef(null)
    const [content, setContent] = useState('')

    const [categories, setCategories] = useState([])

    const [post, setPost] = useState({
        title: '',
        content: '',
        categoriesId: -1
    })

    // useEffect(() => {
    //     setuser(getCurrentUserDeatil)
    //     loadAllCategories().then((data) => {
    //         console.log(data);
    //         setCategories(data)
    //     }).catch((error) => {
    //         console.log(error);
    //     })
    // }, [])


    //field change function
    const fieldChanged = (event) => {

        // console.log(event);
        setPost({
            ...post, [event.target.name]: event.target.value
        })
    }

    const contentFieldChange = (data) => {
        setPost({ ...post, 'content': data })
    }

    const createPost = (event) => {
        event.preventDefault();

        if (post.title.trim() === '') {
            toast.error("title is required")
        }
        if (post.content.trim() === '') {
            toast.error("post content is required")
        }

        console.log("form submitted");


        //submit the post to server
        createPost(post).then(data => {
            toast.success("post submitted")
            setPost({
                title: '',
                content: '',
                categoriesId: ''
            })
        }).catch(error => {
            toast.error("error")
        })
    }

    return (
        <div className='wrapper'>
            <Card className='shadow' mt-2>

                <CardBody>
                    {JSON.stringify(post)}
                    <h3>What gioing in your mind ?</h3>
                    <Form onSubmit={createPost}>
                        <div className='my-3'>
                            <Label for="title">Post Title</Label>
                            <Input type='text' id='title'
                                placeholder='enter your post title '
                                name='title'
                                onChange={fieldChanged}></Input>
                        </div>
                        <div className='my-3'>
                            <Label for="content">Post Content</Label>
                            {/* <Input type='textarea' id='content'
                                placeholder='enter your post Content '
                                style={{ height: "300px" }}></Input> */}

                            <JoditEditor
                                ref={editor}
                                value={post.content}

                                onChange={contentFieldChange} />
                        </div>


                        {/* file field */}
                        <div className='mt-3'>
                            <Label for="image">Select post Banner</Label>
                            <Input id='image' type='file'>
                            </Input>
                        </div>



                        <div className='my-3'>
                            <Label for="category">Post Category</Label>
                            <Input type='select' id='category'
                                placeholder='enter your post Content '
                                name='vcategoryId'
                                onChange={fieldChanged}
                            >
                                {/* <option>Programing</option>
                                <option>BollyWood</option>
                                <option>Mathmatics</option>
                                <option>Physcics</option>
                                <option>Friction</option> */}

                                <option disabled selected>-- Select categories---</option>

                                {
                                    categories.map((categories) => (
                                        <option value={categoriesId} key={categories.categoriesId}>
                                            {categories.categoriesTitle}
                                        </option>
                                    ))
                                }
                            </Input>
                        </div>

                        <Container className='text-center'>
                            <Button type='submit' color='primary'>Create Post</Button>
                            <Button className='ms-2' color='danger'>Reset content</Button>
                        </Container>
                    </Form>
                    {/* {content} */}
                </CardBody>
            </Card>
        </div>
    )
}

export default AddPost