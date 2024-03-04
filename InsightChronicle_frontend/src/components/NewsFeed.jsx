import React, { useEffect, useState } from 'react'
// import { loadAllPost } from '../Services/Post_service'
import { Col, Container, Pagination, PaginationItem, PaginationLink, Row } from "reactstrap"
import Post from './Post'


const NewsFeed = () => {

    const [postContent, setPostContent] = useState({
        content: [],
        totalPages: '',
        totalElements: '',
        pageSize: '',
        lastPage: false
    })

    const [currentPage, setCurrentPage] = useState(0)
    useEffect(() => {
        console.log("loading posts")
        console.log(currentPage)
        changePage(currentPage)

    }, [currentPage])

    const changePage = (pageNumber = 0, pageSize = 5) => {
        if (pageNumber > postContent.pageNumber && postContent.lastPage) {
            return
        }
        if (pageNumber < postContent.pageNumber && postContent.pageNumber == 0) {
            return
        }
        loadAllPosts(pageNumber, pageSize).then(data => {
            setPostContent({
                content: [...postContent.content, ...data.content],
                totalPages: data.totalPages,
                totalElements: data.totalElements,
                pageSize: data.pageSize,
                lastPage: data.lastPage,
                pageNumber: data.pageNumber
            })

            console.log(data);

        }).catch(error => {
            toast.error("Error in loading posts")

        })
    }

    function deletePost(post) {
        //going to delete post
        console.log(post)

        deletePostService(post.postId).then(res => {
            console.log(res)
            toast.success("post is deleled..")

            let newPostContents = postContent.content.filter(p => p.postId != post.postId)
            setPostContent({ ...postContent, content: newPostContents })

        })
            .catch(error => {
                console.log(error)
                toast.error("error in deleting post")
            })
    }

    // useEffect(() => {
    //     //load all post from server
    //     loadAllPost().then((data) => {
    //         console.log(data);
    //     }).catch(error => {
    //         console.log(error);
    //     })
    // }, [])


    const changePageInfinite = () => {
        console.log("page chagned")
        setCurrentPage(currentPage + 1)

    }

    return (
        <div className='container-fluid'>
            <Row>
                <Col md={{
                    size: 12,

                }}
                >

                    {<h1>Blogs Count ({postContent?.totalElements})</h1>}

                    {
                        postContent.content.map((post) => {
                            <Post post={post} />
                        })}

                    <Container className='text-center mt-5'>

                        <Pagination>
                            <PaginationItem disabled={postContent.pageNumber === 0}>
                                <PaginationLink previous>previous</PaginationLink>
                            </PaginationItem>
                            {
                                [...Array(postContent.totalPages)].map((item, index) => (
                                    <PaginationItem active={index === postContent.pageNumber} key={index}>
                                        <PaginationLink>
                                            {index + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))
                            }

                            <PaginationItem>
                                <PaginationLink next>next</PaginationLink>
                            </PaginationItem>
                        </Pagination>
                    </Container>

                </Col>
            </Row>

        </div >
    )
}

export default NewsFeed