import React from 'react'
import { Redirect } from 'react-router-dom'
import DeleteProfilePage from '../../components/Pages/settings/DeleteProfile'
import { deleteProfile } from '../../api/users'

const DeleteProfile = ({ history }) => {

    const handleDelete = async () => {      
       await deleteProfile()
       localStorage.removeItem('persist:root')
       history.push("/api/login")
    }
    return (
           <DeleteProfilePage onClick={handleDelete} />
    )
}
export default DeleteProfile;