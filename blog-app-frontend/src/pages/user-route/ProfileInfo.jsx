import React, { useContext } from 'react'
import Base from '../../components/Base'
import UserContext from '../../context/UserContext'

const ProfileInfo = () => {
  const object = useContext(UserContext)

  const [user, setUser] = useState(null)
  const [updateFlag, setUpdateFlag] = useState(false)
  const { userId } = useParams()

  useEffect(() => {
    getUser(userId).then(data => {
      console.log(data);
      setUser({ ...data })
    })
  }, [])

  const toggleUpdateFlag = (value) => {
    setUpdateFlag(value)
  }
  //show update profile
  const showUpdateProfile = () => {
    toggleUpdateFlag(true)
  }

  //show view profile
  const viewUpdateProflie = () => {
    toggleUpdateFlag(false)
  }
  return (
    <Base>
      <div> ProfileInfo </div>
      <h1>Welcome {object.user.data.name}</h1>



    </Base>
  )
}

export default ProfileInfo