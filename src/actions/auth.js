import Swal from "sweetalert2"
import { fetchconToken, fetchsinToken } from "../helpers/fetch"
import { types } from "../types/types"

export const startLogin = (email, password) => {
    return async (dispatch) => {
        const respuesta = await fetchsinToken('auth/auth', { email, password }, 'POST')
        const body = await respuesta.json()
        if (body.ok) {
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-fecha', new Date().getTime())
            dispatch(login({
                uid: body.uid,
                name: body.name
            }))

        }else{
            Swal.fire({
                title: 'Error, No existe ese Usuario',
                icon: 'error'
            })
        }
    }
}

export const startRegister = (name, email, password) => {
    return async(dispatch) => {
        const respuesta = await fetchsinToken('auth/new', {name, email, password}, 'POST')
        const body = await respuesta.json()
        if(body.ok){
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-fecha', new Date().getTime())
            dispatch(register({
                uid: body.uid,
                name:body.name
            }))

        }else {
            Swal.fire({
                title: 'Ese usuario ya existe',
                icon: 'error'
            })
        }

    }

}
const login = (user) => ({
    type: types.usuarioLogin,
    payload: user
})

const register = (user) => ({
    type: types.usuarioRegistrado,
    payload: user
})


export const startChecking = () => {
    return async(dispatch) => {
    const respuesta = await fetchconToken('auth/renew')
        const body = await respuesta.json()
        if (body.ok) {
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-fecha', new Date().getTime())
            dispatch(login({
                uid: body.uid,
                name: body.name
            }))

        }else{
            dispatch(cancelarChecking())
        }
    }
}

const cancelarChecking = () => ({
    type: types.authCheckingFinish
})

export const limpiar = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch(logout())
        dispatch(limpiarEventos())
    }
}

const logout = () => ({
    type: types.usuarioLogout
})

const limpiarEventos = () => ({
    type: types.limiparEventosTotales
})