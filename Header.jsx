import React, { useState, useContext, useEffect, } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons'
import { LoginContext } from "./src/hooks/LoginContext"
import { Link, useLocation } from "react-router-dom"
import ShoppingList from "./ShoppingList"

export default function Header() {
    const { user, signout } = useContext(LoginContext)
    const [showMenu, setShowMenu] = useState(false)
    const location = useLocation()
    const [currentLocation, setCurrentLocation] = useState(location.pathname)

    function toggle(state) {
        state( prev => !prev)
    }

    useEffect(() => {
        setShowMenu(false)
    }, [signout])

    const [colorTheme, setColorTheme] = useState("light")
    
    const toggleTheme = () => {
        const newColorTheme = colorTheme === "light" ? "dark" : "light";
        setColorTheme(newColorTheme);
        document.querySelector("body").setAttribute("data-theme", newColorTheme);
        localStorage.setItem("selectedTheme", newColorTheme);
    }

    useEffect(() => {
        const storedTheme = localStorage.getItem("selectedTheme");
        if (storedTheme) {
            setColorTheme(storedTheme);
            document.querySelector("body").setAttribute("data-theme", storedTheme);
        }
    }, [])

    useEffect(() => {
        setCurrentLocation(location.pathname);
      }, [location.pathname])

    //   console.log(location.pathname)

      function menu() {
        if (showMenu) {
            return (
                <div className="nav-text-container">
                    <br></br>
                    <FontAwesomeIcon 
                        className="header-theme-icon pointer" 
                        icon={faCircleHalfStroke}  
                        onClick={toggleTheme}
                    />
                    <h4 >
                            { currentLocation == "/groceries" ? 
                                <Link className="header-nav-text pointer" to="/history">History</Link> :
                                <Link className="header-nav-text pointer" to="/groceries">Groceries</Link> }
                    </h4>
                    <h4 className="header-nav-text pointer"
                        onClick={signout}
                    >Signout</h4>
                </div>
            );
        }
    }

    return (
        <div className="header">
            <div className="header-icon-container">
                {user &&
                    <div className="menu-div show-menu">
                        <FontAwesomeIcon onClick={() => toggle(setShowMenu)} className="header-menu-icon pointer" icon={faBars} style={{ color: "#ff4343", }} />
                        {menu()}
                    </div>
                }
            </div>
            <img className="coles-logo" src="./Coles.png"></img>
        </div>
    )
}