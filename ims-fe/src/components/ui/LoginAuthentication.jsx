import { useEffect, useState } from "react"
import axiosClient from "axiosClient";

const LoginAuthentication = () => {
    const [users, setUser] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = () => {
        setLoading(true)
        axiosClient.get('/users')
            .then(({ data }) => {
                setLoading(false)
                setUsers(data.data)
            })
            .catch(() => {
                setLoading(false)
            })
    }

    return (
        <div>
            Users
        </div>
    )
}

export default LoginAuthentication
