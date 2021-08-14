import React from 'react'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { startLogin, startRegister } from '../../actions/auth'
import { useForm } from '../../hooks/useForm'

export const Login = () => {
    const dispatch = useDispatch()
    const [formLoginValues, cambioInput] = useForm({
        lEmail: 'oscara9a@gmail.com',
        lPassword: 'a1b2c3'
      
    })

    const [formRegisterValues, cambioInputRegister] = useForm({
        RName: 'Oscar',
        REmail: 'oscara9a@gmail.com',
        RPassword: 'a1b2c3',
        RPassword2: 'a1b2c3',
      
    })

    const enviarLogin = (e) => {
        e.preventDefault();
        dispatch(startLogin(lEmail, lPassword))
    }

    const enviarRegistro = (e) => {
        e.preventDefault();
        if(RPassword !== RPassword2){
            return Swal.fire({
                title: 'Las contraseñas no coinciden',
                icon: 'error'
            })
        }
        dispatch(startRegister(RName,REmail, RPassword))
    }

    const {lEmail, lPassword} = formLoginValues
    const {RName, REmail, RPassword, RPassword2} = formRegisterValues
    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={enviarLogin}>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="lEmail"
                                value={lEmail}
                                onChange={cambioInput}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control mt-3"
                                placeholder="Contraseña"
                                name="lPassword"
                                value={lPassword}
                                onChange={cambioInput}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={enviarRegistro}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="RName"
                                value={RName}
                                onChange={cambioInputRegister}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control mt-3"
                                placeholder="Correo"
                                name="REmail"
                                value={REmail}
                                onChange={cambioInputRegister}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control mt-3"
                                placeholder="Contraseña"
                                name="RPassword"
                                value={RPassword}
                                onChange={cambioInputRegister}
                                
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control mt-3"
                                placeholder="Repita la contraseña"
                                name="RPassword2"
                                value={RPassword2}
                                onChange={cambioInputRegister} 
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit mt-3" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
