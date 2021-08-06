import { types } from "../types/types";

export const activarEvento = (evento) =>( {
    type: types.activarEvento,
    payload: evento

})

export const limpiarEvento = () =>( {
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