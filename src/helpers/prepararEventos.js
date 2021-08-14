import moment from "moment"

export const prepararEventos = (eventos = []) => {
     return eventos.map(evento => {
         return {
             ...evento,
             end: moment(evento.end).toDate(),
             start: moment(evento.start).toDate(),
         }

     })
}