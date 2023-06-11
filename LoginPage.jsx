import React, { useState, useEffect, useContext } from "react"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-config"
import { LoginContext } from "./src/hooks/LoginContext";
import { DataContext } from "./src/hooks/DataContext";
import { useNavigate, Link } from "react-router-dom"
import ProtectedRoutes from "./ProtectedRoutes";

function LoginPage() {
    const {user, updateUser, isSigningOut, setIsUserLoggedIn } = useContext(LoginContext)
    const { setCurrentData } = useContext(DataContext)
    const [isLoggingIn, setIsLoggingIn] = useState(false)
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        if (user){
            setCurrentData([])
        }
    }, [user])
    
    function login(e) {
        e.preventDefault()
        setIsLoggingIn(true)
        signInWithEmailAndPassword(auth, loginEmail, loginPassword)
          .then((userCredential) => {
            updateUser(userCredential.user)
            setIsUserLoggedIn(true)
            setIsLoggingIn(false)
            setLoginEmail("")
            setLoginPassword("")
            navigate("/groceries")
          })
          .catch(error => {
            console.error(error.message)
            
            alert(error.message)    
        })
          setIsLoggingIn(false)
          setLoginPassword("")
    }
    useEffect( () => {
       if (user) {
        return navigate("/groceries")
    }
    }, [])
 
    return(
        <div className="login-page-container">
            <form>
                <h2 className="login-headings" >Sign in</h2>
                <input 
                    className="font login-input" 
                    type="email"
                    placeholder="email address" 
                    value={loginEmail} 
                    onChange={(e) => setLoginEmail(e.target.value)}></input>
                <input 
                    className="font login-input" 
                    type="password" 
                    placeholder="password" 
                    autoComplete="off"
                    value={loginPassword} 
                    onChange={(e) => setLoginPassword(e.target.value)}></input>
                <button className="font login-button" onClick={login}>Login</button>
            </form>
                <h4 className="login-link">Don't have an account? <Link to="/signup">Sign up.</Link></h4>
            {isLoggingIn && <h4>Logging in...</h4>}
            {user && <h4>Logged in as {user?.email}</h4>}
        </div>
    )
}

export default LoginPage