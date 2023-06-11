import React, { useState, useEffect, useContext } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-config"
import { LoginContext } from "./src/hooks/LoginContext";
import { DataContext } from "./src/hooks/DataContext";
import { useNavigate, Link } from "react-router-dom"
 
function SignUpPage() {
    const {user, updateUser, setIsUserLoggedIn } = useContext(LoginContext)
    const { setCurrentData } = useContext(DataContext)
    const [isLoggingIn, setIsLoggingIn] = useState(false)
    const [registerEmail, setRegisterEmail] = useState("")
    const [registerPassword, setRegisterPassword] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        if (user){
            setCurrentData([])
        }
    }, [user])
       
    function register(e) {
        e.preventDefault()
        setIsLoggingIn(true)
        createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
        .then((userCredential) => {
            updateUser(userCredential.user);
            setIsUserLoggedIn(true)
            setIsLoggingIn(false)
            setRegisterEmail("")
            setRegisterPassword("")
            navigate("/groceries")
        })
        .catch(error => {
            console.error(error.message)
            alert(error.message)
            console.log(error)
        })
        setIsLoggingIn(false)
    }
    
    return(
        <div className="login-page-container">
            <form>
                <h2 className="login-headings" >Sign up</h2>
                <input 
                    className="font login-input" 
                    type="email" 
                    placeholder="email address" 
                    value={registerEmail} 
                    onChange={(e) => setRegisterEmail(e.target.value)}></input>
                <input 
                    className="font login-input" 
                    type="password" 
                    placeholder="password" 
                    autoComplete="off"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}></input>
                <button className="font login-button" onClick={register}>Register</button>
            </form>
            <h4 className="login-link">Already have an account? <Link to="/">Log in.</Link></h4>
            {isLoggingIn && <h4>Logging in...</h4>}
            {user && <h4>Logged in as {user?.email}</h4>}
        </div>
    )
}

export default SignUpPage