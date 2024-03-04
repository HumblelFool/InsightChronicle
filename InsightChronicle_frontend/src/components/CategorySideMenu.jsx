import React, { useEffect, useState } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { loadAllCategories } from '../Services/Category_service'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'


const CategorySideMenu = () => {

    const [categories, setCategories] = useState([])
    useEffect(() => {
        loadAllCategories().then(data => {
            setCategories([...data])
        }).catch(error => {
            toast.error("erroe loading in categories")
        })
    }, [])
    return (
        <div>
            <ListGroup>
                <ListGroupItem tag={Link} to='/' action={true} className='border-0'>
                    All Blogs
                </ListGroupItem>
                {categories && categories.map((cat, index) => {
                    return (
                        <ListGroupItem tag={Link} to={"/categories/" + cat.categoryId} className='mt-1' key={index}>
                            {cat.categoryTitle}
                        </ListGroupItem>
                    )
                })}

            </ListGroup>
        </div>
    )
}

export default CategorySideMenu