import React, { useEffect, useState } from 'react'
import { NavBar } from '../../ui/NavBar'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import 'moment/locale/es'
import { messages } from '../../helpers/idioma'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'
import { BtonAgregar } from '../../ui/BtonAgregar'
import { useDispatch, useSelector } from 'react-redux'
import { activarEvento, inicioCargaEventos} from '../../actions/calendarAct'
import { abrirModal } from '../../actions/uiAct'
import { BotonBorrar } from '../../ui/BotonBorrar'

const localizer = momentLocalizer(moment)
moment.locale('es')

// const events = [{
//     title: 'Cumpleanos del jefe',
//     cuerpo: 'LLevar Regalo',
//     start: moment().toDate(),
//     end: moment().add(2,'hours').toDate(),
//     user: {
//         id: 1234567,
//         name: 'Oscar Ascencio'
//     }
// }]

export const CalndarScreen = () => {
    const dispatch = useDispatch()
    const {eventos} = useSelector(state => state.calendario)
    const {eventoActivo} = useSelector(state => state.calendario)
    const {uid} = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(inicioCargaEventos())
    }, [dispatch])

    const [vistaActual, setVistaActual] = useState(localStorage.getItem('VistaCalendar') || 'month')
    const eventStyleGetter = (event) => {
        const style = {
            backgroundColor: (uid === event.user._id) ? '#367CF7' : 'green',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: '#fff'
        }
    
        return {
            style
        }
    }
    
    const darDobleClick = (e) => {
       dispatch(abrirModal())
    }

    const darunclick = (e)=> {
        dispatch(activarEvento(e))
    }
    const ultimaVista = (e) =>{
        setVistaActual(e)
        localStorage.setItem("VistaCalendar", e)
    }
    // const onSelectedSlod = (e) => {
    //     dispatch(limpiarEvento())
    // }
    
    return (
        <div>
            <NavBar />
            <Calendar
            localizer={localizer}
            events={eventos}
            startAccessor="start"
            endAccessor="end"
            messages={messages}
            eventPropGetter={eventStyleGetter}
            onDoubleClickEvent={darDobleClick}
            onView={ultimaVista}
            // onSelectSlot={onSelectedSlod}
            // selectable={true}
            onSelectEvent={darunclick}
            view={vistaActual}
            components={
                {
                    event: CalendarEvent
                }}
            />
            <CalendarModal />
            <BtonAgregar />
            {
                eventoActivo && <BotonBorrar />
            }
        </div>
    )
}
