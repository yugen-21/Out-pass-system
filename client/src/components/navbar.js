import { useState,useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaTimes, FaBars } from "react-icons/fa";
import { GoPerson } from "react-icons/go";
import { IconContext } from "react-icons/lib";
import { fetchPersonalDetails } from "../api-calls";

import "./navbar.css"
export default function Navbar(props) {
  const [ data, setData] = useState([]);
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  useEffect(()=>
  {fetchPersonalDetails(props.email).then((data)=>{setData(data[0])}).catch((error)=>{console.log(error)});},[props.email]);
  return (
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="navbar">
          <div className="navbar-container container">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              DASHBOARD
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <NavLink
                  to="/CreateOutpass"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  Create Outpass
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/ViewHistory"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  View History
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/WardenDetails"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  Warden Details
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/Help"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  Help
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/Logout"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  <GoPerson /> 
                  <span style={{marginLeft:"10px"}}>
                  {data.name}
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
  );
}

