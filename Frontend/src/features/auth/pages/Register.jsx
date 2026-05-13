import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'

const Register = () => {

    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { loading, error, handleRegister, user } = useAuth()

    // If already logged in, redirect to home
    if (user) {
        navigate('/')
        return null
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const result = await handleRegister({ username, email, password })
        if (result) {
            navigate("/")
        }
    }

    if (loading) {
        return (<main><h1>Loading.........</h1></main>)
    }

    return (
        <main>
            <div className="auth-wrapper">
                <div className="auth-logo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff2d78" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956Z" fill="#ff2d78"/></svg>
                    <span>Resume Insight</span>
                </div>
                <div className="form-container">
                <h1>Register</h1>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            onChange={(e) => { setUsername(e.target.value) }}
                            value={username}
                            type="text" id="username" name='username' placeholder='Enter username' required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={(e) => { setEmail(e.target.value) }}
                            value={email}
                            type="email" id="email" name='email' placeholder='Enter email address' required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={(e) => { setPassword(e.target.value) }}
                            value={password}
                            type="password" id="password" name='password' placeholder='Enter password' required minLength={6} />
                    </div>

                    <button className='button primary-button' disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>

                </form>

                <p>Already have an account? <Link to={"/login"} >Login</Link> </p>
            </div>
            </div>
        </main>
    )
}

export default Register