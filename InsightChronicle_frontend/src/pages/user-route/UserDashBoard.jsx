import React, { useEffect, useState } from 'react'
import Base from '../../components/Base'
import AddPost from '../../components/AddPost'
import { Container } from 'reactstrap'
import NewsFeed from '../../components/NewsFeed'
import { getCurrentUserDeatil } from '../../auth'
import { loadPostCategoryWise } from '../../Services/Post_service'
import { toast } from 'react-toastify'
import Post from '../../components/Post'


const UserDashBoard = () => {

  const [post, setPost] = useState([])

  const [user, setUser] = useState({})
  useEffect(() => {
    setUser(getCurrentUserDeatil());

    loadPostCategoryWise(getCurrentUserDeatil().id).then(data => {
      setPost([...data])
    }).catch(error => {
      toast.error("erroe load post")
    })
  }, [])
  return (

    <Base>
      <Container>

        <AddPost />
        {post.map((post, index) => {
          return (
            <Post post={post} key={index} />
          )
        })}

      </Container>

    </Base>


  )
}

export default UserDashBoard