import React, { createContext, useState, useEffect } from "react"
import { auth } from "../../firebase-config"
import { signOut } from "firebase/auth"

const LoginContext = createContext()

function LoginContextProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser)
      setIsLoading(false)
      if (currentUser) {
        setIsUserLoggedIn(true)
      } else {
        setIsUserLoggedIn(false)
      }
    })

    return () => unsubscribe()
  }, [])

  function updateUser(newUser) {
    setUser(newUser)
  }

  function signout(e) {
    e.preventDefault()
    setIsSigningOut(true)
    setIsLoading(true)
    setTimeout(() => {
      signOut(auth)
        .then(() => {
          setIsSigningOut(false)
          setIsUserLoggedIn(false)
        })
        .catch((error) => {
          alert(error.message)
        })
    }, 500)
  }

  if (isLoading) {
    return <div className="loading-container"><img className="loading-icon" src="loading.gif" /></div>
  }

  return (
    <LoginContext.Provider
      value={{
        user,
        updateUser,
        setIsUserLoggedIn,
        signout,
        isSigningOut,
        setIsSigningOut,
        isUserLoggedIn,
      }}
    >
      {children}
    </LoginContext.Provider>
  )
}

export { LoginContextProvider, LoginContext }
