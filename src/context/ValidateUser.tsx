import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {
    children: React.ReactNode
}

const ValidateUser = ({ children }: Props) => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }else{
            navigate('/')
        }
    }, [])


    return children
}

export default ValidateUser