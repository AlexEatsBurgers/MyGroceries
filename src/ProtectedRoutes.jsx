import React, { useContext } from "react"
import { Navigate } from "react-router-dom"
import { LoginContext } from "./hooks/LoginContext"
import { auth } from "../firebase-config"


export default function ProtectedRoutes({children}){
    const {user} = useContext(LoginContext)

    if (!user) {
        return <Navigate to="/" />
    }

    return (
        <>
            {children}
        </>
    )
}