import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'
import { startChecking } from '../actions/auth'
import { Login } from '../components/auth/login'
import { CalndarScreen } from '../components/calendar/CalndarScreen'
import { RutaPrivada } from './RutaPrivada'
import { RutaPublica } from './RutaPublica'

export const AppRouter = () => {
    const dispatch = useDispatch()
    const { checking } = useSelector(state => state.auth)
    const {uid} = useSelector(state => state.auth)


    useEffect(() => {
        dispatch(startChecking())
    }, [dispatch])

    if (checking) {
        return ( 
            <h1>Esperando</h1>
        )

    } else {

        return (
            <Router>
                <div>
                    <Switch>
                        <RutaPrivada exact path="/" component={CalndarScreen} isAuth={!!uid}/>
                        <RutaPublica exact path="/login" component={Login} isAuth={!!uid}/>
                        <Redirect to="/login" />
                    </Switch>
                </div>
            </Router>
        )
    }

}