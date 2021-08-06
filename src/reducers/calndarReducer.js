import moment from "moment"
import { types } from "../types/types";

const valoresInciales = {

eventos: [
    {
        title: 'Cumpleanos del jefe',
        cuerpo: 'LLevar Regalo',
        start: moment().toDate(),
        end: moment().add(2,'hours').toDate(),
        id: Date.now(),
        user: {
            id: 1234567,
            name: 'Oscar Ascencio'
         }
    }
], 
eventoActivo: null
}

export const calendarReducer = (state = valoresInciales, action) => {
    switch (action.type) {
        case types.activarEvento:
            return {
                ...state,
                eventoActivo: action.payload
            }
        case types.limiparEvento:
            return {
                ...state,
                eventoActivo: null
            }
        case types.agregarEvento:
            return {
                eventoActivo: null,
                eventos: [...state.eventos, action.payload]
            }
        case types.actualizarEvento:
            return {
                ...state,
                eventos: state.eventos.map(evento => (evento.id === action.payload.id ) ? action.payload : evento)
            }
        case types.borrarEvento:
            return {
                ...state,
                eventos: state.eventos.filter(evento => evento.id !== state.eventoActivo.id),
                eventoActivo: null
            }
        
        default:
            return state;
    }

}