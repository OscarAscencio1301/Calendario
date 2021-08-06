import React from 'react'
import { useDispatch } from 'react-redux'
import { eliminarEvento } from '../actions/calendarAct'

export const BotonBorrar = () => {
    const dispatch = useDispatch()
    const borrarEventoBoton = () => {
        dispatch(eliminarEvento())

    }
    return (
        <button className="btn btn-danger borrar"  onClick={borrarEventoBoton}>
            <i className="fas fa-trash"></i>
        </button>
    )
}
