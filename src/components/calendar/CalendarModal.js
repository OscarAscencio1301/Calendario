import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux';
import { cerrarModal } from '../../actions/uiAct';
import DateTimePicker from 'react-datetime-picker'
import { useForm } from '../../hooks/useForm';
import moment from 'moment';
import Swal from 'sweetalert2';
import { agregarEventoAsincrono, inicioActualizarEvento, limpiarEvento } from '../../actions/calendarAct';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root')

const fechaInicio = moment().minutes(0).seconds(0).add(1, 'hours');
const fechaFinal = fechaInicio.clone().add(1, 'hours')


export const CalendarModal = () => {
    const dispatch = useDispatch()
    const [diaInicio, setdiaInicio] = useState(fechaInicio.toDate());
    const [diaFin, setdiaFin] = useState(fechaFinal.toDate());
    const { modalOpen } = useSelector(state => state.ui)
    const { eventoActivo } = useSelector(state => state.calendario)

    const [valores, cambioInput, setValores, reset] = useForm({
        start: fechaInicio.toDate(),
        end: fechaFinal.toDate(),
        title: '',
        notes: '',
        user: {
            id: 1234,
            name: 'Oscar'
        }
    })
    const { start, end, title, notes } = valores

    useEffect(() => {
        if (eventoActivo) {
            setValores(eventoActivo)
        } else {
            setValores({
                start: fechaInicio.toDate(),
                end: fechaFinal.toDate(),
                title: '',
                notes: '',
                user: {
                    id: 1234,
                    name: 'Oscar'
                }
            })

        }
    }, [eventoActivo, setValores])

    const cerrarModalBoton = (e) => {
        dispatch(cerrarModal())
        dispatch(limpiarEvento())
        reset();
    }

    const cambioFechaInicio = (e) => {
        setdiaInicio(e)
        setValores({
            ...valores,
            start: e
        })
    }

    const cambioFechaFinal = (e) => {
        setdiaFin(e)
        setValores({
            ...valores,
            end: e
        })
    }

    const enviarForm = (e) => {
        e.preventDefault();
        const momentStart = moment(start)
        const momentEnd = moment(end)
        if (title.trim().length < 2) {
            return Swal.fire({
                title: 'Titulo demasiado Corto',
                icon: 'error'
            })
        }

        if (momentStart.isSameOrAfter(momentEnd)) {
            return Swal.fire({
                title: 'La fecha de Incio debe de ser m??s temprano',
                icon: 'error'
            })

        }
        if (eventoActivo) {
            dispatch(inicioActualizarEvento(valores))
        } else {
            dispatch(agregarEventoAsincrono(valores))
        }

        cerrarModalBoton();

    }
    return (
        <Modal
            isOpen={modalOpen}
            onRequestClose={cerrarModalBoton}
            style={customStyles}
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-fondo"
        >
            <h1> {eventoActivo ? 'Editar Evento' : 'Nuevo evento'} </h1>
            <hr />
            <form className="container" onSubmit={enviarForm}>

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    {/* {/* <input className="form-control" placeholder="Fecha inicio" /> */}

                    <DateTimePicker
                        onChange={cambioFechaInicio}
                        value={diaInicio}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    {/* <input className="form-control" placeholder="Fecha inicio" /> */}
                    <DateTimePicker
                        onChange={cambioFechaFinal}
                        minDate={diaInicio}
                        value={diaFin}
                        className="form-control"
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="T??tulo del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={cambioInput}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripci??n corta</small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={cambioInput}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Informaci??n adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary btn-block py-0 w-100 mt-2"
                >

                    <span className="h5">{eventoActivo ? 'Guardar Cambios' : 'Crear Evento'}</span>
                </button>

            </form>

        </Modal>
    )
}
