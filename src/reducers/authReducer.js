import { types } from "../types/types";

export const authReducer = (state = { checking: true }, action) => {
    switch (action.type) {
        case types.usuarioLogin:
            return {
                ...state,
                checking: false,
                ...action.payload
            }
        case types.usuarioRegistrado:
            return {
                ...state,
                checking: false,
                ...action.payload
            }
        case types.authCheckingFinish:
            return {
                ...state,
                checking: false
            }
        case types.usuarioLogout:
            return { 
                checking:false
            }

        default:
            return state;
    }

}