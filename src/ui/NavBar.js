import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { limpiar } from '../actions/auth'

export const NavBar = () => {
  const {name} = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const cerrarSesion =() => {
    dispatch(limpiar())

  }
 
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">{name}</Link>
          <div id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
               <button className="btn btn-danger" onClick={cerrarSesion}>Cerrar Sesión</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
}
