import { useState } from 'react'

export const useForm = (valoresIniciales = {}) => {
    const [valores, setvalores] = useState(valoresIniciales)

    
    const cambioInput = (e) => {
        setvalores({
            ...valores,
            [e.target.name]: e.target.value
        })
    }
    const reset = () => {
        setvalores(valoresIniciales)
    }
    return [valores, cambioInput, setvalores, reset]
}
