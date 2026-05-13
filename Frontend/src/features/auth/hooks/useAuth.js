import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";



export const useAuth = () => {

    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading, error, setError } = context


    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        setError(null)
        try {
            const data = await login({ email, password })
            setUser(data.user)
            return data.user
        } catch (err) {
            let message = err.response?.data?.message || "Login failed. Please try again."
            if (err.response?.data?.error) {
                message += ` (Details: ${err.response.data.error})`
            }
            setError(message)
            return null
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        setError(null)
        try {
            const data = await register({ username, email, password })
            setUser(data.user)
            return data.user
        } catch (err) {
            let message = err.response?.data?.message || "Registration failed. Please try again."
            if (err.response?.data?.error) {
                message += ` (Details: ${err.response.data.error})`
            }
            setError(message)
            return null
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        setError(null)
        try {
            await logout()
            setUser(null)
        } catch (err) {
            const message = err.response?.data?.message || "Logout failed."
            setError(message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        const getAndSetUser = async () => {
            try {
                const data = await getMe()
                setUser(data.user)
            } catch (err) {
                // Not logged in — that's fine
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        getAndSetUser()

    }, [])

    return { user, loading, error, handleRegister, handleLogin, handleLogout }
}