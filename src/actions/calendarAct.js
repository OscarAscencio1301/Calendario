import { fetchconToken } from "../helpers/fetch";
import { prepararEventos } from "../helpers/prepararEventos";
import { types } from "../types/types";

// Eventos Asincronos
export const agregarEventoAsincrono = (evento) => {
    return async (dispatch, getState) => {
        const {name, uid} = getState().auth
     
        try {
            const respuesta = await fetchconToken('eventos', evento, 'POST')
        const body = await respuesta.json()
        if (body.ok) {
            evento.id = body.evento.id
            evento.user = {
                _id: uid,
                name
            }
            console.log(evento)
            dispatch(agregarEvento(evento)) 
        }
            
        } catch (error) {
            console.log(error)
            
        }

    }
}


export const inicioCargaEventos = () => {
    return async(dispatch) => {
        const respuesta = await fetchconToken('eventos', {}, 'GET')
        const body = await respuesta.json()
        if(body.ok){
            const eventos = prepararEventos(body.eventos)
            dispatch(CargaEventos(eventos))
        }
    }
}

export const inicioActualizarEvento = (evento) => {
    return async(dispatch) => {
        try {
            const respuesta = await fetchconToken(`eventos/${evento.id}`, evento, 'PUT')
            const body = await respuesta.json()
            if(body.ok){
                dispatch(actualizarEvento(evento))
            }
        } catch (error) {
            console.log(error)
        }
    }

}

export const inicioBorrarEvento = () => {
    return async(dispatch, getState) => {
        const {eventoActivo} = getState().calendario
        try {
            const respuesta = await fetchconToken(`eventos/${eventoActivo.id}`, {}, 'DELETE')
            const body = await respuesta.json()
            if(body.ok){
                dispatch(eliminarEvento())
            }
        } catch (error) {
            console.log(error)
        }
    }

}
// Sincronos

const CargaEventos = (eventos) => ({
    type: types.CargaEventos,
    payload: eventos
})

export const activarEvento = (evento) => ({
    type: types.activarEvento,
    payload: evento

})

export const limpiarEvento = () => ({
    type: types.limiparEvento
})


export const agregarEvento = (evento) => ({
    type: types.agregarEvento,
    payload: evento
})


export const actualizarEvento = (evento) => ({
    type: types.actualizarEvento,
    payload: evento
})

export const eliminarEvento = () => ({
    type: types.borrarEvento
})


