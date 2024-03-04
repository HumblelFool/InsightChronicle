import React, { useEffect, useState } from 'react'
import UserContext from './UserContext'
import { getCurrentUserDeatil, isLoggedIn } from '../auth'

const UserProvider = ({ children }) => {

    const [user, setUser] = useState({
        data: {},
        login: false
    })

    useEffect(() => {
        setUser({
            data: getCurrentUserDeatil(),
            login: isLoggedIn()
        })
    }, [])
    return (

        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider