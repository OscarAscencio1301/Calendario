import { types } from "../types/types";

export const uiReducer = (state = {modalOpen: false}, action) => {
    switch (action.type) {
        case types.uiOpenModal:
            return {
                ...state,
                modalOpen: true
            }
        case types.uiCloseModal:
            return {
                ...state,
                modalOpen: false
            }
            
         
    
        default:
            return state;
    }
}