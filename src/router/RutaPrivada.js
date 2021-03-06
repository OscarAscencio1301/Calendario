import React from 'react'
import { Redirect, Route } from 'react-router-dom'

export const RutaPrivada = ({
    isAuth,
    component:Component,
    ...res
}) => {
    return (
        <Route {...res} component={props => isAuth ? <Component {...props}/> : <Redirect to="/login"/>}/>
    )
}
