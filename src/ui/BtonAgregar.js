import React from 'react'
import { useDispatch } from 'react-redux'
import { abrirModal } from '../actions/uiAct'

export const BtonAgregar = () => {
    const dispatch = useDispatch()
    const seleccionarBoton = () => {
        dispatch(abrirModal())

    }
    return (
        <button className="btn btn-primary rounded-circle contenido" onClick={seleccionarBoton}>
            <i className="fas fa-plus far"></i>
        </button>
    )
}
