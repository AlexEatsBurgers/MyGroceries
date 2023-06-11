import React from "react"
import { Routes, Route } from "react-router-dom"

import Header from "./components/Header"
import LoginPage from "../LoginPage"
import SignUpPage from "../SignUpPage"
import ProtectedRoutes from "./ProtectedRoutes"
import ShoppingList from "./ShoppingList"
import History from "./components/History"

function App() {
  return (
    <div>
        <Header />
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/signup" element={<SignUpPage />} />
          <Route  path="/groceries" element={
            <ProtectedRoutes>
                <ShoppingList />
            </ProtectedRoutes>
          }/>
          <Route  path="/history" element={
            <ProtectedRoutes>
                <History />
            </ProtectedRoutes>
          }/>
        </Routes>
    </div>
  )
}

export default App
