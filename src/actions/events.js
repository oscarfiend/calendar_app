import types from "../types/types";

export const eventAddnew = (event) => ({
    type: types.eventAddNew,
    payload:event
})

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload:event
})

export const eventClearActive = () => ({
    type: types.eventCleanActive
})

export const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload:event
})

export const eventDeleted=()=>{
    console.log("entor al action")
    return{
        type:types.eventDeleted
    }
}

