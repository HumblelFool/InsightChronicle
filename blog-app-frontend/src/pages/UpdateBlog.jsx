import React, { useContext, useEffect, useState } from 'react'
import { Base } from '../components/Base'
import { useNavigate, useParams } from 'react-router-dom'
import UserContext from '../context/UserContext'
import { loadPost } from '../Services/Post_service'
import { toast } from 'reactstrap'
const UpdateBlog = () => {

    const { blogId } = useParams()
    const object = useContext(UserContext)
    const [post, setPost] = useState(null)
    const naviagte = useNavigate()
    useEffect(() => {

        //load the blog from databse
        loadPost(blogId).then(data => {
            setPost({ ...data })
        }).catch(error => {
            toast.error('error in loadng the blog')
        })
    }, [])

    useEffect(() => {
        if (!post) {
            if (post.user.id != object.data.user.id) {
                toast.error("this is not your post !! ")
                naviagte("/")
            }
        }
    }, [post])

    const updateHtml = () => {

    }

    return (
        <Base>
            <div className='wrapper'>
                <Card className='shadow' mt-2>

                    <CardBody>
                        {JSON.stringify(post)}
                        <h3>update Post</h3>
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
            </div>        </Base>
    )
}

export default UpdateBlog