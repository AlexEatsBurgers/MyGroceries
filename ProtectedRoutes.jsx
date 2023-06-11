import React, { useContext } from "react"
import { Navigate } from "react-router-dom"
import { LoginContext } from "./LoginContext"

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